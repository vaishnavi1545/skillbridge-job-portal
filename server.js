
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const jobs = [
  {
    id: 1,
    title: 'Junior Web Developer',
    company: 'PixelCraft Studio',
    category: 'Technology',
    type: 'Full-time',
    location: 'Nashik, Maharashtra',
    salary: '₹2.4–3.6 LPA',
    skills: 'HTML, CSS, JavaScript',
    description: 'Build responsive websites and work with a creative team.'
  },
  {
    id: 2,
    title: 'Electronics Assembly Trainee',
    company: 'VoltEdge Systems',
    category: 'Engineering',
    type: 'Internship',
    location: 'Ambad MIDC, Nashik',
    salary: '₹8,000–12,000/month',
    skills: 'PCB, Soldering, Testing',
    description: 'Assist with PCB assembly and electronic testing.'
  },
  {
    id: 3,
    title: 'Digital Marketing Intern',
    company: 'BrightPath Media',
    category: 'Marketing',
    type: 'Internship',
    location: 'Nashik, Maharashtra',
    salary: '₹8,000–10,000/month',
    skills: 'SEO, Social Media, Content',
    description: 'Support online marketing campaigns and social media.'
  }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/jobs', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const location = String(req.query.location || '').toLowerCase();

  const result = jobs.filter(job =>
    (job.title + ' ' + job.company + ' ' + job.skills)
      .toLowerCase().includes(q) &&
    job.location.toLowerCase().includes(location)
  );

  res.json(result);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === Number(req.params.id));

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json(job);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SkillBridge running on port ${PORT}`);
});
