export async function generatePDF() {
    return html2canvas(document.getElementById("content"), {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: 2 // Increase the resolution of the canvas
    }).then(function (canvas) {
      const { jsPDF } = window.jspdf;
      var imgData = canvas.toDataURL("image/png");
      var pdf = new jsPDF("p", "mm", "a4");
  
      // Definindo a cor de fundo
      pdf.setFillColor(255, 255, 255); // Cor de fundo em RGB
      pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
  
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      return pdf;
    });
  }
  
  document.getElementById("downloadPDF").addEventListener("click", function () {
    generatePDF().then(pdf => pdf.save("chart.pdf"));
  });
  