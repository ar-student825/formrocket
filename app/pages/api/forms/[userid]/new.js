const { Database } = require("quickmongo");
import { getSession } from 'next-auth/client'
import Cors from 'cors'
const db = new Database(`mongodb+srv://arcodez:${process.env.MONGODB}@cluster0.06v7y.mongodb.net/formrocket?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })




// Initializing the cors middleware
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
  const session = await getSession({ req })
    const reqUserId = req.query.userid
    if (req.method != 'POST') {
      res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
    } else if (!req.body || !req.body.formName || typeof req.body.formName != 'string') {
      res.status(400).json({ error: {code: "INVALID_REQUEST", data: "Expected formName, got null or invalid type."}})
    } else if (!session || session.user.image.replace('https://avatars.githubusercontent.com/u/','').split('?')[0] != req.query.userid) {
      res.status(401).json({ error: {code: "UNAUTHORIZED", message: "Expected target userId to be the same as userId of the logged in user, got different or null due to not being logged in."}})
    } else {
      db.get('users').then(users => {
        if (!users[req.query.userid]) {
          res.status(404).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid user, got invalid"}})
        } else {
          var formId = Math.floor(Math.random() * 99999999)
          var formSecret = Math.floor(Math.random() * 99999999)
          db.push('users.' + req.query.userid + '.forms.all', {
            name: req.body.formName,
            ownerId: req.query.userid,
            formId: formId,
            formSecret: formSecret,
            createdAt: +Date.now(),
            responses: {
                total: 0,
                all: []
            }
          }).then(obj => {
            db.set('users', obj).then(i => {
            res.status(200).json({"success": true, "data": {"allForms": obj[req.query.userid.toString()].forms.all}})
          })
          })
      
    }
  })
    }
  }
    