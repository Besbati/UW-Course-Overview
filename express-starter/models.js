import mongoose from 'mongoose';

let models = {};
main().catch(err => console.log(err))

async function main() {
  console.log("connecting to mongodb")

  await mongoose.connect('mongodb+srv://dbejar17_db_user:cs0D7z8LZROzMwbb@cluster0.zsyoary.mongodb.net/realmadrid?appName=Cluster0');

  console.log("successfully connected to mongodb");

  // Create schema

  const courseSchema = new mongoose.Schema({
    courseID: String,
    department: String,
    courseNumber: String,
    title: String,
    description: String,
    credits: String,
    syllabusLink: String
  })

  const userSchema = new mongoose.Schema({
    userID: String,
    username: String,
    email: String,
    passwordHash: String,
    createdAt: { type: Date, default: Date.now }
  })

  const reviewSchema = new mongoose.Schema({
    reviewID: String,
    courseID: String,
    userID: String,
    difficultyRating: String,
    workloadRating: String,
    overallRating: String,
    reviewText: String,
    createdAt: { type: Date, default: Date.now }
  })

  const threadSchema = new mongoose.Schema({
    threadID: String,
    courseID: String,
    title: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now }
  })

  const commentSchema = new mongoose.Schema({
    commentID: String,
    threadID: String,
    userID: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
  })

  models.Course = mongoose.model('Course', courseSchema);
  models.User = mongoose.model('User', userSchema);
  models.Review = mongoose.model('Review', reviewSchema);
  models.Thread = mongoose.model('Thread', threadSchema);
  models.Comment = mongoose.model('Comment', commentSchema);
  console.log("mongoose models created")
}

/* const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow')); */

export default models;