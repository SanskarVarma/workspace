import React from 'react';
import Header from './components/header';
import TaskManager from './components/task';
// import Space from './components/space';
import './index.css';
import './output.css';

function App() {
  return (
    <div>
      <Header />
      <TaskManager />
      {/* <Space /> */}

    </div>
  );
}

export default App;
