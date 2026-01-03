import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import AssignmentCard from '../../components/AssignmentCard';
import { isOverdue } from '../../services/api';

const StudentAssignments = () => {
  const { user } = useAuth();
  const { assignments, getSubmissionsByStudent } = useApp();
  
  const mySubmissions = getSubmissionsByStudent(user.id);

  // Filter assignments
  const availableAssignments = assignments.filter(assignment => {
    const hasSubmitted = mySubmissions.some(s => s.assignmentId === assignment.id);
    return !hasSubmitted;
  });

  const submittedAssignments = assignments.filter(assignment => {
    return mySubmissions.some(s => s.assignmentId === assignment.id);
  });

  const overdueAssignments = availableAssignments.filter(a => isOverdue(a.deadline));
  const upcomingAssignments = availableAssignments.filter(a => !isOverdue(a.deadline));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600">View and submit your assignments</p>
      </div>

      {/* Overdue Assignments */}
      {overdueAssignments.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold text-red-600">Overdue Assignments</h2>
            <span className="badge badge-overdue">{overdueAssignments.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overdueAssignments.map((assignment) => (
              <div key={assignment.id} className="border-2 border-red-300">
                <AssignmentCard assignment={assignment} role="student" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Assignments */}
      {upcomingAssignments.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Assignments</h2>
            <span className="badge bg-blue-100 text-blue-800">{upcomingAssignments.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} role="student" />
            ))}
          </div>
        </div>
      )}

      {/* Submitted Assignments */}
      {submittedAssignments.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Submitted Assignments</h2>
            <span className="badge bg-green-100 text-green-800">{submittedAssignments.length}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submittedAssignments.map((assignment) => {
              const submission = mySubmissions.find(s => s.assignmentId === assignment.id);
              return (
                <div key={assignment.id} className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`badge badge-${submission.status}`}>
                      {submission.status}
                    </span>
                    {submission.grade && (
                      <span className="text-green-600 font-bold text-lg">{submission.grade}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {assignments.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">No assignments available yet</p>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
