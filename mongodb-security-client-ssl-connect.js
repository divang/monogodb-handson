console.log("Starting MongoDB Client ... ")
var fs = require('fs')
      , mongoose = require('mongoose')
      , mongoUri = "mongodb://localhost:27017?ssl=true"
      , mongoOpt = {
	  "useNewUrlParser": true,
          "sslValidate": false,
	  "authenticationDatabase": "$external",
	  "authenticationMechanism":"MONGODB-X509",
          "sslKey": fs.readFileSync('/etc/ssl-certs/clientKey.pem'),
          "sslCert": fs.readFileSync('/etc/ssl-certs/clientKey.pem'),
	  "sslCA": fs.readFileSync('/etc/ssl-certs/ca-crt.pem')
        }
      ;

mongoose.connect(mongoUri, mongoOpt);

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});
