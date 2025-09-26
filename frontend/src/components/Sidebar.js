import React from 'react';
import { NAV_ITEMS } from '../constants';
import './Sidebar.css';

const Sidebar = ({ activeView, onViewChange, onNewTask }) => {
  return (
    <div className="sidebar">
      <h1>FlowMetrics</h1>
      
      <nav>
        <ul className="nav-menu">
          {NAV_ITEMS.map(item => (
            <li key={item.id} className="nav-item">
              <div 
                className={`nav-link ${activeView === item.id ? 'active' : ''}`}
                onClick={() => onViewChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <button className="new-task-btn" onClick={onNewTask}>
        + New Task
      </button>
    </div>
  );
};

export default Sidebar;