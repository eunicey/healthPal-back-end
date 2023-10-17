import { Profile } from "../models/profile.js"

const API= process.env.API_KEY
const API_URL= 'https://api.openai.com/v1/chat/completions'


async function create(req, res) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: req.body.message}],
        max_tokens: 100,
      })
    }

    const response = await fetch(`${API_URL}`, options)
    const data = await response.json()
    res.send(data)

  } catch (error){
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  create,
}