document.addEventListener("DOMContentLoaded", () => {
  const chart = document.getElementById("topSectorsChart");
  if (chart) {
    const labels = JSON.parse(chart.getAttribute("data-labels"));
    const values = JSON.parse(chart.getAttribute("data-values"));

    new Chart(chart, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          label: "Targeted Sectors",
          data: values,
          backgroundColor: [
            "#58f6e3", "#3ae2d0", "#2fc7bd", "#28a0a2", "#1c6d75"
          ],
          borderColor: "#0e1116",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#e4e4e4" } }
        }
      }
    });
  }
});
