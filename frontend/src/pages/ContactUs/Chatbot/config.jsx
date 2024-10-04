import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  botName: "FAQBot",
  initialMessages: [
    createChatBotMessage("Welcome to our FAQ section! Type 'FAQ' to see the list of questions."),
  ],
  actionProvider: ActionProvider,
  messageParser: MessageParser,

};

export default config;
