import React, { useState, useEffect } from "react";
import "./App.css";

// SVG icons from https://tabler-icons.io/ for open source usage
const ICONS = {
  github: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"  
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"  aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.484 2 12a9.96 9.96 0 006.838 9.486c.5.09.682-.217.682-.483 0-.237-.01-1.022-.014-1.853-2.782.604-3.37-1.341-3.37-1.341-.454-1.151-1.11-1.459-1.11-1.459-.908-.621.069-.609.069-.609 1.004.07 1.533 1.031 1.533 1.031.892 1.528 2.341 1.088 2.91.833.09-.646.349-1.09.634-1.34-2.222-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.687-.103-.253-.447-1.272.098-2.652 0 0 .84-.27 2.75 1.026A9.58 9.58 0 0112 6.844c.853.004 1.713.116 2.517.34 1.91-1.296 2.749-1.026 2.749-1.026.546 1.38.202 2.399.1 2.652.64.699 1.028 1.594 1.028 2.687 0 3.848-2.334 4.695-4.558 4.944.359.31.679.92.679 1.855 0 1.338-.012 2.42-.012 2.749 0 .268.18.577.688.48A10.004 10.004 0 0022 12c0-5.516-4.484-10-10-10z"></path>
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"  
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zm-8 12H4V9h4v11zm-2-13a2 2 0 110-4 2 2 0 010 4z"></path>
    </svg>
  ),
  mail: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  ),
  external: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

const PROFILE = {
  name: "Kishore N",
  title: "Aspiring Data Engineer",
  tagline: "Turning Data Into Insightful Stories.",
  location: "Bengaluru, India",
  email: "kishore.n.email@example.com",
  linkedin: "https://linkedin.com/in/kishore-n-in",
  github: "https://github.com/kishore-n",
  resume: "https://github.com/kishore-n/resume/raw/main/KishoreN_Resume.pdf",
  profilePic: "https://avatars.githubusercontent.com/u/70637510", // Public GitHub photo (as placeholder)
};

const ABOUT = {
  bio: `I am Kishore N, a passionate data engineer with skills in cloud platforms, machine learning, and data visualization. I love building robust pipelines and bringing Machine Learning solutions to production. Always eager to learn, collaborate, and bring value through data.`,
  education: [
    {
      degree: "B.E. in Computer Science",
      school: "Visvesvaraya Technological University",
      year: "2024 (Expected)",
    },
  ],
};

const EXPERIENCE = [
  {
    company: "ABC Data Tech Pvt Ltd",
    title: "Data Engineering Intern",
    period: "May 2023 - Aug 2023",
    location: "Bengaluru, India",
    description: [
      "Developed and maintained scalable ETL pipelines for client retail datasets.",
      "Streamlined data validation using PySpark and automated reporting workflows.",
      "Collaborated in a team to deploy analytics dashboards to the cloud.",
    ],
  },
];

const SKILLS = [
  { name: "Python", icon: "🐍" },
  { name: "SQL", icon: "🗄️" },
  { name: "AWS", icon: "☁️" },
  { name: "ETL", icon: "🔄" },
  { name: "Machine Learning", icon: "🤖" },
  { name: "PySpark", icon: "⚡" },
  { name: "Data Visualization", icon: "📊" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "🔧" },
  { name: "Linux", icon: "🐧" },
];

const SERVICES = [
  {
    title: "Data Pipeline Development",
    description: "Design and develop reliable ETL workflows for batch and streaming data.",
    icon: "🔗",
  },
  {
    title: "Cloud Data Solutions",
    description: "Deploy and manage data platforms on AWS and Azure. Infrastructure as Code expertise.",
    icon: "☁️",
  },
  {
    title: "Machine Learning Integration",
    description: "Integrate, train, and deploy ML models within production data systems.",
    icon: "🤖",
  },
];

const PROJECTS = [
  {
    name: "Retail Analytics Dashboard",
    tech: ["React", "AWS", "Redshift", "Python"],
    brief: "End-to-end dashboard for retail data analysis and KPIs.",
    details: [
      "Implemented secure ETL ingestion using AWS Lambda and Python.",
      "Built interactive dashboards with React and d3.js.",
      "Reduced reporting lead times by 60%.",
    ],
    github: "https://github.com/kishore-n/retail-analytics-dashboard",
    demo: "",
  },
  {
    name: "Real-time Twitter Sentiment Analysis",
    tech: ["Python", "Kafka", "Spark Streaming", "ML"],
    brief: "Live sentiment analytics platform for trending topics.",
    details: [
      "Ingested Twitter streams with Apache Kafka.",
      "Applied NLP models for sentiment scoring using spaCy.",
      "Visualized real-time trends using Dash.",
    ],
    github: "https://github.com/kishore-n/twitter-sentiment-realtime",
    demo: "",
  },
  {
    name: "Student Result Predictor",
    tech: ["Flask", "scikit-learn", "pandas"],
    brief: "ML model deployment for academic performance prediction.",
    details: [
      "Built regression models to predict student scores.",
      "Deployed REST API with Flask.",
      "Containerized deployment using Docker.",
    ],
    github: "https://github.com/kishore-n/result-predictor",
    demo: "",
  },
];

