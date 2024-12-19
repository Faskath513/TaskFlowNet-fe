import React, { useState } from 'react';

const EmployeeSelfAssessment = () => {
  const [assessment, setAssessment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Self-assessment submitted!');
  };

  return (
    <div>
      <h1>Self-Assessment</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={assessment}
          onChange={(e) => setAssessment(e.target.value)}
          placeholder="Describe your performance..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeSelfAssessment;
