import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import useForm from '../hooks/useForm';

const ChatScreen = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatForm, handleChatFormChange] = useForm({
    message  : '',
    userName : '',
  });
  const { message, userName } = chatForm;

  useEffect(() => {
    if (!socket) {
      setSocket(socketIOClient(process.env.BACK_DOMAIN));
    }
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
      userName,
      time: Date.now(),
    };
    socket.emit('newMessage', newMessage);
    setChatMessages((oldMessages) => [...oldMessages, newMessage]);
  };

  return (

    <div>
      <form onSubmit={handleSendMessage}>
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
      <label htmlFor="useName">
        Username:
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={handleChatFormChange}
        />
      </label>

      <div>
        {
          chatMessages.map((chatMessage) => (
            chatMessage.userName === userName
              ? (
                <div key={chatMessage.time} className="my-message">
                  <span>
                    {chatMessage.message}
                  </span>
                  <span>
                    {chatMessage.userName}
                  </span>
                </div>
              )
              : (
                <div key={chatMessage.time} className="other-message">
                  <span>
                    {chatMessage.message}
                  </span>
                  <span>
                    {chatMessage.userName}
                  </span>
                </div>
              )
          ))
        }
      </div>
    </div>
  );
};

export default ChatScreen;
