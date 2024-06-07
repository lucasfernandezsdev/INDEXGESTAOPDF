const ctx1 = document.getElementById("arrecadacao");
Chart.defaults.color = "#fff";
Chart.defaults.borderColor = "#fff";
Chart.defaults.backgroundColor = "#fff";

window.addEventListener('exportChart1', (event) => {
  const { valoresGas, valoresSeguros } = event.detail;

  // Aqui, somamos os valores de gas e seguros, pois os dados são arrays
  const totalGas = valoresGas.reduce((sum, value) => sum + value, 0);
  const totalSeguros = valoresSeguros.reduce((sum, value) => sum + value, 0);

  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["GAS", "SEGUROS", "AGUA", "FUNDO", "COTA"],
      datasets: [
        {
          label: "COMPOSIÇÃO DAS ARRECADAÇÕES",
          data: [totalGas, totalSeguros, 1884], // Exemplo de valores
          borderWidth: 1,
          backgroundColor: 'rgba(255,255,255,255)',
          borderColor: 'rgba(153, 102, 255, 1)',
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16 // Tamanho da fonte dos labels da legenda
            }
          }
        }
      }
    },
  });
});
