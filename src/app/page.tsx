"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [skillBarsAnimated, setSkillBarsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 2100);

    const handleScroll = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
          el.classList.add("visible");
        }
      });

      if (!skillBarsAnimated) {
        document.querySelectorAll<HTMLElement>(".bar-fill").forEach((bar) => {
          const rect = bar.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.88) {
            const w = bar.getAttribute("data-w");
            if (w) bar.style.width = w + "%";
          }
        });
        setSkillBarsAnimated(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [skillBarsAnimated]);

  // Cursor follow
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animRing);
    };

    window.addEventListener("mousemove", move);
    animRing();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* CURSOR */}
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      {/* LOADER */}
      <div id="loader" className={loaded ? "hide" : ""}>
        <div className="loader-initials">ENG BILEL</div>
        <div className="loader-bar-wrap"><div className="loader-bar"></div></div>
        <div className="loader-text">Loading Portfolio</div>
      </div>

      {/* PARTICLE CANVAS */}
      <ParticleCanvas />

      {/* NAVBAR */}
      <nav id="navbar">
        <div className="nav-logo">Bilel Abbassi</div>
        <button className="hamburger" id="hamburger" aria-label="menu" onClick={() => setNavOpen(!navOpen)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links ${navOpen ? "open" : ""}`} id="nav-links">
          <li><a href="#hero" onClick={() => setNavOpen(false)}>Home</a></li>
          <li><a href="#skills" onClick={() => setNavOpen(false)}>Skills</a></li>
          <li><a href="#experience" onClick={() => setNavOpen(false)}>Experience</a></li>
          <li><a href="#projects" onClick={() => setNavOpen(false)}>Projects</a></li>
          <li><a href="#education" onClick={() => setNavOpen(false)}>Education</a></li>
          <li><a href="#contact" onClick={() => setNavOpen(false)}>Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-inner">
          <div className="hero-left reveal fade-up">
            <div className="avail-tag"><span className="avail-dot"></span>Open to Opportunities</div>
            <h1 className="hero-name">Bilel<br />Abbassi</h1>
            <p className="hero-sub">DevOps Engineer · <span>Cloud &amp; Automation</span></p>
            <div className="hero-ctas">
              <a href="#experience" className="btn btn-primary">View Experience</a>
              <a href="#contact" className="btn btn-outline">Get In Touch</a>
            </div>
          </div>
          <div className="hero-card-wrap reveal slide-right">
            <div className="hero-card-orb"></div>
            <div className="hero-card">
              <div className="card-ring"></div>
              <div className="card-avatar">BA</div>
              <div className="card-name">Bilel Abbassi</div>
              <div className="card-role">DevOps Engineer</div>
              <div className="card-stats">
                <div className="stat"><div className="stat-num">1+</div><div className="stat-label">Yrs Exp</div></div>
                <div className="stat"><div className="stat-num">5+</div><div className="stat-label">Projects</div></div>
                <div className="stat"><div className="stat-num">+5</div><div className="stat-label">Tech Cloud</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* SKILLS */}
      <section id="skills">
        <div className="container">
          <span className="section-label reveal fade-up">What I work with</span>
          <h2 className="section-title reveal fade-up">Skills &amp;<br />Technologies</h2>
          <div className="skills-grid">
            <div className="skill-list reveal slide-left">
              <SkillBar name="AWS (Multi-service)" pct="90%" color="bar-amber" width="90" />
              <SkillBar name="Microsoft Azure" pct="60%" color="bar-indigo" width="75" />
              <SkillBar name="Docker &amp; Containerization" pct="95%" color="bar-cyan" width="95" />
              <SkillBar name="Kubernetes" pct="70%" color="bar-indigo" width="80" />
              <SkillBar name="CI/CD Pipelines" pct="92%" color="bar-pink" width="92" />
              <SkillBar name="Terraform / Ansible (IaC)" pct="65%" color="bar-amber" width="85" />
              <SkillBar name="Prometheus &amp; Grafana" pct="88%" color="bar-cyan" width="88" />
              <SkillBar name="Security (Trivy, Snyk, SonarQube)" pct="80%" color="bar-pink" width="80" />
            </div>
            <div className="reveal slide-right">
              <div className="tech-cloud-title">Technology Cloud</div>
              <div className="chip-cloud">
                <TechChip icon="☁️" name="AWS" />
                <TechChip icon="🔵" name="Azure" />
                <TechChip icon="🐳" name="Docker" />
                <TechChip icon="⎈" name="Kubernetes" />
                <TechChip icon="🏗️" name="Terraform" />
                <TechChip icon="🤖" name="Ansible" />
                <TechChip icon="🔄" name="GitHub Actions" />
                <TechChip icon="🦊" name="GitLab CI/CD" />
                <TechChip icon="🚀" name="Jenkins" />
                <TechChip icon="🪣" name="Bitbucket" />
                <TechChip icon="📊" name="Prometheus" />
                <TechChip icon="📈" name="Grafana" />
                <TechChip icon="🔔" name="Alertmanager" />
                <TechChip icon="🔍" name="SonarQube" />
                <TechChip icon="🛡️" name="Trivy" />
                <TechChip icon="🔐" name="Snyk" />
                <TechChip icon="📦" name="Nexus" />
                <TechChip icon="⚡" name="Elastic Beanstalk" />
                <TechChip icon="🌐" name="CloudFront" />
                <TechChip icon="🗄️" name="RDS" />
                <TechChip icon="🖥️" name="EC2" />
                <TechChip icon="🟢" name="Next.js" />
                <TechChip icon="🟩" name="Nuxt.js" />
                <TechChip icon="☕" name="Spring Boot" />
                <TechChip icon="🍃" name="MongoDB" />
                <TechChip icon="🐘" name="PostgreSQL" />
                <TechChip icon="🌀" name="Angular" />
                <TechChip icon="📋" name="CloudPanel" />
                <TechChip icon="🧩" name="Plesk" />
                <TechChip icon="🔧" name="aaPanel" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="container">
          <span className="section-label reveal fade-up">Career journey</span>
          <h2 className="section-title reveal fade-up">Work<br />Experience</h2>
          <div className="timeline">
            <TimelineItem 
              date="Feb – Mar 2026 · Freelance · Remote"
              title="DevOps Engineer — Kubernetes Automation"
              company="Mission Freelance · OVH Infrastructure"
              desc="Automated the full deployment of a Kubernetes cluster (control plane + 2 workers) on OVH servers using Ansible playbooks. Deployed applications with HPA auto-scaling and Canary Release progressive deployment strategy. Set up cluster monitoring with Prometheus and Grafana."
              chips={["Kubernetes", "Ansible", "HPA", "Canary Release", "Prometheus", "Grafana", "OVH"]}
              chipColors={["", "pink", "cyan", "amber", "", "cyan", "pink"]}
            />
            <TimelineItem 
              date="Oct – Nov 2025 · Freelance · Remote"
              title="DevOps Engineer — Monitoring &amp; Observability"
              company="Mission Freelance · Remote"
              desc="Designed and deployed a centralized observability platform (Prometheus + Grafana + Alertmanager) on a hub-and-spoke architecture supervising 4+ remote servers. Set up Prometheus scraping for CPU, memory, disk and Docker container metrics. Created interactive Grafana dashboards enabling anomaly detection in under 1 minute. Implemented an Alertmanager → Telegram bot alerting pipeline, reducing MTTD from hourly manual checks to automatic notifications in under 2 minutes."
              chips={["Prometheus", "Grafana", "Alertmanager", "Telegram Bot", "Hub-and-Spoke"]}
              chipColors={["", "cyan", "pink", "amber", ""]}
            />
            <TimelineItem 
              date="Mar – Jun 2025 · Next Consult"
              title="DevOps Engineer — Dockerization &amp; CI/CD"
              company="Next Consult"
              desc="Containerized and deployed 3 web applications (Next.js, Nuxt.js) with strictly separated staging and production environments on aaPanel and Plesk. Built end-to-end GitHub Actions CI/CD pipelines with automated builds, SonarQube quality gates, Docker image vulnerability scanning (Trivy), and automatic deployment on every commit. Managed Docker containers for MongoDB and PostgreSQL. Deployed full observability stack (Prometheus + Grafana)."
              chips={["Docker", "GitHub Actions", "SonarQube", "Trivy", "Next.js", "Nuxt.js", "MongoDB", "PostgreSQL"]}
              chipColors={["", "cyan", "pink", "amber", "", "cyan", "pink", ""]}
            />
            <TimelineItem 
              date="Feb – Aug 2024 · ESPRIT Graduation Project"
              title="Cloud AWS Architecture — Final Year Project"
              company="Perpetual Code · ESPRIT 2024"
              desc="Deployed a multi-service AWS cloud architecture: Elastic Beanstalk (auto-scaling), ELB (load balancing between EC2 instances), CloudFront (low-latency content delivery). Set up Bitbucket Pipelines CI/CD automating build, test and deployment to EC2. Configured CloudWatch with alarms and supervision dashboards. Administered Amazon RDS with Multi-AZ high availability. Integrated SonarQube as mandatory quality gate blocking non-compliant deployments."
              chips={["AWS", "Elastic Beanstalk", "ELB", "CloudFront", "CloudWatch", "RDS Multi-AZ", "Bitbucket Pipelines", "SonarQube"]}
              chipColors={["amber", "", "cyan", "pink", "", "amber", "cyan", ""]}
            />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <span className="section-label reveal fade-up">What I've built</span>
          <h2 className="section-title reveal fade-up">Projects</h2>
          <div className="proj-grid">
            <ProjectCard 
              emoji="⎈"
              title="Kubernetes Cluster Automation"
              desc="Ansible playbook automating full K8s cluster setup (control plane + 2 workers) on OVH, with HPA auto-scaling, Canary Release deployments, and Prometheus/Grafana monitoring."
              tags={["Kubernetes", "Ansible", "HPA", "Prometheus", "OVH"]}
            />
            <ProjectCard 
              emoji="📡"
              title="Centralized Observability Platform"
              desc="Hub-and-spoke monitoring architecture supervising 4+ servers in real time. Grafana dashboards with <1 min anomaly detection, Alertmanager → Telegram bot with 2-minute MTTD."
              tags={["Prometheus", "Grafana", "Alertmanager", "Telegram API"]}
            />
            <ProjectCard 
              emoji="🚀"
              title="Full CI/CD Pipeline — Next/Nuxt.js"
              desc="End-to-end GitHub Actions pipelines for 3 web apps with zero-hotfix-in-production policy, SonarQube quality gates, Trivy security scanning, and zero-downtime deployments."
              tags={["GitHub Actions", "Docker", "SonarQube", "Trivy", "Next.js"]}
            />
            <ProjectCard 
              emoji="☁️"
              title="AWS Multi-Service Cloud Architecture"
              desc="Production-grade AWS setup with Elastic Beanstalk auto-scaling, ELB, CloudFront CDN, RDS Multi-AZ and CloudWatch supervision. Full CI/CD via Bitbucket Pipelines."
              tags={["AWS", "Elastic Beanstalk", "CloudFront", "RDS", "CloudWatch"]}
            />
            <ProjectCard 
              emoji="🐳"
              title="Nuxt.js Dockerization &amp; CloudPanel"
              desc="Containerized a Nuxt.js application with full production environment configuration on CloudPanel. CI/CD pipeline for continuous delivery with version management and zero-downtime releases."
              tags={["Docker", "Nuxt.js", "CloudPanel", "CI/CD"]}
            />
            <ProjectCard 
              emoji="🏗️"
              title="Three-Tier App DevOps Pipeline"
              desc="Dockerized React / Node.js / MongoDB app with complete Jenkins CI/CD. Azure VMs provisioned via Terraform, server configuration automated with Ansible."
              tags={["Jenkins", "Docker", "Terraform", "Ansible", "Azure"]}
            />
            <ProjectCard 
              emoji="🔐"
              title="Spring/Angular Academic DevOps"
              desc="Full DevOps pipeline for a Spring Boot + Angular + MySQL app: automated Jenkins build → Docker push to Nexus → SonarQube code analysis → Prometheus metrics → Grafana dashboards."
              tags={["Jenkins", "Nexus", "SonarQube", "Prometheus", "Spring Boot"]}
            />
          </div>
        </div>
      </section>

      {/* EDUCATION & LANGUAGES */}
      <section id="education">
        <div className="container">
          <span className="section-label reveal fade-up">Background</span>
          <h2 className="section-title reveal fade-up">Education &amp;<br />Languages</h2>
          <div className="edu-lang-grid">
            <div className="reveal slide-left">
              <div className="section-subtitle">Degrees</div>
              <div className="edu-cards">
                <div className="edu-card">
                  <div className="edu-degree">Diplôme d'Ingénieur — Software Engineering</div>
                  <div className="edu-school">ESPRIT — École Supérieure Privée d'Ingénierie</div>
                  <div className="edu-years">2021 – 2024</div>
                </div>
                <div className="edu-card" style={{ borderLeftColor: "var(--cyan)" }}>
                  <div className="edu-degree">Licence Appliquée — Computer Networks</div>
                  <div className="edu-school">ISSAT gafsa</div>
                  <div className="edu-years">2018 – 2021</div>
                </div>
              </div>
              <div className="section-subtitle">Certifications &amp; Training</div>
              <div className="formation-card">
                <div className="formation-title">Kubernetes Administrator (CKA) — In Progress</div>
                <div className="formation-detail">Active preparation for the official CKA exam. Topics: cluster administration, networking, scheduling, HPA autoscaling, rolling updates, blue/green deployments, persistent storage, and RBAC security.</div>
              </div>
            </div>
            <div className="reveal slide-right">
              <div className="section-subtitle">Languages</div>
              <div className="lang-cards">
                <div className="lang-card">
                  <span className="lang-name">🇹🇳 Arabic</span>
                  <span className="lang-badge native">Native</span>
                </div>
                <div className="lang-card">
                  <span className="lang-name">🇫🇷 French</span>
                  <span className="lang-badge b2">B2</span>
                </div>
                <div className="lang-card">
                  <span className="lang-name">🇬🇧 English</span>
                  <span className="lang-badge b2">B2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      <footer>
        <p>Crafted with passion · Bilel Abbassi · 2026</p>
      </footer>
    </>
  );
}

// Particle Canvas Component
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const COLORS = ["#6366f1", "#ec4899", "#06b6d4", "#f59e0b"];
    const N = 80;
    const CONNECT = 130;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < N; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < N; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = ((1 - dist / CONNECT) * 0.2);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("resize", resize);
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef}></canvas>;
}

// Marquee Component
function Marquee() {
  const items = [
    "Next Consult", "OVH Cloud", "AWS", "GoMyCode", "ESPRIT", 
    "Perpetual Code", "Microsoft Azure", "GitHub Actions", "Kubernetes", 
    "Terraform", "Prometheus", "Grafana"
  ];
  
  return (
    <div className="marquee-section">
      <div className="marquee-track" id="marquee-track">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot"></span>{item}
          </div>
        ))}
      </div>
    </div>
  );
}

// Skill Bar Component
function SkillBar({ name, pct, color, width }: { name: string; pct: string; color: string; width: number }) {
  return (
    <div className="skill-item">
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}</span>
      </div>
      <div className="bar-bg">
        <div className={`bar-fill ${color}`} data-w={width.toString()}></div>
      </div>
    </div>
  );
}

// Tech Chip Component
function TechChip({ icon, name }: { icon: string; name: string }) {
  return (
    <span className="chip">
      <span className="chip-icon">{icon}</span>
      {name}
    </span>
  );
}

// Timeline Item Component
function TimelineItem({ 
  date, title, company, desc, chips, chipColors 
}: { 
  date: string; title: string; company: string; desc: string;
  chips: string[]; chipColors: string[];
}) {
  return (
    <div className="tl-item reveal slide-left">
      <div className="tl-dot"></div>
      <div className="tl-date">{date}</div>
      <div className="tl-title">{title}</div>
      <div className="tl-company" dangerouslySetInnerHTML={{ __html: company }}></div>
      <div className="tl-desc">{desc}</div>
      <div className="tl-chips">
        {chips.map((chip, i) => (
          <span key={i} className={`tl-chip ${chipColors[i] || ""}`}>{chip}</span>
        ))}
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ emoji, title, desc, tags }: { emoji: string; title: string; desc: string; tags: string[] }) {
  return (
    <div className="proj-card reveal fade-up">
      <span className="proj-emoji">{emoji}</span>
      <div className="proj-title">{title}</div>
      <div className="proj-desc">{desc}</div>
      <div className="proj-tags">
        {tags.map((tag, i) => (
          <span key={i} className="proj-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

// Contact Section with Brevo Form
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <span className="section-label reveal fade-up">Let's connect</span>
        <h2 className="section-title reveal fade-up">Get In<br />Touch</h2>
        <div className="contact-grid">
          <div className="contact-cards reveal slide-left">
            <ContactCard icon="📧" label="Email" value="bilel.ab@esprit.tn" />
            <ContactCard icon="📱" label="Phone" value="+216 50 826 004" />
            <ContactCard icon="📍" label="Location" value="Ariana El Ghazela, Tunisia" />
            <ContactCard icon="💼" label="LinkedIn" value="linkedin.com/in/bilel-abbassi" />
            <ContactCard icon="🐙" label="GitHub" value="github.com/bilelabbassi" />
            <ContactCard icon="✅" label="Availability" value="Open to new opportunities" />
            
            {/* Brevo Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && <p className="form-success">Message sent successfully!</p>}
              {status === "error" && <p className="form-error">Failed to send message. Please try again.</p>}
            </form>
          </div>
          <div className="reveal slide-right" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="ripple-wrap">
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple"></div>
              <div className="ripple-avatar">BA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="contact-card">
      <div className={`contact-icon ci-${icon === "📧" ? "pink" : icon === "📱" ? "cyan" : icon === "📍" ? "amber" : "indigo"}`}>
        {icon}
      </div>
      <div>
        <div className="contact-label">{label}</div>
        <div className="contact-value">{value}</div>
      </div>
    </div>
  );
}