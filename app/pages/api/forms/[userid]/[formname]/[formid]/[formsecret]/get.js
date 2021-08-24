
export default function handler(req, res) {
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
    