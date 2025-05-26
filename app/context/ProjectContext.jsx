'use client';

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const getProjects = async () => {
    const res = await axios.get('http://localhost:5000/api/projects');
    setProjects(res.data);
  };

  const createProject = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/projects', data);
      toast.success('Project created successfully');
      await getProjects();
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.errors?.join(', ') || err.message;
      toast.error(`Create failed: ${msg}`);
      throw err;
    }
  };
  const deleteProject = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/projects/${id}`);
    await getProjects();
    return res.data;
  };

  const updateProject = async (id, proj) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/projects/${id}`,
        proj
      );
      toast.success('Project updated successfully');
      await getProjects();
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.errors?.join(', ') || err.message;
      toast.error(`Update failed: ${msg}`);
      throw err;
    }
  };
  const openCreate = () => {
    setEditing(null);
    setShowModal(true);
  };
  const openEdit = (proj) => {
    setEditing(proj);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const submitProject = async (id, data) => {
    if (id) await updateProject(id, data);
    else await createProject(data);
    setShowModal(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        showModal,
        editing,
        openCreate,
        openEdit,
        closeModal,
        submitProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
