/**
 * Ahsan Iqbal — SEO Specialist Portfolio
 * Vanilla JavaScript (Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNav();
  initCopyButtons();
  initBlogModal();
  initContactForm();
  initStatCounters();
});

/* --- Mobile Menu Controller --- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* --- ScrollSpy / Active Nav Links --- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header elevation shadow
    if (scrollY > 30) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      header.style.borderBottomColor = 'rgba(30, 41, 59, 0.9)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'var(--border-subtle)';
    }

    // Active link highlighting
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --- Copy to Clipboard with Toast --- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMessage');

  let toastTimer = null;

  function showToast(text) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = text;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied';

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label} copied to clipboard!`);
        }).catch(() => {
          fallbackCopy(textToCopy, label);
        });
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`${label} copied to clipboard!`);
    } catch (err) {
      showToast(`Copy failed. Please manually copy: ${text}`);
    }
    document.body.removeChild(tempInput);
  }
}

/* --- Articles / Blog Insights Modal Data & Viewer --- */
const articlesData = {
  'ai-search': {
    category: 'AI Search & Overviews',
    title: 'The Shift to AI Search: How to Optimize for LLM Engines & Google AI Overviews',
    readTime: '5 min read',
    date: 'Sep 2026',
    content: `
      <h2>The New Reality of Search Engine Results</h2>
      <p>Search has fundamentally evolved from a 10-blue-links directory into an AI answer synthesis engine. Between Google's AI Overviews, Perplexity, and ChatGPT Search, users are increasingly getting direct answers without clicking traditional links. For businesses, this doesn't mean SEO is dead—it means the playbook has shifted from keyword stuffing to <strong>Entity Optimization and Authority Verification</strong>.</p>
      
      <h2>1. Become an Irreplaceable Citation Source</h2>
      <p>LLM search engines synthesize answers by clustering consensus across authoritative nodes. To be cited in AI answers:</p>
      <ul>
        <li><strong>Publish Original Data & Benchmarks:</strong> AI summaries love quoting specific stats ("a recent study showed 42% lift"). Generic rewrite articles are collapsed and ignored.</li>
        <li><strong>Information Gain Scoring:</strong> Ensure every piece of content contains unique perspectives, quotes, or practical frameworks not found on the top 5 ranking pages.</li>
        <li><strong>Direct Answer Formats:</strong> Lead sections with punchy 40–60 word definitions and concise summaries before expanding into technical nuance.</li>
      </ul>

      <h2>2. Semantic Entity Architecture & Schema</h2>
      <p>Search engines no longer parse strings; they parse entities. Implement clean <code>ItemPage</code>, <code>Person</code>, <code>Organization</code>, and <code>FAQPage</code> JSON-LD schema with exact <code>sameAs</code> references to establish your brand's Knowledge Graph identity.</p>

      <h2>3. Digital PR & Third-Party Consensus</h2>
      <p>LLMs rely heavily on non-owned media to verify credibility. Brand mentions across high-trust industry publications, podcast appearances, and authoritative directories feed directly into the corpus that AI search engines query during generation.</p>

      <h2>Summary Checklist for Your Brand</h2>
      <p>Audit your top money pages today: Are they answering questions concisely at the top? Is your entity markup valid? Do you have proprietary data that an LLM would cite? If not, that's where your organic growth roadmap begins.</p>
    `
  },
  'technical-audits': {
    category: 'Technical SEO',
    title: 'Technical SEO Audits That Actually Move Rankings (Not Just 80-Page PDFs)',
    readTime: '6 min read',
    date: 'Aug 2026',
    content: `
      <h2>The Flaw in Agency "Checklist" Audits</h2>
      <p>Too many SEO audits fail before they even start. An agency exports an automated Screaming Frog or Sitebulb crawl into an 80-page PDF, dumps 400 "critical issues" on an engineering team, and wonders why nothing gets fixed 6 months later. In reality, 90% of those automated flags (e.g. missing meta descriptions on tag pages) have near-zero correlation with organic revenue.</p>

      <h2>The Impact-Effort Matrix Approach</h2>
      <p>Effective technical SEO is about ruthless prioritization. I categorize every finding into four quadrants:</p>
      <ul>
        <li><strong>P0 (High Impact / Low-Medium Effort):</strong> Crawl budget traps, rendering blocks (JavaScript not executing critical internal links), noindex tag leaks, and canonical loops on primary money pages.</li>
        <li><strong>P1 (High Impact / High Effort):</strong> Full architecture overhaul, site-wide faceted navigation indexing control, international hreflang synchronization.</li>
        <li><strong>P2 (Quick Wins):</strong> Core Web Vitals LCP element optimization (optimizing hero images and caching critical CSS).</li>
        <li><strong>Ignore / Deprioritize:</strong> Low-value issues that consume engineering resources without moving the organic needle.</li>
      </ul>

      <h2>Developer-Friendly Documentation</h2>
      <p>Engineers don't want to read SEO theory; they need clear reproduction steps, exact URLs, the underlying cause, and the proposed code/configuration fix. When you deliver audits as Jira-ready user stories with tangible business impact, implementation rates jump from 15% to over 85%.</p>
    `
  },
  'saas-growth': {
    category: 'SaaS & Growth',
    title: 'SaaS Organic Traffic Engine: From Zero to Predictable Pipeline',
    readTime: '7 min read',
    date: 'Jul 2026',
    content: `
      <h2>Why Most SaaS SEO Strategies Burn Cash</h2>
      <p>Early-stage SaaS companies frequently make the mistake of chasing high-volume, top-of-funnel informational keywords (e.g., "what is project management?"). They might celebrate a 20,000 monthly traffic spike, only to discover that trial signups didn't budge. Organic search must directly serve pipeline generation.</p>

      <h2>The Bottom-of-Funnel (BoFu) First Hierarchy</h2>
      <p>When engineering organic growth for SaaS businesses, I invert the standard pyramid and start where intent is highest:</p>
      <ul>
        <li><strong>Alternative & Comparison Pages:</strong> "Competitor A vs Competitor B", "Competitor A Alternatives". These prospects are already holding their credit cards and looking for reasons to switch.</li>
        <li><strong>Use-Case & Persona Landing Pages:</strong> Building dedicated keyword clusters around specific workflows (e.g. "Automated Invoicing for Remote Agencies") rather than generic software terms.</li>
        <li><strong>Product-Led SEO & Templates:</strong> Free calculators, downloadable checklists, or template libraries that rank on high-volume intent while naturally funneling into the product experience.</li>
      </ul>

      <h2>Aligning GA4, GSC, and Closed-Won Revenue</h2>
      <p>SEO success in SaaS cannot stop at rankings. By tying Google Analytics 4 key event tracking and CRM attribution directly into Looker Studio dashboards, we measure which organic search clusters actually generate demo bookings, qualified leads, and expansion revenue.</p>
    `
  }
};

