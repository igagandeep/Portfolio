const validateProjectForm = (form) => {
  const errors = {};
  const urlRegex = /^https?:\/\/.+/;

  if (!form.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!['Web App', 'Mobile App', 'Other'].includes(form.type)) {
    errors.type = 'Valid type is required';
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required';
  } else if (form.description.length > 1000) {
    errors.description = 'Max 1000 characters allowed';
  }

  const techs = form.techStack.split(',').map((t) => t.trim()).filter(Boolean);
  if (techs.length === 0) {
    errors.techStack = 'At least one tech is required';
  }

  if (!urlRegex.test(form.liveLink)) {
    errors.liveLink = 'Valid live link required';
  }

  if (!urlRegex.test(form.coverImage)) {
    errors.coverImage = 'Valid image URL required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateProjectForm;
