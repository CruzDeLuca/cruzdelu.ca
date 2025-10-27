class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          position: relative;
          padding: 0.5rem 0;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: #3b82f6;
          transition: width 0.3s ease;
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 5rem;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(0, 0, 0, 0.9);
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-150%);
            transition: transform 0.3s ease;
          }
          .nav-links.active {
            transform: translateY(0);
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="/" class="logo">Cruz DeLuca</a>
        <div class="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
        <button class="mobile-menu-btn">
          <i data-feather="menu"></i>
        </button>
      </nav>
    `;

    // Replace <i data-feather> inside this shadow root so feather icons render in Shadow DOM
    if (window.feather) {
      this.shadowRoot.querySelectorAll('[data-feather]').forEach(el => {
        const name = el.getAttribute('data-feather');
        if (feather.icons && feather.icons[name]) {
          el.outerHTML = feather.icons[name].toSvg();
        }
      });
    }

    // Initialize mobile menu toggle
    const menuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
    const navLinks = this.shadowRoot.querySelector('.nav-links');
    
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        feather.replace();
      });
    }
  }
}

customElements.define('custom-navbar', CustomNavbar);