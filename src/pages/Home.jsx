import React, { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import useForm from '../hooks/useForm';
import types from '../types/auth.types';

const Home = () => {
  const { dispatch } = useContext(AuthContext);

  const [chatForm, handleChatFormChange] = useForm({
    userName: '',
  });
  const handleLogin = () => {
    const userName = chatForm;
    console.log({ userName });
    dispatch(types.login, { userName });
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
