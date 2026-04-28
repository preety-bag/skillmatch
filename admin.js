const ADMIN_USER = 'admin';
const ADMIN_PASS = 'skill123';

// Sample Data
const users = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "Job Seeker", status: "Active" },
  { id: 2, name: "Priya Singh", email: "priya@gmail.com", role: "Job Seeker", status: "Active" },
  { id: 3, name: "Tech Corp HR", email: "hr@techcorp.com", role: "Recruiter", status: "Active" },
  { id: 4, name: "Amit Kumar", email: "amit@gmail.com", role: "Job Seeker", status: "Banned" },
  { id: 5, name: "Neha Gupta", email: "neha@startup.com", role: "Recruiter", status: "Active" },
];

const companies = [
  { id: 1, name: "Amazon India", email: "hr@amazon.in", jobs: 12, status: "Verified" },
  { id: 2, name: "TechStartup Pvt", email: "hr@techstartup.com", jobs: 3, status: "Pending" },
  { id: 3, name: "Google India", email: "careers@google.in", jobs: 8, status: "Verified" },
  { id: 4, name: "FakeJobs Co", email: "fake@fakejobs.com", jobs: 1, status: "Rejected" },
  { id: 5, name: "Flipkart", email: "hr@flipkart.com", jobs: 6, status: "Verified" },
];

let adminJobs = [
  { id: 1, title: "Frontend Developer", company: "Amazon", category: "tech", type: "Full Time" },
  { id: 2, title: "Backend Engineer", company: "Google", category: "tech", type: "Full Time" },
  { id: 3, title: "UI/UX Designer", company: "Flipkart", category: "design", type: "Internship" },
  { id: 4, title: "Data Analyst", company: "Microsoft", category: "tech", type: "Full Time" },
  { id: 5, title: "Digital Marketer", company: "Swiggy", category: "marketing", type: "Full Time" },
];

const applications = [
  { id: 1, applicant: "Rahul Sharma", job: "Frontend Developer", company: "Amazon", status: "Pending" },
  { id: 2, applicant: "Priya Singh", job: "UI/UX Designer", company: "Flipkart", status: "Shortlisted" },
  { id: 3, applicant: "Amit Kumar", job: "Backend Engineer", company: "Google", status: "Rejected" },
  { id: 4, applicant: "Neha Gupta", job: "Data Analyst", company: "Microsoft", status: "Pending" },
];

let announcements = [];

// Login
function adminLogin() {
  const user = document.getElementById('admin-user').value;
  const pass = document.getElementById('admin-pass').value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadAllData();
  } else {
    document.getElementById('error-msg').textContent = 'Wrong username or password!';
  }
}

// Logout
function adminLogout() {
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
}

// Show Section
function showSection(name, btn) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  btn.classList.add('active');
}

// Load All Data
function loadAllData() {
  loadUsers();
  loadCompanies();
  loadJobs();
  loadApplications();
}

