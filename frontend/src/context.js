import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { taskService, projectService, categoryService, analyticsService } from './data.service';

const AppContext = createContext();

const initialState = {
  tasks: [],
  projects: [],
  categories: [],
  analytics: null,
  filters: {},
  loading: false,
  error: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload)
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = useMemo(() => ({
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setFilters: (filters) => dispatch({ type: 'SET_FILTERS', payload: filters }),

    fetchData: async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        const [tasks, projects, categories, analytics] = await Promise.all([
          taskService.getAll(),
          projectService.getAll(),
          categoryService.getAll(),
          analyticsService.get()
        ]);
        
        dispatch({ type: 'SET_TASKS', payload: tasks || [] });
        dispatch({ type: 'SET_PROJECTS', payload: projects || [] });
        dispatch({ type: 'SET_CATEGORIES', payload: categories || [] });
        dispatch({ type: 'SET_ANALYTICS', payload: analytics || null });
      } catch (error) {
        console.error('Failed to fetch data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to load data' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    createTask: async (taskData) => {
      try {
        dispatch({ type: 'SET_ERROR', payload: null });
        const newTask = await taskService.create(taskData);
        if (newTask) {
          dispatch({ type: 'ADD_TASK', payload: newTask });
          const analytics = await analyticsService.get();
          dispatch({ type: 'SET_ANALYTICS', payload: analytics });
        }
        return newTask;
      } catch (error) {
        console.error('Failed to create task:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to create task' });
        throw error;
      }
    },

    updateTask: async (id, updates) => {
      try {
        dispatch({ type: 'SET_ERROR', payload: null });
        const updatedTask = await taskService.update(id, updates);
        if (updatedTask) {
          dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
          const analytics = await analyticsService.get();
          dispatch({ type: 'SET_ANALYTICS', payload: analytics });
        }
        return updatedTask;
      } catch (error) {
        console.error('Failed to update task:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to update task' });
        throw error;
      }
    },

    deleteTask: async (id) => {
      try {
        dispatch({ type: 'SET_ERROR', payload: null });
        await taskService.delete(id);
        dispatch({ type: 'DELETE_TASK', payload: id });
        const analytics = await analyticsService.get();
        dispatch({ type: 'SET_ANALYTICS', payload: analytics });
      } catch (error) {
        console.error('Failed to delete task:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to delete task' });
        throw error;
      }
    },

    refreshAnalytics: async () => {
      try {
        const analytics = await analyticsService.get();
        dispatch({ type: 'SET_ANALYTICS', payload: analytics });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }
  }), [dispatch]);

  useEffect(() => {
    actions.fetchData();
  }, [actions]);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};