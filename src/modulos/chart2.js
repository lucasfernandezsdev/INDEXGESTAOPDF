const ctx2 = document.getElementById("hreceitas");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "HISTÓRICO DE RECEITAS",
        data: [100, 200, 300, 400, 500, 600],
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,255)',
            borderColor: 'rgba(153, 102, 255, 1)', 
          },
        ],
      },
      options: {
        indexAxis: "x",
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
