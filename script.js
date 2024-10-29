// Make body scroll horizontal with mouse instead of vertical
document.addEventListener('wheel', (event) => {
    event.preventDefault();
    let body = document.querySelector("body");
    body.scrollLeft += event.deltaY * 2.5;
}, { passive: false });

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
    gsap.to("#abs-div", {x: (offsetX * centerX / 10) * -1, duration: 0.5});
    gsap.to("#abs-div", {y: (offsetY * centerY / 10) * -1, duration: 0.5});
    // absDiv.style.bottom = offsetY * centerY / 10 + "px";
}
