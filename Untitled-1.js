const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const router = express.Router();
const emailValidator = require('deep-email-validator');

const app = express();

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8')

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Hello there !');
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

async function isEmailValid(email) {
 return emailValidator.validate(email)
}

router.get('/', async function(req, res, next) {
  return res.status(200).send({
    message: "api running"
  })

});

router.get('/register', async function(req, res) {
    const {email} = req.query;
    console.log(email)
  
    const {valid, reason, validators} = await isEmailValid(email);
  
    if (valid) return res.send({message: "OK"});
  
    return res.status(400).send({
      message: "Please provide a valid email address.",
      reason: validators[reason].reason
    })
  
  });

  const app = express();
  app.use(router)
  app.listen(8000,()=>console.log("server running on port 8000"))
