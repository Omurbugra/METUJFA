import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Team from './pages/Team';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;