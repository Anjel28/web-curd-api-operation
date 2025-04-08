import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
    } catch (error) {
      console.error('डेटा फेच करने में त्रुटि:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const createPost = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      setData([...data, response.data]);
      setNewPost({ title: '', body: '' });
      alert('पोस्ट सफलतापूर्वक बनाई गई!');
    } catch (error) {
      console.error('पोस्ट क्रिएट करने में त्रुटि:', error);
    }
  };

  const updatePost = async () => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        editingPost
      );
      setData(data.map(item => (item.id === editingPost.id ? response.data : item)));
      setEditingPost(null);
      alert('पोस्ट सफलतापूर्वक अपडेट की गई!');
    } catch (error) {
      console.error('पोस्ट अपडेट करने में त्रुटि:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setData(data.filter(item => item.id !== id));
      alert('पोस्ट सफलतापूर्वक डिलीट की गई!');
    } catch (error) {
      console.error('पोस्ट डिलीट करने में त्रुटि:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>पोस्ट्स की सूची</h1>
      
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>नई पोस्ट बनाएं</h2>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="शीर्षक"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <textarea
          name="body"
          value={newPost.body}
          onChange={handleInputChange}
          placeholder="विवरण"
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <button onClick={createPost}>पोस्ट बनाएं</button>
      </div>

      {editingPost && (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
          <h2>पोस्ट संपादित करें</h2>
          <input
            type="text"
            name="title"
            value={editingPost.title}
            onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
            style={{ display: 'block', marginBottom: '10px', width: '100%' }}
          />
          <textarea
            name="body"
            value={editingPost.body}
            onChange={(e) => setEditingPost({...editingPost, body: e.target.value})}
            style={{ display: 'block', marginBottom: '10px', width: '100%' }}
          />
          <button onClick={updatePost}>अपडेट करें</button>
          <button onClick={() => setEditingPost(null)} style={{ marginLeft: '10px' }}>कैंसल</button>
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map(item => (
          <li key={item.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee' }}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <button onClick={() => setEditingPost(item)} style={{ marginRight: '10px' }}>एडिट</button>
            <button onClick={() => deletePost(item.id)}>डिलीट</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
