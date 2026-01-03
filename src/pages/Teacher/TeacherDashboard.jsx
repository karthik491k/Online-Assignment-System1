import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { assignments, submissions } = useApp();

  // Calculate statistics
  const totalAssignments = assignments.length;
  const totalSubmissions = submissions.length;
  const reviewedSubmissions = submissions.filter(s => s.status === 'reviewed').length;
  const gradedSubmissions = submissions.filter(s => s.status === 'graded').length;
  const pendingReview = submissions.filter(s => s.status === 'submitted').length;

  // Recent submissions
  const recentSubmissions = submissions
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">Here's an overview of your assignments and submissions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <h3 className="text-lg font-medium mb-2">Total Assignments</h3>
          <p className="text-4xl font-bold">{totalAssignments}</p>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <h3 className="text-lg font-medium mb-2">Total Submissions</h3>
          <p className="text-4xl font-bold">{totalSubmissions}</p>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <h3 className="text-lg font-medium mb-2">Pending Review</h3>
          <p className="text-4xl font-bold">{pendingReview}</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <h3 className="text-lg font-medium mb-2">Graded</h3>
          <p className="text-4xl font-bold">{gradedSubmissions}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/teacher/assignments/create"
            className="btn-primary text-center"
          >
            Create New Assignment
          </Link>
          <Link
            to="/teacher/assignments"
            className="btn-secondary text-center"
          >
            View All Assignments
          </Link>
          <button className="btn-secondary">
            View Analytics
          </button>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Submissions</h2>
        </div>

        {recentSubmissions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No submissions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Assignment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission) => {
                  const assignment = assignments.find(a => a.id === submission.assignmentId);
                  return (
                    <tr key={submission.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{submission.studentName}</td>
                      <td className="py-3 px-4">{assignment?.title || 'Unknown'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`badge badge-${submission.status}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/teacher/submissions/${submission.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