function initBlogModal() {
  const modal = document.getElementById('articleModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const readButtons = document.querySelectorAll('.read-more-btn');

  if (!modal) return;

  const modalCat = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalBody = document.getElementById('modalBody');

  function openArticle(articleId) {
    const article = articlesData[articleId];
    if (!article) return;

    if (modalCat) modalCat.textContent = article.category;
    if (modalTitle) modalTitle.textContent = article.title;
    if (modalMeta) modalMeta.textContent = `${article.date} · ${article.readTime}`;
    if (modalBody) modalBody.innerHTML = article.content;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  readButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = btn.getAttribute('data-article');
      openArticle(articleId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --- Contact Form Handling --- */
function initContactForm() {
  const form = document.getElementById('leadContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const service = document.getElementById('formService').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Compose formatted mailto link
    const subject = encodeURIComponent(`SEO Inquiry: ${service} - from ${name}`);
    const bodyContent = encodeURIComponent(
      `Hello Ahsan,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service of Interest: ${service}\n\n` +
      `Project Details:\n${message}\n\n` +
      `Looking forward to hearing from you!`
    );

    const mailtoUrl = `mailto:ahsanpak3491@gmail.com?subject=${subject}&body=${bodyContent}`;
    window.location.href = mailtoUrl;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✓ Opening Email Client...';
    submitBtn.style.background = 'var(--accent-light)';

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
    }, 4000);
  });
}

/* --- Animated Stat Counters on Scroll --- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 1600;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  statNumbers.forEach(stat => observer.observe(stat));
}
