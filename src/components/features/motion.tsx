'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.header nav a');
    const sections = document.querySelectorAll<HTMLElement>('main section[id]');
    const progress = document.querySelector<HTMLElement>('.scroll-progress');
    const cards = document.querySelectorAll<HTMLElement>('.project-art');
    let frame = 0;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
        const heading = element.querySelector('h2, h3');
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          defaults: { ease: 'power3.out' },
        });
        timeline.from(element, { y: 42, opacity: 0, duration: 0.9 });
        if (heading) timeline.from(heading, { y: 22, duration: 1.05 }, 0.08);
      });
      gsap.from('.disciplines span', {
        y: 20, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.disciplines', start: 'top 95%', once: true },
      });
      gsap.utils.toArray<HTMLElement>('.section-head').forEach(element => {
        gsap.from(element.children, {
          y: 12, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        });
      });
    });

    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }), { rootMargin: '-20% 0px -65% 0px' });
    sections.forEach(section => sectionObserver.observe(section));

    const updateScroll = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
      document.body.classList.toggle('has-scrolled', window.scrollY > 40);
      if (!reduced.matches) document.documentElement.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.12, 80)}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
    const moveCard = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== 'mouse') return;
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--card-x', `${x * 12}px`);
      card.style.setProperty('--card-y', `${y * 12}px`);
      card.style.setProperty('--card-rotate-x', `${-y * 7}deg`);
      card.style.setProperty('--card-rotate-y', `${x * 7}deg`);
      card.style.setProperty('--light-x', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--light-y', `${(y + 0.5) * 100}%`);
    };
    const resetCard = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.setProperty('--card-x', '0px'); card.style.setProperty('--card-y', '0px');
      card.style.setProperty('--card-rotate-x', '0deg'); card.style.setProperty('--card-rotate-y', '0deg');
    };
    cards.forEach(card => { card.addEventListener('pointermove', moveCard); card.addEventListener('pointerleave', resetCard); });
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    document.documentElement.classList.add('motion-ready');
    return () => {
      media.revert(); sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      cards.forEach(card => { card.removeEventListener('pointermove', moveCard); card.removeEventListener('pointerleave', resetCard); });
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);
  return <>
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro-inner">
        <span className="site-intro-label">PORTFOLIO / THEVINDU SITHUJAYA</span>
        <svg className="site-intro-logo" viewBox="320 425 1100 520" aria-label="Thevindu's logo" role="img">
          <g fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" pathLength="1">
            <path className="logo-stroke logo-stroke-1" pathLength="1" d="M 355 470 H 545 M 450 470 V 680" />
            <path className="logo-stroke logo-stroke-2" pathLength="1" d="M 550 470 V 680 M 550 575 H 665 M 665 470 V 680" />
            <path className="logo-stroke logo-stroke-3" pathLength="1" d="M 715 470 H 840 Q 850 470 853 480 L 976 890 Q 981 905 987 890 L 1051 710 Q 1056 695 1058 710 L 1075 900 M 715 575 H 785 M 715 680 H 815" />
            <path className="logo-stroke logo-stroke-4" pathLength="1" d="M 1120 700 L 1198 792 Q 1205 800 1198 808 L 1120 900 M 1170 700 L 1212 750 M 1212 850 L 1170 900 M 1320 700 L 1242 792 Q 1235 800 1242 808 L 1320 900 M 1380 700 L 1302 792 Q 1295 800 1302 808 L 1380 900" />
          </g>
        </svg>
        <span className="site-intro-line"><span /></span>
        <span className="site-intro-caption">CYBERSECURITY · DEVELOPMENT · MANAGEMENT</span>
      </div>
    </div>
    <div className="scroll-progress" aria-hidden="true" />
  </>;
}
