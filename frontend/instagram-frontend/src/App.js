import './App.css';
import Modal from './FilePicker';
import LogoSection from './components/LogoSection';
import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [user, setUser] = useState("defaultuser");
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("0");
  const [userPost, setUserPost] = useState("0");
  const [commentUser, setCommentUser] = useState("0");
  const [createPost, setCreatePost] = useState({
    "username": user,
    "likes": likes,
    "post": userPost,
    "image": imagePreviewUrl,
    "comments": [
        {
            "username": commentUser,
            "post": comment
        }
    ]
})

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch("http://localhost:4000/api/instagram");
        console.log(response, "This is the response");

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log("Couldn't get posts", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPicker ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPicker])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target.result;
        setImagePreviewUrl(previewUrl); // Update the state with preview URL
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const toggleCreateFilePicker = () => {
    setShowPicker(!showPicker);
  }

  const onClose = () => {
    setShowPicker(false);
  }

  const handleText = (e) => {
    setUserPost(e.target.value);
  }

  const handleSetPosts = (data) => {
    const updatedPosts = [data, ...posts];
    setPosts(updatedPosts);
  }

  const handleShare = async () => {
    const postData = {
      "username": user,
      "likes": likes,
      "post": userPost,
      "image": imagePreviewUrl,
      "comments": [
          {
              "username": commentUser,
              "post": comment
          }
      ]
  }
  try {
    const response = await fetch("http://localhost:4000/api/instagram", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    console.log(response, "Sending the post request");
    console.log(user, likes, userPost, imagePreviewUrl, commentUser, comment);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    handleSetPosts(data);
    console.log(data);
    onClose();
  } catch (error) {
    console.log("Couldn't create the post", error);
  }
}

  return (
    <div className="App">
      <LogoSection />
      <p id='default'>{user}</p>
      <button className='create-button' onClick={toggleCreateFilePicker}>Create</button>
      {showPicker && <Modal handleClose={onClose} handleFileSelect={handleFileChange} imagePreviewUrl={imagePreviewUrl} handleText={handleText} handleShare={handleShare}/>}
      <div className='divider'></div>
      <center className='center-section'>
          {posts.map((post, index) => {
            return  <div className='post-card' key={index}>
                      <div className='top-card'>
                        <p className='username'>{post.username}</p>
                        <button className='dot-button'>...</button>
                      </div>
                      <div className='center-image'>
                        <img src={post.image} alt={post.image} width={446} height={450}/>
                      </div>
                      <div className='icons'>
                        <button className='heart-button'><img src="/heart.png" alt='h' width={30} height={30}/></button>
                        <button className='comment-button'><img src="/comment.png" alt='c' width={30} height={30}/></button>
                      </div>
                      <span className='num-likes'>{post.likes}</span>
                      <p className='comment'><strong>{post.username}- </strong>{post.post}</p>
                    </div>
          })}
      </center>
    </div>
  );
}

export default App;
