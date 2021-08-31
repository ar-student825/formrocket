const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://arcodez:${process.env.MONGODB}@cluster0.06v7y.mongodb.net/formrocket?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
import Cors from 'cors'
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
  origin: ["https://3000-kumquat-orca-okj4ogpq.ws-us15.gitpod.io", "https://gui.formrocket.me"]
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method != 'POST') {
    res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
  } else if (req.body == {} || typeof req.body != 'object') {
    res.json({ error: {code: "INVALID_REQUEST", data: "Expected FormDataObject, got null or invalid type."}})
  } else if (!parseInt(req.query.formid)) {
    res.status(400).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid formId, got invalid."} })
  }
    else {
    db.get('users').then(users => {
      if (!users || !users[req.query.userid]) {
        res.status(404).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid user, got invalid"}})
      } else if (!users[req.query.userid].forms.all.filter(i => i.formId == req.query.formid).length == 1 || !users[req.query.userid].forms.all.filter(i => i.name == req.query.formname).length == 1) {
        res.status(401).json({ error: {code: "INVALID_FORM", data: "Expected valid formId and / or formName, got invalid"}})
      }
      else {
        var x = users[req.query.userid].forms.all
        x.filter(i => i.formId == req.query.formid)[0].responses.all.push({data: req.body, id: Math.floor(Math.random() * 999999)})
        db.set(`users.${req.query.userid}.forms.all`, x).then(r => {
          db.set(`users`, r).then(j => {
            try {
              res.redirect(`https://ondone.formrocket.me/success${req.query.message != undefined ? "/?message=" + req.query.message : ""}`)
            } catch {
                res.json({warning: {code: "SUBMITTED_AND_REDIRECT_FAILED", data: "Expected to redirect to url after submitting, failed to redirect, but submitted form successfully"}})
            }
          })
        })
        }        
  })
  }
  }
  