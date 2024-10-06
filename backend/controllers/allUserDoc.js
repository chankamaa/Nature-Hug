import pdf from 'html-pdf';
import path from 'path';
import { fileURLToPath } from 'url';
import { default as pdfTemplate } from '../models/Documents/allUserDoc.js';

// Utility to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPdf = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('allUserDoc.pdf', (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error generating PDF');
    }
    res.send('PDF generated');
  });
};

export const fetchPdf = (req, res) => {
  res.sendFile(path.join(__dirname, '../allUserDoc.pdf'));
};
