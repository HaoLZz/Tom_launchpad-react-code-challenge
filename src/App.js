import React from 'react';
import Container from '@mui/material/Container';
import './App.css';
import ResponsiveAppBar from './app/AppBar';
import PostsList from './features/posts/PostsList';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Container>
        <PostsList />
      </Container>
    </div>
  );
}

export default App;
