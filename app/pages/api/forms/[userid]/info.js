const { Database } = require("quickmongo");
import { getSession } from 'next-auth/client'
import Cors from 'cors'
const db = new Database(`mongodb+srv://arcodez:${process.env.MONGODB}@cluster0.06v7y.mongodb.net/formrocket?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })



// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
  origin: ["https://3000-kumquat-orca-okj4ogpq.ws-us15.gitpod.io/*", "https://gui.formrocket.me/*"]
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
  if (req.method != 'GET') {
    res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method GET, got " + req.method + "."} })
  } else {
    db.get('users.' + req.query.userid).then(user => {
      if (!user) {
        res.status(404).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid user, got invalid"}})
      } else {
        /*
        db.set('users.74219764', {
      name: "AR",
      image: "https://avatars.githubusercontent.com/u/74219764?v=4",
      id: 74219764,
      createdAt: +Date.now(),
      forms: {
        total: 0,
        all: []
      }
    })
        */
    res.status(200).json({name: user.name, image: user.image, id: user.id, createdAt: user.createdAt, forms: (session && session.user.image.replace('https://avatars.githubusercontent.com/u/','').split('?')[0] == user.id) ? user.forms : "UNAUTHORIZED"})
  }
  })
  }
}
  