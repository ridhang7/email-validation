const express = require('express');
const router = express.Router();
const emailValidator = require('deep-email-validator');

const app = express();

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
 app.listen(80,()=>console.log("server running on port 80"))
