const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://arcodez:${process.env.MONGODB}@cluster0.06v7y.mongodb.net/formrocket?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
export default function handler(req, res) {
  if (req.method != 'POST') {
    res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
  } else if (!req.body == {} || typeof req.body != 'object') {
    res.json({ error: {code: "INVALID_REQUEST", data: "Expected FormDataObject, got null or invalid type."}})
  } else if (!parseInt(req.query.formid)) {
    res.status(400).json({ error: {code: "INVALID_CREDENTIALS", data: "Expected valid formId, got invalid."} })
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
  