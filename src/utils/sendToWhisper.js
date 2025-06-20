import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_AI_WHISPER_API_KEY;
const sendToWhisper = async (audioBlobUrl) => {
  try {
    const response = await fetch(audioBlobUrl.blobURL);
    const audioBlob = await response.blob();
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    formData.append("language", "en");
    formData.append("temperature", "0");
    formData.append("model", "whisper-1");
    formData.append("response_format", "text"); 

    const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
    const config = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
       
      },
      withCredentials: false,
    };
    return await axios.post(apiUrl, formData, config);

    //console.log("Transcription:", res.data);
  } catch (error) {
    console.error(
      "Error sending audio to Whisper API:",
      error.response ? error.response.data : error.message
    );
  }
};
export default sendToWhisper;
