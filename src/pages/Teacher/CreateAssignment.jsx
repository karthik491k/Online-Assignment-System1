import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApp } from '../../context/AppContext';

const CreateAssignment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { addAssignment } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      addAssignment(data);
      navigate('/teacher/assignments');
    } catch (error) {
      console.error('Error creating assignment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Assignment</h1>
          <p className="text-gray-600">Fill in the details to create a new assignment</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title *
              </label>
              <input
                type="text"
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 5,
                    message: 'Title must be at least 5 characters',
                  },
                })}
                className="input-field"
                placeholder="e.g., React Fundamentals Project"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 20,
                    message: 'Description must be at least 20 characters',
                  },
                })}
                className="input-field min-h-[120px]"
                placeholder="Provide detailed instructions for the assignment..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline *
              </label>
              <input
                type="datetime-local"
                {...register('deadline', {
                  required: 'Deadline is required',
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const now = new Date();
                    return selectedDate > now || 'Deadline must be in the future';
                  },
                })}
                className="input-field"
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed File Types *
              </label>
              <input
                type="text"
                {...register('allowedFileTypes', {
                  required: 'File types are required',
                })}
                className="input-field"
                placeholder="e.g., PDF, DOC, ZIP"
                defaultValue="PDF, DOC, DOCX, ZIP"
              />
              {errors.allowedFileTypes && (
                <p className="text-red-500 text-sm mt-1">{errors.allowedFileTypes.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Specify the file formats students can submit (comma-separated)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Points (Optional)
              </label>
              <input
                type="number"
                {...register('maxPoints')}
                className="input-field"
                placeholder="e.g., 100"
                defaultValue="100"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Assignment'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/teacher/assignments')}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
