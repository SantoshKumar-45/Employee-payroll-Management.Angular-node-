
const pool = require('../Config/Connection');
const excelJS = require("exceljs");
const Path = require('path');

const pdf = require('html-pdf');

//hepher function disbursement report
const { disbursementReportPdf } = require('../helpher/disbursement_report.js');

// employee disbursement report date wise  
let tempdisbursementdata;
let title;

const getdis_ReportbyTitle = async (req, res) => {
    const sal_Title = req.query.title;

    // use for show disbursemnt report 
    title = req.query.title;
    try {
        if (!sal_Title) {
            throw new Error('Please provide Sal_title..')
        }
        const disbursementDetails = await pool.query('SELECT employees.id, first_name, last_name,account_no,title,net_salary  FROM employees INNER JOIN salary_details ON salary_details.emp_id = employees.id INNER JOIN emp_bank_details ON emp_bank_details.emp_id=employees.id Where title=$1', [sal_Title]);

        if (!disbursementDetails.rows) {
            throw new Error('Result Not Found');
        }
        // Assign data to temp disbursement variable
        tempdisbursementdata = disbursementDetails.rows;


        return res.status(200).json({
            emplReport: disbursementDetails.rows
        })


    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }

}



//export disbursement report title
const exportdisbursementReportbyTitle = async (req, res) => {
    try {
        // Check if salaryDetailsCache is undefined
        if (typeof tempdisbursementdata === 'undefined') {
            throw new Error('Disbursemnet Report are not available');
        }
        // create a excel sheet
        const workbook = new excelJS.Workbook();

        const worksheet = workbook.addWorksheet('DisbursementReport', {
            headerFooter: {
                oddHeader: 'Jai Infoway Pvt Ltd',
                oddFooter: "&LPage &P of &N"
            }
        });


        // disbursement columns ---
        worksheet.columns = [
            { header: "Sno.", key: "s_no", width: 8 },
            { header: "Name Of The Employee", key: "full_name", width: 25 },
            { header: "Account_no", key: "account_no", width: 20 },
            { header: "Amount", key: "net_salary", width: 15 }
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
        worksheet.mergeCells('A1:D1');

        // Add company name to the top header
        const companyCell = worksheet.getCell('A2');
        companyCell.value = `Consolidated Disbursement Report for the Month of ${title}`;
        companyCell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // White text color
        companyCell.alignment = { vertical: 'middle', horizontal: 'center' };
        companyCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00000000' }, // Black background color
        };
        worksheet.mergeCells('A2:D2');


        // Insert a new row for column headers
        const headerRow = worksheet.getRow(4);
        headerRow.values = worksheet.columns.map((column) => column.header);
        headerRow.font = { bold: true };

        // Set background color for specific columns
        const pinkColor = 'FFFF99CC'; // Pink background color
        const columnsWithPinkBackground = ['A', 'B', 'C', 'D']; // Specify the columns

        headerRow.eachCell((cell, colNumber) => {
            if (columnsWithPinkBackground.includes(cell.address.substring(0, 1))) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: pinkColor },
                };
            }
        });
        // Fill data rows
        let counter = 1;
        tempdisbursementdata.forEach((data) => {
            data.s_no = counter;
            data.full_name = data.first_name + ' ' + data.last_name; // Concatenate first name and last name
            worksheet.addRow(data);
            counter += 1;
        });
        //center align data
        worksheet.eachRow({ includeEmpty: true }, (row) => {
            row.alignment = { vertical: 'middle', horizontal: 'center' };
        });


        const directoryPath = Path.join(__dirname, '../files/');

        const file = 'disbursementReport.xlsx';

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

    }

    catch (err) {
        res.json({
            status: false,
            message: err.message
        })
    }
}

//download pdf file in disbursement report
const downloadPdfDisbursement = async (req, resp) => {
    try {

        // check if exists data or not
        if (typeof tempdisbursementdata === 'undefined') {
            throw new Error('Disbursemnet Report Data are not available');
        }

        const options = { format: 'Letter' };
        const emp_disbursementReport = await disbursementReportPdf(title);

        const dirPath = Path.join(__dirname, '../pdf_files/disbursementReport.pdf'); // Set the desired file path for saving the PDF

        // html pdf creator to create pdf
        pdf.create(emp_disbursementReport.toString(), options).toFile(dirPath, function (err, res) {
            if (err) {
                throw new Error(err.message);
            } else {
                // Send the PDF file as a response for download
                resp.download(dirPath, 'disbursementReport.pdf', function (err) {
                    if (err) {
                        resp.status(500).send({
                            message: "Could not download the file. " + err.message
                        });
                    }
                });
            }
        });
    } catch (err) {
        resp.json({
            status: false,
            message: err.message
        });
    }
};



module.exports = {
    getdis_ReportbyTitle,
    exportdisbursementReportbyTitle,
    downloadPdfDisbursement
}