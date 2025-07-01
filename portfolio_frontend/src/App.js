import React, { useState, useEffect } from "react";
import "./App.css";

// SVG icons (inline for palette control)
const ICONS = {
  github: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.484 2 12a9.96 9.96 0 006.838 9.486c.5.09.682-.217.682-.483 0-.237-.01-1.022-.014-1.853-2.782.604-3.37-1.341-3.37-1.341-.454-1.151-1.11-1.459-1.11-1.459-.908-.621.069-.609.069-.609 1.004.07 1.533 1.031 1.533 1.031.892 1.528 2.341 1.088 2.91.833.09-.646.349-1.09.634-1.34-2.222-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.687-.103-.253-.447-1.272.098-2.652 0 0 .84-.27 2.75 1.026A9.58 9.58 0 0112 6.844c.853.004 1.713.116 2.517.34 1.91-1.296 2.749-1.026 2.749-1.026.546 1.38.202 2.399.1 2.652.64.699 1.028 1.594 1.028 2.687 0 3.848-2.334 4.695-4.558 4.944.359.31.679.92.679 1.855 0 1.338-.012 2.42-.012 2.749 0 .268.18.577.688.48A10.004 10.004 0 0022 12c0-5.516-4.484-10-10-10z"></path>
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zm-8 12H4V9h4v11zm-2-13a2 2 0 110-4 2 2 0 010 4z"></path>
    </svg>
  ),
  mail: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  ),
  external: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  arrow: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  exp: (
    <svg width="30" height="30" fill="none" stroke="#524EE7" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 2v4"/>
      <path d="M8 2v4"/>
      <path d="M3 10h18"/>
    </svg>
  ),
  projects: (
    <svg width="30" height="30" fill="none" stroke="#FDBA34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>
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
  profilePic: "https://avatars.githubusercontent.com/u/70637510",
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

// For sidebar: stats widgets (example stats)
const STATS = [
  { value: 5, label: "Projects", icon: ICONS.projects, color: "var(--primary-blue)" },
  { value: "1+", label: "Years Exp.", icon: ICONS.exp, color: "var(--accent-yellow)" },
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
  const [theme, setTheme] = useState("light"); // not visible in Dribbble but keep toggle for spec
  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    setTheme(saved ? saved : "light");
  }, []);
  useEffect(() => {
    // Just sets data-theme (support for future extensibility)
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const [openProject, setOpenProject] = useState(null);

  // Fade-in animation for sections
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
  const handleProjectToggle = (idx) => setOpenProject(idx === openProject ? null : idx);

  // PUBLIC_INTERFACE
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! I'll get back to you soon.");
    e.target.reset();
  };

  return (
    <>
      <SEOHead />
      {/* --- Portfolio Abstract Background Motif Overlay --- */}
      <PortfolioBackgroundVisuals />
      <div className="portfolio-sidebar-shadow"></div>
      <div className="portfolio-sidebar-shadow right"></div>
      <div className="portfolio-layout">

        {/* Main Left Column */}
        <main style={{paddingRight: 0, paddingBottom: 18}}>
          {/* Hero Cover */}
          <section className="hero fade-section" id="home" tabIndex="0" aria-label="Home intro">
            <div className="hero-accent-bar" aria-hidden="true"></div>
            <div className="hero-inner">
              <div className="hero-name">{PROFILE.name}</div>
              <div className="hero-title-main">Portfolio</div>
              <div className="hero-title-sub">{PROFILE.title}</div>
              <div className="hero-tagline">{PROFILE.tagline}</div>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">
                  View Projects {ICONS.arrow}
                </a>
                <a href={PROFILE.resume} className="btn btn-outline" download>
                  Download CV
                </a>
              </div>
              <div className="hero-img-area">
                <div className="hero-img-yellow-bar" aria-hidden="true"></div>
                <img
                  src={PROFILE.profilePic}
                  alt="Kishore N cover"
                  className="hero-avatar"
                  width={365}
                  height={196}
                  loading="eager"
                />
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="section fade-section" id="projects" tabIndex="0" aria-label="Portfolio and Projects">
            <SectionTitle title="Projects" />
            <div className="projects-grid">
              {PROJECTS.map((proj, idx) => (
                <div
                  className={`project-card ${openProject === idx ? "expanded" : ""}`}
                  key={proj.name}
                  tabIndex="0"
                  aria-label={`Project: ${proj.name}`}
                  aria-expanded={openProject === idx}
                  onClick={() => handleProjectToggle(idx)}
                  onKeyDown={e => { if (e.key === "Enter") handleProjectToggle(idx); }}
                  role="button"
                >
                  <div className="project-header">
                    {/* Dot motif for visual anchor */}
                    <span style={{
                      width: "15px",
                      height: "15px",
                      background: "var(--accent-dot)",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "0.5em",
                      verticalAlign: "middle",
                    }} aria-hidden="true"></span>
                    <div className="project-title">{proj.name}</div>
                    <div className="project-tech">{proj.tech.join(" / ")}</div>
                    <span className="project-toggle" aria-hidden="true">{openProject === idx ? "▲" : "▼"}</span>
                  </div>
                  <div className="project-brief">{proj.brief}</div>
                  {openProject === idx && (
                    <div className="project-details">
                      <ul>
                        {proj.details.map((d, i) =>
                          <li key={i} style={{position: "relative"}}>
                            <span style={{
                              display: "inline-block",
                              width: "9px",
                              height: "9px",
                              background: "var(--accent-dot)",
                              borderRadius: "50%",
                              marginRight: "11px",
                              verticalAlign: "middle",
                              position: "relative", top: "-1px"
                            }} aria-hidden="true"></span>
                            {d}
                          </li>
                        )}
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
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="section fade-section" id="contact" tabIndex="0" aria-label="Contact details and form">
            <SectionTitle title="Contact" />
            <form className="contact-form" onSubmit={handleContactSubmit} aria-label="Contact form">
              <label htmlFor="name">Name</label>
              <input required type="text" id="name" name="name" autoComplete="name" />
              <label htmlFor="email">Email</label>
              <input required type="email" id="email" name="email" autoComplete="email" />
              <label htmlFor="msg">Message</label>
              <textarea required id="msg" name="msg" rows="4"></textarea>
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </section>
        </main>

        {/* Sidebar Right */}
        <aside style={{paddingLeft:18,maxWidth:480,minWidth:0}}>
          {/* About Mini Card */}
          <div className="about-side fade-section" id="about" tabIndex="0" aria-label="About summary">
            {/* Yellow block as left motif for about */}
            <div style={{
              width: "39px", height: "13px",
              background: "var(--primary-yellow)",
              marginBottom: "16px"
            }} aria-hidden="true"></div>
            <img
              src={PROFILE.profilePic}
              alt="Kishore N"
              className="about-mini-avatar"
              width={74}
              height={74}
              loading="lazy"
            />
            <div className="about-bio-side">{ABOUT.bio}</div>
            <div className="about-links">
              <a href={PROFILE.linkedin} className="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                {ICONS.linkedin}
              </a>
              <a href={PROFILE.github} className="social-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                {ICONS.github}
              </a>
              <a href={`mailto:${PROFILE.email}`} className="social-btn" aria-label="Email">
                {ICONS.mail}
              </a>
            </div>
            <div className="download-link">
              <a href={PROFILE.resume} rel="noopener noreferrer" target="_blank">Download Resume {ICONS.external}</a>
            </div>
          </div>

          {/* Stat Widgets */}
          <div className="stats-side fade-section" tabIndex="0" aria-label="At-a-glance stats">
            {/* Decorative dot motif */}
            <div style={{position:"absolute",top:13, right:27, width:"9px",height:"9px",background:"var(--accent-dot)",borderRadius:"50%"}} aria-hidden="true"></div>
            {STATS.map(st =>
              <div className="stat-widget" key={st.label}>
                <span className="stat-count">{st.value}</span>
                <span className="stat-label">{st.label}</span>
              </div>
            )}
          </div>

          {/* "Services" grid (sidebar version) */}
          <div className="services-side fade-section" tabIndex="0" aria-label="Services highlights">
            {SERVICES.map((service, idx) =>
              <div className="service-item-side" key={service.title} tabIndex="0" aria-label={`Service: ${service.title}`}>
                {/* Yellow bar accent left of icon */}
                <span style={{display:"block",width:"22px",height:"7px",background:"var(--primary-yellow)",marginBottom:"5px"}} aria-hidden="true"></span>
                <div style={{fontSize:'1.9em',marginBottom:'6px',color:"var(--accent-dot)"}} aria-hidden="true">{service.icon}</div>
                <span>{service.title}</span>
              </div>
            )}
          </div>

          {/* Education and detailed info */}
          <div className="card fade-section" style={{fontSize:'.99em',marginBottom:'24px'}} tabIndex="0" aria-label="Education">
            {/* Small black dot motif */}
            <span style={{display:"inline-block",width:"8px",height:"8px",background:"var(--accent-dot)",borderRadius:"50%",marginRight:"9px",verticalAlign:"middle"}} aria-hidden="true"></span>
            <b>Education:</b>
            {ABOUT.education.map((ed) =>
              <div key={ed.degree} style={{marginTop:"3px",marginBottom:"6px"}}>
                {ed.degree} at {ed.school}
                <br />
                <span style={{color:"var(--primary-yellow)"}}>{ed.year}</span>
              </div>
            )}
            <div style={{marginTop:'11px'}}><b>Location:</b> {PROFILE.location}</div>
          </div>
        </aside>
      </div>

      <footer className="footer fade-section" aria-label="Website footer">
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
function SEOHead() {
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

    return () => {
      [meta1, meta2, meta3, meta4].forEach((tag) => document.head.removeChild(tag));
    };
  }, []);
  return null;
}

/**
 * PUBLIC_INTERFACE
 * PortfolioBackgroundVisuals - a fixed, non-intrusive layer of SVG/HTML geometric shapes
 * and abstract motifs for lively, modern portfolio backgrounds.
 * Motifs: circles, dots, lines, triangles, grids - lightweight, uncluttered, flat-design.
 * - Layer is fixed/fills the viewport, below the content (z-index: 0)
 * - Responsive and non-distracting
 */
function PortfolioBackgroundVisuals() {
  return (
    <div
      className="portfolio-background-visual"
      aria-hidden="true"
      style={{
        position: "fixed",
        zIndex: 0,
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Abstract big yellow circle - top left */}
      <svg
        width="260"
        height="260"
        viewBox="0 0 260 260"
        style={{
          position: "absolute",
          top: "-70px",
          left: "-90px",
          opacity: 0.17,
        }}
      >
        <circle cx="130" cy="130" r="110" fill="#FFD800" />
      </svg>
      {/* Dots grid - bottom left */}
      <svg
        width="80"
        height="70"
        viewBox="0 0 80 70"
        style={{
          position: "absolute",
          left: "24px",
          bottom: "40px",
          opacity: 0.14,
          zIndex: 0,
        }}
      >
        {[...Array(4)].map((_, row) =>
          [...Array(6)].map((_, col) => (
            <circle
              key={`dot${row}${col}`}
              cx={12 + col * 13}
              cy={11 + row * 15}
              r="2.5"
              fill="#18181B"
            />
          ))
        )}
      </svg>
      {/* Small black dot (bottom right) */}
      <svg
        width="22"
        height="22"
        style={{
          position: "absolute",
          right: "19vw",
          bottom: "34px",
          opacity: 0.23,
        }}
      >
        <circle cx="11" cy="11" r="7" fill="#222" />
      </svg>
      {/* Angled yellow bar (top right, rotated rectangle) */}
      <svg
        width="120"
        height="33"
        style={{
          position: "absolute",
          right: "-39px",
          top: "55px",
          opacity: 0.13,
          transform: "rotate(-16deg)",
        }}
      >
        <rect x="0" y="0" width="120" height="17" fill="#FFD800" rx="8" />
      </svg>
      {/* Faint triangle (lower left) */}
      <svg
        width="73"
        height="62"
        style={{
          position: "absolute",
          left: "13vw",
          bottom: "19vh",
          opacity: 0.11,
        }}
      >
        <polygon points="0,62 36,0 73,62" fill="#FFD800" />
      </svg>
      {/* Abstract semi-transparent lines (right) */}
      <svg
        width="100"
        height="92"
        style={{
          position: "absolute",
          right: "4vw",
          top: "61vh",
          opacity: 0.10,
        }}
      >
        <rect x="7" y="11" width="88" height="7" rx="3.5" fill="#222" />
        <rect x="11" y="38" width="78" height="5" rx="3" fill="#FFD800" />
        <rect x="0" y="69" width="93" height="4" rx="2" fill="#222" />
      </svg>
      {/* Decorative dot (top center) */}
      <svg
        width="18"
        height="18"
        style={{
          position: "absolute",
          left: "51%",
          top: "19px",
          marginLeft: "-9px",
          opacity: 0.19,
        }}
      >
        <circle cx="9" cy="9" r="5" fill="#FFD800" />
      </svg>
      {/* More abstract motifs can be added as needed */}
    </div>
  );
}

export default App;
