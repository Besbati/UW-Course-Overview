// app.js — Course browser
// Fetches courses from GET /api/courses and renders them.

const API = '/api/courses';

let allCourses = [];
let activeDept = 'all';

// ── Fetch courses from the backend ────────────────────────────────────────────
async function loadCourses() {
  const statusMsg  = document.getElementById('statusMsg');
  const courseGrid = document.getElementById('courseGrid');

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    allCourses = await res.json();
    statusMsg.textContent = '';
    renderCourses();
  } catch (err) {
    statusMsg.textContent = `Could not load courses. Is the server running? (${err.message})`;
    console.error(err);
  }
}

// ── Render filtered list ──────────────────────────────────────────────────────
function renderCourses() {
  const query      = document.getElementById('searchInput').value.toLowerCase();
  const courseGrid = document.getElementById('courseGrid');
  const statusMsg  = document.getElementById('statusMsg');

  const filtered = allCourses.filter((c) => {
    const matchDept   = activeDept === 'all' || c.department === activeDept;
    const matchSearch = !query ||
      `${c.department} ${c.courseNumber} ${c.title}`.toLowerCase().includes(query);
    return matchDept && matchSearch;
  });

  if (filtered.length === 0) {
    courseGrid.innerHTML = '<p class="empty-state">No courses match your search.</p>';
    return;
  }

  courseGrid.innerHTML = filtered.map((c) => `
    <div class="course-card" onclick="openCourse('${c._id}')">
      <div class="card-top">
        <span class="badge badge-dept">${c.department}</span>
        <span class="badge badge-credits">${c.credits} cr</span>
      </div>
      <div class="card-code">${c.department} ${c.courseNumber}</div>
      <div class="card-title">${c.title}</div>
      <div class="card-desc">${c.description || ''}</div>
      <div class="card-footer">
        <span class="stars">${stars(c.avgOverall)}</span>
        <strong>${c.avgOverall ? c.avgOverall.toFixed(1) : 'N/A'}</strong>
        <span>(${c.reviewCount ?? 0} reviews)</span>
      </div>
    </div>
  `).join('');
}

// ── Department filter ─────────────────────────────────────────────────────────
function setDept(btn, dept) {
  activeDept = dept;
  document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
  btn.classList.add('active');
  renderCourses();
}

// ── Search input handler ──────────────────────────────────────────────────────
function filterCourses() {
  renderCourses();
}

// ── Navigate to course detail page ────────────────────────────────────────────
function openCourse(id) {
  window.location.href = `course.html?id=${id}`;
}

// ── Star string helper ────────────────────────────────────────────────────────
function stars(val) {
  if (!val) return '☆☆☆☆☆';
  const full  = Math.round(val);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

// ── Init ──────────────────────────────────────────────────────────────────────
loadCourses();