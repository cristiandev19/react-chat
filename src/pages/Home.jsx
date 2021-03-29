import React from 'react';
import useForm from '../hooks/useForm';

const Home = () => {
  const [chatForm, handleChatFormChange] = useForm({
    userName: '',
  });
  const handleLogin = () => {
    const userName = chatForm;
    console.log({ userName });
  };

  return (
    <div>
      <h2>Bienvenido a tu chat</h2>
      <label htmlFor="userName">
        Ingresa tu nombre de usuario:
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={handleChatFormChange}
        />
      </label>
      <button onClick={handleLogin} type="button">Ingresar</button>
    </div>
  );
};

export default Home;
