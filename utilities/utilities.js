var jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(
    keysto.web.client_id,
    keysto.web.client_secret,
    keysto.web.redirect_uris[0]);
    
const generateToken = (user_info, callback) => {
    let secret = process.env.SECRET; 
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return callback(token); 
}

const validateToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    }
    let secret = process.env.SECRET; 
    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        if(error) {
            return callback(false);
        } else {
            return callback(true)
        }
    })
}
const verify = (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience:  keysto.client_id, 
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(userid);
}

const exceptions = ['/', '/login', '/register'] //todas estas rotas, não é preciso token/login

exports.generateToken = generateToken
exports.validateToken = validateToken
exports.exceptions = exceptions
exports.verify = verify