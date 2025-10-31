import React, { useState } from 'react';
import './App.css';
import { AppProvider } from './context';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import Analytics from './components/Analytics';
import TaskForm from './components/TaskForm';
import Sidebar from './components/Sidebar';
import { useApp } from './context';

const AppContent = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { actions } = useApp();

  const handleCreateTask = async (taskData) => {
    await actions.createTask(taskData);
    setShowTaskForm(false);
  };

  const handleUpdateTask = async (taskData) => {
    await actions.updateTask(editingTask.id, taskData);
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TaskList onEditTask={handleEditTask} />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        onNewTask={handleNewTask}
      />
      
      <main className="main-content">
        {renderContent()}
      </main>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={() => { setShowTaskForm(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
};

console.log("API URL:", process.env.REACT_APP_API_URL);

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;