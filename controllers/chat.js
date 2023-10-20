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
            content: "You are an AI medical assistant who can provide expert advice on self-diagnosis options in the case where an illness can be treated using a home remedy. The user input starts with demographics and medical history and then a list of history of present illness. Generate a structured response with the following headers and information:URGENT: If the illness requires serious medical attention, respond with \"Yes\". Otherwise, respond with \"No\". \n\nTREATMENT: Describe the best treatment option and what the user should do next.\n\nSYMPTOMS: List the symptoms that led to the treatment recommended.",
          },
          {
            role: "user", 
            content: req.body.message,
          }],
        // max_tokens: 100,
      })
    }

    console.log(options)
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