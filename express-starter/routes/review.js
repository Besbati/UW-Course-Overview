import express from 'express';
import models from './models.js';

const router = express.Router();

const reviews = [
  { _id: 'r1', courseID: '1', userID: { username: 'huskyfan22' }, difficultyRating: 3, workloadRating: 3, overallRating: 5, reviewText: 'Great intro course!', createdAt: '2025-11-10' },
  { _id: 'r2', courseID: '1', userID: { username: 'cs_freshman' }, difficultyRating: 2, workloadRating: 3, overallRating: 4, reviewText: 'Good pacing if you have zero experience.', createdAt: '2025-10-22' },
  { _id: 'r3', courseID: '2', userID: { username: 'recursion_enjoyer' }, difficultyRating: 4, workloadRating: 5, overallRating: 4, reviewText: 'Hard but you come out a much better programmer.', createdAt: '2025-11-15' },
];

// GET /api/courses/:id/reviews
router.get('/courses/:id/reviews', async (req, res) => {
  try {
    const reviews = await models.Review.find({
      courseID: req.params.id
    })
    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch reviews" })
  }
});

router.post('/courses/:id/reviews', async (req, req) => {
  try {
    const { difficultyRating, workloadRating, overallRating, reviewText } = req.body;

    const newReview = await models.Review.create({
      courseID: req.params.id,
      userID: "demoUser",
      difficultyRating,
      workloadRating,
      overallRating,
      reviewText
    })

    res.status(200).json(newReview);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create review" })
  }
})

export default router;