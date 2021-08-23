
export default function handler(req, res) {
    const reqUserId = req.query.userid
    if (req.method != 'POST') {
      res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
    } else if (!req.body || !req.body.formName || typeof req.body.formName != 'string') {
      res.json({ error: {code: "EMPTY_REQUEST", data: "Expected formName, got null or invalid type."}})
    } else {
      res.status(200).json({
        success: true,
        data: {
          form: {
            name: req.body.formName,
            ownerId: parseInt(reqUserId),
            formId: 9999999 
          }
        }
      })
    }
  }
    