
/* =========================================
   SKILLBRIDGE JOB PORTAL
   File: public/js/app.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. GET HTML ELEMENTS
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  const searchForm = document.getElementById("searchForm");
  const keywordInput = document.getElementById("keyword");
  const locationInput = document.getElementById("location");

  const jobSort = document.getElementById("jobSort");
  const jobList = document.getElementById("jobList");
  const jobCount = document.getElementById("jobCount");

  // Stop if essential HTML elements are missing.
  if (!jobList || !searchForm) {
    console.error("SkillBridge: Required HTML elements are missing.");
    return;
  }

  // 2. SAMPLE JOB DATA
  // Replace these sample records with real job listings later.
  const jobs = [
    {
      id: 1,
      title: "Software Developer",
      company: "Technology Careers",
      location: "Nashik",
      category: "Technology",
      type: "Entry Level",
      description:
        "Explore software development and programming opportunities.",
      image: "assets/job-placeholder.svg"
    },
    {
      id: 2,
      title: "Business Associate",
      company: "Business Careers",
      location: "Pune",
      category: "Business",
      type: "Full Time",
      description:
        "Support business operations and help teams grow.",
      image: "assets/company-building.svg"
    },
    {
      id: 3,
      title: "Graduate Trainee",
      company: "Graduate Careers",
      location: "Mumbai",
      category: "Entry Level",
      type: "Fresher",
      description:
        "Start your career and develop professional skills.",
      image: "assets/skill-development.svg"
    },
    {
      id: 4,
      title: "Web Developer",
      company: "Digital Careers",
      location: "Nashik",
      category: "Technology",
      type: "Entry Level",
      description:
        "Build responsive websites using HTML, CSS and JavaScript.",
      image: "assets/career-growth.svg"
    },
    {
      id: 5,
      title: "UI UX Designer",
      company: "Design Careers",
      location: "Pune",
      category: "Design",
      type: "Full Time",
      description:
        "Create useful and engaging digital user experiences.",
      image: "assets/job-search.svg"
    },
    {
      id: 6,
      title: "Technical Support Engineer",
      company: "Engineering Careers",
      location: "Mumbai",
      category: "Engineering",
      type: "Full Time",
      description:
        "Help users troubleshoot technical issues and solve problems.",
      image: "assets/job-success.svg"
    }
  ];

  let filteredJobs = [...jobs];

  // 3. MOBILE NAVIGATION MENU
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Toggle navigation"
      );

      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after selecting a navigation link.
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Toggle navigation");
        menuBtn.textContent = "☰";
      });
    });

    // Close the mobile menu with Escape.
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Toggle navigation");
        menuBtn.textContent = "☰";
      }
    });
  }

  // 4. DISPLAY JOB CARDS
  function displayJobs(list) {
    jobList.replaceChildren();

    if (jobCount) {
      jobCount.textContent =
        `${list.length} ${list.length === 1 ? "job" : "jobs"} found`;
    }

    if (list.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";

      const heading = document.createElement("h3");
      heading.textContent = "No jobs found";

      const message = document.createElement("p");
      message.textContent =
        "Try another job title or location.";

      emptyState.append(heading, message);
      jobList.appendChild(emptyState);
      return;
    }

    list.forEach(job => {
      const card = document.createElement("article");
      card.className = "job-card";

      const image = document.createElement("img");
      image.className = "job-image";
      image.src = job.image;
      image.alt = "";
      image.loading = "lazy";

      // Show a fallback if an illustration cannot be loaded.
      image.addEventListener("error", () => {
        image.style.display = "none";
      }, { once: true });

      const tag = document.createElement("span");
      tag.className = "job-tag";
      tag.textContent = job.category;

      const title = document.createElement("h3");
      title.textContent = job.title;

      const company = document.createElement("p");
      company.className = "job-company";
      company.textContent = job.company;

      const location = document.createElement("p");
      location.className = "job-location";
      location.textContent = "Location: " + job.location;

      const type = document.createElement("p");
      type.className = "job-type";
      type.textContent = job.type;

      const description = document.createElement("p");
      description.textContent = job.description;

      const link = document.createElement("a");
      link.className = "text-link";
      link.href = "#contact";
      link.textContent = "View opportunity →";
      link.setAttribute(
        "aria-label",
        `Contact us about ${job.title}`
      );

      card.append(
        image,
        tag,
        title,
        company,
        location,
        type,
        description,
        link
      );

      jobList.appendChild(card);
    });
  }

  // 5. SEARCH JOBS BY TITLE, SKILL OR LOCATION
  function searchJobs(event) {
    if (event) {
      event.preventDefault();
    }

    const keyword = (keywordInput?.value || "")
      .trim()
      .toLowerCase();

    const location = (locationInput?.value || "")
      .trim()
      .toLowerCase();

    filteredJobs = jobs.filter(job => {
      const searchableText = [
        job.title,
        job.company,
        job.category,
        job.type,
        job.description
      ].join(" ").toLowerCase();

      const matchesKeyword =
        !keyword || searchableText.includes(keyword);

      const matchesLocation =
        !location || job.location.toLowerCase().includes(location);

      return matchesKeyword && matchesLocation;
    });

    sortAndDisplayJobs();

    // Move to the results area after a search.
    jobList.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  searchForm.addEventListener("submit", searchJobs);

  // 6. SORT JOBS
  function sortAndDisplayJobs() {
    const sortedJobs = [...filteredJobs];
    const sortValue = jobSort?.value || "default";

    if (sortValue === "title") {
      sortedJobs.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortValue === "location") {
      sortedJobs.sort((a, b) =>
        a.location.localeCompare(b.location) ||
        a.title.localeCompare(b.title)
      );
    }

    displayJobs(sortedJobs);
  }

  if (jobSort) {
    jobSort.addEventListener("change", sortAndDisplayJobs);
  }

  // 7. INITIALISE THE WEBSITE
  // Render sample jobs when the page opens.
  sortAndDisplayJobs();

  console.log("SkillBridge website initialized successfully.");

});
