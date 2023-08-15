import fs from 'fs';
import Handlebars from 'handlebars';
import axios from 'axios';

const invoice = fs.readFileSync('./assets/invoice.html', 'utf8');
const template = Handlebars.compile(invoice);
const params = {
    invoiceNr: 'H2P202307-01711',
    billTo: 'Anna Smith',
    invoiceDate: (new Date()).toDateString(),
    paymentDue: (new Date()).toDateString(),
    orderId: 112233,
    items: [
        {description: 'Domain registration', quantity: 2, price: '$10', total: '$20'},
        {description: 'Web hosting', quantity: 1, price: '$15', total: '$15'},
        {description: 'Consulting', quantity: 1, price: '$500', total: '$500'},
    ],
    subTotal: '$535',
    tax: '$53.5',
    total: '$588.5',
};

const html = template(params);
const apiKey = 'd3a0264f70864...'; // get api key on https://html2pdf.app

const response = await axios.post('https://api.html2pdf.app/v1/generate', {
    html,
    apiKey,
}, {responseType: 'arraybuffer'});

fs.writeFileSync('./assets/invoice.pdf', response.data);
