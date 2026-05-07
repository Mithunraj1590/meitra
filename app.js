document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis Smooth Scroll
    console.log('Initializing Lenis v1.1.20...');
    const lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        gestureOrientation: 'vertical',
        normalizeWheel: true,
        smoothTouch: true
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Setup Flip Clocks
    function setupFlipClocks() {
        document.querySelectorAll('.huge-number').forEach(el => {
            const rawValue = el.textContent.trim();
            const targetValue = rawValue.padStart(3, '0'); // Pad with 0s for a perfect 3-box look
            el.innerHTML = '';
            el.setAttribute('data-target', targetValue);
            
            targetValue.split('').forEach(digit => {
                const card = document.createElement('div');
                card.className = 'flip-card';
                card.innerHTML = `
                    <div class="flip-half top"><div class="flip-text">${digit}</div></div>
                    <div class="flip-half bottom"><div class="flip-text">0</div></div>
                    <div class="leaf">
                        <div class="leaf-face leaf-front">
                            <div class="flip-text">0</div>
                            <div class="shadow"></div>
                        </div>
                        <div class="leaf-face leaf-back">
                            <div class="flip-text">${digit}</div>
                            <div class="shadow"></div>
                        </div>
                    </div>
                `;
                el.appendChild(card);
            });
        });
    }


    function animateFlipClock(el) {
        const targetValue = el.getAttribute('data-target');
        const cards = el.querySelectorAll('.flip-card');
        
        cards.forEach((card, i) => {
            const targetDigit = targetValue[i];
            const leaf = card.querySelector('.leaf');
            const frontShadow = leaf.querySelector('.leaf-front .shadow');
            const backShadow = leaf.querySelector('.leaf-back .shadow');
            
            if (targetDigit !== '0') {
                if (card._tl) card._tl.kill();
                
                const tl = gsap.timeline({ delay: i * 0.1 });
                card._tl = tl;

                
                tl.to(leaf, {
                    rotationX: -180,
                    duration: 0.6,
                    ease: "back.out(2)", // Snappy snap with a slight bounce
                });
                
                tl.to(frontShadow, {
                    opacity: 1,
                    duration: 0.35,
                }, 0);
                
                tl.to(backShadow, {
                    opacity: 1,
                    duration: 0.35,
                }, 0.35);

                tl.call(() => {
                    card.querySelector('.bottom .flip-text').textContent = targetDigit;
                }, null, 0.7);
            }
        });
    }

    gsap.registerPlugin(ScrollTrigger);

    setupFlipClocks();

    const slides = gsap.utils.toArray('.reel-slide');
    
    // Create ScrollTriggers for each slide to trigger animations
    slides.forEach((slide, i) => {
        ScrollTrigger.create({
            trigger: slide,
            start: "top center",
            once: true, // Run animation only once per page session
            onEnter: () => {
                const counter = slide.querySelector('.huge-number');
                if (counter) animateFlipClock(counter);
            }
        });
    });



    // Snapping logic refined for Lenis
    ScrollTrigger.create({
        trigger: ".reel-wrapper",
        start: "top top",
        end: "bottom bottom",
        snap: {
            snapTo: 1 / (slides.length - 1),
            duration: { min: 0.1, max: 0.3 },
            delay: 0,
            ease: "power1.inOut"
        }
    });


    ScrollTrigger.refresh();

    // Elements for Bottom Sheet
    const sheet = document.getElementById('article-sheet');
    const closeBtn = document.querySelector('.close-sheet-btn');
    const overlay = document.querySelector('.sheet-overlay');

    // Article Data Mapping
    const articleData = {
        "1": { title: "അപസ്മാരം മാറ്റുന്ന ശസ്ത്രക്രിയ", content: "Centre of Excellence in Neuro Sciences at Meitra Hospital provides advanced treatment for complex epilepsy cases...", doctor: "Dr. അഞ്ജലി നാഥ്" },
        "2": { title: "പുതിയൊരു ഹൃദയവുമായി ജീവിതത്തിലേക്ക്", content: "Meitra's Cardiac Sciences department performing life-saving heart transplants with international standards...", doctor: "Dr. രാഹുൽ കൃഷ്ണ" },
        "3": { title: "വീണ്ടും നടന്നു തുടങ്ങിയ നിമിഷം", content: "Advanced Orthopaedic surgeries and robotic-assisted joint replacements helping patients regain mobility...", doctor: "Dr. മനു പ്രസാദ്" },
        "4": { title: "അർബുദത്തെ അതിജീവിച്ച പുഞ്ചിരി", content: "Comprehensive Oncology care with personalized treatment plans and the latest radiation technology...", doctor: "Dr. സീത ലക്ഷ്മി" },
        "5": { title: "ആരോഗ്യമുള്ള ഉദരം, സന്തോഷമുള്ള ജീവിതം", content: "Specialized Gastroenterology care for chronic digestive disorders and liver diseases...", doctor: "Dr. വിനയ് കുമാർ" },
        "6": { title: "വൃക്ക മാറ്റിവെക്കലിലൂടെ പുതുജീവൻ", content: "State-of-the-art Nephrology and kidney transplant unit providing holistic care for renal failure...", doctor: "Dr. സന്ദീപ് വാര്യർ" },
        "7": { title: "നിമിഷങ്ങൾക്കുള്ളിൽ രക്ഷിച്ച ജീവൻ", content: "24/7 Emergency and Trauma care equipped to handle any medical crisis within the golden hour...", doctor: "Dr. നിതിൻ തോമസ്" },
        "8": { title: "ആദ്യത്തെ പുഞ്ചിരി, വലിയ സന്തോഷം", content: "Dedicated Mother & Child center focusing on neonatal intensive care and high-risk pregnancies...", doctor: "Dr. മീര നായർ" },
        "9": { title: "നിവർന്നു നിൽക്കാൻ പഠിച്ചപ്പോൾ", content: "Expert Spine surgeons correcting complex spinal deformities and providing minimally invasive solutions...", doctor: "Dr. അജിത് പി." },
        "10": { title: "വേദനയില്ലാത്ത നാളുകളിലേക്ക്", content: "General and Laparoscopic surgery department ensuring faster recovery and minimal scarring...", doctor: "Dr. അരുൺ ഭാസ്കർ" }
    };

    // Function to open the sheet
    const openSheet = (articleId) => {
        const data = articleData[articleId];
        if (data) {
            const titleEl = sheet.querySelector('h3');
            if (titleEl) titleEl.textContent = data.title;
            const introEl = sheet.querySelector('.article-intro');
            if (introEl) introEl.textContent = data.content;
            const docEl = sheet.querySelector('.doc-info h5');
            if (docEl) docEl.textContent = data.doctor;
        }
        
        sheet.classList.add('active');
        // Stop Lenis scroll
        lenis.stop();
        // Prevent scrolling while reading
        document.body.style.overflow = 'hidden';
    };

    // Function to close the sheet
    const closeSheet = () => {
        sheet.classList.remove('active');
        // Restart Lenis scroll
        lenis.start();
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    };


    closeBtn.addEventListener('click', closeSheet);
    overlay.addEventListener('click', closeSheet);

    // Fullscreen Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const menuLinks = document.querySelectorAll('.menu-list a');

    const toggleMenu = () => {
        const isActive = menuToggle.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        
        if (isActive) {
            lenis.stop();
        } else {
            lenis.start();
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            fullscreenMenu.classList.remove('active');
            lenis.start();
        });
    });

    // Basic drag-down to close for the sheet (optional enhancement)

    const sheetContent = document.querySelector('.sheet-content');
    let startY = 0;
    let currentY = 0;
    
    sheetContent.addEventListener('touchstart', (e) => {
        // Only allow drag on the handle or header area
        if(e.target.closest('.sheet-drag-handle') || e.target.tagName !== 'P') {
            startY = e.touches[0].clientY;
        }
    }, { passive: true });

    sheetContent.addEventListener('touchmove', (e) => {
        if (!startY) return;
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        // If swiping down
        if (diff > 0) {
            sheetContent.style.transform = `translateY(${diff}px)`;
            sheetContent.style.transition = 'none';
        }
    }, { passive: true });

    sheetContent.addEventListener('touchend', (e) => {
        if (!startY) return;
        const diff = currentY - startY;
        
        sheetContent.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        sheetContent.style.transform = '';
        
        // Threshold to close
        if (diff > 150) {
            closeSheet();
        }
        
        startY = 0;
        currentY = 0;
    }, { passive: true });

    // Initialize Swiper for Centres of Excellence
    new Swiper(".excellence-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1100: {
                slidesPerView: 3,
            }
        },
    });


    ScrollTrigger.refresh();
});

