import React, { useState, useEffect } from 'react';
import { fetchFeedback } from '../../utils/api';

const EmployeeFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const loadFeedback = async () => {
      const data = await fetchFeedback();
      setFeedback(data);
    };
    loadFeedback();
  }, []);

  return (
    <div>
      <h1>Your Feedback</h1>
      <ul>
        {feedback.map((item) => (
          <li key={item.id}>
            {item.message} - {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeFeedback;
