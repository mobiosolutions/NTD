const chai = require("chai");
const expect = chai.expect;
chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const should = chai.should();
const faker = require("faker");
const sinon = require("sinon");
const userController = require("../app/controllers/UserController");

// usercontroller for login and signup
describe("UserController", function() {
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });

  // register user
  describe("register", function() {
    // test failed if username is not provided for register user
    it("should not register a user when username is not provided", async () => {
      const req = { body: { username: "" } };
      await userController.signup(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter data");
    });

    // test failed if password is not provided for register user
    it("should not register a user when password is not provided", async () => {
      const req = { body: { password: "" } };
      await userController.signup(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter data");
    });

    // test passed if username and password are provided for register user
    it("should register a user when username and password data are provided", async () => {
      const req = {
        body: {
          username: faker.name.firstName(),
          password: faker.name.lastName()
        }
      };
      await userController.signup(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
    });
  });

  // login user
  describe("Login", function() {
    // test failed if username is not provided for login user
    it("should not login a user when username is not provided", async () => {
      const req = { body: { username: "" } };
      await userController.login(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter data");
    });

    // test failed if password is not provided for login user
    it("should not login a user when password is not provided", async () => {
      const req = { body: { password: "" } };
      await userController.login(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter data");
    });

    // test passed if username and password are provided for login user
    it("should login a user when username and password are provided", async () => {
      const req = { body: { username: "admin", password: "admin" } };
      await userController.login(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("login success");
    });
  });
});
