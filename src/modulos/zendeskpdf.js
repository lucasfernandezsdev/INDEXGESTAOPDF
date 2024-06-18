const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

//const subdomain = process.env.ZENDESK_SUBDOMAIN;
//const email = process.env.ZENDESK_EMAIL;
//const apiToken = process.env.ZENDESK_API_TOKEN;
//const filePath = process.env.PDF_FILE_PATH;

const subdomain = 'indexadm';
const email = 'franklin@indexadm.com.br';
const apiToken = '4gseOTRwr202Giosq4HWBQjnWzFdJYNf2aQGEezX';
const filePath = process.env.PDF_FILE_PATH;

console.log('Subdomain:', subdomain);
console.log('Email:', email);
console.log('API Token:', apiToken);
console.log('File Path:', filePath);

async function createZendeskTicket() {
  const ticketData = {
    ticket: {
      subject: "Enviando PDF para o N8N",
      comment: {
        body: "Segue o PDF em anexo."
      }
    }
  };

  try {
    try {
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
    } catch (error) {
      console.error('Erro ao criar o ticket:', error.response.data);
      throw error;
    }

    return response.data.ticket.id;
  } catch (error) {
    console.error('Erro ao criar o ticket:', error.response.data);
    throw error;
  }
}

async function uploadPDFToZendesk(ticketId) {
  const form = new FormData();
  form.append('file', fs.createReadStream(path.resolve(filePath)));

  try {
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
          password: apiToken,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('PDF enviado com sucesso para o Zendesk!');
  } catch (error) {
    console.error('Erro ao fazer upload do PDF:', error.response.data);
    throw error;
  }
}

async function main() {
  try {
    const ticketId = await createZendeskTicket();
    await uploadPDFToZendesk(ticketId);
  } catch (error) {
    console.error('Erro ao enviar PDF para o Zendesk:', error.response.data);
  }
}

setInterval(main, 20000);
