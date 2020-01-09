const chai = require("chai");
const expect = chai.expect;
chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const should = chai.should();
const sinon = require("sinon");
const userController = require("../app/controllers/UserController");

// user controller
describe("UserController", function() {
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });

  // forget passwords
  describe("Forget Password", function() {
    // test failed if username is not provded for forget password
    it("should not request for forget password when username is not provided", async () => {
      const req = { body: { username: "" } };
      await userController.forgetPassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter username");
    });

    // test passed if username is provded for forget password
    it("should forget password request work when username is provided", async () => {
      const req = { body: { username: "admin" } };
      await userController.forgetPassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("reset password mail sent");
    });
  });

  // reset password
  describe("Reset Password", function() {
    // test failed if username is not provded for reset password
    it("should not request for reset password when username is not provided", async () => {
      const req = { body: { username: "" } };
      await userController.resetPassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal(
        "please enter username and password"
      );
    });

    // test failed if password is not provded for reset password
    it("should not request for reset password when password is not provided", async () => {
      const req = { body: { password: "" } };
      await userController.resetPassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal(
        "please enter username and password"
      );
    });

    // test passed if username and password are provded for reset password
    it("should reset password request work when username and password is provided", async () => {
      const req = {
        body: {
          username: "admin",
          password: "admin"
        }
      };
      await userController.resetPassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("password reset successfully");
    });
  });

  // change password
  describe("Change Password", function() {
    // test failed if id is not provded for change password
    it("should not request for change password when id is not provided", async () => {
      const req = {
        body: { id: "", old_password: "admin", new_password: "admin" }
      };
      await userController.changePassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter id and password");
    });

    // test failed if old password is not provded for change password
    it("should not request for change password when old password is not provided", async () => {
      const req = {
        body: {
          id: "5e0f18d760ddf41923e63ca6",
          old_password: "",
          new_password: "admin"
        }
      };
      await userController.changePassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter id and password");
    });

    // test failed if new password is not provded for change password
    it("should not request for change password when new password is not provided", async () => {
      const req = {
        body: {
          id: "5e0f18d760ddf41923e63ca6",
          old_password: "admin",
          new_password: ""
        }
      };
      await userController.changePassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter id and password");
    });

    // test passed if new password and old password are provded for change password
    it("should change password request work when old password and new password is provided", async () => {
      const req = {
        body: {
          id: "5e0f347760ddf41923e63ca7",
          old_password: "admin",
          new_password: "admin"
        }
      };
      await userController.changePassword(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("password changed");
    });
  });

  // file upload
  describe("File Upload", function() {
    // test failed if file is not provded for file upload
    it("should not request for file upload when file is not provided", async () => {
      const req = {
        file: { filename: "" }
      };
      await userController.fileUpload(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("select file");
    });

    // test passed if file is provded for file upload
    it("should upload file request work when file is provided", async () => {
      const req = {
        file: { filename: "cctv.jpg" }
      };
      await userController.fileUpload(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("file uploaded");
    });
  });

  // generate excel file
  describe("Generate Excel", function() {
    // test passed if excel generate
    it("should generate excel", async () => {
      const req = {};
      await userController.generateExcel(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("excel generated");
    });
  });
});
