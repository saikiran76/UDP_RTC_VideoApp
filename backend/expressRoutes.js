// express stuff
const app = require('./server').app;
const jwt = require('jsonwebtoken')
const secret = "goofy###331@468998"

// this route is for us! In production, a calender/scheduling app would send this out
// we would print it out and past it in. It will drop
// us on our React site with right info for CLIENT to make an offer
app.get('/user-link', (req, res)=>{
    
    // data for the end user's appointment
    const appData = {
        professionalsName: "Ripper",
        appointmentDate: Date.now() + 500000
    }

    // we need to encode this data on a token
    // encoded data can't be muted as long as the secret is not compromised

    const token = jwt.sign(appData, secret)
    res.send("https://localhost:4000/join-video?token="+token)
 })
app.get('/test', (req, res)=>{
    res.json({"message": "this is a test server"})
    // console.log("hit")
})

app.post('/validate-link', (req, res)=>{
    // get the token from the body of the post request ( thanks to express.json())
    const token = req.body.token;
    const decodedData = jwt.verify(token, secret)
    // send the decode part back to frontend
    res.json(decodedData)
})