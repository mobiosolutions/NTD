const chai = require("chai");
const expect = chai.expect;
chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const faker = require("faker");
const app = require("../app");
const sinon = require("sinon");
const userController = require("../app/controllers/UserController");

// user controller describe
describe("UserController", function() {
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });

  // get all user test
  describe("get all user", function() {
    // get all user test success
    it("should get all user data", async () => {
      const req = { body: {} };
      await userController.findUsers(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("all user data fetched");
    });
  });

  // get user by id test
  describe("get user by id", function() {
    // test failed if id is not provided for get user by id
    it("should not get user data if id is not provided", async () => {
      const req = { params: { id: "" } };
      await userController.findUserById(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter id");
    });

    // test failed if invalid id is provided for get user by id
    it("should not get user data if invalid id is provided", async () => {
      const req = { params: { id: "5e0ee89d8a5e1d701d6684b2" } };
      await userController.findUserById(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("no user found");
    });

    //  get user by id test success
    it("should get user data with id", async () => {
      const req = { params: { id: "5e0f347760ddf41923e63ca7" } };
      await userController.findUserById(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("user data fetched");
    });
  });

  // create user test
  describe("create user", function() {
    // test failed if username is not provided for create user
    it("should not create a user when username is not provided", async () => {
      const req = { body: { username: "" } };
      await userController.addUser(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter data");
    });

    // test failed if password is not provided for create user
    it("should not create a user when password is not provided", async () => {
      const req = { body: { password: "" } };
      await userController.addUser(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter data");
    });

    // test passed if username and password are provided for create user
    it("should create a user when username and password data are provided", async () => {
      const req = {
        body: {
          username: faker.name.firstName(),
          password: faker.name.lastName()
        }
      };
      await userController.addUser(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("user created");
    });
  });

  // test for update user
  describe("update user", function() {
    // test passed if username and name are provided for update user
    it("should update a user when username and name are provided", async () => {
      const req = {
        params: {
          id: "5e0efdd9a9606e28314e7129"
        },
        body: {
          name: faker.name.firstName(),
          username: faker.name.firstName()
        }
      };
      await userController.updateUser(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("user update successfully");
    });
  });

  // test for delete user
  describe("delete user", function() {
    // test failed if id is not provided for delete user
    it("should not delete when id is not provided", async () => {
      const req = {
        params: {
          id: ""
        }
      };
      await userController.deleteUser(req, res);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("please enter id");
    });

    // // test passed if id is provided for delete user
    // it("should delete a user when id is provided",async()=>{
    //   const req = {
    //     params:{
    //       id:"5e0f0d695402b33a66e1966e"
    //     },
    //   };
    //   await userController.deleteUser(req, res);
    //   expect(status.calledOnce).to.be.true;
    //   expect(status.args[0][0]).to.equal(200);
    //   expect(json.calledOnce).to.be.true;
    //   expect(json.args[0][0].message).to.equal("user delete successfully");
    // })
  });
});
