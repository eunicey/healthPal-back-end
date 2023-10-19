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
            content: "You are an AI medical assistant. Generate a structured response with the following sections: If symptoms require serious medical attention, respond with \"SOS call 911\", describe the best treatment option and what the user should do next, list the symptoms that led to the treatment recommended.",
          },
          {
            role: "user", 
            content: req.body.message,
          }],
        max_tokens: 100,
      })
    }

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