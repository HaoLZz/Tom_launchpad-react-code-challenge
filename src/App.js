import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import './App.css';
import ResponsiveAppBar from './app/AppBar';
import PostsList from './features/posts/PostsList';
import PostalLookupPage from './features/postal/PostalLookupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <PostsList />
              </Container>
            }
          />
          <Route path="/postal-lookup" element={<PostalLookupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
