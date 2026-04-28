const jobMatches = [
  { id: 1, title: "Frontend Developer", company: "Amazon", location: "Remote", salary: "₹8-12 LPA", match: "95%", emoji: "🏢" },
  { id: 2, title: "React Developer", company: "Razorpay", location: "Bangalore", salary: "₹12-18 LPA", match: "92%", emoji: "⚛️" },
  { id: 3, title: "UI/UX Designer", company: "Flipkart", location: "Hybrid", salary: "₹25K/month", match: "88%", emoji: "🎨" },
  { id: 4, title: "Backend Engineer", company: "Google", location: "Bangalore", salary: "₹15-20 LPA", match: "85%", emoji: "💻" },
  { id: 5, title: "Full Stack Developer", company: "Swiggy", location: "Mumbai", salary: "₹10-15 LPA", match: "82%", emoji: "🚀" },
];

const myApplications = [
  { id: 1, title: "Frontend Developer", company: "Amazon", emoji: "🏢", status: "Shortlisted", date: "25 Apr 2026" },
  { id: 2, title: "UI/UX Designer", company: "Flipkart", emoji: "🎨", status: "Pending", date: "24 Apr 2026" },
  { id: 3, title: "React Developer", company: "Razorpay", emoji: "⚛️", status: "Pending", date: "23 Apr 2026" },
  { id: 4, title: "Backend Engineer", company: "Google", emoji: "💻", status: "Rejected", date: "20 Apr 2026" },
  { id: 5, title: "Full Stack Developer", company: "Swiggy", emoji: "🚀", status: "Pending", date: "18 Apr 2026" },
];

// Show Section
function showSeekerSection(name, btn) {
  document.querySelectorAll('.seeker-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('seeker-' + name).classList.add('active');
  btn.classList.add('active');

  if (name === 'matches') loadMatches();
  if (name === 'applications') loadApplications();
}

// Load Job Matches
function loadMatches() {
  const list = document.getElementById('matches-list');
  list.innerHTML = jobMatches.map(j => `
    <div class="job-match-card">
      <div class="match-score">${j.match}</div>
      <div class="match-info">
        <div class="match-title">${j.title}</div>
        <div class="match-company">${j.company} • ${j.location}</div>
        <div class="match-salary">${j.salary}</div>
      </div>
      <button class="match-apply" onclick="applyJob('${j.title}', '${j.company}')">Apply Now</button>
    </div>
  `).join('');
}

// Load Applications
function loadApplications() {
  const list = document.getElementById('applications-list');
  list.innerHTML = myApplications.map(a => `
    <div class="app-card">
      <div class="app-emoji">${a.emoji}</div>
      <div class="app-info">
        <div class="app-title">${a.title}</div>
        <div class="app-company">${a.company}</div>
        <div class="app-date">Applied: ${a.date}</div>
      </div>
      <span class="badge ${
        a.status === 'Shortlisted' ? 'badge-green' :
        a.status === 'Rejected' ? 'badge-red' : 'badge-orange'
      }" style="padding:6px 14px;border-radius:20px;font-size:12px;">${a.status}</span>
    </div>
  `).join('');
}

// Apply Job
function applyJob(title, company) {
  alert(`Application submitted for ${title} at ${company}! We will contact you soon.`);
}