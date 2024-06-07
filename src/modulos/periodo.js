export function formatDate(date, format) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
  
    if (format === "mm/dd/yyyy") {
      return `${month}/${day}/${year}`;
    } else if (format === "dd/mm/yyyy") {
      return `${day}/${month}/${year}`;
    }
  }
  
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  const dtInicio = formatDate(firstDayOfMonth, "mm/dd/yyyy");
  const dtFim = formatDate(lastDayOfMonth, "mm/dd/yyyy");
  
  const dtInicioTitulo = formatDate(firstDayOfMonth, "dd/mm/yyyy");
  const dtFimTitulo = formatDate(lastDayOfMonth, "dd/mm/yyyy");
  
  document.getElementById(
    "periodo"
  ).innerText = `[PERÍODO ${dtInicioTitulo} A ${dtFimTitulo}]`;
  
  export { dtInicio, dtFim };
  