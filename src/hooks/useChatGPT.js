import { useEffect, useState } from "react";
import askToChatGPT from "./askToChatGPT";
import axiosChatGPT from "../utils/axiosChatGPT";

export const useChatGPT = ({ prompt,customSetState,input }) => {
  const [chatGPTMessages, setChatGPTMessages] = useState([prompt]);
  const { makeRequest, data, loading, error }= axiosChatGPT()

  const checkForEmptyUserMessages = () =>
    chatGPTMessages.findIndex((message) => message.role === "user") !== -1;

  useEffect(()=>{
    const userMessages = checkForEmptyUserMessages();
    if (!userMessages) return;
    askToChatGPT(input,makeRequest)
  },[input])

  useEffect(() => {
    askToChatGPT(chatGPTMessages,makeRequest);
  }, [chatGPTMessages]);

  const checkForRateLimit = (error) =>
    error.response?.status === 429 &&
    console.log(
      "You are making too many requests. Please try again in 30 seconds."
    );
    useEffect(() => {
      if (!data) return
      customSetState(data)
    }, [data])

    useEffect(() => {
      if (!error) return
      checkForRateLimit(error)
    }, [error])

  // const addChatGPTMessage = (newMessage) => {
  //   setChatGPTMessages([...chatGPTMessages, newMessage]);
  // };

  // return { addChatGPTMessage };
};
