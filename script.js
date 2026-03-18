const steps = [
  {
    emoji: '🗺️',
    headline: 'ESCOLHA O LOCAL',
    body: 'Shopping • Elevador • Hall<br>Segmente seu público com precisão'
  },
  {
    emoji: '🎨',
    headline: 'ENVIE O MATERIAL',
    body: 'Vídeo • Imagem • Animação<br>Nossa equipe adapta se precisar'
  },
  {
    emoji: '✅',
    headline: 'APROVAÇÃO',
    body: 'Revisão rápida e agendamento<br>Você define horários e período'
  },
  {
    emoji: '📺',
    headline: 'AO VIVO!',
    body: 'Sua marca nas telas agora<br>Relatórios em tempo real'
  },
];

let currentStep = 0;

function setStep(idx) {
  currentStep = idx;

  document.querySelectorAll('.step-item').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });

  const s = steps[idx];
  document.getElementById('screenEmoji').textContent    = s.emoji;
  document.getElementById('screenHeadline').textContent = s.headline;
  document.getElementById('screenBody').innerHTML       = s.body;
  document.getElementById('progressFill').style.width   =
    ((idx + 1) / steps.length * 100) + '%';
}

/* Auto-cycle when section is visible */
let autoTimer = null;
const stepObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      autoTimer = setInterval(() => {
        currentStep = (currentStep + 1) % steps.length;
        setStep(currentStep);
      }, 2800);
    } else {
      clearInterval(autoTimer);
    }
  });
}, { threshold: 0.4 });

stepObserver.observe(document.getElementById('stepList'));

/* Scroll-triggered fade-in for cards and items */
const fadeEls = document.querySelectorAll('.loc-card, .step-item, .stat-item');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = e.target.classList.contains('loc-card')
        ? 'translateY(0)'
        : '';
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  if (el.classList.contains('loc-card')) el.style.transform = 'translateY(24px)';
  fadeObserver.observe(el);
});
