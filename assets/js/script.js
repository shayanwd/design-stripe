// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const megaMenuHolder = document.querySelector('.mega-menu-holder');
    const menuItems = document.querySelectorAll('.menu-set button, .menu-set a');
    const menuBottom = document.querySelector('.cus-menu-bottom');
    const menuLines = menuBtn.querySelectorAll('.menu-line');
    const menuLinks = document.querySelectorAll('.mega-menu-holder .hover-box a');

    // Menu button mouse animation
    const handleMenuBtnMouseMove = (e) => {
        const rect = menuBtn.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        menuLines.forEach(line => {
            const centerY = rect.height / 2;
            const maxMove = 5;
            
            const moveX = (mouseX - rect.width / 2) / rect.width * maxMove;
            const moveY = (mouseY - centerY) / rect.height * maxMove;
            
            line.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    };

    const resetMenuBtnPosition = () => {
        menuLines.forEach(line => {
            line.style.transform = 'none';
        });
    };

    // Close button mouse animation
    const handleCloseBtnMouseMove = (e) => {
        const bounds = closeMenuBtn.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left - bounds.width / 2;
        const mouseY = e.clientY - bounds.top - bounds.height / 2;
        
        const maxMove = 10;
        const moveX = Math.max(Math.min(mouseX * 0.2, maxMove), -maxMove);
        const moveY = Math.max(Math.min(mouseY * 0.2, maxMove), -maxMove);

        closeMenuBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const resetCloseBtnPosition = () => {
        closeMenuBtn.style.transform = 'translate(0, 0)';
    };

    // Menu show/hide functions
    const showMenu = () => {
        megaMenuHolder.classList.add('show');
        
        // Reset menu state when showing
        resetMenuSets();
        hideAllHoverBoxes();
        resetMenuColors();
        
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 500 + (index * 100));
        });

        setTimeout(() => {
            menuBottom.style.opacity = '1';
            menuBottom.style.transform = 'translateY(0)';
        }, 500 + (menuItems.length * 100));
    };

    const hideMenu = () => {
        megaMenuHolder.classList.remove('show');
        
        // Reset menu items animation state
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });

        // Reset menu bottom animation state
        menuBottom.style.opacity = '0';
        menuBottom.style.transform = 'translateY(20px)';
        
        // Reset menu state
        setTimeout(() => {
            resetMenuSets();
            hideAllHoverBoxes();
            resetMenuColors();
        }, 300);
    };

    // Helper function to reset menu sets to initial state
    const resetMenuSets = () => {
        const menuSet1 = document.querySelector('.menu-set-1');
        const menuSet2 = document.querySelector('.menu-set-2');
        const menuSet3 = document.querySelector('.menu-set-3');

        menuSet1.style.display = 'flex';
        menuSet1.style.opacity = '1';
        menuSet1.style.transform = 'translateX(0)';
        
        menuSet2.style.display = 'none';
        menuSet2.style.opacity = '0';
        menuSet2.style.transform = 'translateX(-20px)';
        
        menuSet3.style.display = 'none';
        menuSet3.style.opacity = '0';
        menuSet3.style.transform = 'translateX(-20px)';
    };

    // Helper function to hide all hover boxes
    const hideAllHoverBoxes = () => {
        document.querySelectorAll('.hover-box').forEach(box => {
            box.style.display = 'none';
        });
    };

    // Helper function to reset menu colors
    const resetMenuColors = () => {
        document.querySelectorAll('.menu-set button, .menu-set a').forEach(item => {
            item.classList.remove('selected-btn');
        });
    };

    // Helper function for menu set transitions
    const switchMenuSets = (hideSet, showSet) => {
        hideSet.style.opacity = '0';
        hideSet.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            hideSet.style.display = 'none';
            showSet.style.display = 'flex';
            
            setTimeout(() => {
                showSet.style.opacity = '1';
                showSet.style.transform = 'translateX(0)';
            }, 50);
        }, 300);

        // Hide hover boxes when switching menus
        hideAllHoverBoxes();
        resetMenuColors();
    };

    // Menu navigation setup
    const setupMenuNavigation = () => {
        const menuSet1 = document.querySelector('.menu-set-1');
        const menuSet2 = document.querySelector('.menu-set-2');
        const menuSet3 = document.querySelector('.menu-set-3');

        // Services navigation
        const servicesBtn = menuSet1.querySelector('button:nth-child(1)');
        servicesBtn?.addEventListener('click', () => {
            switchMenuSets(menuSet1, menuSet2);
        });

        // Technologies navigation
        const techBtn = menuSet1.querySelector('button:nth-child(2)');
        techBtn?.addEventListener('click', () => {
            switchMenuSets(menuSet1, menuSet3);
        });

        // Back buttons
        const serviceBackBtn = menuSet2.querySelector('.selected-btn-parent');
        serviceBackBtn?.addEventListener('click', () => {
            switchMenuSets(menuSet2, menuSet1);
        });

        const techBackBtn = menuSet3.querySelector('.selected-btn-parent');
        techBackBtn?.addEventListener('click', () => {
            switchMenuSets(menuSet3, menuSet1);
        });

        // Setup hover effects for menu set 2
        setupHoverEffects(menuSet2, [
            { button: 'button:nth-child(2)', box: '.h-box-1' },
            { button: 'a:nth-child(3)', box: '.h-box-2' }
        ]);

        // Setup hover effects for menu set 3
        setupHoverEffects(menuSet3, [
            { button: 'a:nth-child(3)', box: '.h-box-4' },
            { button: 'a:nth-child(4)', box: '.h-box-5' }
        ]);

        // Insights hover effect
        const insightsBtn = menuSet1.querySelector('a:nth-child(4)');
        insightsBtn?.addEventListener('mouseenter', () => {
            hideAllHoverBoxes();
            resetMenuColors();
            insightsBtn.classList.add('selected-btn');
            document.querySelector('.h-box-6').style.display = 'block';
        });
    };

    // Helper function to setup hover effects
    const setupHoverEffects = (menuSet, config) => {
        config.forEach(({ button, box }) => {
            const btn = menuSet.querySelector(button);
            btn?.addEventListener('mouseenter', () => {
                hideAllHoverBoxes();
                resetMenuColors();
                btn.classList.add('selected-btn');
                document.querySelector(box).style.display = 'block';
            });
        });
    };

    // Initialize menu
    setupMenuNavigation();
    resetMenuSets();
    hideAllHoverBoxes();

    // Event listeners for menu functionality
    menuBtn.addEventListener('click', showMenu);
    closeMenuBtn.addEventListener('click', hideMenu);
    
    // Close menu when clicking outside
    megaMenuHolder.addEventListener('click', (e) => {
        if (e.target === megaMenuHolder) {
            hideMenu();
        }
    });

    // Close menu when clicking on links
    menuLinks.forEach(menuItem => {
        menuItem.addEventListener('click', hideMenu);
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && megaMenuHolder.classList.contains('show')) {
            hideMenu();
        }
    });
});






