
















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

    // Helper function to reset menu sets to initial state
    const resetMenuSets = () => {
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

    // Update hideMenu function
    const hideMenu = () => {
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
        });
        menuBottom.style.opacity = '0';
        menuBottom.style.transform = 'translateY(20px)';
        
        // Hide all hover boxes when closing menu
        hideAllHoverBoxes();
        // Reset menu colors
        resetMenuColors();
        // Reset menu sets to initial state
        resetMenuSets();
        
        megaMenuHolder.classList.remove('show');
    };

    // Event listeners for menu functionality
    menuBtn.addEventListener('click', showMenu);
    closeMenuBtn.addEventListener('click', hideMenu);
    megaMenuHolder.addEventListener('click', (e) => {
        if (e.target === megaMenuHolder) {
            hideMenu();
        }
    });
    menuLinks.forEach((menuuitem)=>{
        menuuitem.addEventListener('click',(ss)=>{
            hideMenu();
        });
    })

    // Event listeners for mouse animations
    menuBtn.addEventListener('mousemove', handleMenuBtnMouseMove);
    menuBtn.addEventListener('mouseleave', resetMenuBtnPosition);
    closeMenuBtn.addEventListener('mousemove', handleCloseBtnMouseMove);
    closeMenuBtn.addEventListener('mouseleave', resetCloseBtnPosition);

    // Escape key functionality
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && megaMenuHolder.classList.contains('show')) {
            hideMenu();
        }
    });

    // Menu set navigation
    const menuSet1 = document.querySelector('.menu-set-1');
    const menuSet2 = document.querySelector('.menu-set-2');
    const menuSet3 = document.querySelector('.menu-set-3');
    const hoverBoxes = document.querySelectorAll('.hover-box');

    // Helper function to hide all hover boxes
    const hideAllHoverBoxes = () => {
        hoverBoxes.forEach(box => {
            box.style.display = 'none';
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
    };

    // Initialize menu sets
    menuSet2.style.display = 'none';
    menuSet3.style.display = 'none';
    hideAllHoverBoxes();

    // Services button click handler
    const servicesBtn = menuSet1.querySelector('button:nth-child(1)');
    servicesBtn.addEventListener('click', () => {
        switchMenuSets(menuSet1, menuSet2);
    });

    // Technologies button click handler
    const techBtn = menuSet1.querySelector('button:nth-child(2)');
    techBtn.addEventListener('click', () => {
        switchMenuSets(menuSet1, menuSet3);
    });

    // Back button handlers
    const serviceBackBtn = menuSet2.querySelector('button:nth-child(1)');
    serviceBackBtn.addEventListener('click', () => {
        switchMenuSets(menuSet2, menuSet1);
    });

    const techBackBtn = menuSet3.querySelector('button:nth-child(2)');
    techBackBtn.addEventListener('click', () => {
        switchMenuSets(menuSet3, menuSet1);
    });

    // Helper function to reset all menu item colors
    const resetMenuColors = () => {
        document.querySelectorAll('.menu-set button, .menu-set a').forEach(item => {
            item.classList.remove('selected-btn');
        });
    };

    // Hover handlers for menu set 2
    const mobileAppBtn = menuSet2.querySelector('button:nth-child(2)');
    const websiteDevBtn = menuSet2.querySelector('a:nth-child(3)');
    const trendingBtn = menuSet2.querySelector('a:nth-child(4)');

    mobileAppBtn.addEventListener('mouseenter', () => {
        hideAllHoverBoxes();
        resetMenuColors();
        mobileAppBtn.classList.add('selected-btn');
        document.querySelector('.h-box-1').style.display = 'block';
    });

    websiteDevBtn.addEventListener('mouseenter', () => {
        hideAllHoverBoxes();
        resetMenuColors();
        websiteDevBtn.classList.add('selected-btn');
        document.querySelector('.h-box-2').style.display = 'block';
    });

    trendingBtn.addEventListener('mouseenter', () => {
        hideAllHoverBoxes();
        resetMenuColors();
        trendingBtn.classList.add('selected-btn');
        document.querySelector('.h-box-3').style.display = 'block';
    });

    // Hover handlers for menu set 3
    const languagesBtn = menuSet3.querySelector('a:nth-child(3)');
    const platformsBtn = menuSet3.querySelector('a:nth-child(4)');

    languagesBtn.addEventListener('mouseenter', () => {
        hideAllHoverBoxes();
        resetMenuColors();
        languagesBtn.classList.add('selected-btn');
        document.querySelector('.h-box-4').style.display = 'block';
    });

    platformsBtn.addEventListener('mouseenter', () => {
        hideAllHoverBoxes();
        resetMenuColors();
        platformsBtn.classList.add('selected-btn');
        document.querySelector('.h-box-5').style.display = 'block';
    });

    // Insights click handler
    const insightsBtn = menuSet1.querySelector('a:nth-child(4)');
    insightsBtn.addEventListener('click', () => {
        hideAllHoverBoxes();
        resetMenuColors();
        insightsBtn.classList.add('selected-btn');
        document.querySelector('.h-box-6').style.display = 'block';
    });
});












