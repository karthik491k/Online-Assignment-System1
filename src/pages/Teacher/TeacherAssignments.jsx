import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AssignmentCard from '../../components/AssignmentCard';

const TeacherAssignments = () => {
  const { assignments, deleteAssignment, submissions } = useApp();

  // Get submission count for each assignment
  const getSubmissionCount = (assignmentId) => {
    return submissions.filter(s => s.assignmentId === assignmentId).length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Assignments</h1>
          <p className="text-gray-600">Manage your assignments and view submissions</p>
        </div>
        <Link to="/teacher/assignments/create" className="btn-primary">
          Create New Assignment
        </Link>
      </div>

      {assignments.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">You haven't created any assignments yet</p>
          <Link to="/teacher/assignments/create" className="btn-primary inline-block">
            Create Your First Assignment
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id}>
              <AssignmentCard
                assignment={assignment}
                role="teacher"
                showActions={true}
                onDelete={deleteAssignment}
              />
              <div className="mt-2 text-sm text-gray-600 text-center">
                {getSubmissionCount(assignment.id)} submission(s)
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;
