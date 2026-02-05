// Intersection Observer for poem & question
const observerOptions = { threshold: 0.3, rootMargin: '0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);
document.querySelectorAll('.poem-card, .question-card').forEach(card => observer.observe(card));

// Music toggle
const bgMusic = document.getElementById('bgMusic');
const musicButton = document.getElementById('musicButton');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
let isPlaying = false;
musicButton.addEventListener('click', () => {
    if(isPlaying){ bgMusic.pause(); playIcon.style.display='block'; pauseIcon.style.display='none'; }
    else{ bgMusic.play(); playIcon.style.display='none'; pauseIcon.style.display='block'; }
    isPlaying = !isPlaying;
});

// YES button
const yesButton = document.getElementById('yesButton');
const thankyouSection = document.getElementById('thankyouSection');
yesButton.addEventListener('click', () => {
    thankyouSection.classList.add('visible');
    thankyouSection.scrollIntoView({ behavior: 'smooth' });
    updateFlowerBloom(1); // flower.js
    createConfetti(); // confetti.js
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(to bottom, #e0e7ff 0%, #fce7f3 50%, #e0e7ff 100%)';
    }, 500);
});
