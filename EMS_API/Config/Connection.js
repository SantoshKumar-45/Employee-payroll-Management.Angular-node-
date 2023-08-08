const {Pool}= require('pg');
 const pool=new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Postgre@123',
    database: 'employee_details',
    port: '5432'
 })

// const pool=new Pool({
//    host: 'localhost',
//    user: process.env.Db_user,
//    password: process.env.Db_password,
//    database: process.env.database_nm,
//    port: process.env.Db_port
// })


 pool.connect()
 .then(()=> console.log('Database Connected'))
 .catch((err)=>{ console.log(`Database Connection failed ${err.message}`)});
 module.exports=pool;

