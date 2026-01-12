// =============================================
// CREATIVE PORTFOLIO - GSAP ANIMATIONS & INTERACTIONS
// =============================================

// Configuration
const CONFIG = {
  githubUsername: 'WangzJi',
  githubToken: null, // Optional: Add token for higher rate limits
  featuredRepos: ['wangzji.github.io'],
  maxProjects: 3,
  // 贡献的开源项目列表
  contributedProjects: [
    { owner: 'apache', repo: 'incubator-seata' },
    { owner: 'alibaba', repo: 'nacos' },
    { owner: 'eosphoros-ai', repo: 'DB-GPT' }
  ]
};

// =============================================
// GEOMETRIC BACKGROUND ANIMATION (Canvas)
// =============================================

class GeometricBackground {
  constructor() {
    this.canvas = document.getElementById('geometricCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.shapes = [];
    this.resize();
    this.init();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    // Create geometric shapes
    const shapeCount = 8;
    const shapeTypes = ['circle', 'triangle', 'square', 'hexagon'];

    for (let i = 0; i < shapeCount; i++) {
      this.shapes.push({
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.1 + 0.05,
        color: this.getRandomColor()
      });
    }

    this.animateShapes();
    this.animate();
  }

  getRandomColor() {
    const colors = [
      'rgba(102, 126, 234, 0.1)',   // Purple
      'rgba(9, 132, 227, 0.1)',     // Blue
      'rgba(0, 206, 201, 0.1)',     // Cyan
      'rgba(0, 184, 148, 0.1)'      // Teal
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animateShapes() {
    this.shapes.forEach((shape, index) => {
      gsap.to(shape, {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        rotation: shape.rotation + Math.PI * 2,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });
    });
  }

  drawCircle(x, y, size, rotation) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawTriangle(x, y, size, rotation) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size / 2);
    this.ctx.lineTo(size / 2, size / 2);
    this.ctx.lineTo(-size / 2, size / 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  drawSquare(x, y, size, rotation) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.fillRect(-size / 2, -size / 2, size, size);
    this.ctx.restore();
  }

  drawHexagon(x, y, size, rotation) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const hx = (size / 2) * Math.cos(angle);
      const hy = (size / 2) * Math.sin(angle);
      if (i === 0) this.ctx.moveTo(hx, hy);
      else this.ctx.lineTo(hx, hy);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.shapes.forEach(shape => {
      this.ctx.fillStyle = shape.color;
      this.ctx.globalAlpha = shape.opacity;

      switch (shape.type) {
        case 'circle':
          this.drawCircle(shape.x, shape.y, shape.size, shape.rotation);
          break;
        case 'triangle':
          this.drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
          break;
        case 'square':
          this.drawSquare(shape.x, shape.y, shape.size, shape.rotation);
          break;
        case 'hexagon':
          this.drawHexagon(shape.x, shape.y, shape.size, shape.rotation);
          break;
      }
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// =============================================
// GSAP ANIMATIONS MANAGER
// =============================================

class AnimationsManager {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    this.init();
  }

  init() {
    this.initLoader();
    this.initHeroAnimations();
    this.initFloatingShapes();
    this.initScrollAnimations();
  }

  initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const timeline = gsap.timeline();

    timeline
      .to('.loader-logo', {
        scale: 1.2,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to('.loader-progress', {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
      })
      .to('.loader-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      })
      .to(loader, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          loader.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
  }

  initHeroAnimations() {
    const elementsToAnimate = document.querySelectorAll('[data-animate="fade-up"]');

    elementsToAnimate.forEach(element => {
      const delay = parseFloat(element.dataset.delay || 0);

      gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: delay + 2, // Add loader duration
        ease: 'power3.out'
      });
    });
  }

  initFloatingShapes() {
    const shapes = document.querySelectorAll('.geometric-shapes .shape');

    shapes.forEach((shape, index) => {
      // Floating animation
      gsap.to(shape, {
        y: '+=50',
        rotation: 360,
        duration: 15 + index * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Rotation animation
      gsap.to(shape, {
        x: '+=30',
        duration: 10 + index * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }

  initScrollAnimations() {
    // Scroll-reveal animations
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');

    revealElements.forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.05,
        ease: 'power2.out'
      });
    });


  }
}

// =============================================
// NAVIGATION MANAGER
// =============================================

class NavigationManager {
  constructor() {
    this.navDots = document.querySelectorAll('.nav-dot');
    this.sections = document.querySelectorAll('section');
    this.init();
  }

  init() {
    // Smooth scroll on nav click
    this.navDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Update active dot on scroll
    window.addEventListener('scroll', () => {
      this.updateActiveDot();
    });

    // Initial check
    this.updateActiveDot();
  }

  updateActiveDot() {
    const scrollY = window.pageYOffset + window.innerHeight / 2;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        this.navDots.forEach(dot => {
          dot.classList.remove('active');
          if (dot.getAttribute('href') === `#${sectionId}`) {
            dot.classList.add('active');
          }
        });
      }
    });
  }
}

// =============================================
// GITHUB API INTEGRATION
// =============================================

class GitHubAPI {
  constructor(username, token = null) {
    this.username = username;
    this.token = token;
    this.baseUrl = 'https://api.github.com';
    this.cache = new Map();
    this.cacheExpiry = 10 * 60 * 1000; // 10 minutes
  }

  async fetchWithCache(url, cacheKey) {
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    // Fetch fresh data
    try {
      const headers = {
        'Accept': 'application/vnd.github.v3+json'
      };

      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error(`Error fetching ${cacheKey}:`, error);

      // Return cached data if available, even if expired
      if (cached) {
        return cached.data;
      }

      throw error;
    }
  }

  async fetchRepos() {
    try {
      const repos = await this.fetchWithCache(
        `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`,
        'repos'
      );
      return repos.filter(repo => !repo.fork);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return [];
    }
  }

  async fetchContributedProjects(projects) {
    const results = [];
    for (const project of projects) {
      try {
        const repo = await this.fetchWithCache(
          `${this.baseUrl}/repos/${project.owner}/${project.repo}`,
          `contributed_${project.owner}_${project.repo}`
        );
        results.push(repo);
      } catch (error) {
        console.error(`Error fetching ${project.owner}/${project.repo}:`, error);
      }
    }
    return results;
  }

  async getUserStats() {
    try {
      return await this.fetchWithCache(
        `${this.baseUrl}/users/${this.username}`,
        'user'
      );
    } catch (error) {
      console.error('Error fetching GitHub user stats:', error);
      return null;
    }
  }
}

// =============================================
// PROJECT MANAGER
// =============================================

class ProjectManager {
  constructor() {
    this.api = new GitHubAPI(CONFIG.githubUsername, CONFIG.githubToken);
    this.projects = [];
    this.filteredProjects = [];
    this.currentFilter = 'all';
  }

  async init() {
    await this.loadProjects();
    this.initFilterButtons();
    await this.loadGitHubStats();
  }

  async loadProjects() {
    // 获取贡献的开源项目
    let repos = await this.api.fetchContributedProjects(CONFIG.contributedProjects);

    // Fallback data if API fails or returns empty (e.g. local dev CORS issues)
    if (repos.length === 0) {
      console.warn('Using fallback project data due to API fetch failure');
      repos = [
        {
          id: 101,
          name: 'incubator-seata',
          description: ':fire: Seata is an easy-to-use, high-performance, open source distributed transaction solution.',
          html_url: 'https://github.com/apache/incubator-seata',
          homepage: 'https://seata.apache.org/',
          stargazers_count: 25924,
          forks_count: 8895,
          language: 'Java',
          topics: ['at', 'consistency', 'distributed-transaction', 'microservice'],
          updated_at: new Date().toISOString(),
          owner: {
            login: 'apache',
            avatar_url: 'https://avatars.githubusercontent.com/u/47359?v=4'
          }
        },
        {
          id: 102,
          name: 'nacos',
          description: 'an easy-to-use dynamic service discovery, configuration and service management platform for building cloud native applications.',
          html_url: 'https://github.com/alibaba/nacos',
          homepage: 'https://nacos.io',
          stargazers_count: 32504,
          forks_count: 13221,
          language: 'Java',
          topics: ['a2a-registry', 'ai-registry', 'alibaba', 'config'],
          updated_at: new Date().toISOString(),
          owner: {
            login: 'alibaba',
            avatar_url: 'https://avatars.githubusercontent.com/u/1961952?v=4'
          }
        },
        {
          id: 103,
          name: 'DB-GPT',
          description: 'AI Native Data App Development framework with AWEL(Agentic Workflow Expression Language) and Agents',
          html_url: 'https://github.com/eosphoros-ai/DB-GPT',
          homepage: 'https://docs.dbgpt.site',
          stargazers_count: 17963,
          forks_count: 2520,
          language: 'Python',
          topics: ['agents', 'bgi', 'database', 'deepseek'],
          updated_at: new Date().toISOString(),
          owner: {
            login: 'eosphoros-ai',
            avatar_url: 'https://avatars.githubusercontent.com/u/137628614?v=4'
          }
        }
      ];
    }

    this.projects = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      homepage: repo.homepage,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || 'Unknown',
      topics: repo.topics || [],
      updated: new Date(repo.updated_at),
      isFeatured: true,  // 贡献项目都标记为 featured
      isContributed: true,  // 标记为贡献项目
      owner: {
        login: repo.owner ? repo.owner.login : '',
        avatarUrl: repo.owner ? repo.owner.avatar_url : ''
      }
    }));

    this.applyFilter('all');
  }

  initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-tab');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply filter
        const filter = btn.dataset.filter;
        this.applyFilter(filter);
      });
    });
  }

  applyFilter(filter) {
    this.currentFilter = filter;

    switch (filter) {
      case 'featured':
        this.filteredProjects = this.projects.filter(p => p.isFeatured);
        break;
      case 'recent':
        this.filteredProjects = this.projects
          .sort((a, b) => b.updated - a.updated)
          .slice(0, CONFIG.maxProjects);
        break;
      default: // 'all'
        this.filteredProjects = this.projects.slice(0, CONFIG.maxProjects);
    }

    this.renderProjects();
  }

  renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    if (this.filteredProjects.length === 0) {
      grid.innerHTML = `
        <div class="loading-state">
          <p>No projects found for this filter.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.filteredProjects.map(project => `
      <div class="project-card" data-featured="${project.isFeatured}">
        <div class="project-header">
          <div class="project-icon" style="overflow: hidden; padding: 8px; background: rgba(255,255,255,0.05);">
            ${this.getProjectLogoUrl(project.name) ?
        `<img src="${this.getProjectLogoUrl(project.name)}" alt="${project.name}" style="width: 100%; height: 100%; object-fit: contain;">` :
        (project.owner && project.owner.avatarUrl ?
          `<img src="${project.owner.avatarUrl}" alt="${project.owner.login}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` :
          this.getProjectIcon(project.language)
        )
      }
          </div>
          <div class="project-links">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer"
               class="project-link" title="View on GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            ${project.homepage ? `
              <a href="${project.homepage}" target="_blank" rel="noopener noreferrer"
                 class="project-link" title="Visit Website">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>

        <h3 class="project-name">${project.name}</h3>
        <p class="project-description">${project.description}</p>

        <div class="project-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>${project.stars}</span>
          </div>
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <span>${project.forks}</span>
          </div>
          <div class="meta-item">
            <span>${project.language}</span>
          </div>
        </div>

        ${project.topics.length > 0 ? `
          <div class="project-tags">
            ${project.topics.slice(0, 4).map(topic =>
        `<span class="project-tag">${topic}</span>`
      ).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');

    // Animate cards after rendering
    this.animateCards();
  }

  // Map project names to local logo images
  getProjectLogoUrl(projectName) {
    const logoMap = {
      'incubator-seata': 'assets/images/seata-logo.png',
      'seata': 'assets/images/seata-logo.png',
      'nacos': 'assets/images/nacos-logo.png'
      // DB-GPT uses GitHub avatar instead
    };
    return logoMap[projectName] || null;
  }

  getProjectIcon(language) {
    const icons = {
      'JavaScript': '⚡',
      'TypeScript': '🔷',
      'Python': '🐍',
      'Java': '☕',
      'Go': '🐹',
      'Rust': '🦀',
      'HTML': '🌐',
      'CSS': '🎨',
      'Vue': '💚',
      'React': '⚛️'
    };
    return icons[language] || '📦';
  }

  animateCards() {
    const cards = document.querySelectorAll('.project-card');

    // 使用 fromTo 确保动画结束后 opacity 为 1
    gsap.fromTo(cards,
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }

  async loadGitHubStats() {
    try {
      const stats = await this.api.getUserStats();
      if (stats) {
        // Update GitHub Stars count in About section
        const starsElement = document.getElementById('githubContributions');
        if (starsElement) {
          const totalStars = this.projects.reduce((sum, p) => sum + p.stars, 0);
          // 格式化为 k 显示，如 71100 → 71.1k
          starsElement.textContent = this.formatStars(totalStars);
        }
      }
    } catch (error) {
      console.error('Error loading GitHub stats:', error);
    }
  }

  // 格式化星标数量为 k 显示
  formatStars(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  }
}

// =============================================
// BLOG MANAGER
// =============================================

class BlogManager {
  constructor() {
    this.posts = [];
  }

  async init() {
    await this.loadPosts();
  }

  async loadPosts() {
    try {
      const response = await fetch('posts.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      // Sort by date descending and take top 3
      this.posts = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
      this.renderPosts();
    } catch (error) {
      console.warn('Error loading blog posts, using fallback data:', error);
      // Fallback data for local development or error cases
      this.posts = [
        {
          "id": 8,
          "url": "/blog/2026/01/12/hadoop-complete-guide-part1/",
          "title": "Hadoop 完全指南（一）：从零开始深入理解大数据生态核心基座",
          "excerpt": "从 0 到 1 深入解析 Hadoop 核心架构，涵盖 HDFS、YARN、MapReduce 运行原理与生产实践经验。",
          "category": "backend",
          "tags": ["Hadoop", "Big Data", "Distributed Systems", "Java"],
          "date": "2026-01-12",
          "readTime": "35 min read",
          "author": "Eric Wang"
        },
        {
          "id": 9,
          "url": "/blog/2024/02/01/seata-rm-module-analysis/",
          "title": "深入解析Seata RM模块：资源管理器的核心机制与实践",
          "excerpt": "详细拆解 Seata RM 模块的工作流程，分析其如何代理数据源并与 TC 交互以完成分布式事务的两阶段提交。",
          "category": "backend",
          "tags": ["Seata", "RM", "Distributed Transactions", "Source Code"],
          "date": "2024-02-01",
          "readTime": "20 min read",
          "author": "Eric Wang"
        },
        {
          "id": 7,
          "url": "/blog/2024/01/20/seata-tm-module-analysis/",
          "title": "深入解析Seata TM模块：分布式事务管理器的设计与实现",
          "excerpt": "深入分析Seata框架中TM（Transaction Manager）模块的架构设计、核心实现和扩展机制，探讨分布式事务管理的最佳实践。",
          "category": "backend",
          "tags": ["Seata", "分布式事务", "微服务", "Java"],
          "date": "2024-01-20",
          "readTime": "25 min read",
          "author": "Eric Wang"
        }
      ];
      this.renderPosts();
    }
  }

  renderPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    if (this.posts.length === 0) {
      grid.innerHTML = '<div class="loading-state"><p>No articles found.</p></div>';
      return;
    }

    grid.innerHTML = this.posts.map(post => {
      // Use Jekyll URL if available, fallback to old format
      const postUrl = post.url || `post.html?id=${post.id}`;
      return `
      <div class="project-card blog-card" onclick="window.location.href='${postUrl}'" style="cursor: pointer;">
        <div class="project-header">
          <div class="project-icon" style="font-size: 24px;">
            ${this.getCategoryIcon(post.category)}
          </div>
          <div class="project-links">
             <span style="font-size: 13px; color: rgba(255,255,255,0.5); font-family: var(--font-mono);">${post.date}</span>
          </div>
        </div>

        <h3 class="project-name">${post.title}</h3>
        <p class="project-description">${post.excerpt}</p>

        <div class="project-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>${post.readTime}</span>
          </div>
          <div class="project-tags">
            ${post.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `}).join('');

    // Animate blog cards
    gsap.fromTo('#blogGrid .project-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#blogGrid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  getCategoryIcon(category) {
    const icons = {
      'backend': '⚙️',
      'frontend': '🎨',
      'devops': '☁️',
      'ai': '🤖',
      'data': '📊'
    };
    return icons[category] || '📝';
  }
}

// =============================================
// INITIALIZE
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // Prevent scrolling during loader
  document.body.style.overflow = 'hidden';

  // Initialize geometric background
  new GeometricBackground();

  // Initialize GSAP animations
  new AnimationsManager();

  // Initialize navigation
  new NavigationManager();

  // Load GitHub data
  const projectManager = new ProjectManager();
  projectManager.init();

  // Initialize Blog Manager
  const blogManager = new BlogManager();
  blogManager.init();
});
