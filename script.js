// Initialize Supabase
const supabaseUrl = 'https://sdconinhwvanktqwcggp.supabase.co';
const supabaseKey = 'sb_publishable_9yg2JUR0Yiu08p-expcNPg_ltclQYBi';
// Use window.supabase to ensure we are accessing the global library
const supabaseClient = window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');
        const originalSvg = button.innerHTML;
        button.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalSvg;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Automatically update copyright year and training years
document.addEventListener('DOMContentLoaded', () => {
    // Update Copyright Year
    const yearElements = document.querySelectorAll('#current-year, #currentYear');
    const now = new Date();
    const currentYear = now.getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Update Training Years (Age - 6, born June 2004)
    const trainingSpan = document.getElementById('training-years');
    if (trainingSpan) {
        const birthDate = new Date(2004, 5); // June is index 5
        let age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();

        // Adjust age if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
            age--;
        }

        const trainingYears = age - 6;
        trainingSpan.textContent = `${trainingYears}+`;
    }

    // Custom Audio Player Logic
    const players = document.querySelectorAll('.audio-player');
    const allAudioLinks = []; // Track all audio instances

    players.forEach(player => {
        const audioSrc = player.getAttribute('data-src');
        const audio = new Audio(audioSrc);
        allAudioLinks.push(audio);
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const playIcon = player.querySelector('.play-icon');
        const pauseIcon = player.querySelector('.pause-icon');
        const seekSlider = player.querySelector('.audio-seek');
        const timeDisplay = player.querySelector('.audio-time');
        const waveformContainer = player.querySelector('.waveform-container');

        // Generate pseudo-waveform bars
        const numBars = window.innerWidth > 600 ? 80 : 50;
        const bars = [];
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';

            // Dramatic Peak Math: use Math.pow to create more contrast
            const randomVal = Math.random();
            const exponentialHeight = Math.pow(randomVal, 1.8) * 92 + 3;

            bar.style.setProperty('--height', `${exponentialHeight}%`);
            waveformContainer.appendChild(bar);
            bars.push(bar);
        }

        // Update visual waveform
        function updateWaveform(progress) {
            const activeCount = Math.floor((progress / 100) * numBars);
            bars.forEach((bar, index) => {
                if (index < activeCount) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        }

        let isHovering = false;
        waveformContainer.addEventListener('mousemove', (e) => {
            isHovering = true;
            const rect = waveformContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const progress = Math.min(Math.max((x / rect.width) * 100, 0), 100);
            updateWaveform(progress);
        });

        waveformContainer.addEventListener('mouseleave', () => {
            isHovering = false;
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                updateWaveform(progress);
            } else {
                updateWaveform(0);
            }
        });

        // Toggle Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                // Pause all other tracks
                allAudioLinks.forEach(a => {
                    if (a !== audio) a.pause();
                });
                audio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                audio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });

        // Listen for pause on this audio (triggered by play on another audio)
        audio.addEventListener('pause', () => {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        });

        // Update progress
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekSlider.value = progress || 0;

                const mins = Math.floor(audio.currentTime / 60);
                const secs = Math.floor(audio.currentTime % 60);
                timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

                if (!isHovering) {
                    updateWaveform(progress);
                }
            }
        });

        // Seek Functionality (changed back to 'change' for better performance)
        seekSlider.addEventListener('change', () => {
            if (audio.duration && !isNaN(audio.duration)) {
                audio.currentTime = (seekSlider.value / 100) * audio.duration;

                // Start playing if paused when seeking
                if (audio.paused) {
                    allAudioLinks.forEach(a => {
                        if (a !== audio) a.pause();
                    });
                    audio.play();
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                }
            }
        });

        // Reset when finished
        audio.addEventListener('ended', () => {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            seekSlider.value = 0;
            updateWaveform(0);
        });
    });

    // Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav_links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
