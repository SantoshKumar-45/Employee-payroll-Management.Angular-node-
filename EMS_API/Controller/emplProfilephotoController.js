


const pool = require('../Config/Connection');
const fs = require("fs");


//upload file
const upload = async (req, res) => {

  const id = parseInt(req.params.id);
  //pic upload
  const picture = req.NewFileName;

  try {
    if (picture == undefined) {
      throw new Error("please upload a file!");
    }

    UpdatePic = await pool.query('UPDATE employees SET picture=$1  WHERE id = $2', [picture, id]);

    res.status(200).send({ status: true, message: "uploaded the file succesfully:" });

  }
  catch (err) {

    res.send({
      status: false,
      message: err.message,
    });
  }

}



///edit upload image


//download/view picture
const download = async (req, res) => {
  const fileName = req.params.name;
  console.log(req.params.name);
  const directoryPath = "D:/Employee Management System/EMS_API/fileUploads/"

  await res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  download
}