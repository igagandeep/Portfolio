'use client';

import { useState, useEffect } from 'react';
import validateProjectForm from '../utils/validateProjectForm';

const AddProjectForm = ({ initialData = null, onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    type: '',
    description: '',
    techStack: '',
    liveLink: '',
    coverImage: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        techStack: initialData.techStack.join(', '),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateProjectForm(form);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()),
    };

    onSubmit(initialData?._id, payload);
  };


  return (
    <div suppressHydrationWarning={true}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          name='title'
          placeholder='Project Title'
          value={form.title}
          onChange={handleChange}
          className='w-full p-2 border rounded dark:bg-gray-900 dark:border-white/20'
        />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title}</p>}

        <select
          name='type'
          value={form.type}
          onChange={handleChange}
          className='w-full p-2 border rounded dark:bg-gray-900 dark:border-white/20'
        >
          <option value=''>Select Project Type</option>
          <option value='Web App'>Web App</option>
          <option value='Mobile App'>Mobile App</option>
          <option value='Other'>Other</option>
        </select>
        {errors.type && <p className='text-red-500 text-sm'>{errors.type}</p>}

        <textarea
          name='description'
          placeholder='Description'
          maxLength={1000}
          value={form.description}
          onChange={handleChange}
          className='w-full p-2 border rounded dark:bg-gray-900 dark:border-white/20'
        />
        {errors.description && (
          <p className='text-red-500 text-sm'>{errors.description}</p>
        )}

        <input
          name='techStack'
          placeholder='Tech Stack (comma separated)'
          value={form.techStack}
          onChange={handleChange}
          className='w-full p-2 border rounded dark:bg-gray-900 dark:border-white/20'
        />
        {errors.techStack && (
          <p className='text-red-500 text-sm'>{errors.techStack}</p>
        )}

        <input
          name='liveLink'
          type='url'
          placeholder='Live Link (https://...)'
          value={form.liveLink}
          onChange={handleChange}
          className='w-full p-2 border rounded dark:bg-gray-900 dark:border-white/20'
        />
        {errors.liveLink && (
          <p className='text-red-500 text-sm'>{errors.liveLink}</p>
        )}

        <input
          name='coverImage'
          type='url'
          placeholder='Cover Image URL'
          value={form.coverImage}
          onChange={handleChange}
          className='w-full p-2 border rounded dark:bg-gray-900 dark:border-white/20'
        />
        {errors.coverImage && (
          <p className='text-red-500 text-sm'>{errors.coverImage}</p>
        )}

        <button
          type='submit'
          className='bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800'
        >
          {initialData ? 'Update Project' : 'Save Project'}
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;
