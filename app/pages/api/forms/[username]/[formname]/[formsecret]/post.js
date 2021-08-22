
export default function handler(req, res) {
  if (req.method != 'POST') {
    res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
  } else if (!req.body) {
    res.json({ error: {code: "EMPTY_REQUEST", data: "Expected FormDataObject, got null."}})
  } else {
    res.status(200).json({
      success: true,
      data: {
        form: {
          name: null,
          owner: null
        },
        postedData: req.body
      }
    })
  }
}
  