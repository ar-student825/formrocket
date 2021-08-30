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
    if (req.method != 'GET') {
      res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
    } else if (!parseInt(req.query.formsecret) || !parseInt(req.query.formid) || !parseInt(req.query.userid)) {
      res.status(400).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected Number for formSecret, formId, and userId, got Other."} })
    } else {
      db.get('users').then(users => {
      if (!users || !users[req.query.userid]) {
        res.status(404).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid user, got invalid"}})
      }
      else if (!users[req.query.userid].forms.all.filter(i => i.formId == req.query.formid).length == 1 || !users[req.query.userid].forms.all.filter(i => i.name == req.query.formname).length == 1 || !users[req.query.userid].forms.all.filter(i => i.formId == req.query.formid)[0].formSecret == req.query.formsecret) {
        res.status(401).json({ error: {code: "INVALID_FORM", data: "Expected valid formId, formSecret and / or formName, got invalid"}})
      } else {
      res.status(200).json(users[req.query.userid].forms.all.filter(i => i.formId == req.query.formid)[0])
    }
  })
  }
}
    