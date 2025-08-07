document.addEventListener('DOMContentLoaded', () => {
            const slides = [
                {
                    image: 'images.jpeg',
                       },
                {
                    image: 'IMG_5386-scaled (1) (1).jpg',
                            },
                {
                    image: 'ec1bdd34a2ddb32b08cfe8cdd4e7155c (1) (1).jpg',
 },
                {
                    image: 'Yamaha-FZ-X-Review-44 (1) (1).jpg',
                    
                },
        
                                  {
                    image: 'images (15).jpeg',
                      },
        {
                    image: 'Picsart_25-06-11_22-05-51-596.jpg',
                      }
            ];
            
            const background = document.querySelector('.slideshow-background');
            const foreground = document.querySelector('.slideshow-foreground');
            const controls = document.querySelector('.controls');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            let currentSlide = 0;
            let autoSlideInterval;
            const slideIntervalTime = 10000; // 10 seconds
            
            // Create slides and control buttons
            slides.forEach((slide, index) => {
                // Create slide element
                const slideElement = document.createElement('div');
                slideElement.className = 'slide';
                if (index === 0) slideElement.classList.add('active');
                
                const img = document.createElement('img');
                img.src = slide.image;
                img.alt = slide.alt;
                
                const caption = document.createElement('div');
                caption.className = 'slide-caption';
                caption.textContent = slide.caption;
                
                slideElement.appendChild(img);
                slideElement.appendChild(caption);
                foreground.appendChild(slideElement);
                
                // Create control button
                const controlBtn = document.createElement('button');
                controlBtn.className = 'control-btn';
                if (index === 0) controlBtn.classList.add('active');
                controlBtn.addEventListener('click', () => goToSlide(index));
                controls.appendChild(controlBtn);
            });
            
            // Start auto slideshow
            function startAutoSlide() {
                autoSlideInterval = setInterval(() => {
                    goToSlide((currentSlide + 1) % slides.length);
                }, slideIntervalTime);
            }
            
            // Go to specific slide
            function goToSlide(index) {
                // Update background
                background.style.backgroundImage = `url(${slides[index].image})`;
                
                // Update slides with 3D effects
                document.querySelectorAll('.slide').forEach((slide, i) => {
                    if (i === index) {
                        slide.classList.add('active');
                        slide.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
                    } else {
                        slide.classList.remove('active');
                        slide.style.transform = 'perspective(1000px) rotateY(' + 
                            (i < index ? '-' : '') + '90deg) scale(0.9)';
                    }
                });
                
                // Update controls
                document.querySelectorAll('.control-btn').forEach((btn, i) => {
                    if (i === index) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
                currentSlide = index;
                
                // Reset auto slide timer
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
            
            // Navigation buttons
            prevBtn.addEventListener('click', () => {
                goToSlide((currentSlide - 1 + slides.length) % slides.length);
            });
            
            nextBtn.addEventListener('click', () => {
                goToSlide((currentSlide + 1) % slides.length);
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    goToSlide((currentSlide - 1 + slides.length) % slides.length);
                } else if (e.key === 'ArrowRight') {
                    goToSlide((currentSlide + 1) % slides.length);
                }
            });
            
            // Start the slideshow
            background.style.backgroundImage = `url(${slides[0].image})`;
            startAutoSlide();
            
            // Pause on hover
            foreground.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            foreground.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        });
      
       // Tabs functionality (even if contents are same, for future extensibility)
    const tabs = document.querySelectorAll(".tab");
    const cityGrid = document.querySelector(".city-grid");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // Reset tab states
        tabs.forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
          t.tabIndex = -1;
        });

        // Activate clicked tab
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        tab.tabIndex = 0;
        tab.focus();

        // For demo, no content changes, but could dynamically load new city sets here
      });
    });

      
          // Function to animate numbers counting up
    function animateCountUp(el, target) {
      let start = 0;
      const duration = 2000; // total animation duration in ms
      const increment = target / (duration / 16); // approx 60fps, increments per frame
      function update() {
        start += increment;
        if(start < target) {
          el.textContent = Math.floor(start).toLocaleString();
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
      update();
    }

    // Check if element is in viewport
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    function onScroll() {
      document.querySelectorAll('.stat-card').forEach(card => {
        if(!card.classList.contains('animated') && isInViewport(card)) {
          card.classList.add('animated');
          // Animate number
          const countEl = card.querySelector('.count');
          const target = +card.getAttribute('data-target');
          animateCountUp(countEl, target);
          // Animate icon
          const icon = card.querySelector('.stat-icon');
          icon.classList.add('animate');
          // Remove animation class after animation completes to allow re-trigger if needed
          icon.addEventListener('animationend', () => {
            icon.classList.remove('animate');
          }, { once: true });
        }
      });
    }

    window.addEventListener('scroll', onScroll);
    // Trigger once on load in case elements are visible immediately
    window.addEventListener('load', onScroll);


