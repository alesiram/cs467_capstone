// SkillMetricsModal.js
import React, { useState, useEffect } from 'react';

const SkillMetricsModal = ({ onClose }) => {
  const [metrics, setMetrics] = useState({ mostPopularSkill: null, averageSkills: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMetrics = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // Fetch most popular skill
      const popularSkillResponse = await fetch('/skills/popular', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const popularSkillData = await popularSkillResponse.json();
      
      // Fetch average skills and rating
      const averageSkillsResponse = await fetch('/skills/averages', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const averageSkillsData = await averageSkillsResponse.json();
      
      if (!popularSkillResponse.ok || !averageSkillsResponse.ok) {
        throw new Error('Failed to fetch skill metrics');
      }

      setMetrics({
        mostPopularSkill: popularSkillData,
        averageSkills: averageSkillsData,
      });
    } catch (error) {
      setError('Failed to load skill metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="skills-page__modal-backdrop">
      <div className="skills-page__modal" role="dialog" aria-modal="true" aria-labelledby="metricsModalTitle">
        <h2 id="metricsModalTitle">Skill Metrics</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <p>The most popular skill is {metrics.mostPopularSkill?._id} with an average rating of {metrics.mostPopularSkill?.averageRating.toFixed(1)}!</p>
            <p>The average user has {metrics.averageSkills?.averageNumberOfSkills.toFixed(1)} skills!</p>
            <p>Their average skill is rated at {metrics.averageSkills?.overallAverageRating.toFixed(1)}!</p>
          </div>
        )}
        <button type="button" className="skills-page__button--cancel" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SkillMetricsModal;
