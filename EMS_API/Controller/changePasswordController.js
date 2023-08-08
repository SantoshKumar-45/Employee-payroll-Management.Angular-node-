const pool = require('../Config/Connection');


const UpdatePassword = async (req, res) => {

    const { userId, oldPassword, newPassword } = req.body;
    try {
        //select user from userid 
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        const userData = user.rows[0];
        
        if (!userData) {
            throw new Error('User Not Found !')
        }
//password match
        const isMatch = oldPassword.toLowerCase() === userData.password.toLowerCase();
        if (!isMatch) {
            throw new Error('password Mismatch');
        }

//update password 
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, userId]);


        return res.status(200).json({
            status: true,
            message: `Password updated for id: ${userId}`
        });


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};




module.exports = {

    UpdatePassword

}