import express from 'express';

const router = express.Router();

const reviews = [
  { _id: 'r1', courseID: '1', userID: { username: 'huskyfan22' }, difficultyRating: 3, workloadRating: 3, overallRating: 5, reviewText: 'Great intro course!', createdAt: '2025-11-10' },
  { _id: 'r2', courseID: '1', userID: { username: 'cs_freshman' }, difficultyRating: 2, workloadRating: 3, overallRating: 4, reviewText: 'Good pacing if you have zero experience.', createdAt: '2025-10-22' },
  { _id: 'r3', courseID: '2', userID: { username: 'recursion_enjoyer' }, difficultyRating: 4, workloadRating: 5, overallRating: 4, reviewText: 'Hard but you come out a much better programmer.', createdAt: '2025-11-15' },
];

// GET /api/courses/:id/reviews
router.get('/courses/:id/reviews', (req, res) => {
  const courseReviews = reviews.filter(r => r.courseID === req.params.id);
  res.json(courseReviews);
});

export default router;