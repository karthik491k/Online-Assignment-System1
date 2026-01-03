import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Assignments state
  const [assignments, setAssignments] = useState([]);
  
  // Submissions state
  const [submissions, setSubmissions] = useState([]);
  
  // Toast notification state
  const [toast, setToast] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedAssignments = localStorage.getItem('assignments');
    const storedSubmissions = localStorage.getItem('submissions');
    
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
    
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    if (assignments.length > 0) {
      localStorage.setItem('assignments', JSON.stringify(assignments));
    }
  }, [assignments]);

  // Save submissions to localStorage whenever they change
  useEffect(() => {
    if (submissions.length > 0) {
      localStorage.setItem('submissions', JSON.stringify(submissions));
    }
  }, [submissions]);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Assignment functions
  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setAssignments([...assignments, newAssignment]);
    showToast('Assignment created successfully!');
    return newAssignment;
  };

  const updateAssignment = (id, updatedData) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, ...updatedData } : assignment
      )
    );
    showToast('Assignment updated successfully!');
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    showToast('Assignment deleted successfully!');
  };

  const getAssignmentById = (id) => {
    return assignments.find((assignment) => assignment.id === id);
  };

  // Submission functions
  const addSubmission = (submission) => {
    const newSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      grade: null,
      feedback: null,
    };
    setSubmissions([...submissions, newSubmission]);
    showToast('Assignment submitted successfully!');
    return newSubmission;
  };

  const updateSubmission = (id, updatedData) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id ? { ...submission, ...updatedData } : submission
      )
    );
    showToast('Submission updated successfully!');
  };

  const markAsReviewed = (id) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id ? { ...submission, status: 'reviewed' } : submission
      )
    );
    showToast('Submission marked as reviewed!');
  };

  const gradeSubmission = (id, grade, feedback) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id
          ? { ...submission, grade, feedback, status: 'graded' }
          : submission
      )
    );
    showToast('Grade submitted successfully!');
  };

  const getSubmissionById = (id) => {
    return submissions.find((submission) => submission.id === id);
  };

  const getSubmissionsByAssignment = (assignmentId) => {
    return submissions.filter((submission) => submission.assignmentId === assignmentId);
  };

  const getSubmissionsByStudent = (studentId) => {
    return submissions.filter((submission) => submission.studentId === studentId);
  };

  const value = {
    // Assignments
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignmentById,
    
    // Submissions
    submissions,
    addSubmission,
    updateSubmission,
    markAsReviewed,
    gradeSubmission,
    getSubmissionById,
    getSubmissionsByAssignment,
    getSubmissionsByStudent,
    
    // Toast
    toast,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
