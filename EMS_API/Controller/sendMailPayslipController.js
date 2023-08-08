const nodemailer = require('nodemailer');
const pool = require('../Config/Connection');
const path = require("path");
const pdf = require('html-pdf');
const { payslipByEmail } = require('../helpher/payslip_Data_Email.js');
const { log } = require('console');



const sendEmailEmployee = async (req, resp) => {

  try {
    const { email, title, id } = req.body;
    
    
    const options = { format: 'Letter' };

    const payslip = await payslipByEmail(email, title);


    const payslipPath = path.join(__dirname, '../pdf_files/payslip.pdf'); // Set the desired file path for saving the PDF

    // html pdf creator to create pdf
    pdf.create(payslip, options).toFile(payslipPath, function (err, res) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('pdf', res);

      // Setup email transporter
      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fce31589a4a231",
          pass: "f43526299bbe57"
        }
      });

      // Setup email data
      let mailOptions = {
        from: 'santoshkmahto87@gmail.com',
        to: email,
        subject: 'Payslip by',
        text: 'This is the payslip sent to every employee via  email.',
        attachments: [
          {
            filename: 'payslip.pdf',
            path: payslipPath,
            contentType: 'application/pdf'
          }
        ]
      };

      // Send mail with defined transport object
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
          resp.json({
            status: false,
            message: error.message
          });
        } else {
          const results = await pool.query('INSERT INTO payslipsent (emp_id,title,email,status) VALUES ($1,$2,$3,$4) RETURNING *', [id, title, email, true]);

          //response of Nodemailer
          resp.json({
            status: true,
            massage: "Sending Mail response from NodeMailer: " + info.response
          });

        }
      });
    });

  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
}


module.exports = {
  sendEmailEmployee
};
