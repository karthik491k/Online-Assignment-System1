import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getTimeRemaining, isOverdue } from '../services/api';

const AssignmentCard = ({ assignment, role, showActions = false, onDelete }) => {
  const deadlinePassed = isOverdue(assignment.deadline);

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {assignment.title}
          </h3>
          <p className="text-gray-600 text-sm">{assignment.description}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <span className="text-gray-500 font-medium w-32">Deadline:</span>
          <span className={deadlinePassed ? 'text-red-600 font-medium' : 'text-gray-900'}>
            {formatDate(assignment.deadline)}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-500 font-medium w-32">Time Remaining:</span>
          <span className={deadlinePassed ? 'text-red-600 font-medium' : 'text-gray-900'}>
            {getTimeRemaining(assignment.deadline)}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-500 font-medium w-32">File Types:</span>
          <span className="text-gray-900">{assignment.allowedFileTypes}</span>
        </div>
      </div>

      <div className="flex space-x-3 mt-4">
        {role === 'teacher' ? (
          <>
            <Link
              to={`/teacher/assignments/${assignment.id}/submissions`}
              className="btn-primary flex-1 text-center"
            >
              View Submissions
            </Link>
            {showActions && onDelete && (
              <button
                onClick={() => onDelete(assignment.id)}
                className="btn-secondary"
              >
                Delete
              </button>
            )}
          </>
        ) : (
          <Link
            to={`/student/assignments/${assignment.id}/submit`}
            className="btn-primary flex-1 text-center"
          >
            Submit Assignment
          </Link>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
