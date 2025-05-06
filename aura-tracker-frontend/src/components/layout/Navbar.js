import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const role = userData?.role?.toLowerCase(); // 'student', 'teacher', or 'admin'

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Aura Tracker
        </Typography>

        {isAuthenticated ? (
          <>
            {role === 'student' && (
              <>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/courses">
                  Course
                </Button>
                <Button color="inherit" component={Link} to="/assignments">
                  Assignment
                </Button>
                <Button color="inherit" component={Link} to="/student/teachers">
                  Teacher
                </Button>
              </>
            )}

            {role === 'teacher' && (
              <>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/courses">
                  Course
                </Button>
                <Button color="inherit" component={Link} to="/assignments">
                  Assignment
                </Button>
                <Button color="inherit" component={Link} to="/teacher/students">
                  Student
                </Button>
              </>
            )}

            {role === 'admin' && (
              <>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/admin/students">
                  Student
                </Button>
                <Button color="inherit" component={Link} to="/admin/teachers">
                  Teacher
                </Button>
                <Button color="inherit" component={Link} to="/admin/courses">
                  Course
                </Button>
              </>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
