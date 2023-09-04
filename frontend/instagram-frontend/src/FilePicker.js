import React from 'react';
import ReactDom from 'react-dom';
import './App.css';

const Modal = ({ handleClose, handleFileSelect, imagePreviewUrl, handleShare, handleText }) => {

  // TODO: Figure out how to make comment section increase width
  return ReactDom.createPortal(
    <>
        <div className='overlay' onClick={handleClose}></div>
        <div className='modal'>
            <div className='image-border'>
              <img className='picture' src={imagePreviewUrl} alt="" width={446} height={446}/>
              <div className='text-container'>
                <input type="text" className='text-field' placeholder='Write a comment' onChange={handleText}/>
                <hr className='text-line'/>
                <button className='create-post' onClick={handleShare}>Share Post</button>
              </div>
            </div>
            <label htmlFor="fileInput" className='file-select'>Select Image</label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <div className='make-post'>
            </div>
        </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;