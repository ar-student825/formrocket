
export default function handler(req, res) {
  if (req.method != 'POST') {
    res.status(400).json({ error: {code: "INVALID_METHOD", data: "A method was used which is not supported."} })
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
  