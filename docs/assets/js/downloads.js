// Download tracking and platform detection
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtns = document.querySelectorAll('.download-btn');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');

            // In a real implementation, you'd have actual download URLs
            alert(`Download for ${platform} would start here.\n\nThis is a demo - actual download links would be configured based on your release process.`);
        });
    });

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
        if (recommendedBtn) {
            recommendedBtn.classList.add('recommended');
            const recommendedBadge = document.createElement('span');
            recommendedBadge.className = 'recommended-badge';
            recommendedBadge.textContent = 'Recommended for your system';
            recommendedBtn.appendChild(recommendedBadge);
        }
    }
});

