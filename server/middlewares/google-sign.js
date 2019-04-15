module.exports = {
    googleVerify (req,res,next) {
        console.log("masuk verify")
        const CLIENT_ID = process.env.CLIENT_ID
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);

        client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID, 
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            // console.log("------ payload")
            // console.log(payload)
            req.payload = payload
            next()
        })
        .catch(err => {
            res.status(400).json("error in google verify - server")
        })
    }
}