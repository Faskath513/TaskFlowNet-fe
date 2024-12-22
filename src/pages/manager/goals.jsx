import React, { useState, useEffect } from 'react';
import { fetchGoals } from '../../utils/api';

const ManagerGoals = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const loadGoals = async () => {
      const data = await fetchGoals();
      setGoals(data);
    };
    loadGoals();
  }, []);

  return (
    <div>
      <h1>Employee Goals</h1>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.description} - {goal.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerGoals;
