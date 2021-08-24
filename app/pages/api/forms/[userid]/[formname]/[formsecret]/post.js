const { Database } = require("quickmongo");
const db = new Database(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
export default function handler(req, res) {
  if (req.method != 'POST') {
    res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
  } else if (!req.body || typeof req.body != 'object') {
    res.json({ error: {code: "INVALID_REQUEST", data: "Expected FormDataObject, got null or invalid type."}})
  } else if (!parseInt(req.query.formsecret)) {
    res.status(400).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid formSecret, got invalid."} })
  } else {
    db.get('users.' + req.query.userid).then(i => {
      if (!i) {
        res.status(404).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid user, got invalid"}})
      } else {
    res.status(200).json({
      success: true,
      data: {
        form: {
          name: null,
          ownerId: null,
          formId: parseInt(req.query.formsecret),
          createdAt: null
        },
        postedData: req.body
      }
    })
  }
  })
  }
}
  