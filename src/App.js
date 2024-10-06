import React from 'react';
import Header from './components/header';
import TaskManager from './components/task';
// import TaskEditModal from './components/modalEdit';
// import Space from './components/space';
import './index.css';
import './output.css';

function App() {
  return (
    <div>
      <Header />
      <TaskManager />
      {/* <TaskEditModal /> */}
    </div>
  );
}

export default App;

// $env:NODE_OPTIONS="--openssl-legacy-provider"; npm start
// npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
