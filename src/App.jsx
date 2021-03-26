import './App.css';
import './styles/utils.css';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import useForm from './hooks/useForm';

const ENDPOINT = 'http://127.0.0.1:8089';

function App() {
  const [response, setResponse] = useState([]);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatForm, handleChatFormChange] = useForm({
    message  : '',
    userName : '',
  });
  const { message, userName } = chatForm;

  useEffect(() => {
    // socket = socketIOClient(ENDPOINT);
    setSocket(socketIOClient(ENDPOINT));
    // CLEAN UP THE EFFECT
    return () => (socket ? socket.disconnect() : null);
  }, []);

  useEffect(() => {
    console.log('cambios en response', response);
  }, [response]);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    });
    console.log('socketConnected', socketConnected);
    const newLocal = 'updateChat';
    // console.log('wut');
    socket.on(newLocal, (data) => {
      // console.log('response antes', response);
      // console.log('(data', data);
      // const last = [...response, data];
      // console.log('last', last);
      // setResponse(last);
      setResponse((oldArray) => [...oldArray, data]);
      // console.log('response', response);
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });
  }, [socket]);

  // const handleSocketConnection = () => {
  //   if (socketConnected) socket.disconnect();
  //   else socket.connect();
  // };

  // const handleEmmit = () => {
  //   console.log('emit');
  //   socket.emit('chosedHands', {
  //     room,
  //     user: userForm.user,
  //     hand,
  //   });
  // };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log({ message, userName });
    socket.emit('newMessage', {
      message,
      userName,
      time: Date.now(),
    });
  };

  return (
    <div>
      <h1>{ `Este sera el usename: ${userName}` }</h1>
      <h1>{ `Este sera el chat: ${message}` }</h1>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          name="message"
          id="message"
          onChange={handleChatFormChange}
        />
      </form>
      <input
        type="text"
        name="userName"
        id="userName"
        onChange={handleChatFormChange}
      />

      <ul>
        {
          response.map((resp) => (
            <div key={resp.time}>
              <span>
                {resp.message}
              </span>
              <span>
                {resp.userName}
              </span>
            </div>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
