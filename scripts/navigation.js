const nav = document.querySelector("nav");
const sectionNavs = [...nav.children].filter((nav) => {
    return !(nav.style.display == "none"); // only select those without display of "none"
});
// if four nav elements, assume mobile device and change them to circles
if (sectionNavs.length == 4) {
    sectionNavs.forEach((nav) => {
        nav.classList.add("circle");
    })
}

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
    console.log(sectionNavs);
    console.log(index);

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