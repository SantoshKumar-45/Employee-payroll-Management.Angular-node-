const pool = require('../Config/Connection');


const crtEmployee = async (req, res) => {

     //pic upload, emp personal required body
    const picture = req.NewFileName;
    // console.log(picture);
    const { first_name, last_name, dob, email, contact_no, address, designation, doj } = req.body;
    const active = req.body.active ? req.body.active : true
    //emp bank required body
    const { account_no, bank_name, branch, ifsc_code, pan_no } = req.body;
    //emp salary required body
    const { basic_salary, gross_salary, total_deduction, net_salary } = req.body;
    //emp salary req in json format
    const Salary = JSON.parse(req.body.Salary);

    try {
        if (picture == undefined) {
            throw new Error ('please upload picture')
        }
        // already exists data validation check
        const existingData = await pool.query('SELECT email, contact_no, account_no, pan_no FROM employees INNER JOIN emp_bank_details ON employees.id = emp_bank_details.emp_id');

        let emailExists = false;
        let contact_noExists = false;
        let account_noExists = false;
        let pan_noExists = false;

        existingData.rows.forEach(data => {
            if (data.email === email) {
                emailExists = true;
            };
            if (data.contact_no === contact_no) {
                contact_noExists = true;
            };
            if (data.account_no === account_no) {
                account_noExists = true;
            };
            if (data.pan_no === pan_no) {
                pan_noExists = true;
            };
        });

        let allExistsData = {};
        if (emailExists) {
            allExistsData['exitsEmail'] = email;
        };
        if (contact_noExists) {
            allExistsData['exitsContact'] = contact_no;
        };
        if (account_noExists) {
            allExistsData['exitsA_C'] = account_no;
        };
        if (pan_noExists) {
            allExistsData['exitsPan'] = pan_no;
        };
        if (Object.keys(allExistsData).length !== 0) {
            throw new Error(JSON.stringify(allExistsData));
        }


        //employee personal details
        const employee = await pool.query('INSERT INTO employees (first_name,last_name,dob,picture,email,contact_no,address,designation,doj,active) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *', [first_name, last_name, dob, picture, email, contact_no, address, designation, doj, active]);

        //
        console.log(employee.rows[0]);

        //emp personal id
        const emp_id = employee.rows[0].id;

        //employee bank details
        const employeeBankDtls = await pool.query('INSERT INTO emp_bank_details (emp_id ,account_no ,bank_name ,branch ,ifsc_code ,pan_no) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [emp_id, account_no, bank_name, branch, ifsc_code, pan_no]);

        //
        console.log(employeeBankDtls.rows[0]);

        //employee salary details
        const employeeSalayDtls = await pool.query('INSERT INTO emp_salary_details (emp_id,basic_salary,gross_salary,total_deduction,net_salary,da_amount,ta_amount,hra_amount,tds_amount,pf_amount,epf_amount,advance_amount,da_per,ta_per,hra_per,tds_per,pf_per,epf_per,advance_per) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14,$15,$16,$17,$18,$19) RETURNING * ', [emp_id, basic_salary, gross_salary, total_deduction, net_salary, Salary.DAamt, Salary.TAamt, Salary.HRAamt, Salary.TDSamt, Salary.PFamt, Salary.EPFamt, Salary.Advanceamt, Salary.DAper, Salary.TAper, Salary.HRAper, Salary.TDSper, Salary.PFper, Salary.EPFper, Salary.Advanceper]);


    //    console.log(employeeSalayDtls.rows[0]);

        res.json({ status: true, empPerResult: employee.rows[0], empBankResult: employeeBankDtls.rows[0], empSlyResult: employeeSalayDtls.rows[0] });

    } catch (error) {
        
        res.send({ status: false, Message: error.message });
    }
}
//GET all Employee
const getEmployee = async (req, res) => {
    try {
        const EmpPersonal = await pool.query('SELECT * FROM employees ORDER BY id ASC');

        res.json({
            status: true,
            employees: EmpPersonal.rows
        })

    } catch (error) {
        return res.json({
            status: false,
            Message: error.message
        });
    }
};



//GET a single empDtls by ID
const getEmpById = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        // id not exist then
        if (!id) {
            throw new Error('Employee id not found ');
        }
        const empAllDataById = await pool.query('SELECT * FROM employees e , emp_bank_details b , emp_salary_details s WHERE e.id = $1 and b.emp_id = $1 and s.emp_id = $1', [id]);

        res.json({
            status: true,
            empById: empAllDataById.rows[0]
        });

    } catch (error) {
        return res.json({
            status: false,
            Message: error.message
        });
    }
};


