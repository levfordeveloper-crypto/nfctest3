// Add this function at the beginning of your effects.js file
function waitForAssetsToLoad() {
    const gif = document.querySelector('.background');
    const audio = document.getElementById('backgroundsong');
    const mainContent = document.getElementById('user-page');
    const overlay = document.getElementById('overlay');
    const overlayBtn = overlay ? overlay.querySelector('button') : null;
    
    // If overlay button exists, show loading state
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
    
    function checkBothLoaded() {
        if (gifLoaded && audioLoaded) {
            // Show main content
            if (mainContent) {
                mainContent.style.display = 'flex';
            }
            
            // Remove overlay with fade effect
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(function() { 
                    overlay.style.display = 'none';
                }, 2000);
            }
            
            // Start audio
            if (audio) {
                audio.volume = 0.3;
                audio.play().catch(e => console.log('Autoplay prevented'));
            }
        }
    }
    
    // Check GIF loading
    if (gif) {
        if (gif.complete) {
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
            gifLoaded = true;
            audioLoaded = true;
            checkBothLoaded();
        }
    }, 5000);
}


function copyAddress(id) {
    const svgElement = document.getElementById(id + 'Input');
    const title = svgElement.getAttribute('title');

    navigator.clipboard.writeText(title).then(() => {
        alert('copied the discord to clipboard: @' + title);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function removeOverlay() {
    var overlay = document.getElementById('overlay');
    var userpage = document.getElementById('user-page');
    var audio = document.getElementById('backgroundsong')

    overlay.style.opacity = '0';
    userpage.style.display = 'flex';
    audio.volume = 0.3;
    audio.play();

    setTimeout(function() { 
        overlay.style.display = 'none';
    }, 2000);
}

function toggleMusic() {
    var mutebtn = document.getElementById("mutetext");
        if (mutebtn.innerHTML == "off") mutebtn.innerHTML = "on";
        else mutebtn.innerHTML = "off";
    
    var audio = document.getElementById('backgroundsong')
    audio.muted = !audio.muted;
}

document.addEventListener("DOMContentLoaded", () => {
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

/*typeWriter();
});

document.addEventListener("DOMContentLoaded", function () {
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
}); */
});