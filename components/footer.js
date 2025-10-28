class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 3rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .social-links a {
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
        }
        .social-links a:hover {
          background: rgba(59, 130, 246, 0.5);
          transform: translateY(-3px);
        }
        .copyright {
          opacity: 0.7;
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .social-links {
            gap: 1rem;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="social-links">
            <a href="https://www.linkedin.com/in/cruzdeluca/" aria-label="LinkedIn"><i data-feather="linkedin"></i></a>
            <a href="https://github.com/CruzDeLuca" aria-label="GitHub"><i data-feather="github"></i></a>
            <a href="mailto:cruz@cruzdelu.ca" aria-label="Email"><i data-feather="mail"></i></a>
          </div>
          <p class="copyright">© ${new Date().getFullYear()} Cruz DeLuca. All rights reserved.</p>
        </div>
      </footer>
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
  }
}

customElements.define('custom-footer', CustomFooter);