// PUBLIC_INTERFACE
function App() {
  // Theme
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    setTheme(saved ? saved : "light");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // For Project Expand/Collapse
  const [openProject, setOpenProject] = useState(null);

  // Animations: On scroll, fade-in section
  useEffect(() => {
    const handler = () => {
      document
        .querySelectorAll(".fade-section")
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
          }
        });
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // PUBLIC_INTERFACE
  const handleProjectToggle = (idx) => setOpenProject(idx === openProject ? null : idx);

  // PUBLIC_INTERFACE
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Ideally hook to backend or email service. For now: Message shows success.
    alert("Thank you for reaching out! I'll get back to you soon.");
    e.target.reset();
  };

  return (
    <>
      <SEOHead />
      <nav className="navbar" aria-label="Main navigation">
        <a className="nav-logo" href="#home" aria-label="Kishore N home">
          <img src={PROFILE.profilePic} className="nav-avatar" alt="Kishore N profile" />
          <span>Kishore N</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>

      <main>
        {/* Home / Hero Section */}
        <section className="hero fade-section" id="home" tabIndex="0" aria-label="Home & introduction">
          <div className="hero-inner">
            <img
              src={PROFILE.profilePic}
              alt="Kishore N smiling"
              className="hero-avatar"
              width={128}
              height={128}
              loading="eager"
              />
            <h1>{PROFILE.name}</h1>
            <h2 className="hero-title">{PROFILE.title}</h2>
            <p className="hero-tagline">{PROFILE.tagline}</p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                View Projects {ICONS.arrow}
              </a>
              <a href={PROFILE.resume} className="btn btn-outline" download>
                Download Resume
              </a>
            </div>
            <div className="hero-socials" aria-label="Social links">
              <a href={PROFILE.linkedin} className="icon-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                {ICONS.linkedin}
              </a>
              <a href={PROFILE.github} className="icon-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                {ICONS.github}
              </a>
              <a href={`mailto:${PROFILE.email}`} className="icon-btn" aria-label="Email">
                {ICONS.mail}
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section fade-section" id="about" tabIndex="0" aria-label="About me">
          <SectionTitle title="About" />
          <div className="about-content">
            <div className="about-bio">{ABOUT.bio}</div>
            <div className="about-details">
              <div>
                <b>Location:</b> {PROFILE.location}
              </div>
              <div>
                <b>Education:</b> {ABOUT.education.map((ed) =>
                  <div key={ed.degree}>
                    {ed.degree} at {ed.school}<br />
                    <span className="education-year">{ed.year}</span>
                  </div>)}
              </div>
              <div>
                <b>Resume:</b> <a href={PROFILE.resume} rel="noopener noreferrer" target="_blank">View PDF {ICONS.external}</a>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section fade-section" id="work" tabIndex="0" aria-label="Work experience">
          <SectionTitle title="Experience" />
          {EXPERIENCE.map((exp) =>
            <ExperienceCard key={exp.company} {...exp} />
          )}
        </section>

        {/* Skills */}
        <section className="section fade-section" id="skills" tabIndex="0" aria-label="Skills grid">
          <SectionTitle title="Skills" />
          <div className="skills-grid">
            {SKILLS.map((skill) =>
              <div className="skill-item" key={skill.name}>
                <span className="skill-icon" aria-hidden="true">{skill.icon}</span>
                <span>{skill.name}</span>
              </div>
            )}
          </div>
        </section>

        {/* Services */}
        <section className="section fade-section" id="services" tabIndex="0" aria-label="Services offered">
          <SectionTitle title="Services" />
          <div className="services-grid">
            {SERVICES.map((service, idx) =>
              <div className="service-card" key={service.title} tabIndex="0" aria-label={`Service: ${service.title}`}>
                <div className="service-icon" aria-hidden="true">{service.icon}</div>
                <div className="service-title">{service.title}</div>
                <div className="service-desc">{service.description}</div>
              </div>
            )}
          </div>
        </section>

        {/* Projects */}
        <section className="section fade-section" id="projects" tabIndex="0" aria-label="Portfolio and Projects">
          <SectionTitle title="Projects" />
          <div className="projects-grid">
            {PROJECTS.map((proj, idx) =>
              <div
                className={`project-card ${openProject === idx ? "expanded" : ""}`}
                key={proj.name}
                tabIndex="0"
                aria-label={`Project: ${proj.name}`}
                aria-expanded={openProject === idx}
              >
                <div className="project-header" onClick={() => handleProjectToggle(idx)} onKeyDown={e => { if (e.key === "Enter") handleProjectToggle(idx); }} role="button" tabIndex={0} aria-pressed={openProject === idx}>
                  <div className="project-title">{proj.name}</div>
                  <div className="project-tech">{proj.tech.join(" / ")}</div>
                  <span className="project-toggle" aria-hidden="true">{openProject === idx ? "▲" : "▼"}</span>
                </div>
                <div className="project-brief">{proj.brief}</div>
                {openProject === idx && (
                  <div className="project-details">
                    <ul>
                      {proj.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                    <div className="project-links">
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">{ICONS.github} <span>GitHub</span></a>
                      {proj.demo &&
                        <a href={proj.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">{ICONS.external} <span>Demo</span></a>
                      }
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Contact */}
        <section className="section fade-section" id="contact" tabIndex="0" aria-label="Contact details and form">
          <SectionTitle title="Contact" />
          <div className="contact-flex">
            <div className="contact-details">
              <div>
                <b>Email:</b> <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </div>
              <div>
                <b>LinkedIn:</b>&nbsp;<a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">kishore-n-in</a>
              </div>
              <div>
                <b>GitHub:</b>&nbsp;<a href={PROFILE.github} target="_blank" rel="noopener noreferrer">kishore-n</a>
              </div>
              <div>
                <b>Location:</b> {PROFILE.location}
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit} aria-label="Contact form">
              <label htmlFor="name">Name</label>
              <input required type="text" id="name" name="name" autoComplete="name" />
              <label htmlFor="email">Email</label>
              <input required type="email" id="email" name="email" autoComplete="email" />
              <label htmlFor="msg">Message</label>
              <textarea required id="msg" name="msg" rows="4" style={{resize:"vertical"}}></textarea>
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer" aria-label="Website footer">
        Made by Kishore N &middot; {new Date().getFullYear()}
        <span className="footer-socials">
          <a href={PROFILE.linkedin} rel="noopener noreferrer" aria-label="LinkedIn" target="_blank">{ICONS.linkedin}</a>
          <a href={PROFILE.github} rel="noopener noreferrer" aria-label="GitHub" target="_blank">{ICONS.github}</a>
        </span>
      </footer>
    </>
  );
}

// PUBLIC_INTERFACE
function SectionTitle({ title }) {
  return <h2 className="section-title">{title}</h2>;
}

// PUBLIC_INTERFACE
function ExperienceCard({ company, title, period, location, description }) {
  return (
    <div className="exp-card" tabIndex="0" aria-label={`Experience at ${company}`}>
      <div className="exp-header">
        <span className="exp-title">{title}</span>
        <span className="exp-company">@ {company}</span>
        <span className="exp-period">{period}</span>
      </div>
      <div className="exp-location">{location}</div>
      <ul className="exp-desc">
        {description.map((d, i) => <li key={i}>{d}</li>)}
      </ul>
    </div>
  );
}

// PUBLIC_INTERFACE
function SEOHead() {
  // NOTE: This must be imported at the top level in most SPA frameworks, but
  // here used at component level for simplicity in this small codebase
  useEffect(() => {
    document.title = "Kishore N | Data Engineer Portfolio";
    const meta1 = document.createElement("meta");
    meta1.name = "description";
    meta1.content = "Portfolio website of Kishore N, aspiring Data Engineer, showcasing projects, skills, and experience in data engineering, cloud, ML, and more.";
    document.head.appendChild(meta1);

    const meta2 = document.createElement("meta");
    meta2.name = "keywords";
    meta2.content = "Data Engineer Portfolio, Kishore N, Data Engineering, Cloud, Python, AWS, Machine Learning";
    document.head.appendChild(meta2);

    const meta3 = document.createElement("meta");
    meta3.setAttribute("property", "og:title");
    meta3.content = "Kishore N | Data Engineer Portfolio";
    document.head.appendChild(meta3);

    const meta4 = document.createElement("meta");
    meta4.setAttribute("property", "og:description");
    meta4.content = "Portfolio website of Kishore N, showcasing data engineering, ML, cloud, and more.";
    document.head.appendChild(meta4);

    // Remove appended meta tags on cleanup (for hot reload)
    return () => {
      [meta1, meta2, meta3, meta4].forEach((tag) => document.head.removeChild(tag));
    };
  }, []);
  return null;
}

export default App;
