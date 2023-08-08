const pool = require('../Config/Connection');
const excelJS = require("exceljs");
const path = require('path');


let salaryDetailsCache;
let date;
//show attendance salary sheet by valid date(title eg.June - 2023)
const showSalarySheetByDate = async (req, res) => {

    date = req.params.title;

    try {
        const Results = await pool.query('SELECT id FROM salary WHERE title = $1', [date]);

        const salary_id = Results.rows[0].id;

        const salary_details = await pool.query('SELECT employees.id, first_name, last_name, designation, basic_salary, da, ta, hra, gross_salary, tds, pf, advance, personal_leave,sick_leave,leavewithoutpay,special_leave,present_days,total_deduction, net_salary, working_days  FROM employees INNER JOIN salary_details ON salary_details.emp_id = employees.id Where sal_id=$1 ', [salary_id]);

        salaryDetailsCache = salary_details.rows;

        res.status(200).json({ status: true, salary_details: salary_details.rows });

    } catch (error) {
        res.status(500).json({ status: false, err: error.message });
    }
}


// export/download salary sheet
const exportSalarySheet = async (req, res) => {

    try {
        // Check if salaryDetailsCache is undefined

        if (typeof salaryDetailsCache === 'undefined') {
            throw new Error('Salary details are not available');
        }

        const Data = salaryDetailsCache;

        const workbook = new excelJS.Workbook();

        const worksheet = workbook.addWorksheet('Salary Sheet', {
            headerFooter: {
                oddHeader: 'Jai Infoway Pvt Ltd',
                oddFooter: "&LPage &P of &N"
            }
        });

        worksheet.columns = [
            { header: "SNO", key: "s_no", width: 6 },
            { header: "First_name", key: "first_name", width: 15 },
            { header: "Last_name", key: "last_name", width: 10 },
            { header: "Designation", key: "designation", width: 18 },
            { header: "Basic_salary", key: "basic_salary", width: 12 },
            { header: "DA", key: "da", width: 5 },
            { header: "TA", key: "ta", width: 5 },
            { header: "HRA", key: "hra", width: 5 },
            { header: "PL", key: "personal_leave", width: 5 },
            { header: "SL", key: "sick_leave", width: 5 },
            { header: "LWP", key: "leavewithoutpay", width: 5 },
            { header: "SP", key: "special_leave", width: 5 },
            { header: "Present", key: "present_days", width: 8 },
            { header: "Gross_salary", key: "gross_salary", width: 14 },
            { header: "TDS", key: "tds", width: 5 },
            { header: "PF", key: "pf", width: 5 },
            { header: "Total_deduction", key: "total_deduction", width: 16 },
            { header: "Net_salary", key: "net_salary", width: 12 },
            { header: "Working_days", key: "working_days", width: 14 },
            
        ];

        // Add company name to the top header
        const companyNameCell = worksheet.getCell('A1');
        companyNameCell.value = 'Jai Infoway Pvt Ltd';
        companyNameCell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // White text color
        companyNameCell.alignment = { vertical: 'middle', horizontal: 'center' };
        companyNameCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00000000' }, // Black background color
        };
        worksheet.mergeCells('A1:T3');

        // Add company name to the top header
        const companyCell = worksheet.getCell('A4');
        companyCell.value = `Consolidated Salary Sheet for the Month of ${date}`;
        companyCell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // White text color
        companyCell.alignment = { vertical: 'middle', horizontal: 'center' };
        companyCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00000000' }, // Black background color
        };
        worksheet.mergeCells('A4:T6');

        // Insert a new row for column headers
        const headerRow = worksheet.getRow(7);
        headerRow.values = worksheet.columns.map((column) => column.header);
        headerRow.font = { bold: true };

        // Fill data rows
        let counter = 1;
        Data.forEach((data) => {
            data.s_no = counter;
            worksheet.addRow(data);
            counter += 1;
        });

        //for download salary Sheet

        const directoryPath = path.join(__dirname, '../files/');

        const file = 'salary.xlsx';

        await workbook.xlsx.writeFile(`${directoryPath}${file}`)
            .then(() => {
                res.download(directoryPath + file, file, (err) => {
                    if (err) {
                        res.status(500).send({
                            message: "Could not download the file. " + err.message,
                        });
                    }
                });
            });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};


module.exports = {
    exportSalarySheet,
    showSalarySheetByDate
}



