document.addEventListener("DOMContentLoaded", () => {
  const cveList = document.getElementById("cveList");
  const search = document.getElementById("search");
  const vendor = document.getElementById("vendorFilter");
  const severity = document.getElementById("severityFilter");
  const kev = document.getElementById("kevFilter");

  let cves = [];
  let filtered = [];
  let visibleCount = 20;
  let isLoading = false;

  fetch("/static/data/cve_samples.json")
    .then(res => res.json())
    .then(data => {
      cves = data;
      applyFilters();
    });

  [search, vendor, severity, kev].forEach(el => el.addEventListener("input", applyFilters));

  function applyFilters() {
    visibleCount = 10;
    const term = search.value.toLowerCase();
    const vendorVal = vendor.value;
    const severityVal = severity.value;
    const kevChecked = kev.checked;

    filtered = cves.filter(cve => {
      const matchesSearch = cve.cve_id.toLowerCase().includes(term) || cve.description.toLowerCase().includes(term);
      const matchesVendor = vendorVal === "" || cve.vendor === vendorVal;
      const matchesSeverity = (
        severityVal === "" ||
        (severityVal === "medium" && cve.cvss_score >= 4 && cve.cvss_score < 7) ||
        (severityVal === "high" && cve.cvss_score >= 7 && cve.cvss_score < 9) ||
        (severityVal === "critical" && cve.cvss_score >= 9)
      );
      const matchesKev = !kevChecked || cve.is_kev;

      return matchesSearch && matchesVendor && matchesSeverity && matchesKev;
    });

    render(true);
  }

  function render(reset = false) {
    if (reset) {
      cveList.innerHTML = "";
    }

    const toRender = filtered.slice(0, visibleCount);

    const html = toRender.map(cve => `
      <article class="cve-card">
        <h3>${cve.cve_id}</h3>
        <p>${cve.description}</p>
        <p>
          <strong>CVSS:</strong>
          <span class="cvss-score ${getCvssClass(cve.cvss_score)}"><strong>${cve.cvss_score ?? "N/A"}</strong></span>
          • <strong>Vendor:</strong> ${cve.vendor}
        </p>
        <p><strong>Products:</strong> ${Array.isArray(cve.product) ? cve.product.join(", ") : cve.product}</p>
        ${cve.is_kev ? '<span class="badge badge-warn">Exploited</span>' : ''}
        
      </article>
    `).join("");

      // at .64. ${cve.patched ? '<span class="badge badge-ok">Patched</span>' : '<span class="badge badge-alert">Unpatched</span>'}
    
      if (reset) {
      cveList.innerHTML = html;
    } else {
      cveList.insertAdjacentHTML("beforeend", html);
    }

    isLoading = false;
  }

  const scrollContainer = document.querySelector(".cve-scroll-container");

  scrollContainer.addEventListener("scroll", () => {
    if (isLoading || visibleCount >= filtered.length) return;
  
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      isLoading = true;
      visibleCount += 20;
      render();
    }
  });

});

function getCvssClass(score) {
  if (score >= 9) return "cvss-critical";
  if (score >= 7) return "cvss-high";
  if (score >= 4) return "cvss-medium";
  return "cvss-low";
}
