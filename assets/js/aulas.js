
    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const lessonCards = document.querySelectorAll('.lesson-card');
        const lessonButtons = document.querySelectorAll('.lesson-btn');
        const videoModal = document.getElementById('videoModal');
        const closeModal = document.getElementById('closeModal');
        const videoContainer = document.getElementById('videoContainer');
        const modalTitle = document.getElementById('modalTitle');

     
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
            
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                
              
                lessonCards.forEach(card => {
                    const cardLevel = card.getAttribute('data-level');
                    
                    if (filterValue === 'all' || cardLevel === filterValue) {
                        card.style.display = 'block';
                      
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

       //nao funciona
       //funcionou
        lessonButtons.forEach(button => {
            button.addEventListener('click', function() {
                const iframeHTML = this.getAttribute('data-iframe');
                const title = this.getAttribute('data-title');
                
              
                videoContainer.innerHTML = iframeHTML;
                modalTitle.textContent = title;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

   
        function closeVideoModal() {
            videoModal.classList.remove('active');
            videoContainer.innerHTML = ''; 
            document.body.style.overflow = 'auto';
        }

        closeModal.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) closeVideoModal();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    });
