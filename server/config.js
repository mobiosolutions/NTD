var config = {};

config.mongoURI = {
  'database':'mongodb://localhost/testcase',
  'privateKey': 'bch97crDcfiAzk0AMpZkrGn4EJDpbA5pGPQ4ZWPGIbQ' || process.env.VAPID_PRIVATE_KEY,
  'publicKey': 'BGoTEisIVThppX4f4MsLQgeDrwVxUF3bHkCX8AnNELcvDmXks7YSgh6nIT--rfIUyoV3Dk9_MUEhBcR6K8qLfD0' || process.env.VAPID_PUBLIC_KEY
};

module.exports = config;