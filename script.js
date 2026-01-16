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
});
