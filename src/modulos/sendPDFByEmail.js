export async function sendPDFByEmail(pdf) {
    const pdfData = pdf.output('blob'); // Converte o PDF para Blob
    const formData = new FormData();
    formData.append('pdf', pdfData, 'chart.pdf');
  
    return fetch('https://seu-endpoint-n8n.com/send-email', {
      method: 'POST',
      body: formData
    });
  }
  