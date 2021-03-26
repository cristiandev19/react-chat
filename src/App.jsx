import './App.css';
import './styles/utils.css';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import { handKeyOptions, handOptions } from './constants/hand';
import useForm from './hooks/useForm';

const ENDPOINT = 'http://127.0.0.1:8089';

function App() {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [hand, setHand] = useState('');
  const [userForm, handleUserFormChange] = useForm({
    user: '',
  });
  const room = 909;
  console.log('socketConnected', socketConnected);
  // let socket;

  useEffect(() => {
    // socket = socketIOClient(ENDPOINT);
    setSocket(socketIOClient(ENDPOINT));

    // CLEAN UP THE EFFECT
    return () => (socket ? socket.disconnect() : null);
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    });
    const newLocal = 'winner';
    // console.log('wut');
    socket.on(newLocal, (data) => {
      setResponse(data);
      console.log('response', response);
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });
  }, [socket]);

  // const handleSocketConnection = () => {
  //   if (socketConnected) socket.disconnect();
  //   else socket.connect();
  // };

  const handleEmmit = () => {
    console.log('emit');
    // const socket = socketIOClient(ENDPOINT);
    socket.emit('chosedHands', {
      room,
      user: userForm.user,
      hand,
    });
  };

  const handleSelectHand = (e, handSelected) => {
    let handId;
    if (e.key) {
      const [handByPress] = handKeyOptions.filter(({ key }) => key === e.key);
      if (!handByPress) return;
      handId = handByPress.id;
    } else {
      handId = handSelected;
    }
    setHand(handId);
  };

  return (
    <div>
      <h1>{ `Hand selected: ${hand}` }</h1>
      <button onClick={handleEmmit} type="button">Emite</button>
      <input
        type="text"
        name="user"
        id="user"
        onChange={handleUserFormChange}
      />
      <div>{ `El usuario usado es: ${userForm.user}` }</div>
      <div>{ `En el room: ${room}` }</div>
      <div className="card-container">
        <div
          role="button"
          tabIndex={hand ? 1 : null}
          className="card-item"
          onClick={(e) => handleSelectHand(e, handOptions.rock)}
          onKeyDown={(e) => handleSelectHand(e, handOptions.rock)}
        >
          <figure>
            <img src={`${process.env.PUBLIC_URL}/assets/rock.png`} alt="" className="w-100" />
          </figure>
          <h2 className="text-center">Rock</h2>
        </div>
        <div
          role="button"
          tabIndex={hand ? 1 : null}
          className="card-item"
          onClick={(e) => handleSelectHand(e, handOptions.paper)}
          onKeyDown={(e) => handleSelectHand(e, handOptions.paper)}
        >
          <figure>
            <img src={`${process.env.PUBLIC_URL}/assets/paper.png`} alt="" className="w-100" />
          </figure>
          <h2 className="text-center">Paper</h2>
        </div>
        <div
          role="button"
          tabIndex={hand ? 1 : null}
          className="card-item"
          onClick={(e) => handleSelectHand(e, handOptions.scissors)}
          onKeyDown={(e) => handleSelectHand(e, handOptions.scissors)}
        >
          <figure>
            <img src={`${process.env.PUBLIC_URL}/assets/scissors.png`} alt="" className="w-100" />
          </figure>
          <h2 className="text-center">Scissors</h2>
        </div>
      </div>

    </div>
  );
}

export default App;
