import React from 'react';
import ReactDom from 'react-dom';
import './App.css';

const Modal = ({ handleClose, handleFileSelect }) => {

  
  return ReactDom.createPortal(
    <>
        <div className='overlay' onClick={handleClose}></div>
        <div className='modal'>
            <div className='image-border'>
              <img src="/gilgamesh.jpg" alt="" width={446} height={450}/>
              <label htmlFor="fileInput" className='file-select'>Select Image</label>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
            </div>
            <div className='make-post'>
            </div>
        </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
