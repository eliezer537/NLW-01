import React from 'react';
import { useHistory } from 'react-router-dom';

import './success.css';
import image_success from '../../assets/visto.svg';

const MessageSucess = () => {
  const history = useHistory();

  return (
    <>
      <div className='background-success'></div>
      <div className='container-success'>
        <div className='content-success'>
          <img src={image_success} alt='message-success' />
          <div className='message-success'>
            <h1>successfully registered</h1>
            <h3>The collection point was successfully registered.</h3>
            <button onClick={()=> history.push('/')}>OK</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSucess;
