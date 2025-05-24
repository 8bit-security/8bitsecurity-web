document.querySelectorAll("canvas").forEach(canvas => {
  const labels = JSON.parse(canvas.getAttribute("data-labels"));
  const values = JSON.parse(canvas.getAttribute("data-values"));
  const title = canvas.getAttribute("data-title");

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
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
        legend: {
          position: window.innerWidth < 600 ? "bottom" : "right",
          labels: {
            color: "#e4e4e4",
            padding: 16
          }
        },
        title: {
          display: true,
          text: title,
          color: "#58f6e3",
          font: {
            size: 18,
            weight: "bold"
          },
          padding: {
            bottom: 16
          }
        }
      }
    }
  });
});
