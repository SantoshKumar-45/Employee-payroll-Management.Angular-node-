const pool = require('../Config/Connection');

// set Salary head of Json Amount and % 
const SetsalaryHead = async (req, resp) => {
    let headdata = req.body;
    try {
        const headResult = await pool.query('Select * From salary_head ORDER BY id asc');
        if (headResult.rowCount != 0) {
            const Deletedata = await pool.query('TRUNCATE TABLE  salary_head Restart identity');
            headdata.filter(async data => {
                if (data.caption != '') {
                    const { caption, type, value, category } = data;

                    const Result = await pool.query('INSERT INTO salary_head (caption ,type, value ,category) VALUES ($1,$2,$3,$4) RETURNING * ', [caption, type, value, category],);
                }
            })
        }
        else {
            headdata.filter(async data => {
                if (data.caption != '') {
                    const { caption, type, value, category } = data;

                    const Result = await pool.query('INSERT INTO salary_head (caption ,type, value ,category) VALUES ($1,$2,$3,$4) RETURNING * ', [caption, type, value, category],);

                }

            })
        }
        resp.json({
            status: true,
            message: `Inserted Head: ${headdata.length} sets of data`,
        })
    }
    catch (err) {
        resp.status(500).json({
            status: false,
            message: err.message,
        })
    }
}
// get/salary head
const getSalaryHeadData = async (req, resp) => {
    try {
        const ResultheadData = await pool.query('SELECT * FROM salary_head  ORDER  BY id ASC');
        
        return resp.status(200).json({ heads: ResultheadData.rows });
    }
    catch (err) {
        resp.send(err.message);
    }
}



const GetSalaryData = async (req, resp) => {

    try {
        const SalryResult = await pool.query('SELECT * FROM salary ORDER  BY id ASC');
               return resp.status(200).json({ Data: SalryResult.rows[0] });
    }
    catch (err) {
        resp.send(err.message);
    }
}

module.exports = {
    SetsalaryHead,
    getSalaryHeadData,
    GetSalaryData,

};