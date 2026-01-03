import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { isOverdue, getTimeRemaining } from '../../services/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { assignments, getSubmissionsByStudent } = useApp();

  const mySubmissions = getSubmissionsByStudent(user.id);

  // Calculate statistics
  const totalAssignments = assignments.length;
  const submittedCount = mySubmissions.length;
  const pendingCount = totalAssignments - submittedCount;
  const gradedCount = mySubmissions.filter(s => s.status === 'graded').length;
  
  // Get overdue assignments
  const overdueAssignments = assignments.filter(assignment => {
    const hasSubmitted = mySubmissions.some(s => s.assignmentId === assignment.id);
    return !hasSubmitted && isOverdue(assignment.deadline);
  });

  // Get upcoming assignments
  const upcomingAssignments = assignments
    .filter(assignment => {
      const hasSubmitted = mySubmissions.some(s => s.assignmentId === assignment.id);
      return !hasSubmitted && !isOverdue(assignment.deadline);
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">Track your assignments and submissions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <h3 className="text-lg font-medium mb-2">Total Assignments</h3>
          <p className="text-4xl font-bold">{totalAssignments}</p>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <h3 className="text-lg font-medium mb-2">Submitted</h3>
          <p className="text-4xl font-bold">{submittedCount}</p>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <h3 className="text-lg font-medium mb-2">Pending</h3>
          <p className="text-4xl font-bold">{pendingCount}</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <h3 className="text-lg font-medium mb-2">Graded</h3>
          <p className="text-4xl font-bold">{gradedCount}</p>
        </div>
      </div>

      {/* Overdue Assignments Alert */}
      {overdueAssignments.length > 0 && (
        <div className="bg-red-100 border border-red-400 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="text-red-800 font-bold">Overdue Assignments</h3>
          </div>
          <p className="text-red-700">
            You have {overdueAssignments.length} overdue assignment(s). Please submit them as soon as possible.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Assignments</h2>
            <Link to="/student/assignments" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View All →
            </Link>
          </div>

          {upcomingAssignments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No upcoming assignments</p>
          ) : (
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-2">{assignment.title}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{getTimeRemaining(assignment.deadline)}</span>
                    <Link
                      to={`/student/assignments/${assignment.id}/submit`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Submit →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Submissions</h2>
            <Link to="/student/submissions" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View All →
            </Link>
          </div>

          {mySubmissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No submissions yet</p>
          ) : (
            <div className="space-y-4">
              {mySubmissions.slice(0, 3).map((submission) => {
                const assignment = assignments.find(a => a.id === submission.assignmentId);
                return (
                  <div key={submission.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2">{assignment?.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className={`badge badge-${submission.status}`}>
                        {submission.status}
                      </span>
                      {submission.grade && (
                        <span className="text-green-600 font-bold">{submission.grade}</span>
                      )}
                      <Link
                        to={`/student/submissions/${submission.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/student/assignments" className="btn-primary text-center">
            View All Assignments
          </Link>
          <Link to="/student/submissions" className="btn-secondary text-center">
            My Submissions
          </Link>
          <button className="btn-secondary">
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
