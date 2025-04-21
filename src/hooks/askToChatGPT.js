

const apiKey = import.meta.env.OPEN_AI_API_KEY;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`
}

const url = "https://api.openai.com/v1/chat/completions"

const askToChatGPT = async (currentChatGPTMessages,makeRequest) => {
  
  try {
    const json_data = {
      model: "gpt-3.5-turbo-0125",
      messages: [...currentChatGPTMessages],
      temperature: 1,
      top_p: 1,
      n: 1,
      stream: false,
      max_tokens: 1500,
      presence_penalty: 0,
      frequency_penalty: 0
    }
    await makeRequest(url, json_data, headers)
  } catch (error) {
    console.log('Something went Wrong!')
  }
}

export default askToChatGPT
