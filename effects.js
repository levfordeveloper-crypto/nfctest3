// Add this at the beginning of your effects.js file
function waitForAssetsToLoad() {
    const gif = document.querySelector('.background');
    const audio = document.getElementById('backgroundsong');
    const mainContent = document.getElementById('user-page');
    const overlay = document.getElementById('overlay');
    const overlayBtn = overlay ? overlay.querySelector('button') : null;
    
    // Show loading state
    if (overlayBtn) {
        overlayBtn.textContent = 'Loading...';
        overlayBtn.disabled = true;
    }
    
    // Hide main content initially
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    let gifLoaded = false;
    let audioLoaded = false;
    let assetsReady = false;
    
    function showContent() {
        if (assetsReady) return; // Prevent double execution
        assetsReady = true;
        
        // Show main content
        if (mainContent) {
            mainContent.style.display = 'flex';
        }
        
        // Fade out overlay
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(function() { 
                overlay.style.display = 'none';
            }, 2000);
        }
        
        // Start audio and GIF together
        if (audio) {
            audio.volume = 0.3;
            
            // Reset audio to beginning and play
            audio.currentTime = 0;
            
            // Play audio
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Autoplay prevented, waiting for user interaction');
                    // If autoplay is blocked, play on any click
                    document.addEventListener('click', function playOnClick() {
                        audio.play().catch(e => console.log('Still blocked'));
                        document.removeEventListener('click', playOnClick);
                    }, { once: true });
                });
            }
        }
        
        // Ensure GIF starts from beginning
        if (gif) {
            // Force GIF to restart by reloading if possible
            const gifSrc = gif.src;
            gif.src = '';
            setTimeout(() => {
                gif.src = gifSrc;
            }, 10);
        }
    }
    
    function checkBothLoaded() {
        if (gifLoaded && audioLoaded) {
            showContent();
        }
    }
    
    // Check GIF loading
    if (gif) {
        if (gif.complete && gif.naturalHeight !== 0) {
            gifLoaded = true;
            checkBothLoaded();
        } else {
            gif.addEventListener('load', function() {
                gifLoaded = true;
                checkBothLoaded();
            });
            gif.addEventListener('error', function() {
                // If GIF fails, still proceed
                gifLoaded = true;
                checkBothLoaded();
            });
        }
    } else {
        gifLoaded = true;
        checkBothLoaded();
    }
    
    // Check Audio loading
    if (audio) {
        // Check if audio is already loaded
        if (audio.readyState >= 4) {
            audioLoaded = true;
            checkBothLoaded();
        } else {
            audio.addEventListener('canplaythrough', function() {
                audioLoaded = true;
                checkBothLoaded();
            });
            audio.addEventListener('error', function() {
                // If audio fails, still proceed
                audioLoaded = true;
                checkBothLoaded();
            });
        }
    } else {
        audioLoaded = true;
        checkBothLoaded();
    }
    
    // Fallback timeout (5 seconds max wait)
    setTimeout(function() {
        if (!gifLoaded || !audioLoaded) {
            console.log('Fallback: forcing load after timeout');
            gifLoaded = true;
            audioLoaded = true;
            showContent();
        }
    }, 5000);
}

// Modified removeOverlay function to work with the new system
function removeOverlay() {
    var overlay = document.getElementById('overlay');
    var userpage = document.getElementById('user-page');
    var audio = document.getElementById('backgroundsong');
    var gif = document.querySelector('.background');

    overlay.style.opacity = '0';
    userpage.style.display = 'flex';
    audio.volume = 0.3;
    audio.currentTime = 0;
    audio.play();
    
    // Restart GIF
    if (gif) {
        const gifSrc = gif.src;
        gif.src = '';
        setTimeout(() => {
            gif.src = gifSrc;
        }, 10);
    }

    setTimeout(function() { 
        overlay.style.display = 'none';
    }, 2000);
}

// Enhanced toggleMusic to handle looping
function toggleMusic() {
    var mutebtn = document.getElementById("mutetext");
    if (mutebtn.innerHTML == "off") mutebtn.innerHTML = "on";
    else mutebtn.innerHTML = "off";
    
    var audio = document.getElementById('backgroundsong');
    var gif = document.querySelector('.background');
    
    audio.muted = !audio.muted;
    
    // If unmuting and audio ended, restart both
    if (!audio.muted && audio.ended) {
        audio.currentTime = 0;
        audio.play();
        // Restart GIF
        if (gif) {
            const gifSrc = gif.src;
            gif.src = '';
            setTimeout(() => {
                gif.src = gifSrc;
            }, 10);
        }
    }
}

// Add loop synchronization
function setupLoopSync() {
    const audio = document.getElementById('backgroundsong');
    const gif = document.querySelector('.background');
    
    if (audio && gif) {
        // When audio ends, restart both
        audio.addEventListener('ended', function() {
            // Restart GIF
            const gifSrc = gif.src;
            gif.src = '';
            setTimeout(() => {
                gif.src = gifSrc;
            }, 10);
            
            // Restart audio if not muted
            if (!audio.muted) {
                audio.currentTime = 0;
                audio.play().catch(e => console.log('Play prevented'));
            }
        });
    }
}

// Your existing functions remain unchanged
function copyAddress(id) {
    const svgElement = document.getElementById(id + 'Input');
    const title = svgElement.getAttribute('title');

    navigator.clipboard.writeText(title).then(() => {
        alert('copied the discord to clipboard: @' + title);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Modified DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
    // Setup loop synchronization
    setupLoopSync();
    
    // Wait for assets to load first
    waitForAssetsToLoad();
    
    // Your existing typewriter code
    const prefix = "⠐ ";
    const titleText = "decal";
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
        document.title = prefix + titleText.substring(0, index);

        if (!isDeleting && index < titleText.length) {
            index++;
            setTimeout(typeWriter, 200);
        } else if (isDeleting && index > 0) {
            index--;
            setTimeout(typeWriter, 200);
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeWriter, 1000);
        }
    }

    typeWriter();
    
    // Commented out code remains as is...
    /* 
    const elements = document.querySelectorAll('.typewriter');
    const texts = ["email me: i@clu.ng", "i love kira", "#999"];
    const typingSpeed = 100;
    const pauseDuration = 1000;
    let currentIndex = 0;

    elements.forEach((element) => {
        element.textContent = '';
        let textIndex = 0;
        let forward = true;

        function typeWriter() {
            const currentText = texts[currentIndex];

            if (forward) {
                if (textIndex < currentText.length) {
                    element.textContent += currentText.charAt(textIndex);
                    textIndex++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    setTimeout(() => {
                        forward = false;
                        typeWriter();
                    }, pauseDuration);
                }
            } else {
                if (textIndex > 0) {
                    textIndex--;
                    element.textContent = currentText.substring(0, textIndex);
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    currentIndex = (currentIndex + 1) % texts.length;
                    forward = true;
                    setTimeout(typeWriter, pauseDuration);
                }
            }
        }

        typeWriter();
    });
    */
});
