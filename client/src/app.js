import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './components/Join/Join'; // Update the path as needed
import Chat from './components/Chat/Chat'; // Update the path as needed

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    </Router>
);

export default App;

