import React, { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import useForm from '../hooks/useForm';
import types from '../types/auth.types';

const Home = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [chatForm, handleChatFormChange] = useForm({
    userName: '',
  });
  const handleLogin = () => {
    const userName = chatForm;
    console.log({ userName });
    dispatch({
      type    : types.login,
      payload : { ...userName },
    });
  };
  console.log('user', user);

  return (
    <div>
      {
        user.logged
          ? <h2>{ `Bienvenido ${user.userName}` }</h2>
          : <h2>Bienvenido a tu chat</h2>
      }
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
