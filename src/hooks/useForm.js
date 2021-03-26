import { useState } from 'react';

const useForm = (initialize = {}) => {
  const [value, setValue] = useState(initialize);

  const handleInputChange = ({ target }) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  return [value, handleInputChange, setValue];
};

export default useForm;
