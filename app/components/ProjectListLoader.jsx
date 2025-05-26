import React from 'react';

const ProjectListLoader = () => {
  return (
    <div className='w-10/12 mx-auto py-12  flex flex-col items-center justify-center gap-4'>
      <table className='w-full border border-gray-300 dark:border-white/30 text-left'>
        <thead className='bg-lightHover dark:bg-darkHover uppercase text-sm font-semibold'>
          <tr>
            <th className='p-4'>Cover</th>
            <th className='p-4'>Title</th>
            <th className='p-4'>Description</th>
            <th className='p-4'>Tech Stack</th>
            <th className='p-4 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-white/10'>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className='align-top animate-pulse'>
              <td className='p-4 w-28'>
                <div className='h-12 w-20 bg-gray-200 dark:bg-gray-700 rounded'></div>
              </td>
              <td className='p-4'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
              </td>
              <td className='p-4'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full'></div>
                <div className='mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6'></div>
              </td>
              <td className='p-4'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
              </td>
              <td className='p-4 text-center'>
                <div className='inline-block h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 mr-2'></div>
                <div className='inline-block h-4 bg-gray-200 dark:bg-gray-700 rounded w-12'></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListLoader;
