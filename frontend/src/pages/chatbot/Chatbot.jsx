import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Post from './Post'; // Ensure Post is defined and imported correctly
import Link from './Link'; // Ensure Link is defined and imported correctly
import '../../App.css'; // Make sure the path is correct

// Theme for chatbot
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#0f4d4a',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#0f4d4a',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

// Configuration for the chatbot
const config = {
  width: '300px',
  height: '400px',
  hideUserAvatar: true,
  placeholder: 'Type your response.',
  headerTitle: 'ChatBot',
};

const Chatbot = (props) => {
  let [showChat, setShowChat] = useState(true);

  const startChat = () => {
    setShowChat(true);
  };

  const hideChat = () => {
    setShowChat(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
  {showChat ? (
    <ChatBot
      speechSynthesis={{ enable: true, lang: 'en-US' }}
      recognitionEnable={true}
      steps={[
        {
          id: 'welcome',
          message: 'Hello! Welcome to NatureHug!',
          trigger: 'q-firstname',
        },
        {
          id: 'q-firstname',
          message: 'What is your name?',
          trigger: 'firstname',
        },
        {
          id: 'firstname',
          user: true,
          validator: (value) => {
            if (/^[A-Za-z]+$/.test(value)) {
              return true;
            } else {
              return 'Please input alphabet characters only.';
            }
          },
          trigger: 'greet-user',
        },
        {
          id: 'greet-user',
          message: 'Hi {previousValue}, I am NatureHug Bot! What can I help you with today?',
          trigger: 'qtype',
        },
        {
          id: 'qtype',
          options: [
            { value: 1, label: 'View Flower Collection', trigger: 'flowers' },
            { value: 2, label: 'Explore Plants', trigger: 'plants' },
            { value: 3, label: 'Check Flower Pots', trigger: 'flowerpots' },
            { value: 4, label: 'More Information', trigger: 'more-info' },
          ],
        },
        {
          id: 'flowers',
          message: 'We have a beautiful selection of flowers including roses, tulips, and lilies! Would you like to order something?',
          trigger: 'q-submit',
        },
        {
          id: 'plants',
          message: 'We offer a variety of plants such as succulents, ferns, and tropical plants. Do you want to know more about our plants?',
          trigger: 'q-submit',
        },
        {
          id: 'flowerpots',
          message: 'Our flower pots come in various styles and sizes. Would you like to see some options?',
          trigger: 'q-submit',
        },
        {
          id: 'more-info',
          message: 'Feel free to ask about our special offers or delivery services!',
          trigger: 'q-submit',
        },
        {
          id: 'q-submit',
          message: 'Do you have any other questions?',
          trigger: 'submit',
        },
        {
          id: 'submit',
          options: [
            { value: 'y', label: 'Yes', trigger: 'no-submit' },
            { value: 'n', label: 'No', trigger: 'end-message' },
          ],
        },
        {
          id: 'no-submit',
          options: [
            { value: 1, label: 'View Flower Collection', trigger: 'flowers' },
            { value: 2, label: 'Explore Plants', trigger: 'plants' },
            { value: 3, label: 'Check Flower Pots', trigger: 'flowerpots' },
            { value: 4, label: 'More Information', trigger: 'more-info' },
          ],
        },
        {
          id: 'end-message',
          component: <Post />, // Ensure Post component exists
          asMessage: true,
          end: true,
        },
      ]}
      {...config}
    />
  ) : null}
</div>



      <div>
        {!showChat ? (
          <button className="btn" onClick={startChat}>
            <i className="fa fa-plus"></i> Start Chat
          </button>
        ) : (
          <button className="btn" onClick={hideChat}>
            <i className="fa fa-minus"></i> Hide Chat
          </button>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Chatbot;
