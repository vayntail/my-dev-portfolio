sectionNavs = [
    document.getElementById('about-a'),
    document.getElementById('projects-a'),
    document.getElementById('contact-a')
];
let activeIndex = 0;
sectionNavs[activeIndex].click();
let justScrolled = false; // variable for checking if we just scrolled


// Make body scroll horizontal with mouse instead of vertical
document.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (!justScrolled) {
        switch (activeIndex) {
            case 0: // about
                console.log(isScrollingDown(event.deltaY))
                if (isScrollingDown(event.deltaY)) {
                    activeIndex = 1;
                }
                sectionNavs[activeIndex].click();
                break;
            case 1: // projects
                if (isScrollingDown(event.deltaY)) {
                    activeIndex = 2;
                }
                else {
                    activeIndex = 0;
                }
                sectionNavs[activeIndex].click();
                break;
            case 2: // contact
                if (!isScrollingDown(event.deltaY)) {
                    activeIndex = 1;
                }
                sectionNavs[activeIndex].click();
                break;
        }
        justScrolled = true;
    }
    
    

    clearTimeout(justScrolled);
    justScrolled = setTimeout(() => {
        justScrolled = false;
        console.log(justScrolled)
    }, 400);


    // body.scrollLeft += event.deltaY * 2;
}, { passive: false });

function isScrollingDown(delta) {
    if (delta > 0) {
        // Scrolling down
        console.log('Scrolling down');
        return true;
    } else if (delta < 0) {
        // Scrolling up
        console.log('Scrolling up');
        return false;
    }
}

// Parallax background on move on #about
window.onmousemove = (event) => {
    let absDiv = document.querySelector("#abs-div");
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const centerX = document.querySelector("#about").getBoundingClientRect().width / 2;
    const centerY = document.querySelector("#about").getBoundingClientRect().height / 2;
    const offsetX = (mouseX - centerX) / centerX; // as percentage decimals
    const offsetY = (mouseY - centerY) / centerY;
    console.log(absDiv.style.bottom)
    // absDiv.style.right = offsetX * centerX / 10 + "px";
    gsap.to("#abs-div", { x: (offsetX * centerX / 10) * -1, duration: 0.5 });
    gsap.to("#abs-div", { y: (offsetY * centerY / 10) * -1, duration: 0.5 });
    // absDiv.style.bottom = offsetY * centerY / 10 + "px";
}

// document.getElementById('projects-a').click();