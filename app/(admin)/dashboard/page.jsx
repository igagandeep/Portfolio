'use client';

import React, { useContext, useEffect } from 'react';

import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { ProjectContext } from '@/app/context/ProjectContext';
import ProjectListLoader from '@/app/components/ProjectListLoader';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) return null;
  const { projects, deleteProject, openEdit } = useContext(ProjectContext);

  const handleDelete = async (id) => {
    try {
      const { message } = await deleteProject(id);
      toast.success(message);
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        err.response?.data?.errors?.join(', ') ||
        err.message;
      toast.error(`Delete failed: ${errMsg}`);
    }
  };

  if (projects === null) {
    return <ProjectListLoader />;
  }

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
          {projects.length === 0 ? (
            <tr>
              <td
                colSpan='5'
                className='p-20 text-center w-full py-12 text-gray-500 dark:text-white/70'
              >
                No project found
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project._id} className='align-top'>
                <td className='p-4 w-28'>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={80}
                    height={50}
                    className='rounded-md object-cover'
                  />
                </td>
                <td className='p-4 font-semibold'>{project.title}</td>
                <td className='p-4 max-w-md truncate'>
                  {project?.description?.length > 50
                    ? project.description.slice(0, 50) + '…'
                    : project.description}
                </td>
                <td className='p-4'>
                  <div className='flex flex-wrap gap-1'>
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className='bg-gray-200 dark:bg-white/20 text-xs px-2 py-0.5 rounded-full'
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className='bg-gray-300 dark:bg-white/30 text-xs px-2 py-0.5 rounded-full'>
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className='p-4 text-center whitespace-nowrap'>
                  <button
                    onClick={() => openEdit(project)}
                    className='text-blue-500 hover:underline mr-3'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className='text-red-500 hover:underline'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
