const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://arcodez:${process.env.MONGODB}@cluster0.06v7y.mongodb.net/formrocket?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
export default function handler(req, res) {
    const reqUserId = req.query.userid
    if (req.method != 'POST') {
      res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
    } else if (!req.body || !req.body.formName || typeof req.body.formName != 'string') {
      res.status(400).json({ error: {code: "INVALID_REQUEST", data: "Expected formName, got null or invalid type."}})
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
            db.set('users.'+req.query.userid, obj).then(i => {
            db.set('users.' + req.query.userid + '.forms.total', users[req.query.userid].forms.total + 1).then(o => {
            res.status(200).json(o)
            })
          })
          })
      
    }
  })
    }
  }
    