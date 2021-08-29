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
  } else {

    db.get('users').then(users => {
      if (!users || !users[req.query.userid]) {
        res.status(404).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid user, got invalid"}})
      } else {
    res.status(200).json({
      success: true,
      data: {
        form: {
          name: null,
          ownerId: null,
          formId: parseInt(req.query.formid),
          createdAt: null
        },
        postedData: req.body
      }
    })
  }
  })
  }
}
  