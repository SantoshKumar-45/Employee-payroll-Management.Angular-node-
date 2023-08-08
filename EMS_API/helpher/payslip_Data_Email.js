const pool = require('../Config/Connection');
const fs = require('fs');
const { ToWords } = require('to-words');
const moment = require('moment');


// convert to words
const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: { // can be used to override defaults for the selected locale
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    }
  }
});

const payslipByEmail = async (email, title) => {
  
  try {
    let renderedHTML
    const results = await pool.query('SELECT employees.id, first_name, last_name, email,designation,doj, basic_salary, da, ta, hra, title, gross_salary, tds, pf, advance, present_days,total_deduction, net_salary,title, working_days  FROM employees INNER JOIN salary_details ON salary_details.emp_id = employees.id  where email= $1 and title=$2', [email, title]);

    const details = results.rows;
   
    // Read the HTML template file
    const template = fs.readFileSync('./templates/payslip.html', 'utf-8');
   
    details.forEach(async emp => {

      // Assuming emp.doj is a valid Date object or a string representing the date
      const formattedDate = moment(emp.doj).format('YYYY-MM-DD'); 
  
      let words = toWords.convert(emp.net_salary);
      

      
      // Replace placeholders in the HTML template with actual data for each employee
      renderedHTML = template
        .replace('{{empl.title}}', emp.title)
        .replace('{{empl.doj}}', formattedDate)
        .replace('{{empl.first_name}}', emp.first_name)
        .replace('{{empl.last_name}}', emp.last_name)
        .replace('{{empl.designation}}', emp.designation)
        .replace('{{empl.working_days}}', emp.working_days)
        .replace('{{empl.basic_salary}}', '₹' + '' + emp.basic_salary)
        .replace('{{empl.tds}}', '₹' + '' + emp.tds)
        .replace('{{empl.da}}', '₹' + '' + emp.da)
        .replace('{{empl.pf}}', '₹' + '' + emp.pf)
        .replace('{{empl.ta}}', '₹' + '' + emp.ta)
        .replace('{{empl.advance}}', '₹' + '' + emp.advance)
        .replace('{{empl.hra}}', '₹' + '' + emp.hra)
        .replace('{{empl.gross_salary}}', '₹' + '' + emp.gross_salary)
        .replace('{{empl.total_deduction}}', '₹' + '' + emp.total_deduction)
        .replace('{{empl.net_salary}}', '₹' + '' + emp.net_salary)       
        .replace('{{empl.salaryWords}}', words);
        
    });
    return renderedHTML;

  }
  catch (err) {    
    throw new Error(err.message);
  }
}

module.exports = {
  payslipByEmail
};
