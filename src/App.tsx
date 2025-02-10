import React from "react";
// import TaskList from "./components/TaskList";
import List from "./components/List";
// import DragNDrop from "./components/DragNDrop";
const App: React.FC = () => {
  return (
    // <div className="min-h-screen bg-gray-500 p-4">
    //   <h1 className="text-2xl font-bold mb-4">Task List</h1>
    //   <TaskList />
    // </div>
    <div className="bg-gray-900 h-screen p-4">
      <List/>
    </div>

      // <DragNDrop/>
  );
};

export default App;
