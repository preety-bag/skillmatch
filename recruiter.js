let myJobs = [
  { id: 1, title: "Frontend Developer", type: "Full Time", applications: 12, status: "Active" },
  { id: 2, title: "React Developer", type: "Full Time", applications: 8, status: "Active" },
  { id: 3, title: "UI/UX Designer", type: "Internship", applications: 15, status: "Active" },
  { id: 4, title: "Backend Engineer", type: "Full Time", applications: 6, status: "Closed" },
];

const recruiterApps = [
  { id: 1, applicant: "Rahul Sharma", job: "Frontend Developer", skills: "React, JS, CSS", status: "Shortlisted" },
  { id: 2, applicant: "Priya Singh", job: "UI/UX Designer", skills: "Figma, Adobe XD", status: "Pending" },
  { id: 3, applicant: "Amit Kumar", job: "React Developer", skills: "React, TypeScript", status: "Pending" },
  { id: 4, applicant: "Neha Gupta", job: "Frontend Developer", skills: "HTML, CSS, JS", status: "Rejected" },
  { id: 5, applicant: "Ravi Patel", job: "Backend Engineer", skills: "Node.js, MongoDB", status: "Shortlisted" },
];

const candidates = [
  { id: 1, name: "Rahul Sharma", skills: "React, JS, Node.js", experience: "2 years", match: "95%" },
  { id: 2, name: "Priya Singh", skills: "Figma, CSS, Adobe XD", experience: "1 year", match: "92%" },
  { id: 3, name: "Amit Kumar", skills: "React, TypeScript, Redux", experience: "3 years", match: "88%" },
  { id: 4, name: "Neha Gupta", skills: "HTML, CSS, JavaScript", experience: "1 year", match: "85%" },
  { id: 5, name: "Ravi Patel", skills: "Node.js, MongoDB, Express", experience: "2 years", match: "82%" },
];

// Show Section
function showRecruiterSection(name, btn) {
  document.querySelectorAll('.recruiter-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('recruiter-' + name).classList.add('active');
  btn.classList.add('active');

  if (name === 'my-jobs') loadMyJobs();
  if (name === 'applications') loadRecruiterApps();
  if (name === 'candidates') loadCandidates();
}

// Load My Jobs
function loadMyJobs() {
  const tbody = document.getElementById('my-jobs-tbody');
  tbody.innerHTML = myJobs.map(j => `
    <tr>
      <td>${j.title}</td>
      <td><span class="badge ${j.type === 'Internship' ? 'badge-orange' : 'badge-blue'}">${j.type}</span></td>
      <td>${j.applications}</td>
      <td><span class="badge ${j.status === 'Active' ? 'badge-green' : 'badge-red'}">${j.status}</span></td>
      <td>
        <button class="action-btn btn-approve" onclick="toggleJob(${j.id})">${j.status === 'Active' ? 'Close' : 'Reopen'}</button>
        <button class="action-btn btn-delete" onclick="deleteJob(${j.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Toggle Job Status
function toggleJob(id) {
  const job = myJobs.find(j => j.id === id);
  job.status = job.status === 'Active' ? 'Closed' : 'Active';
  loadMyJobs();
}

// Delete Job
function deleteJob(id) {
  if (confirm('Delete this job?')) {
    myJobs = myJobs.filter(j => j.id !== id);
    loadMyJobs();
  }
}

// Load Applications
function loadRecruiterApps() {
  const tbody = document.getElementById('recruiter-apps-tbody');
  tbody.innerHTML = recruiterApps.map(a => `
    <tr>
      <td>${a.applicant}</td>
      <td>${a.job}</td>
      <td><span style="color:#64748b;font-size:12px;">${a.skills}</span></td>
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
  const app = recruiterApps.find(a => a.id === id);
  app.status = status;
  loadRecruiterApps();
}

// Load Candidates
function loadCandidates() {
  const tbody = document.getElementById('candidates-tbody');
  tbody.innerHTML = candidates.map(c => `
    <tr>
      <td>${c.name}</td>
      <td><span style="color:#64748b;font-size:12px;">${c.skills}</span></td>
      <td>${c.experience}</td>
      <td><span class="badge badge-green">${c.match}</span></td>
      <td>
        <button class="action-btn btn-approve" onclick="alert('Interview scheduled for ${c.name}!')">Schedule Interview</button>
      </td>
    </tr>
  `).join('');
}

// Post Job
function postJob() {
  const title = document.getElementById('r-title').value;
  const type = document.getElementById('r-type').value;
  const category = document.getElementById('r-category').value;
  const location = document.getElementById('r-location').value;
  const salary = document.getElementById('r-salary').value;

  if (!title || !type || !category) {
    alert('Please fill all required fields!');
    return;
  }

  myJobs.push({
    id: Date.now(),
    title, type, category, location, salary,
    applications: 0, status: 'Active'
  });

  alert('Job posted successfully! Waiting for admin approval.');

  document.getElementById('r-title').value = '';
  document.getElementById('r-type').value = '';
  document.getElementById('r-category').value = '';
  document.getElementById('r-location').value = '';
  document.getElementById('r-salary').value = '';
  document.getElementById('r-skills').value = '';
}