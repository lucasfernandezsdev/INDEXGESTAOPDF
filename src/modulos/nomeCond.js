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
  const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

  const dtInicio = formatDate(firstDayOfWeek, "mm/dd/yyyy");
  const dtFim = formatDate(lastDayOfWeek, "mm/dd/yyyy");

  const dtInicioTitulo = formatDate(firstDayOfWeek, "dd/mm/yyyy");
  const dtFimTitulo = formatDate(lastDayOfWeek, "dd/mm/yyyy");

  document.getElementById("periodo").innerText = `${dtInicioTitulo} - ${dtFimTitulo}`;

  export { dtInicio, dtFim };