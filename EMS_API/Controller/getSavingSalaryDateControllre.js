const pool = require('../Config/Connection');


const getSalarySavingDate = async (req, res) => {
    try {
        const salarySaveDate =await pool.query('select date ,title from salary');

        if(!salarySaveDate){
            throw new Error('date are not exists');
        }

        res.status(200).json({
            salarySaveDate:  salarySaveDate.rows
        })

    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}
module.exports={
    getSalarySavingDate
}