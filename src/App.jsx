import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import PrivateRoute from './components/PrivateRoute';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Teacher Pages
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherAssignments from './pages/Teacher/TeacherAssignments';
import CreateAssignment from './pages/Teacher/CreateAssignment';
import AssignmentSubmissions from './pages/Teacher/AssignmentSubmissions';
import SubmissionDetail from './pages/Teacher/SubmissionDetail';

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard';
import StudentAssignments from './pages/Student/StudentAssignments';
import SubmitAssignment from './pages/Student/SubmitAssignment';
import StudentSubmissions from './pages/Student/StudentSubmissions';
import StudentSubmissionDetail from './pages/Student/StudentSubmissionDetail';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Toast />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Teacher Routes */}
              <Route
                path="/teacher/dashboard"
                element={
                  <PrivateRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher/assignments"
                element={
                  <PrivateRoute allowedRoles={['teacher']}>
                    <TeacherAssignments />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher/assignments/create"
                element={
                  <PrivateRoute allowedRoles={['teacher']}>
                    <CreateAssignment />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher/assignments/:id/submissions"
                element={
                  <PrivateRoute allowedRoles={['teacher']}>
                    <AssignmentSubmissions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher/submissions/:id"
                element={
                  <PrivateRoute allowedRoles={['teacher']}>
                    <SubmissionDetail />
                  </PrivateRoute>
                }
              />
              
              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/assignments"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <StudentAssignments />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/assignments/:id/submit"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <SubmitAssignment />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/submissions"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <StudentSubmissions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student/submissions/:id"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <StudentSubmissionDetail />
                  </PrivateRoute>
                }
              />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
