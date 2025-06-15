import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './components/home/Home';
import './index.css';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import StudentProfile from './components/student/StudentProfile';
import CoursePage from './components/course/CoursePage';
import Assignment from './components/assignment/Assignment';
import AdminCourseManager from './components/admin/AdmisCourseManager';
import StudentShowingTeacher from './components/student/studentshowingTeacher';
import TeacherShowingStudent from './components/teacher/teachershowingStudent';
import StartDuel from './components/compete/StartDuel';
import DuelRoom from './components/compete/DuelRoom';
import MyDuels from './components/compete/MyDuels';
import OngoingDuels from './components/compete/OngoingDuels';
import CompletedDuels from './components/compete/CompletedDuels';

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
              <Route path="/teacher/students" element={<TeacherShowingStudent />} />
              <Route path="/student/teachers" element={<StudentShowingTeacher />} />
              <Route path="/assignments" element={<Assignment />} />
              <Route path="/admin/courses" element={<AdminCourseManager />} />
              <Route path="/student/compete" element={<StartDuel />} />
              <Route path="/student/duel/:duelId" element={<DuelRoom />} />
              <Route path="/student/duel/:duelId" element={<DuelRoom />} />
              <Route path="/student/my-duels" element={<MyDuels />} />
              <Route path="/duels/start" element={<StartDuel />} />
              <Route path="/duels/ongoing" element={<OngoingDuels />} />
              <Route path="/duels/completed" element={<CompletedDuels />} />

            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
