const pool = require('../Config/Connection');
const fs = require('fs');


// download disbursement report pdf
const disbursementReportPdf = async (title) => {
    try {
        const results = await pool.query('SELECT employees.id, first_name, last_name, account_no, title, net_salary FROM employees INNER JOIN salary_details ON salary_details.emp_id = employees.id INNER JOIN emp_bank_details ON emp_bank_details.emp_id = employees.id WHERE title = $1', [title]);

        const details = results.rows;

        // if disbursement  details are not exists 
        if (!details) {
            throw new Error('Disbursement details are not exists');
        }

        // Read the HTML template file
        const template = fs.readFileSync('./templates/disbursementReport.html', 'utf-8');

        // Create an array to store the employee data
        const empDis_Data = details.map((emp, index) => {
            return `
            <tr>
               <td>${index + 1}</td>
              <td>${emp.first_name} ${emp.last_name}</td>
              <td>${emp.account_no}</td>
              <td>₹ ${emp.net_salary}/-</td>
              </tr>`;
        });

        // Replace placeholders in the HTML template with actual data for each employee
        const renderHTML = template
            .replace('{{emp.title}}', title)
            .replace('{{disbursementData}}', empDis_Data.join('')); // Join the array elements without any separator

        return renderHTML;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    disbursementReportPdf,
};



