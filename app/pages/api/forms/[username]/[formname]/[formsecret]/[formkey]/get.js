
export default function handler(req, res) {
    if (req.method != 'GET') {
      res.status(400).json({ error: {code: "INVALID_METHOD", data: "Expected method POST, got " + req.method + "."} })
    } else {
      res.status(200).json({
        success: true,
        data: {
          form: {
            name: null,
            owner: null,
            responses: {
                total: 0,
                all: []
            }
          },
          postedData: null
        }
      })
    }
  
    }
    