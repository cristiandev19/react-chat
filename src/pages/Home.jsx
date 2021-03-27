import React from 'react';
import useForm from '../hooks/useForm';

const Home = () => {
  const [chatForm, handleChatFormChange] = useForm({
    userName: '',
  });
  return (
    <div>
      { chatForm.userName }
      <input
        type="text"
        name="userName"
        id="userName"
        onChange={handleChatFormChange}
      />
    </div>
  );
};

export default Home;
