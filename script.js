sectionNavs = [
    document.getElementById('about-a'),
    document.getElementById('projects-a'),
    document.getElementById('contact-a')
];

let activeIndex = 0;
setActiveNav(0); // set starting nav
let justScrolled = false; // variable for checking if we just scrolled

// event listeners to set nav's when tags are clicked
sectionNavs[0].addEventListener("click", () => {
    setActiveNav(0);
})
sectionNavs[1].addEventListener("click", () => {
    setActiveNav(1);
})
sectionNavs[2].addEventListener("click", () => {
    setActiveNav(2);
})

// Scroll function on PC
document.addEventListener('wheel', (event) => {
    event.preventDefault();

    content(event.deltaY);

    // body.scrollLeft += event.deltaY * 2;
}, { passive: false });

// Content
function content(delta) {
    if (!justScrolled) {
        switch (activeIndex) {
            case 0: // about
                if (isScrollingDown(delta)) {
                    setActiveNav(1);
                }
                break;
            case 1: // projects
                if (isScrollingDown(delta)) {
                    setActiveNav(2);
                }
                else {
                    setActiveNav(0);
                }
                break;
            case 2: // contact
                if (!isScrollingDown(delta)) {
                    setActiveNav(1);
                }
                break;
        }
        justScrolled = true;
    }

    clearTimeout(justScrolled);
    justScrolled = setTimeout(() => {
        justScrolled = false;
        console.log(justScrolled)
    }, 400);


}

// scroll function on DEVICES
let touchstartX = 0;
let touchendX = 0;
document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  content(touchstartX - touchendX);
});


function setActiveNav(index) {
    sectionNavs.forEach(nav => {
        nav.classList.remove("active");
    });
    sectionNavs[index].click();
    sectionNavs[index].classList.add("active");
    activeIndex = index;
}

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

// Parallax element hover animation
const parallaxEl = document.querySelector(".parallax-element");
parallaxEl.addEventListener("mouseover", () => {
    console.log("hovered")
})