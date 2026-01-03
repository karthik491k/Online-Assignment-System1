import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { formatDate, isOverdue, fileAPI } from '../../services/api';

const SubmitAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { getAssignmentById, addSubmission, getSubmissionsByStudent } = useApp();
  
  const assignment = getAssignmentById(id);
  const mySubmissions = getSubmissionsByStudent(user.id);
  const alreadySubmitted = mySubmissions.some(s => s.assignmentId === id);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  if (!assignment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-gray-500">Assignment not found</p>
          <button onClick={() => navigate('/student/assignments')} className="btn-primary inline-block mt-4">
            Back to Assignments
          </button>
        </div>
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Already Submitted</h2>
          <p className="text-gray-600 mb-6">You have already submitted this assignment.</p>
          <div className="space-x-4">
            <button onClick={() => navigate('/student/assignments')} className="btn-secondary">
              Back to Assignments
            </button>
            <button onClick={() => navigate('/student/submissions')} className="btn-primary">
              View My Submissions
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        setSelectedFile(null);
        return;
      }
      setError('');
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Upload file (mock)
      const fileData = await fileAPI.uploadFile(selectedFile);
      
      // Create submission
      addSubmission({
        assignmentId: assignment.id,
        studentId: user.id,
        studentName: user.name,
        fileName: fileData.fileName,
        fileSize: fileData.fileSize,
        fileType: fileData.fileType,
        fileUrl: fileData.fileUrl,
        comment: data.comment || '',
      });

      navigate('/student/submissions');
    } catch (err) {
      setError('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const deadlinePassed = isOverdue(assignment.deadline);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/student/assignments')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
          >
            ← Back to Assignments
          </button>
        </div>

        {/* Assignment Details */}
        <div className="card mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{assignment.title}</h1>
          <p className="text-gray-600 mb-6">{assignment.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500 font-medium">Deadline</p>
              <p className={`font-medium ${deadlinePassed ? 'text-red-600' : 'text-gray-900'}`}>
                {formatDate(assignment.deadline)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Allowed File Types</p>
              <p className="text-gray-900">{assignment.allowedFileTypes}</p>
            </div>
          </div>

          {deadlinePassed && (
            <div className="mt-4 bg-red-100 border border-red-400 rounded p-3">
              <p className="text-red-700 font-medium">⚠️ This assignment is overdue</p>
            </div>
          )}
        </div>

        {/* Submission Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Work</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100
                  cursor-pointer"
                accept=".pdf,.doc,.docx,.zip"
              />
              <p className="text-sm text-gray-500 mt-2">
                Accepted formats: {assignment.allowedFileTypes} (Max 10MB)
              </p>
              {selectedFile && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment (Optional)
              </label>
              <textarea
                {...register('comment')}
                className="input-field min-h-[100px]"
                placeholder="Add any comments or notes about your submission..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Submit Assignment'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/student/assignments')}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Submission Guidelines */}
        <div className="card mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Submission Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Ensure your file is in the correct format</li>
            <li>• Name your file appropriately (e.g., YourName_Assignment.pdf)</li>
            <li>• Double-check your work before submitting</li>
            <li>• You can only submit once per assignment</li>
            <li>• Late submissions may be penalized</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignment;
