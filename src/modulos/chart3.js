const ctx3 = document.getElementById("iacumulada");
async function fetchCep (){
  const response = await fetch("https://brasilapi.com.br/api/cep/v1/88062110")
  const data = await response.json()
  // console.log(data)
  // return data
}
fetchCep()

new Chart(ctx3, {
  type: "line",
  data: {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "INADIMPLÊNCIA ACUMULADA",
        data: [100, 200, 300, 400, 600, 800],
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,255)',
            borderColor: 'rgba(219,186,58,255)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
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