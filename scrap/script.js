// Sample data (replace this with your data)
//const data = require("./entries.js");
var data = [];

function loadJSON(callback) {
  fetch("entries.js")
    .then((response) => response.json())
    .then((json) => {
      data = json;
      populateTable();
      createLineChart();
      createScatterPlot();
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
}

loadJSON();

// Initial zoom level
let zoom = 1;

function populateTable() {
  const tableBody = document.querySelector("#data-table tbody");

  data.forEach((entry) => {
    const row = document.createElement("tr");
    // Format date to human-readable format
    const date = new Date(entry.date).toLocaleString();
    row.innerHTML = `
            <td>${date}</td>
            <td>-</td>
            <td>${entry.value}</td>
        `;
    tableBody.appendChild(row);
  });
}

function createLineChart() {
  const chartCanvas = document.querySelector("#chart");
  const values = data.map((entry) => entry.value);
  const dates = data.map((entry) => new Date(entry.date).toLocaleString());

  const scaledValues = values.map((value) => value * zoom);

  new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Values",
          data: scaledValues,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Value",
          },
          ticks: {
            callback: function (value) {
              return value.toFixed(2); // Show values with 2 decimal places
            },
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x", // Enable panning in the x-axis
          },
          zoom: {
            enabled: true,
            mode: "x", // Enable zooming in the x-axis
          },
        },
      },
    },
  });
}

function createScatterPlot() {
  const scatterCanvas = document.querySelector("#scatter-chart");
  const values = data.map((entry) => entry.value);
  const dates = data.map((entry) => new Date(entry.date));

  const scaledValues = values.map((value) => value * zoom);

  new Chart(scatterCanvas, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Value vs. Time",
          data: data.map((entry) => ({
            x: new Date(entry.date),
            y: entry.value * zoom,
          })),
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          pointRadius: 5,
          showLine: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "second",
          },
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          title: {
            display: true,
            text: "Value",
          },
          ticks: {
            callback: function (value) {
              return value.toFixed(2); // Show values with 2 decimal places
            },
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x", // Enable panning in the x-axis
          },
          zoom: {
            enabled: true,
            mode: "x", // Enable zooming in the x-axis
          },
        },
      },
    },
  });
}

function handleZoomChange() {
  zoom = parseFloat(document.getElementById("zoomRange").value);
  updateCharts();
}
// Execute functions when the page loads
document.addEventListener("DOMContentLoaded", () => {
  populateTable();
  //   createLineChart();
  //   createScatterPlot();
});
