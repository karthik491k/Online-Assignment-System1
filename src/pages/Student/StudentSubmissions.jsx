import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';
import { formatDate } from '../../services/api';

const StudentSubmissions = () => {
  const { user } = useAuth();
  const { assignments, getSubmissionsByStudent } = useApp();
  
  const mySubmissions = getSubmissionsByStudent(user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Submissions</h1>
        <p className="text-gray-600">View your submitted assignments and grades</p>
      </div>

      {mySubmissions.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">You haven't submitted any assignments yet</p>
          <Link to="/student/assignments" className="btn-primary inline-block">
            View Available Assignments
          </Link>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <p className="text-gray-500 text-sm font-medium mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-900">{mySubmissions.length}</p>
            </div>
            <div className="card">
              <p className="text-gray-500 text-sm font-medium mb-1">Graded</p>
              <p className="text-3xl font-bold text-green-600">
                {mySubmissions.filter(s => s.status === 'graded').length}
              </p>
            </div>
            <div className="card">
              <p className="text-gray-500 text-sm font-medium mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">
                {mySubmissions.filter(s => s.status === 'submitted' || s.status === 'reviewed').length}
              </p>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Assignment</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Grade</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mySubmissions.map((submission) => {
                    const assignment = assignments.find(a => a.id === submission.assignmentId);
                    return (
                      <tr key={submission.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">{assignment?.title || 'Unknown'}</p>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">
                          {formatDate(submission.submittedAt)}
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={submission.status} />
                        </td>
                        <td className="py-4 px-4">
                          {submission.grade ? (
                            <span className="font-bold text-green-600 text-lg">{submission.grade}</span>
                          ) : (
                            <span className="text-gray-400">Not graded yet</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            to={`/student/submissions/${submission.id}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentSubmissions;
