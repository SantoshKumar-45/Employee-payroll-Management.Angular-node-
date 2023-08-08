const pool = require('../Config/Connection');

const payslipbyDatetitle = async (req, res) => {

    const { date } = req.params;
    try {
        const Results = await pool.query('SELECT id FROM salary WHERE title = $1', [date]);

        const salary_id = Results.rows[0].id;

        const results = await pool.query('SELECT employees.id, first_name, last_name, email,designation,picture,title FROM employees INNER JOIN salary_details ON salary_details.emp_id = employees.id  Where sal_id=$1', [salary_id]);
        const Data = results.rows;

        return res.status(200).json({ empData: Data });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            massage: error.massage
        })
    }
}


//payslip by title & id wise show data  Single employee
const payslipByidTitle = async (req, res) => {
    let { id, title } = req.params;
    
    try {

        const results = await pool.query('SELECT employees.id, first_name, last_name, email, designation, doj, basic_salary, da, ta, hra,title, gross_salary, tds, pf, advance, present_days, total_deduction, net_salary,working_days FROM employees INNER JOIN salary_details ON salary_details.emp_id = employees.id WHERE employees.id = $1 AND title = $2',
            [id, title]);
        
        const details = results.rows;

        return res.status(200).json({ employee: details });
    }
    catch (err) {
        res.status(500).json({
            status: false,
            massage: err.massage
        })
    }
}

//get payslip send employeee data which monyh send 


const getPaslipsentData = async (req, res) => {
    try {
       //get payslip sent employee status and email
        const sentpayslip = await pool.query('SELECT * FROM payslipsent ORDER BY id ASC');
       
        return res.status(200).json({
            status: true,
            sentData: sentpayslip.rows
        });
    } catch (err) {
      
        res.status(500).json({
            message: err.message,
            status: false,
        });
    }
};

module.exports = {
    payslipbyDatetitle, 
    payslipByidTitle,
    //get sent patslip data
    getPaslipsentData

}