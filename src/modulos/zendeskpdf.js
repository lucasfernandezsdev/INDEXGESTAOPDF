const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

// Substitua essas variáveis pelas suas próprias informações
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const email = process.env.ZENDESK_EMAIL;
const apiToken = process.env.ZENDESK_API_TOKEN;
const filePath = process.env.PDF_FILE_PATH;

// Cria o ticket no Zendesk
async function createZendeskTicket() {
  const ticketData = {
    ticket: {
      subject: "Enviando PDF para o N8N",
      comment: {
        body: "Segue o PDF em anexo."
      }
    }
  };

  const response = await axios.post(
    `https://${subdomain}.zendesk.com/api/v2/tickets.json`,
    ticketData,
    {
      auth: {
        username: `${email}/token`,
        password: apiToken
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.ticket.id;
}

// Faz o upload do arquivo PDF para o Zendesk
async function uploadPDFToZendesk(ticketId) {
  const form = new FormData();
  form.append('file', fs.createReadStream(path.resolve(filePath)));

  const response = await axios.post(
    `https://${subdomain}.zendesk.com/api/v2/uploads.json?filename=${path.basename(filePath)}`,
    form,
    {
      auth: {
        username: `${email}/token`,
        password: apiToken
      },
      headers: {
        ...form.getHeaders()
      }
    }
  );

  const attachmentToken = response.data.upload.token;

  // Atualiza o ticket com o anexo
  const updateData = {
    ticket: {
      comment: {
        body: "Anexo adicionado ao ticket.",
        uploads: [attachmentToken]
      }
    }
  };

  await axios.put(
    `https://${subdomain}.zendesk.com/api/v2/tickets/${ticketId}.json`,
    updateData,
    {
      auth: {
        username: `${email}/token`,
        password: apiToken
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  console.log('PDF enviado com sucesso para o Zendesk!');
}

async function main() {
  try {
    const ticketId = await createZendeskTicket();
    await uploadPDFToZendesk(ticketId);
  } catch (error) {
    console.error('Erro ao enviar PDF para o Zendesk:', error.response.data);
  }
}

// Cria um ticket a cada 20 segundos
setInterval(main, 20000);
