const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://arcodez:${process.env.MONGODB}@cluster0.06v7y.mongodb.net/formrocket?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
export default function handler(req, res) {
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
    res.status(200).json(user)
  }
  })
  }
}
  