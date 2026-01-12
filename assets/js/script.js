// Initialize AOS Animations
AOS.init({ 
    duration: 1000, 
    once: false 
});

/**
 * Countdown Logic for Championship
 */
const countdownDate = new Date('Mar 4, 2026 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = "00";
        document.getElementById('hours').textContent = "00";
        document.getElementById('minutes').textContent = "00";
        document.getElementById('seconds').textContent = "00";
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = d.toString().padStart(2, '0');
    document.getElementById('hours').textContent = h.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
}

// Run countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.group');
    
    cards.forEach(card => {
        // Pré-carrega a imagem de hover para evitar delay
        const hoverImage = card.querySelector('img');
        if (hoverImage && hoverImage.src) {
            const img = new Image();
            img.src = hoverImage.src;
        }
        
        // Adiciona efeito de profundidade 3D
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            
            // Reseta a animação do brilho
            const shine = this.querySelector('.absolute.bg-gradient-to-r');
            if (shine) {
                shine.style.transition = 'none';
                shine.style.transform = 'translateX(-100%)';
                
                // Força um reflow
                void shine.offsetWidth;
                
                shine.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            }
        });
        
        // Adiciona efeito de clique
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
            // Frases para o efeito infinito
            const phrases = [
                "FUTURO E INOVAÇÃO",
                "TECNOLOGIA E IMPACTO", 
                "EXCELÊNCIA E RESULTADOS",
                "TRANSFORMAÇÃO DIGITAL",
                "CRIAÇÃO E EVOLUÇÃO"
            ];
            
            
            const tracks = [
                document.getElementById('track1'),
                document.getElementById('track2'),
                document.getElementById('track3'),
                document.getElementById('track4'),
                document.getElementById('track5')
            ];
            
            tracks.forEach((track, index) => {
                const phrase = phrases[index % phrases.length];
                // Repetir a frase várias vezes para criar continuidade
                let content = '';
                for (let i = 0; i < 20; i++) {
                    content += phrase + ' • ';
                }
                track.textContent = content;
            });
            
            // Configuração do carrossel
            const carousel = document.getElementById('carousel');
            const carouselItems = document.querySelectorAll('.carousel-item');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const indicatorsContainer = document.getElementById('indicators');
            
            let currentIndex = 0;
            const totalItems = carouselItems.length;
            
            // Criar indicadores
            carouselItems.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
            
            const indicators = document.querySelectorAll('.indicator');
            
            // Função para mover o carrossel
            function goToSlide(index) {
                // Verificar limites
                if (index < 0) index = totalItems - 1;
                if (index >= totalItems) index = 0;
                
                // Atualizar índice atual
                currentIndex = index;
                
                // Mover carrossel
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Atualizar indicadores
                indicators.forEach((indicator, i) => {
                    if (i === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
                
                // Efeito de destaque no item ativo
                carouselItems.forEach((item, i) => {
                    if (i === currentIndex) {
                        item.style.opacity = "1";
                        item.style.filter = "none";
                    } else {
                        item.style.opacity = "0.7";
                        item.style.filter = "blur(1px)";
                    }
                });
            }
            
            // Inicializar efeito de destaque
            carouselItems.forEach((item, i) => {
                if (i !== 0) {
                    item.style.opacity = "0.7";
                    item.style.filter = "blur(1px)";
                }
            });
            
            // Event listeners para botões
            prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
            nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
            
            // Navegação por teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
                if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
            });
            
            // Auto-play
            let autoPlayInterval;
            
            function startAutoPlay() {
                autoPlayInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 6000);
            }
            
            function stopAutoPlay() {
                clearInterval(autoPlayInterval);
            }
            
            // Iniciar auto-play
            startAutoPlay();
            
            // Pausar auto-play ao interagir
            const carouselContainer = document.querySelector('.carousel-container');
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
            
            // Efeito de parallax nas frases de fundo
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                tracks.forEach((track, index) => {
                    const speed = 0.5 + (index * 0.1);
                    const x = (mouseX - 0.5) * speed * 100;
                    const y = (mouseY - 0.5) * speed * 50;
                    
                    track.style.transform = `translateX(${x}px) translateY(${y}px)`;
                });
            });
            
            // Efeito de digitação no título
            const title = document.querySelector('.section-title');
            const originalText = title.textContent;
            title.textContent = '';
            let charIndex = 0;
            
            function typeWriter() {
                if (charIndex < originalText.length) {
                    title.textContent += originalText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 60);
                }
            }
            
            // Iniciar efeito de digitação
            setTimeout(typeWriter, 800);
            
            // Efeito de brilho interativo nos botões
            const buttons = document.querySelectorAll('.carousel-btn');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.boxShadow = 
                        '0 8px 30px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 193, 7, 0.8)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.boxShadow = 
                        '0 5px 20px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 193, 7, 0.3)';
                });
            });
            
            // Efeito de partículas amarelas
            function createParticles() {
                const container = document.querySelector('.section-container');
                
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'absolute';
                    particle.style.width = Math.random() * 4 + 1 + 'px';
                    particle.style.height = particle.style.width;
                    particle.style.background = `rgba(255, 193, 7, ${Math.random() * 0.3 + 0.1})`;
                    particle.style.borderRadius = '50%';
                    particle.style.left = Math.random() * 100 + 'vw';
                    particle.style.top = Math.random() * 100 + 'vh';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '2';
                    
                    // Animação
                    particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
                    particle.style.animationDelay = Math.random() * 5 + 's';
                    
                    // Definir keyframes dinamicamente
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes floatParticle {
                            0% {
                                transform: translateY(0) translateX(0);
                                opacity: 0;
                            }
                            10% {
                                opacity: 1;
                            }
                            90% {
                                opacity: 1;
                            }
                            100% {
                                transform: translateY(${-Math.random() * 100 - 50}vh) translateX(${Math.random() * 100 - 50}px);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    container.appendChild(particle);
                }
            }
            
            createParticles();
        });