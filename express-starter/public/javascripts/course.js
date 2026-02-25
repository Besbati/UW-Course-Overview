// course.js — Course detail page
// Reads ?id= from the URL, fetches course + reviews from backend.

const params   = new URLSearchParams(window.location.search);
const courseId = params.get('id');

// ── Star string helper ────────────────────────────────────────────────────────
function stars(val) {
  if (!val) return '—';
  const full = Math.round(val);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function fmt(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Load course info ──────────────────────────────────────────────────────────
async function loadCourse() {
  if (!courseId) {
    document.getElementById('courseHeader').innerHTML =
      '<p class="status-msg">No course selected. <a href="index.html">Browse courses →</a></p>';
    return;
  }

  try {
    const res    = await fetch(`/api/courses/${courseId}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const course = await res.json();

    // Populate header
    document.title = `${course.department} ${course.courseNumber} — UW Course Overview`;
    document.getElementById('courseHeader').innerHTML = `
      <div class="dept-row">
        <span class="badge badge-dept">${course.department}</span>
        <span class="badge badge-credits">${course.credits} credits</span>
      </div>
      <h1>${course.department} ${course.courseNumber}: ${course.title}</h1>
      <p class="course-desc">${course.description || ''}</p>
    `;

    // Populate sidebar
    const ratings = course.ratings || {};
    document.getElementById('sdDept').textContent       = course.department;
    document.getElementById('sdNumber').textContent     = course.courseNumber;
    document.getElementById('sdCredits').textContent    = course.credits;
    document.getElementById('sdDifficulty').textContent = ratings.avgDifficulty ? ratings.avgDifficulty.toFixed(1) + '/5' : 'N/A';
    document.getElementById('sdWorkload').textContent   = ratings.avgWorkload   ? ratings.avgWorkload.toFixed(1)   + '/5' : 'N/A';
    document.getElementById('sdOverall').textContent    = ratings.avgOverall    ? ratings.avgOverall.toFixed(1)    + '/5' : 'N/A';
    document.getElementById('courseSidebar').style.display = '';

  } catch (err) {
    document.getElementById('courseHeader').innerHTML =
      `<p class="status-msg">Could not load course. (${err.message})</p>`;
    console.error(err);
  }
}

// ── Load reviews ──────────────────────────────────────────────────────────────
async function loadReviews() {
  if (!courseId) return;

  const reviewStatus = document.getElementById('reviewStatus');
  const reviewsList  = document.getElementById('reviewsList');

  try {
    const res     = await fetch(`/api/courses/${courseId}/reviews`);
    if (!res.ok) throw new Error(`${res.status}`);
    const reviews = await res.json();

    reviewStatus.textContent = '';

    if (reviews.length === 0) {
      reviewsList.innerHTML = '<p class="status-msg">No reviews yet for this course.</p>';
      return;
    }

    reviewsList.innerHTML = reviews.map((r) => `
      <div class="review-card">
        <div class="review-header">
          <div>
            <div class="review-author">@${r.userID?.username || 'Anonymous'}</div>
            <div class="review-date">${fmt(r.createdAt)}</div>
          </div>
          <span class="stars">${stars(r.overallRating)}</span>
        </div>
        <div class="review-ratings">
          <div class="rating-item">
            <span class="rating-item-label">Difficulty</span>
            <span class="rating-item-val">${r.difficultyRating}/5</span>
          </div>
          <div class="rating-item">
            <span class="rating-item-label">Workload</span>
            <span class="rating-item-val">${r.workloadRating}/5</span>
          </div>
          <div class="rating-item">
            <span class="rating-item-label">Overall</span>
            <span class="rating-item-val">${r.overallRating}/5</span>
          </div>
        </div>
        <div class="review-text">${r.reviewText}</div>
      </div>
    `).join('');

  } catch (err) {
    reviewStatus.textContent = `Could not load reviews. (${err.message})`;
    console.error(err);
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
loadCourse();
loadReviews();