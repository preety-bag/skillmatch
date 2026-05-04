// Jobs Data
const jobs = [
  { id: 1, title: "Frontend Developer", company: "Amazon", location: "Remote", salary: "₹8-12 LPA", type: "Full Time", category: "tech", emoji: "🏢", tags: ["React", "JavaScript", "CSS"] },
  { id: 2, title: "Backend Engineer", company: "Google", location: "Bangalore", salary: "₹15-20 LPA", type: "Full Time", category: "tech", emoji: "💻", tags: ["Node.js", "MongoDB", "Python"] },
  { id: 3, title: "UI/UX Designer", company: "Flipkart", location: "Hybrid", salary: "₹25K/month", type: "Internship", category: "design", emoji: "🎨", tags: ["Figma", "CSS", "Adobe XD"] },
  { id: 4, title: "Data Analyst", company: "Microsoft", location: "Hyderabad", salary: "₹10-14 LPA", type: "Full Time", category: "tech", emoji: "📊", tags: ["Python", "SQL", "Excel"] },
  { id: 5, title: "Digital Marketer", company: "Swiggy", location: "Mumbai", salary: "₹6-9 LPA", type: "Full Time", category: "marketing", emoji: "📢", tags: ["SEO", "Social Media", "Analytics"] },
  { id: 6, title: "Financial Analyst", company: "HDFC Bank", location: "Delhi", salary: "₹8-12 LPA", type: "Full Time", category: "finance", emoji: "💰", tags: ["Excel", "Finance", "Accounting"] },
  { id: 7, title: "HR Manager", company: "Infosys", location: "Pune", salary: "₹7-10 LPA", type: "Full Time", category: "hr", emoji: "👥", tags: ["Recruitment", "HR Policy", "Communication"] },
  { id: 8, title: "Graphic Designer", company: "Zomato", location: "Remote", salary: "₹20K/month", type: "Internship", category: "design", emoji: "🖌️", tags: ["Photoshop", "Illustrator", "Canva"] },
  { id: 9, title: "React Developer", company: "Razorpay", location: "Bangalore", salary: "₹12-18 LPA", type: "Full Time", category: "tech", emoji: "⚛️", tags: ["React", "TypeScript", "Redux"] },
];

let currentCategory = "all";

// Display Jobs
function displayJobs(list) {
  const grid = document.getElementById("jobs-grid");
  if (list.length === 0) {
    grid.innerHTML = `<p style="color:#64748b;padding:20px;">No jobs found!</p>`;
    return;
  }
  grid.innerHTML = list.map(j => `
    <div class="job-card">
      <div class="job-card-top">
        <div class="company-logo">${j.emoji}</div>
        <div>
          <div class="job-title">${j.title}</div>
          <div class="company-name">${j.company} • ${j.location}</div>
        </div>
      </div>
      <div class="job-tags">
        ${j.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        <span class="tag ${j.type === 'Internship' ? 'orange' : 'green'}">${j.type}</span>
      </div>
      <div class="job-footer">
        <span class="salary">${j.salary}</span>
        <button class="apply-btn" onclick="applyJob(${j.id})">Apply Now</button>
      </div>
    </div>
  `).join('');
}

// Filter by category
function filterJobs(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.cat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

// Search
function searchJobs() {
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById("search-job").value.toLowerCase();
  let filtered = jobs;
  if (currentCategory !== "all") {
    filtered = filtered.filter(j => j.category === currentCategory);
  }
  if (query) {
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(query) ||
      j.company.toLowerCase().includes(query) ||
      j.tags.some(t => t.toLowerCase().includes(query))
    );
  }
  displayJobs(filtered);
}

// Apply Job
function applyJob(id) {
  const job = jobs.find(j => j.id === id);
  alert(`Application submitted for ${job.title} at ${job.company}! We will contact you soon.`);
}

// Show Dashboard
function showDashboard() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  displayJobs(jobs);
}

// Modal functions
function showLogin() {
  document.getElementById('login-modal').classList.add('open');
}

function showRegister() {
  document.getElementById('register-modal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
function selectRole(role, btn) {
  btn.closest('.role-select').querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  btn.closest('.role-select').dataset.selected = role;
}

function loginUser() {
  const modal = document.getElementById('login-modal');
  const roleSelected = modal.querySelector('.role-select').dataset.selected || 'seeker';
  const email = modal.querySelectorAll('input')[0].value;
  const password = modal.querySelectorAll('input')[1].value;

  if (!email || !password) {
    alert('Please enter email and password!');
    return;
  }

  // Admin credentials check
  if (roleSelected === 'admin') {
    if (email === 'admin@skillmatch.com' && password === 'skill123') {
      window.location.href = 'admin.html';
    } else {
      alert('Wrong admin credentials!');
    }
  }
  // Recruiter credentials check
  else if (roleSelected === 'recruiter') {
    if (email === 'hr@techcorp.com' && password === 'recruiter123') {
      window.location.href = 'recruiter.html';
    } else {
      alert('Wrong recruiter credentials!');
    }
  }
  // Job Seeker credentials check
  else {
    if (email === 'rahul@gmail.com' && password === 'seeker123') {
      window.location.href = 'seeker.html';
    } else {
      alert('Wrong credentials!');
    }
  }
}

function switchModal(close, open) {
  closeModal(close);
  document.getElementById(open).classList.add('open');
}

function selectRole(role, btn) {
  btn.closest('.role-select').querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Particles Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.6 + 0.2
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59,130,246,${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59,130,246,${0.15 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

drawParticles();
