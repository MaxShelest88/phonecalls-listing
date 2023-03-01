import React from 'react';
import './App.scss';
import Content from './components/Content';
import Header from './components/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <Header />
      <Content />
    </div>
  );
}

export default App;
