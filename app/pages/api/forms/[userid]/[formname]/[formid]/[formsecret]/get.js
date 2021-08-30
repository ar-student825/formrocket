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
    } else if (!parseInt(req.query.formsecret) || !parseInt(req.query.formid)) {
      res.status(400).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid formSecret and formKey, got invalid."} })
    } else {
      res.status(200).json({
        success: true,
        data: {
          form: {
            name: null,
            ownerId: null,
            formId: parseInt(req.query.formid),
            formSecret: parseInt(req.query.formsecret),
            createdAt: null,
            responses: {
                total: 1,
                all: [
                    {
                        id: "8f514ec8-4e5c-45d9-a731-7902586ed55a",
                        data: {
                            "myInput": "myValue"
                        }
                    }
                ]
            }
          },
          postedData: null
        }
      })
    }
}
    