//update
const updateEmp = async (req, res) => {

    const id = parseInt(req.params.id);

    //emp personal required body   //emp bank required body
    const { first_name, last_name, dob, picture, email, contact_no, address, designation, doj, active, account_no, bank_name, branch, ifsc_code, pan_no } = req.body.RectiveFormData;


    //emp salary required body
    const { basic_salary, gross_salary, total_deduction, net_salary, TAamt, TAper, TDSamt, TDSper, PFamt, EPFamt, EPFper, PFper, DAamt, DAper, Advanceamt, Advanceper, HRAamt, HRAper } = req.body.ModalFormData;
    try {
        // validation check 
        const existingData = await pool.query('SELECT email, contact_no, account_no, pan_no FROM employees e JOIN emp_bank_details eb ON e.id = eb.emp_id WHERE e.id <> $1 AND eb.emp_id <> $1;', [id]);

        let emailExists = false;
        let contact_noExists = false;
        let account_noExists = false;
        let pan_noExists = false;

        existingData.rows.forEach(data => {
            if (data.email === email) {
                emailExists = true;
            };
            if (data.contact_no === contact_no) {
                contact_noExists = true;
            };
            if (data.account_no === account_no) {
                account_noExists = true;
            };
            if (data.pan_no === pan_no) {
                pan_noExists = true;
            };
        });

        let allExistsData = {};
        if (emailExists) {
            allExistsData['exitsEmail'] = email;
        };
        if (contact_noExists) {
            allExistsData['exitsContact'] = contact_no;
        };
        if (account_noExists) {
            allExistsData['exitsA_C'] = account_no;
        };
        if (pan_noExists) {
            allExistsData['exitsPan'] = pan_no;
        };
        // if already data then error through
        if (Object.keys(allExistsData).length !== 0) {
            throw new Error(JSON.stringify(allExistsData));
        }

        empBankResultById = await pool.query('SELECT id FROM emp_bank_details WHERE emp_id = $1', [id]);
        empSalaryResultById = await pool.query('SELECT id FROM emp_salary_details WHERE emp_id = $1', [id]);
        console.log(empBankResultById.rows[0],'empBank');    
                //emp bank and salay update by use there id
                const bank_Id = empBankResultById.rows[0].id
                const salary_Id = empSalaryResultById.rows[0].id;

        empPersonalUpdate = await pool.query(
            'UPDATE employees SET first_name=$1, last_name=$2, dob=$3, email=$4, contact_no=$5, address=$6, designation=$7, doj=$8, active=$9  WHERE id = $10',
            [first_name, last_name, dob, email, contact_no, address, designation, doj, active, id],
        );

        empBankUpdate = await pool.query(
            'UPDATE emp_bank_details SET emp_id=$1, account_no=$2, bank_name=$3, branch=$4, ifsc_code=$5, pan_no=$6 WHERE id = $7',
            [id, account_no, bank_name, branch, ifsc_code, pan_no, bank_Id],
        );


        empSalaryUpdate = await pool.query(
            'UPDATE emp_salary_details SET emp_id=$1, basic_salary=$2,gross_salary=$3, total_deduction=$4, net_salary=$5,da_amount = $6,ta_amount = $7,hra_amount = $8,tds_amount = $9,pf_amount = $10,epf_amount = $11,advance_amount = $12,da_per = $13,ta_per = $14,hra_per = $15,tds_per = $16,pf_per = $17,epf_per = $18,advance_per = $19 WHERE id = $20',
            [id, basic_salary, gross_salary, total_deduction, net_salary, DAamt, TAamt, HRAamt, TDSamt, PFamt, EPFamt, Advanceamt, DAper, TAper, HRAper, TDSper, PFper, EPFper, Advanceper, salary_Id],
        );
        res.json({ status: true, Message:`Employee modified with ID: ${id}` });

    } catch (error) {
        res.send({status: false, Message: error.message });
    }
}



//DELETE a Emp


const deleteEmp = async (req, res) => {
    const id = parseInt(req.params.id)

    try {

        result1 = await pool.query('DELETE FROM emp_bank_details WHERE emp_id = $1', [id]);
        result2 = await pool.query('DELETE FROM emp_salary_details WHERE emp_id = $1', [id]);
        result3 = await pool.query('DELETE FROM employees WHERE id = $1', [id]);

        res.status(200).json(`Emp deleted with ID: ${id}`);


    } catch (error) {
        res.status(500).json({ Message: error.message });
    }

}


module.exports = {
    crtEmployee,
    getEmployee,
    getEmpById,
    updateEmp,
    deleteEmp
}