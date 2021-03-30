import socketIOClient from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import AuthContext from '../auth/AuthContext';
import { config } from '../config';

const ChatScreen = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContext);
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatForm, handleChatFormChange] = useForm({
    message: '',
  });
  const { message } = chatForm;

  useEffect(() => {
    console.log('socket', socket);
    console.log('process.env.BACK_DOMAIN', config.backend);
    if (!socket) {
      setSocket(socketIOClient(config.backend));
    }
    console.log('socket', socket);

    return () => (socket ? socket.disconnect() : null);
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    });
    console.log('socketConnected', socketConnected);
    const newLocal = 'updateChat';
    socket.on(newLocal, (data) => {
      setChatMessages((oldArray) => [...oldArray, data]);
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      message,
      userName : user.userName,
      time     : Date.now(),
    };
    socket.emit('newMessage', newMessage);
    setChatMessages((oldMessages) => [...oldMessages, newMessage]);
  };

  return (

    <div className="chat-container">
      <div className="chat-messages">
        {
          chatMessages.map((chatMessage) => (
            chatMessage.userName === user.userName
              ? (
                <div key={chatMessage.time} className="message my-message">
                  <div className="message-content">
                    {chatMessage.message}
                  </div>
                  <div className="message-user">
                    {chatMessage.userName}
                  </div>
                </div>
              )
              : (
                <div key={chatMessage.time} className="message other-message">
                  <div className="message-content">
                    {chatMessage.message}
                  </div>
                  <div className="message-user">
                    {chatMessage.userName}
                  </div>
                </div>
              )
          ))
        }
      </div>
      <form onSubmit={handleSendMessage} className="chat-input">
        <label htmlFor="message">
          Escribe el mensaje
          <input
            type="text"
            name="message"
            id="message"
            onChange={handleChatFormChange}
          />
        </label>
      </form>
    </div>
  );
};

export default ChatScreen;
