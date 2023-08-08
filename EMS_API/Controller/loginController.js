const pool = require('../Config/Connection');
const jwt = require('jsonwebtoken');
const UsersSign = async (req, resp) => {
    const { username, password } = req.body;
    console.log(req.body.username);
    try {
        if (req.body.username && req.body.password) {
            const admin = await pool.query('Select * from users WHERE Lower(username)= $1', [username.toLowerCase()]);
            console.log('sss', admin.rows[0]);
            if (admin.rows.length === 0) {
                throw new Error('username is inCorrect');
            }

            // compare password
            var IsvalidPassword=( password === admin.rows[0].password)

            if (!IsvalidPassword) {
                throw new Error("Invalid Password");
            }
            const adminId = admin.rows[0].id;
            // FirstLy generate Access token 
            var Accesstoken = jwt.sign({ id: adminId }, process.env.ACCESS_SECRET_KEY, {
                // expiresIn: '5h'  // 1
            })


            return resp.status(200).json({
                message: 'login Successfully',
                id:adminId,
                accessToken:Accesstoken,
                
            });
        }
        else {
            return resp.json({ message: "Invalid Credentials!" });
        }

    }
    catch (err) {
        resp.status(500).json({ Message: err.message });
    }
}



module.exports = {
    UsersSign
};


