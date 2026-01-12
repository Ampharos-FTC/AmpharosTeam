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