const textElement = document.querySelectorAll('.spplit');
textElement.forEach((textElem) => {
    const split = new SplitType(textElem, {
        types: 'lines, words, chars',
    });
})

var swiper = new Swiper(".work-swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
    },
});

var swiper = new Swiper(".marquee-swiper", {
    slidesPerView: "auto",
    spaceBetween: 100,
    loop: true,
    speed: 3500,
    allowTouchMove: false,
    noSwiping: true,
    noSwipingClass: ".marquee-swiper",
    autoplay: {
        delay: 0,
    },
});


const storySec = document.querySelector(".stories-sec")
if (storySec) {
    storySec.querySelectorAll(".rev-card").forEach((card, i) => {
        card.style.setProperty('--scrollpos', `${i * 15}px`);
    });
}

const traveller = document.querySelector(".traveller")
if (traveller) {
    const travellerWidht = traveller.getBoundingClientRect().width
    const headingWidth = traveller.querySelector("h2").getBoundingClientRect().width
    const finalWidth = travellerWidht - headingWidth
    gsap.to(traveller.querySelector("h2"), {
        scrollTrigger: {
            start: "top 15%",
            end: "end -100%",
            trigger: ".stats-sec",
            pin: true,
            scrub: 1,
        },
        x: finalWidth,
    })
}

const wrokScrollSec = document.querySelector(".work-scroll")
if (wrokScrollSec) {
    const wstravellerWidht = document.querySelector(".work-scroll-traveller-wrap").getBoundingClientRect().width
    const wsTravelInnerWidth = wrokScrollSec.querySelector(".work-scroll-traveller").getBoundingClientRect().width
    const finalWidth = wstravellerWidht - wsTravelInnerWidth
    gsap.to(wrokScrollSec.querySelector(".work-scroll-traveller"), {
        scrollTrigger: {
            start: "top top",
            end: "end -250%",
            trigger: wrokScrollSec,
            scrub: 1,
        },
        x: finalWidth,
    })
}





const screenLoader = document.querySelector(".screen-loader")
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        screenLoader.classList.add("loaded")
    }, 800);
})

gsap.set(".bnn-top h1 .word", {
    y: "100%",
})
gsap.set(".bnn-top p, .bnn-bc1 span, .bnn-bc1 p, .touch-block p, .touch-ico", {
    y: "100",
    opacity: 0,
})
function entryAnim() {
    let entryTl = gsap.timeline()
    entryTl.to(".bnn-top p", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.2,
    }, "s")
    .to(".bnn-top h1 .word", {
        delay: 0.5,
        y: 0,
        stagger: 0.2,
    }, "s")
        .to(".bnn-bc1 span, .bnn-bc1 p, .touch-block p, .touch-ico", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            delay: 1.2,
        }, "s")
}
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        entryAnim()
    }, 900);
})

const storiesSec = document.querySelector(".stories-sec")
if (storiesSec) {
    gsap.to(".progress", {
        scrollTrigger: {
            trigger: ".revs-holder",
            start: "top 50%",
            end: "bottom 100%",
            scrub: true,
        },
        height: "100%",
    })
}










