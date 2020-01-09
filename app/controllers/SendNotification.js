const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const push = require("web-push");

// send web notification
exports.sendNotification = async (req, res) => {
  try {
    let vapidKeys = {
      publicKey:
        "BFn5dSg2c9gpSCJOQMm11mVWJ8MENy89Cb5wHx00tfhASWiEaFnWfcLJ7PSXJCMuEnRGm0iRjyU4u27K1SWVCKM",
      privateKey: "_3wS1FNk3maEldFHin10aWOzdzYvN-hb25G4AA28z14"
    };

    push.setVapidDetails(
      "mailto:test@gmail.com",
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );
    let sub = {
      endpoint:
        "https://fcm.googleapis.com/fcm/send/eACGt3x_V5c:APA91bFU1DQytiMEE5Ubp8QVSk976XXlINSSD6bgLSjDzzpjommEkqrG6erx6y4VG0bdlu-MlHWU08qOiUlXSadJttJCPpK4h4ymh1PXoiEHX9TN2SbZmJ4jdEt_Gd08JJRsXrD08FQd",
      expirationTime: null,
      keys: {
        p256dh:
          "BNKFBeIrJzJEQfOGNwsi6AW9LYd_t0Io7KoKMiwt1ghgjmHm-547NJFAoHklafiyS1TiTijkxzWeZOvXQscHGHY",
        auth: "Dtw7VYlny9r63DoUJX5pRQ"
      }
    };

    let sent = push.sendNotification(sub, "test message");
    if (sent) {
      res.status(200).json({ message: "notification sent" });
    }
  } catch (error) {
    console.log(error);
  }
};

// send android ios notification
exports.sendNotificationToDevice = async (req, res) => {
  try {
    let admin = require("firebase-admin");
    let serviceAccount = require("../../push-notification-demo-d2110-firebase-adminsdk-ly1ae-b3a3ebeec7.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://push-notification-demo-d2110.firebaseio.com"
    });

    let registrationToken =
      "d04fGx0SURQ:APA91bHkwvFNyqhm5PdrmTHe12pkDQ2W2AHM7U-XyEdL2w_-iTWszz1sMVWiX4nJ_f2-SKxENwvYAb90R57oL0z2fT35VCJkqD_cnF3lARtXr9vPsH5hiKNyK5iUXnB7HQDLF_Z4hGEz";

    var payload = {
      notification: {
        title: "title",
        body: "body"
      }
    };
    var options = {
      priority: "normal",
      timeToLive: 60 * 60
    };

    let sent = admin
      .messaging()
      .sendToDevice(registrationToken, payload, options)

      .then(function(response) {
        console.log("Successfully sent message:");
      })
      .catch(function(error) {
        console.log("Error sending message:");
      });
    if (sent) {
      res.status(200).json({ message: "notification sent to device" });
    }
  } catch (error) {
    console.log(error);
  }
};
