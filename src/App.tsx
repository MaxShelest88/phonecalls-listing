import React from 'react';
import './App.scss';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
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