// Load Users
function loadUsers() {
  const tbody = document.getElementById('users-tbody');
  tbody.innerHTML = users.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td><span class="badge badge-blue">${u.role}</span></td>
      <td><span class="badge ${u.status === 'Active' ? 'badge-green' : 'badge-red'}">${u.status}</span></td>
      <td>
        <button class="action-btn btn-ban" onclick="toggleBan(${u.id})">${u.status === 'Active' ? 'Ban' : 'Unban'}</button>
        <button class="action-btn btn-delete" onclick="deleteUser(${u.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Toggle Ban User
function toggleBan(id) {
  const user = users.find(u => u.id === id);
  user.status = user.status === 'Active' ? 'Banned' : 'Active';
  loadUsers();
}

// Delete User
function deleteUser(id) {
  if (confirm('Delete this user?')) {
    const index = users.findIndex(u => u.id === id);
    users.splice(index, 1);
    loadUsers();
  }
}

// Load Companies
function loadCompanies() {
  const tbody = document.getElementById('companies-tbody');
  tbody.innerHTML = companies.map(c => `
    <tr>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.jobs}</td>
      <td><span class="badge ${
        c.status === 'Verified' ? 'badge-green' :
        c.status === 'Pending' ? 'badge-orange' : 'badge-red'
      }">${c.status}</span></td>
      <td>
        <button class="action-btn btn-approve" onclick="approveCompany(${c.id})">Approve</button>
        <button class="action-btn btn-reject" onclick="rejectCompany(${c.id})">Reject</button>
      </td>
    </tr>
  `).join('');
}

// Approve Company
function approveCompany(id) {
  const company = companies.find(c => c.id === id);
  company.status = 'Verified';
  loadCompanies();
}

// Reject Company
function rejectCompany(id) {
  const company = companies.find(c => c.id === id);
  company.status = 'Rejected';
  loadCompanies();
}

// Load Jobs
function loadJobs() {
  const tbody = document.getElementById('jobs-tbody');
  tbody.innerHTML = adminJobs.map(j => `
    <tr>
      <td>${j.title}</td>
      <td>${j.company}</td>
      <td><span class="badge badge-blue">${j.category}</span></td>
      <td><span class="badge ${j.type === 'Internship' ? 'badge-orange' : 'badge-green'}">${j.type}</span></td>
      <td>
        <button class="action-btn btn-delete" onclick="deleteJob(${j.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Add Job
function addJob() {
  const title = document.getElementById('j-title').value;
  const company = document.getElementById('j-company').value;
  const category = document.getElementById('j-category').value;
  const type = document.getElementById('j-type').value;
  const location = document.getElementById('j-location').value;
  const salary = document.getElementById('j-salary').value;

  if (!title || !company || !category || !type) {
    alert('Please fill all required fields!');
    return;
  }

  adminJobs.push({ id: Date.now(), title, company, category, type, location, salary });
  loadJobs();

  document.getElementById('j-title').value = '';
  document.getElementById('j-company').value = '';
  document.getElementById('j-salary').value = '';
  document.getElementById('j-location').value = '';
  document.getElementById('j-category').value = '';
  document.getElementById('j-type').value = '';

  alert('Job added successfully!');
}

// Delete Job
function deleteJob(id) {
  if (confirm('Delete this job?')) {
    const index = adminJobs.findIndex(j => j.id === id);
    adminJobs.splice(index, 1);
    loadJobs();
  }
}

// Load Applications
function loadApplications() {
  const tbody = document.getElementById('apps-tbody');
  tbody.innerHTML = applications.map(a => `
    <tr>
      <td>${a.applicant}</td>
      <td>${a.job}</td>
      <td>${a.company}</td>
      <td><span class="badge ${
        a.status === 'Shortlisted' ? 'badge-green' :
        a.status === 'Rejected' ? 'badge-red' : 'badge-orange'
      }">${a.status}</span></td>
      <td>
        <button class="action-btn btn-approve" onclick="updateApp(${a.id}, 'Shortlisted')">Shortlist</button>
        <button class="action-btn btn-reject" onclick="updateApp(${a.id}, 'Rejected')">Reject</button>
      </td>
    </tr>
  `).join('');
}

// Update Application
function updateApp(id, status) {
  const app = applications.find(a => a.id === id);
  app.status = status;
  loadApplications();
}

// Send Announcement
function sendAnnouncement() {
  const text = document.getElementById('announce-text').value;
  if (!text) {
    alert('Please write an announcement!');
    return;
  }

  announcements.push({ text, date: new Date().toLocaleDateString() });

  const list = document.getElementById('announce-list');
  list.innerHTML = `<h3>Recent Announcements</h3>` +
    announcements.map(a => `
      <div style="background:#1e3a6e;border-radius:8px;padding:12px;margin-top:10px;">
        <p style="color:#e2e8f0;font-size:14px;">${a.text}</p>
        <p style="color:#64748b;font-size:11px;margin-top:6px;">${a.date}</p>
      </div>
    `).join('');

  document.getElementById('announce-text').value = '';
  alert('Announcement sent to all users!');
}