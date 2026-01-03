import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';
import { formatDate, fileAPI } from '../../services/api';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { getSubmissionById, getAssignmentById, markAsReviewed, gradeSubmission } = useApp();
  
  const submission = getSubmissionById(id);
  const assignment = submission ? getAssignmentById(submission.assignmentId) : null;
  const [isGrading, setIsGrading] = useState(false);

  if (!submission || !assignment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-gray-500">Submission not found</p>
          <button onClick={() => navigate(-1)} className="btn-primary inline-block mt-4">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleMarkAsReviewed = () => {
    markAsReviewed(submission.id);
  };

  const handleDownload = async () => {
    try {
      await fileAPI.downloadFile(submission.fileUrl, submission.fileName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const onSubmitGrade = (data) => {
    setIsGrading(true);
    gradeSubmission(submission.id, data.grade, data.feedback);
    setIsGrading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
        >
          ← Back
        </button>
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
              {submission.status === 'submitted' && (
                <button
                  onClick={handleMarkAsReviewed}
                  className="btn-primary"
                >
                  Mark as Reviewed
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Student Name</p>
                  <p className="text-gray-900 font-medium">{submission.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Submitted At</p>
                  <p className="text-gray-900">{formatDate(submission.submittedAt)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Assignment</p>
                <p className="text-gray-900 font-medium">{assignment.title}</p>
              </div>

              {submission.comment && (
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Student Comment</p>
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

          {/* Grading Section */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Grade Submission</h2>
            
            {submission.status === 'graded' ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Grade</p>
                  <p className="text-3xl font-bold text-green-600">{submission.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Feedback</p>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{submission.feedback}</p>
                </div>
                <button
                  onClick={() => setIsGrading(true)}
                  className="btn-secondary"
                >
                  Update Grade
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmitGrade)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade *
                  </label>
                  <input
                    type="text"
                    {...register('grade', {
                      required: 'Grade is required',
                    })}
                    className="input-field"
                    placeholder="e.g., 95/100, A, or Excellent"
                    defaultValue={submission.grade || ''}
                  />
                  {errors.grade && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback *
                  </label>
                  <textarea
                    {...register('feedback', {
                      required: 'Feedback is required',
                      minLength: {
                        value: 10,
                        message: 'Feedback must be at least 10 characters',
                      },
                    })}
                    className="input-field min-h-[120px]"
                    placeholder="Provide constructive feedback to the student..."
                    defaultValue={submission.feedback || ''}
                  />
                  {errors.feedback && (
                    <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isGrading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {isGrading ? 'Saving...' : 'Submit Grade'}
                </button>
              </form>
            )}
          </div>
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
                <p className="text-sm text-gray-500 font-medium">Deadline</p>
                <p className="text-gray-900">{formatDate(assignment.deadline)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Max Points</p>
                <p className="text-gray-900">{assignment.maxPoints || 'N/A'}</p>
              </div>
              <Link
                to={`/teacher/assignments/${assignment.id}/submissions`}
                className="btn-secondary w-full text-center block"
              >
                View All Submissions
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
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
                  </div>
                </div>
              ) : null}
              {submission.status === 'graded' ? (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Graded</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;
