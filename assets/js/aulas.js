// Initialize AOS (Animate on Scroll)
AOS.init();

const modal = document.getElementById('videoModal');
const player = document.getElementById('videoPlayer');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.getElementById('closeModal');
const playButtons = document.querySelectorAll('.play-button');
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.lesson-card');

/**
 * Filter Lessons Logic
 */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.level === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/**
 * Open Video Modal Logic
 */
playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const videoId = btn.dataset.id;
        modalTitle.innerText = btn.dataset.title;
        // Construct embed URL with autoplay
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
});

/**
 * Close Video Modal Logic
 */
function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    player.src = ""; // Stop the video
    document.body.style.overflow = 'auto';
}

closeBtn.onclick = closeModal;

// Close modal when clicking outside the content area
modal.onclick = (e) => { 
    if (e.target === modal) closeModal(); 
};

// Optional: Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !modal.classList.contains('hidden')) {
        closeModal();
    }
});



const acessibilidadeVideos = {
    "5b2xMaXwdKA": {
        libras: "assets/images/libras.mp4",
        audio: "assets/images/audio.mp4" 
    }
};

let currentVideoId = null;
let currentVideoTitle = null;


document.querySelectorAll('.play-button').forEach(button => {
   
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
});


document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const videoId = this.getAttribute('data-id');
        const videoTitle = this.getAttribute('data-title');
        
        currentVideoId = videoId;
        currentVideoTitle = videoTitle;
        
        const modal = document.getElementById('videoModal');
        const player = document.getElementById('videoPlayer');
        const title = document.getElementById('modalTitle');
        
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
        title.textContent = videoTitle;
        modal.classList.add('flex');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        
        const oldBtns = document.getElementById('accessibilityBtns');
        if (oldBtns) oldBtns.remove();
       
        if (videoId === '5b2xMaXwdKA') {
            setTimeout(() => {
                addAccessibilityButtons();
            }, 500);
        }
    });
});


function addAccessibilityButtons() {
    const btnContainer = document.querySelector('#videoModal .max-w-5xl');
    if (!btnContainer) return;
    
    const accessibilityDiv = document.createElement('div');
    accessibilityDiv.id = 'accessibilityBtns';
    accessibilityDiv.className = 'mt-4 flex flex-col sm:flex-row gap-3 justify-center';
    accessibilityDiv.innerHTML = `
        <button id="activateLibras" class="bg-[#ffc107] text-black px-6 py-3 rounded-xl font-bold uppercase text-sm hover:shadow-[0_0_25px_rgba(255,193,7,0.6)] transition-all inline-flex items-center gap-2 justify-center">
            <span></span> Libras
        </button>
        <button id="activateAudio" class="bg-[#ffc107] text-black px-6 py-3 rounded-xl font-bold uppercase text-sm hover:shadow-[0_0_25px_rgba(255,193,7,0.6)] transition-all inline-flex items-center gap-2 justify-center">
            <span></span> Áudio Descritivo
        </button>
    `;
    btnContainer.appendChild(accessibilityDiv);
    
    document.getElementById('activateLibras').addEventListener('click', function() {
        openLibrasModal();
    });
    
    document.getElementById('activateAudio').addEventListener('click', function() {
        openAudioModal();
    });
}


function openLibrasModal() {
    if (!currentVideoId || !acessibilidadeVideos[currentVideoId]) return;
    
    const librasModal = document.getElementById('librasModal');
    const mainVideo = document.getElementById('librasMainVideo');
    const librasVideo = document.getElementById('librasVideo');
    const videoPath = acessibilidadeVideos[currentVideoId].libras;
    
    
    mainVideo.src = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&enablejsapi=1&start=15`;
    
    
    const source = librasVideo.querySelector('source');
    if (source) {
        source.src = videoPath;
    }
    librasVideo.load();
    
   
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) closeBtn.click();
    
   
    librasModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
   
    librasVideo.addEventListener('loadeddata', function onLoad() {
        this.play();
        this.removeEventListener('loadeddata', onLoad);
    });
}


function openAudioModal() {
    if (!currentVideoId || !acessibilidadeVideos[currentVideoId]) return;
    
    const audioModal = document.getElementById('audioModal');
    const audioVideo = document.getElementById('audioVideo');
    const videoPath = acessibilidadeVideos[currentVideoId].audio;
    
   
    const source = audioVideo.querySelector('source');
    if (source) {
        source.src = videoPath;
    }
    audioVideo.load();
    
    
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) closeBtn.click();
    
    audioModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
   
    audioVideo.addEventListener('loadeddata', function onLoad() {
        this.play();
        this.removeEventListener('loadeddata', onLoad);
    });
}

document.getElementById('closeLibrasModal').addEventListener('click', function() {
    const librasModal = document.getElementById('librasModal');
    const mainVideo = document.getElementById('librasMainVideo');
    const librasVideo = document.getElementById('librasVideo');
    
    mainVideo.src = '';
    
    const source = librasVideo.querySelector('source');
    if (source) {
        source.src = '';
    }
    librasVideo.load();
    
    librasModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});


document.getElementById('closeAudioModal').addEventListener('click', function() {
    const audioModal = document.getElementById('audioModal');
    const audioVideo = document.getElementById('audioVideo');
    
    const source = audioVideo.querySelector('source');
    if (source) {
        source.src = '';
    }
    audioVideo.load();
    
    audioModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});


document.getElementById('librasModal').addEventListener('click', function(e) {
    if (e.target === this) {
        document.getElementById('closeLibrasModal').click();
    }
});

document.getElementById('audioModal').addEventListener('click', function(e) {
    if (e.target === this) {
        document.getElementById('closeAudioModal').click();
    }
});


const style = document.createElement('style');
style.textContent = `
    #accessibilityBtns {
        animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);