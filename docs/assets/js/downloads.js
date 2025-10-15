// Download tracking and platform detection
document.addEventListener('DOMContentLoaded', function() {
    // Auto-detect platform and highlight recommended download
    const userAgent = navigator.userAgent.toLowerCase();
    let detectedPlatform = '';

    if (userAgent.indexOf('mac') !== -1) {
        detectedPlatform = userAgent.indexOf('intel') !== -1 ? 'macos-intel' : 'macos-apple';
    } else if (userAgent.indexOf('win') !== -1) {
        detectedPlatform = 'windows';
    } else if (userAgent.indexOf('linux') !== -1) {
        detectedPlatform = 'linux';
    }

    if (detectedPlatform) {
        const recommendedBtn = document.querySelector(`[data-platform="${detectedPlatform}"]`);
        if (recommendedBtn && !recommendedBtn.disabled) {
            recommendedBtn.classList.add('recommended');
            const recommendedBadge = document.createElement('span');
            recommendedBadge.className = 'recommended-badge';
            recommendedBadge.textContent = 'Recommended for your system';
            recommendedBtn.appendChild(recommendedBadge);
        }
    }

    // Optional: Track download clicks
    const downloadBtns = document.querySelectorAll('.download-btn:not(.btn-disabled)');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            console.log(`Download started for platform: ${platform}`);
            // You can add analytics tracking here if needed
        });
    });
});

