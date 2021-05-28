const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "v9r2ttc26w9hrgcd",
  publicKey: "7wtb68jqcch7hyq4",
  privateKey: "04a08e706f1ffa9fbab3d6ffbc0ad537",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response){
    // pass clientToken to your front-end
    if (err) {
      res.status(200).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    }
  );
};
