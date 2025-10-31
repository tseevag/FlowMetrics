# FlowMetrics - Advanced Personal Task Manager

A comprehensive task management application with advanced features, analytics, and insights to help you stay productive and organized.

## Features

### Core Task Management
- ✅ Create, edit, and delete tasks
- 📊 Multiple projects and categories
- 🎯 Priority levels (Low, Medium, High, Urgent)
- 📅 Due dates and time estimates
- 🏷️ Tags and subtasks
- ⏱️ Time tracking
- 📝 Notes and descriptions

### Advanced Analytics
- 📈 Completion rate tracking
- ⏰ Time spent analysis
- 📊 Weekly productivity charts
- 🎯 Project progress visualization
- 📋 Priority-based task distribution
- 🔍 Performance insights

### Smart Features
- 🔍 Advanced filtering and search
- 📱 Responsive design
- 🎨 Modern, intuitive UI
- 📊 Real-time dashboard
- 🔄 Status tracking (Todo, In Progress, Completed)
- ⚡ Fast and efficient

## Tech Stack

- **Frontend**: React 19, Modern CSS
- **Backend**: Node.js, Express
- **Storage**: In-memory (easily replaceable with database)
- **Styling**: Custom CSS with modern design principles

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd reactor
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev  # Starts server on http://localhost:8000
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start    # Starts React app on http://localhost:3000
   ```

4. **Environment Setup**
   - Create `.env` file in frontend directory:
   ```
   REACT_APP_API_URL=<URL_OF_BACKEND_SERVER>
   ```

## Usage

### Getting Started
1. Open http://localhost:3000 in your browser
2. Click "New Task" to create your first task
3. Explore the Dashboard for overview and insights
4. Use the Tasks page for detailed task management
5. Check Analytics for productivity insights

### Key Features

**Dashboard**
- Overview of all tasks and completion rates
- Weekly productivity chart
- Recent tasks and upcoming deadlines
- Quick stats and insights

**Task Management**
- Advanced filtering by project, category, status, priority
- Search functionality
- Sorting options
- Bulk operations

**Analytics**
- Detailed productivity metrics
- Time tracking insights
- Project progress visualization
- Performance trends

## Project Structure

```
reactor/
├── backend/
│   ├── server.js          # Express server with comprehensive API
│   └── package.json       # Backend dependencies
└── frontend/
    ├── src/
    │   ├── App.js         # Main application component
    │   ├── Dashboard.js   # Dashboard with stats and charts
    │   ├── TaskList.js    # Task management interface
    │   ├── Analytics.js   # Detailed analytics page
    │   ├── TaskForm.js    # Task creation/editing form
    │   ├── Sidebar.js     # Navigation sidebar
    │   └── App.css        # Modern styling
    └── package.json       # Frontend dependencies
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/time` - Add time entry

### Projects & Categories
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

### Analytics
- `GET /api/analytics` - Get comprehensive analytics data

## Customization

### Adding New Features
1. **Backend**: Add new endpoints in `server.js`
2. **Frontend**: Create new components and integrate with existing structure
3. **Styling**: Update `App.css` with new styles

### Database Integration
Replace the in-memory storage in `server.js` with your preferred database:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- SQLite for local storage

### Deployment
1. **Frontend**: `npm run build` creates production build
2. **Backend**: Serves static files from build folder
3. Deploy to platforms like Heroku, Vercel, or AWS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

**FlowMetrics** - Transform your productivity with intelligent task management! 🚀