
        const countdownDate = new Date('Nov 5, 2025 00:00:00').getTime();
        

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

           
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            
            if (distance < 0) {
                clearInterval(countdownFunction);
                document.querySelector('.countdown-title').textContent = 'Campeonato Iniciado!';
                document.querySelector('.countdown-grid').innerHTML = '<div style="grid-column: 1 / -1; padding: 2rem; color: var(--accent-yellow); font-size: 1.5rem;">Boa Sorte!</div>';
            }
        }

        
        const countdownFunction = setInterval(updateCountdown, 1000);

        updateCountdown();