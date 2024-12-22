import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../../utils/api';

const HRReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchReviews();
      setReviews(data);
    };
    loadReviews();
  }, []);

  return (
    <div>
      <h1>Performance Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.employeeName} - {review.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HRReviews;
