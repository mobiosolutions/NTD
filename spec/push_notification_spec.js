const chai = require("chai");
const expect = chai.expect;
chaiHTTP = require("chai-http");
chai.use(chaiHTTP);
const should = chai.should();
const PushNotifications = require("../app/push-notification");
const SendNotificationController = require("../app/controllers/SendNotification");
const Users = require("../app/models/users");
const sinon = require("sinon");

// push notification
describe("PushNotifications", () => {
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });
  afterEach(async () => {
    Users.deleteOne({});
  });

  // test for accept valid parameters
  it("should accept valid parameters", () => {
    new PushNotifications({
      instanceId: "12345",
      secretKey: "12345"
    });
  });

  // test fail if no options passed
  it("should fail if no options passed", () => {
    expect(() => PushNotifications()).throw(
      "PushNotifications options object is required"
    );
    expect(() => PushNotifications(null)).throw(
      "PushNotifications options object is required"
    );
  });

  // test fail if no instanceId passed
  it("should fail if no instanceId passed", () => {
    expect(() => PushNotifications({ secretKey: "1234" })).throw(
      '"instanceId" is required in PushNotifications options'
    );
  });

  // test fail if no secretKey passed
  it("should fail if no secretKey passed", () => {
    expect(() => PushNotifications({ instanceId: "1234" })).throw(
      '"secretKey" is required in PushNotifications options'
    );
  });

  // test fail if instanceId is not a string
  it("should fail if instanceId is not a string", () => {
    expect(() =>
      PushNotifications({ instanceId: false, secretKey: "1234" })
    ).throw();
  });

  // test fail if secretKey is not a string
  it("should fail if secretKey is not a string", () => {
    expect(() =>
      PushNotifications({ instanceId: "1234", secretKey: false })
    ).throw();
  });

  // test fail if endpoint is not a string
  it("should fail if endpoint is not a string", () => {
    expect(() =>
      PushNotifications({
        instanceId: "1234",
        secretKey: "1234",
        endpoint: false
      })
    ).throw();
  });

  // test set endpoint to the correct default
  it("should set endpoint to the correct default", () => {
    const pn = new PushNotifications({
      instanceId: "INSTANCE_ID",
      secretKey: "1234"
    });
    expect(pn.endpoint).equal("INSTANCE_ID.pushnotifications.pusher.com");
  });

  // test send web notification success
  it("should send web notification success", () => {
    const req = { body: {} };
    SendNotificationController.sendNotification(req, res);
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(200);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].message).to.equal("notification sent");
  });

  // test send android notification success
  it("should send android notification success", () => {
    const req = { body: {} };
    SendNotificationController.sendNotificationToDevice(req, res);
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(200);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].message).to.equal("notification sent to device");
  });
});
