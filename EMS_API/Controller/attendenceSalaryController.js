const pool = require('../Config/Connection');

//get employee details for generate attendance
const getEmployee = async (req, res) => {
    try {
        const employeeDetails = await pool.query('SELECT employees.id,first_name,last_name, pf_amount, tds_amount,gross_salary FROM employees INNER JOIN emp_salary_details ON emp_salary_details.emp_id = employees.id WHERE active = $1', [true]);

        console.log(employeeDetails.rows);

        res.status(200).json({ empdetails: employeeDetails.rows })

    } catch (error) {
        return res.status(500).json({ Message: error.message });
    }
};



// save salary and salary_details after calculate attendance in current month
const saveAttendance = async (req, res) => {

    const dataArray = req.body.salary_details;
    const { month, year, working_days } = req.body.salary;
    const title = `${month}-${year}`;

    const currentdate = new Date();
    console.log(req.body.salary);
    console.log('sssssssssssss',dataArray);

    try {

        // check already exit date(title- eg.June - 2023)
        const date = await pool.query('SELECT * FROM salary WHERE title = $1', [title]);

        if (date.rows != 0) {
            throw new Error("month and date already exits");
        }

        // Insert the main salary record and get the ID
        const salaryResults = await pool.query('INSERT INTO salary (month, year, title, date, working_days) VALUES ($1, $2, $3, $4, $5) RETURNING *', [month, year, title, currentdate, working_days]);

        const salary_id = salaryResults.rows[0].id;

        //merage two array obj data 
        const result = await pool.query('SELECT  emp_id , basic_salary, da_amount, ta_amount, hra_amount, tds_amount, pf_amount, epf_amount, advance_amount, da_per, ta_per, hra_per, tds_per, pf_per, epf_per, advance_per FROM emp_salary_details ORDER BY id ASC');
        const dataEmp = result.rows
        // if employee data not found then throw error 
        if (!dataEmp) {
            throw new Error('employee details are not Found! ');
        }

        const mergedArray = dataArray.map((data1) => {
            // Check if array2 is an array and has length
            if (Array.isArray(dataEmp) && dataEmp.length > 0) {
                const matchingData2 = dataEmp.find((data2) => data2.emp_id === data1.emp_id);

                if (matchingData2) {
                    // Merge the objects from array1 and array2
                    return { ...data1, ...matchingData2 };
                }
            }
            // If no match is found or array2 is not an array, return the original data from array1
            return data1;
        });

        for (const data of mergedArray) {
            const { emp_id, working_days, pl, sl, spl, lwp, present_days, gross_salary, total_deduction, net_salary, basic_salary, da_amount, ta_amount, hra_amount, tds_amount, pf_amount, advance_amount } = data;



            // Insert the salary details record using the obtained ID
            const resultsalarydtls = await pool.query('INSERT INTO salary_details (sal_id,emp_id,basic_salary,da,ta,hra,gross_salary,tds,pf,advance,total_deduction,net_salary,working_days,title,personal_leave,sick_leave,leavewithoutpay,special_leave,present_days) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *', [salary_id, emp_id, basic_salary, da_amount, ta_amount, hra_amount, gross_salary, tds_amount, pf_amount, advance_amount, total_deduction, net_salary, working_days, title, pl, sl, lwp, spl, present_days]);
        }

        return res.status(200).json({
            status: true
        });
    }

    catch (err) {
        console.log(err.message);
        res.status(500).send({ status: false, error: err.message });

    }
}



//get title from salary Table(eg. 'June - 2023')
const getSalaryTitle = async (req, res) => {
    try {

        const Results = await pool.query('SELECT title,month,year FROM salary ORDER BY id DESC');


        return res.status(200).json({ status: true, Title: Results.rows });

    } catch (error) {
        res.status(500).send({ status: false, error: error.message });

    }
}


// get all previous attentdance save use of date(title)

const getPreviousAttendance = async (req, res) => {

    const title = req.params.title

    try {

        const Results = await pool.query('SELECT * FROM salary WHERE title = $1', [title]);

        const salary_id = Results.rows[0].id;

        const attendance = await pool.query('SELECT * FROM salary_details INNER JOIN employees ON employees.id = salary_details.emp_id WHERE sal_id = $1', [salary_id]);

        return res.status(200).json({ status: true, Results: attendance.rows });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

module.exports = {
    getEmployee,
    saveAttendance,
    getSalaryTitle,
    getPreviousAttendance
};
