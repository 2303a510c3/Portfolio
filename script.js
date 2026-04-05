// script.js - Complete JavaScript for Abhishek Yadav Portfolio

(function() {
    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target) {
                const offset = 70;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== 3D TILT EFFECT FOR PROJECT CARDS ====================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ==================== SCROLL REVEAL / FADE-IN OBSERVER ====================
    const fadeElements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .hero-content, .touch-card, .about-content, .message-form, .service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0px)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ==================== DOWNLOAD CV FUNCTIONALITY ====================
    function downloadCV() {
        const cvContent = `Abhishek Yadav - Curriculum Vitae

===========================================
PERSONAL INFORMATION
===========================================
Name: Abhishek Yadav
Location: New Delhi, India
Email: abisheky080@gmail.com
Phone: +91 8969997012

===========================================
EDUCATION
===========================================
Bachelor of Technology (B.Tech) - Computer Science
Expected Graduation: 2026
Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management, Machine Learning

===========================================
TECHNICAL SKILLS
===========================================
Languages: Python, JavaScript/TypeScript, C++, HTML/CSS
Frontend: React.js, Flutter
Backend: Node.js, Django
Database: MongoDB, PostgreSQL, MySQL
Cloud & DevOps: AWS, Firebase, Git, GitHub
AI/ML: TensorFlow, PyTorch, OpenCV

===========================================
PROJECTS
===========================================
1. Car Rental System
   - Full-featured car rental platform with real-time availability
   - Tech: React, Node.js, MongoDB, Stripe
   - Live Demo: https://2303a510c3.github.io/Car-Rental-System/

2. Civic Report App
   - Citizen platform for reporting local infrastructure issues
   - Tech: Flutter, Firebase, Google Maps API
   - GitHub: https://github.com/2303a510c3/Civic-Reporting-App.git

3. Study Help Guide
   - AI-powered study assistant with personalized roadmaps
   - Tech: Python/Django, OpenAI API, React

===========================================
EXPERIENCE & ACHIEVEMENTS
===========================================
- Active Open Source Contributor
- Full-Stack Developer (Freelance Projects)
- Participant in multiple hackathons and coding competitions

===========================================
LANGUAGES
===========================================
English (Professional Working Proficiency)
Hindi (Native)

===========================================
INTERESTS
===========================================
AI Technologies, Cloud Computing, Open Source, UI/UX Design

===========================================
References available upon request.
===========================================`;
        
        const blob = new Blob([cvContent], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Abhishek_Yadav_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Attach download CV to both hero button and any other CV buttons
    const heroDownloadBtn = document.getElementById('heroDownloadCV');
    if(heroDownloadBtn) {
        heroDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadCV();
        });
    }
    
    // Also attach to any CV button in contact section if exists
    const contactCVBtns = document.querySelectorAll('.cv-button');
    contactCVBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadCV();
        });
    });

    // ==================== FORM SUBMIT HANDLER (OPTIONAL FEEDBACK) ====================
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Optional: Show a small loading state before redirect
            const submitBtn = this.querySelector('.send-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
            submitBtn.disabled = true;
            
            // Form will submit to FormSubmit.co normally
            // Allow native submission to proceed
            setTimeout(() => {
                // If redirect takes too long, restore button (though redirect usually happens)
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
        });
    }

    // ==================== ADD MOUSE TRAIL EFFECT (OPTIONAL DELIGHT) ====================
    let lastMove = 0;
    document.body.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if(now - lastMove > 60) {
            lastMove = now;
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.width = '5px';
            spark.style.height = '5px';
            spark.style.background = '#60a5fa';
            spark.style.borderRadius = '50%';
            spark.style.left = e.clientX + 'px';
            spark.style.top = e.clientY + 'px';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '9999';
            spark.style.opacity = '0.5';
            spark.style.transition = 'all 0.4s';
            document.body.appendChild(spark);
            setTimeout(() => {
                spark.style.opacity = '0';
                spark.style.transform = 'scale(2.5)';
                setTimeout(() => spark.remove(), 300);
            }, 40);
        }
    });

    // ==================== ADD RIPPLE EFFECT ON SKILL CARDS ====================
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Visual feedback on click
            card.style.transform = 'scale(0.97)';
            setTimeout(() => {
                card.style.transform = '';
            }, 180);
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(59,130,246,0.4)';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.transform = 'scale(1)';
            ripple.style.transition = 'all 0.5s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.left = e.clientX - card.getBoundingClientRect().left + 'px';
            ripple.style.top = e.clientY - card.getBoundingClientRect().top + 'px';
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'scale(20)';
                ripple.style.opacity = '0';
                setTimeout(() => {
                    ripple.remove();
                }, 500);
            }, 10);
        });
    });

    // ==================== ADD ACTIVE NAV LINK HIGHLIGHT ON SCROLL ====================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if(item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                        // Add active styling
                        item.style.color = '#60a5fa';
                        item.style.fontWeight = '600';
                    } else {
                        item.style.color = '#cfddee';
                        item.style.fontWeight = '500';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);
    highlightActiveNav(); // Initial call

    // ==================== ADD SIMPLE TYPEWRITER EFFECT (OPTIONAL) ====================
    // Note: Removed the rotating role text as requested, but keeping this for future use if needed
    console.log('Abhishek Yadav Portfolio — Ready! ✨');

    // ==================== PREVENT CONTEXT MENU ON IMAGES (POLISH) ====================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    });

    // ==================== ADD KEYBOARD ACCESSIBILITY FOR NAVIGATION ====================
    document.addEventListener('keydown', (e) => {
        // Press 'H' to go home
        if(e.key === 'h' || e.key === 'H') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Press 'C' to go to contact section
        if(e.key === 'c' || e.key === 'C') {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if(contactSection) {
                const offset = 70;
                const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
            }
        }
        // Press 'P' to go to projects section
        if(e.key === 'p' || e.key === 'P') {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if(projectsSection) {
                const offset = 70;
                const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
            }
        }
    });

    // ==================== PERFORMANCE: DEBOUNCE RESIZE EVENTS ====================
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
})();