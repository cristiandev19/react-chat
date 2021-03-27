import React from 'react';
import { useParams } from 'react-router-dom';
import ChatScreen from '../../components/ChatScreen';

const Chat = () => {
  const { idChat } = useParams();
  console.log('params', idChat);
  return (
    <div>
      <ChatScreen />
    </div>
  );
};

export default Chat;
