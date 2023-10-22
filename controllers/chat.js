import { Profile } from "../models/profile.js"

const OPENAI_API_KEY= process.env.API_KEY
const OPENAI_URL= 'https://api.openai.com/v1/chat/completions'


async function getResults(req, res) {

  try {

    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: req.body.systemContent
          },
          {
            role: "user", 
            content: req.body.userContent
          }],
        // max_tokens: 100,
        temperature: 0,
      })
    }

    console.log("DATA SENT:", options)
    const apiResponse = await fetch(`${OPENAI_URL}`, options)

    const resultsData = await apiResponse.json()
    res.send(resultsData)

  } catch (error){
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  getResults,
}