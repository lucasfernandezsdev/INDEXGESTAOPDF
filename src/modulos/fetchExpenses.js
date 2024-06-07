import { dtInicio, dtFim } from './periodo.js';

async function fetchExpenses() {
  const url = `https://api.superlogica.net/v2/condor/despesas/index?dtInicio=${dtInicio}&dtFim=${dtFim}&idCondominio=118`;
  const headers = new Headers({
    access_token: "52f9c52a-9911-4227-968e-f4f3161786cc",
    app_token: "a2bfb389-e728-4b2f-98e0-3e24ebbf52fd",
  });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data)) {
      const filteredDataGas = data.filter(
        (item) =>
          item.st_nome_con &&
          item.st_nome_con.toLowerCase().includes("gas")
      );
      const valoresGas = filteredDataGas.map(
        (item) => item.vl_valor_pdes
      );

      const filteredDataSeguros = data.filter(
        (item) =>
          item.st_nome_con &&
          item.st_nome_con.toLowerCase().includes("seguros")
      );
      const valoresSeguros = filteredDataSeguros.map(
        (item) => item.vl_valor_pdes
      );

      exportToChart1(valoresGas, valoresSeguros);
    } else {
      console.error("Formato de dados inesperado:", data);
    }
  } catch (error) {
    console.error("Houve um problema com a operação fetch:", error);
  }
}

function exportToChart1(valoresGas, valoresSeguros) {
  // Publicando os valores para o módulo chart1.js
  const event = new CustomEvent("exportChart1", {
    detail: { valoresGas, valoresSeguros },
  });
  window.dispatchEvent(event);
}

fetchExpenses();
