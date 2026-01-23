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
        const numBars = 80;
        const bars = [];
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            const height = Math.floor(Math.random() * 70) + 10;
            bar.style.setProperty('--height', `${height}%`);
            waveformContainer.appendChild(bar);
            bars.push(bar);
        }

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
            const progress = (audio.currentTime / audio.duration) * 100;
            seekSlider.value = progress || 0;

            const mins = Math.floor(audio.currentTime / 60);
            const secs = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

            const activeCount = Math.floor((progress / 100) * numBars);
            bars.forEach((bar, index) => {
                if (index < activeCount) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        });

        // Seek functionality
        seekSlider.addEventListener('input', () => {
            if (!isNaN(audio.duration)) {
                const time = (seekSlider.value / 100) * audio.duration;
                audio.currentTime = time;
            }
        });

        // Reset when finished
        audio.addEventListener('ended', () => {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            seekSlider.value = 0;
            bars.forEach(bar => bar.classList.remove('active'));
        });
    });
});
