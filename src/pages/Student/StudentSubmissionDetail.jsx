import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';
import { formatDate, fileAPI } from '../../services/api';

const StudentSubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSubmissionById, getAssignmentById } = useApp();
  
  const submission = getSubmissionById(id);
  const assignment = submission ? getAssignmentById(submission.assignmentId) : null;

  if (!submission || !assignment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-gray-500">Submission not found</p>
          <button onClick={() => navigate('/student/submissions')} className="btn-primary inline-block mt-4">
            Back to Submissions
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
    try {
      await fileAPI.downloadFile(submission.fileUrl, submission.fileName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/student/submissions"
          className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
        >
          ← Back to My Submissions
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Details */}
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Submission Details
                </h1>
                <StatusBadge status={submission.status} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Assignment</p>
                  <p className="text-gray-900 font-medium">{assignment.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Submitted At</p>
                  <p className="text-gray-900">{formatDate(submission.submittedAt)}</p>
                </div>
              </div>

              {submission.comment && (
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Your Comment</p>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{submission.comment}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 font-medium mb-2">Submitted File</p>
                <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{submission.fileName}</p>
                    <p className="text-sm text-gray-500">
                      {(submission.fileSize / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="btn-primary"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grade and Feedback */}
          {submission.status === 'graded' ? (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Grade & Feedback</h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-sm text-green-600 font-medium mb-2">Your Grade</p>
                  <p className="text-5xl font-bold text-green-600">{submission.grade}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">Teacher Feedback</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{submission.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Grade & Feedback</h2>
              <div className="text-center py-8">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">
                  {submission.status === 'submitted' 
                    ? 'Waiting for teacher to review'
                    : 'Your submission has been reviewed. Waiting for grade.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment Info */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Assignment Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 font-medium">Title</p>
                <p className="text-gray-900">{assignment.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Description</p>
                <p className="text-gray-600 text-sm">{assignment.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Deadline</p>
                <p className="text-gray-900">{formatDate(assignment.deadline)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Max Points</p>
                <p className="text-gray-900">{assignment.maxPoints || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Status Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Submitted</p>
                  <p className="text-xs text-gray-500">{formatDate(submission.submittedAt)}</p>
                </div>
              </div>
              {submission.status === 'reviewed' || submission.status === 'graded' ? (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Reviewed</p>
                    <p className="text-xs text-gray-500">By teacher</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Reviewed</p>
                    <p className="text-xs text-gray-400">Pending</p>
                  </div>
                </div>
              )}
              {submission.status === 'graded' ? (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Graded</p>
                    <p className="text-xs text-gray-500">Grade: {submission.grade}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Graded</p>
                    <p className="text-xs text-gray-400">Pending</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <Link
              to="/student/submissions"
              className="btn-secondary w-full text-center block mb-3"
            >
              View All Submissions
            </Link>
            <Link
              to="/student/assignments"
              className="btn-secondary w-full text-center block"
            >
              View Assignments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmissionDetail;
