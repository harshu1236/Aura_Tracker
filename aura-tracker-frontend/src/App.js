import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './components/home/Home';
import './index.css';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Leaderboard from './components/leaderboard/Leaderboard';
import StudentProfile from './components/student/StudentProfile';
import CoursePage from './components/course/CoursePage';
import Assignment from './components/assignment/Assignment';
import AdminCourseManager from './components/admin/AdmisCourseManager';

// ✅ Add this when you create AssignmentPage
// import AssignmentPage from './components/assignment/AssignmentPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/courses" element={<CoursePage />} />
              <Route path="/profile" element={<StudentProfile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              {/* <Route path="/timetable" element={<TimetableList />} /> */}
              {/* <Route path="/timetable/add" element={<TimetableForm />} /> */}
              {/* <Route path="/rewards" element={<RewardList />} /> */}
              <Route path="/assignments" element={<Assignment />} />

              <Route path="/admin/courses" element={<AdminCourseManager />} />

              {/* <Route path="/assignments" element={<AssignmentPage />} /> */}
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;