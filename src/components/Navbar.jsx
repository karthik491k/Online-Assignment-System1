import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isTeacher, isStudent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? (isTeacher() ? '/teacher/dashboard' : '/student/dashboard') : '/'} className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">
              Assignment System
            </span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="flex items-center space-x-6">
              {isTeacher() && (
                <>
                  <Link
                    to="/teacher/dashboard"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/teacher/assignments"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Assignments
                  </Link>
                </>
              )}

              {isStudent() && (
                <>
                  <Link
                    to="/student/dashboard"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/student/assignments"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Assignments
                  </Link>
                  <Link
                    to="/student/submissions"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    My Submissions
                  </Link>
                </>
              )}

              {/* User Info */}
              <div className="flex items-center space-x-4 border-l pl-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
