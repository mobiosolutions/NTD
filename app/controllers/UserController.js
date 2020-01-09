const Users = require("../models/users");
const FileUpload = require("../models/file");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const excel = require("exceljs");

// login user
exports.login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "please enter data" });
    } else {
      detail = await Users.findOne({ username: req.body.username });
      let passwordCheck = bcrypt.compareSync(
        req.body.password,
        detail.password
      );
      if (passwordCheck) {
        let token = jwt.sign({ _id: detail._id }, "supersecret", {
          expiresIn: 86400
        });
        if (token) {
          res
            .status(200)
            .json({ token: token, data: detail, message: "login success" });
        }
      } else {
        res
          .status(200)
          .json({ token: null, data: null, message: "login failed" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// signup user
exports.signup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "please enter data" });
    } else {
      let data = {
        name: req.body.name,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
      };

      let newUser = new Users({
        name: data.name,
        username: data.username,
        password: data.password
      });

      let saved = await newUser.save();
      if (saved) {
        res.status(201).json({ data: saved });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// change password for user
exports.changePassword = async (req, res) => {
  try {
    if (!req.body.old_password || !req.body.new_password || !req.body.id) {
      res.status(400).json({ message: "please enter id and password" });
    } else {
      let password = await bcrypt.hash(req.body.new_password, 10);
      let detail = await Users.findOne({ _id: req.body.id });
      let passwordCheck = bcrypt.compareSync(
        req.body.old_password,
        detail.password
      );
      let updatePassword;
      if (passwordCheck) {
        updatePassword = await Users.updateOne(
          { _id: req.body.id },
          { $set: { password: password } }
        );
      }
      res
        .status(200)
        .json({ data: updatePassword, message: "password changed" });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// forget password
exports.forgetPassword = async (req, res) => {
  try {
    const sendmail = require("sendmail")({
      devPort: 3000,
      devHost: "localhost"
    });

    if (!req.body.username) {
      res.status(400).json({ message: "please enter username" });
    } else {
      let username = req.body.username;
      let exists = await Users.findOne({ username: username });
      if (exists) {
        let mailOptions = {
          from: '"<abc>" jigard.mobio@gmail.com',
          to: "jigard.mobio@gmail.com",
          subject: "Reset your account password",
          html:
            "<h4><b>Reset Password</b></h4>" +
            "<p>reset your password</p>" +
            '<a href="http://localhost:3000/users/resetPassword">reset</a>' +
            "<br><br>"
        };
        let mailSent = sendmail(mailOptions);
        res
          .status(200)
          .json({ data: mailSent, message: "reset password mail sent" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "please enter username and password" });
    } else {
      let username = req.body.username;
      let exists = await Users.findOne({ username: username });
      if (exists) {
        let password = await bcrypt.hash(req.body.password, 10);
        let reseted = (updatePassword = await Users.updateOne(
          { _id: exists.id },
          { $set: { password: password } }
        ));
        res.status(200).json({ message: "password reset successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// file upload
exports.fileUpload = async (req, res) => {
  try {
    if (!req.file.filename) {
      res.status(400).json({ message: "select file" });
    } else {
      let image = req.file.filename;
      let upload = new FileUpload({
        file: image
      });
      let uploaded = upload.save();
      res.status(200).json({ data: uploaded, message: "file uploaded" });
    }
  } catch (error) {
    console.log(error);
  }
};

// generate excel
exports.generateExcel = async (req, res) => {
  try {
    let users = await Users.find({});

    var workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet("Sheet 1");
    worksheet.columns = [
      { header: "Name", key: "name" },
      { header: "Username", key: "username" }
    ];
    users.forEach(element => {
      worksheet.addRow({ name: element.name, username: element.username });
    });
    workbook.xlsx.writeFile("./temp.xlsx");
    res.status(200).json({ message: "excel generated" });
  } catch (error) {
    console.log(error);
  }
};

// find user by id
exports.findUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "please enter id" });
    } else {
      let id = req.params.id;
      let getUser = await Users.findById(id);
      if (getUser) {
        res.status(200).json({ data: getUser, message: "user data fetched" });
      } else {
        res.status(404).json({ data: getUser, message: "no user found" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// find all users
exports.findUsers = async (req, res) => {
  try {
    let getUser = await Users.find({});
    if (getUser) {
      res.status(200).json({ data: getUser, message: "all user data fetched" });
    }
  } catch (error) {
    console.log(error);
  }
};

// create user
exports.addUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "please enter data" });
    } else {
      let data = {
        name: req.body.name,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
      };

      let newUser = new Users({
        name: data.name,
        username: data.username,
        password: data.password
      });

      let saved = await newUser.save();
      if (saved) {
        res.status(201).json({ Success: saved, message: "user created" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// update user detail
exports.updateUser = async (req, res) => {
  try {
    let dataUpdate = {
      name: req.body.name,
      username: req.body.username
    };

    let updated = await Users.updateOne(
      { _id: req.params.id },
      { $set: dataUpdate }
    );
    if (updated) {
      res
        .status(200)
        .json({ data: updated, message: "user update successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "please enter id" });
    } else {
      let deleted = await Users.findOneAndDelete(req.params.id);
      if (deleted) {
        res
          .status(200)
          .json({ data: deleted, message: "user delete successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
