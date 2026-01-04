// Splash Screen - Wait for the logo to load, then ensure it's visible for at least 3.5s
document.addEventListener('DOMContentLoaded', function() {
    const MIN_DELAY = 3500; // milliseconds
    const logo = document.getElementById('logo');
    const startTime = Date.now();

    function scheduleRedirect() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DELAY - elapsed);
        setTimeout(function() {
            window.location.href = 'signin.html';
        }, remaining);
    }

    if (logo) {
        // If image already loaded (cache), proceed but still respect MIN_DELAY
        if (logo.complete && logo.naturalWidth !== 0) {
            scheduleRedirect();
        } else {
            // Wait for the image to load or error, then redirect after MIN_DELAY
            logo.addEventListener('load', scheduleRedirect);
            logo.addEventListener('error', function() {
                // If image fails to load, still wait MIN_DELAY then go to signin
                setTimeout(function() {
                    window.location.href = 'signin.html';
                }, MIN_DELAY);
            });
            // As a safety, ensure we don't wait indefinitely (fallback)
            setTimeout(function() {
                // If redirect hasn't happened yet, go ahead
                if (Date.now() - startTime < MIN_DELAY + 100) {
                    scheduleRedirect();
                }
            }, MIN_DELAY + 2000); // give an extra 2s for slow loads
        }
    } else {
        // No logo element found — just wait MIN_DELAY then redirect
        setTimeout(function() {
            window.location.href = 'signin.html';
        }, MIN_DELAY);
    }
});
