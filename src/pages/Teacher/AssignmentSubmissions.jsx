import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';
import { formatDate } from '../../services/api';

const AssignmentSubmissions = () => {
  const { id } = useParams();
  const { getAssignmentById, getSubmissionsByAssignment } = useApp();
  
  const assignment = getAssignmentById(id);
  const submissions = getSubmissionsByAssignment(id);

  if (!assignment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-gray-500">Assignment not found</p>
          <Link to="/teacher/assignments" className="btn-primary inline-block mt-4">
            Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/teacher/assignments" className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block">
          ← Back to Assignments
        </Link>
      </div>

      {/* Assignment Details */}
      <div className="card mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{assignment.title}</h1>
        <p className="text-gray-600 mb-4">{assignment.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500 font-medium">Deadline:</span>
            <p className="text-gray-900">{formatDate(assignment.deadline)}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">File Types:</span>
            <p className="text-gray-900">{assignment.allowedFileTypes}</p>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Total Submissions:</span>
            <p className="text-gray-900">{submissions.length}</p>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Submissions</h2>
        
        {submissions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No submissions yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted At</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Grade</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {submission.studentName}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {formatDate(submission.submittedAt)}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={submission.status} />
                    </td>
                    <td className="py-4 px-4">
                      {submission.grade ? (
                        <span className="font-medium text-green-600">{submission.grade}</span>
                      ) : (
                        <span className="text-gray-400">Not graded</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        to={`/teacher/submissions/${submission.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        {submissions.length > 0 && (
          <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {submissions.filter(s => s.status === 'submitted').length}
              </p>
              <p className="text-sm text-gray-600">Submitted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {submissions.filter(s => s.status === 'reviewed').length}
              </p>
              <p className="text-sm text-gray-600">Reviewed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {submissions.filter(s => s.status === 'graded').length}
              </p>
              <p className="text-sm text-gray-600">Graded</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmissions;
