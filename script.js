import { Interactive, } from 'https://vectorjs.org/index.js';
let interactive = new Interactive("my-interactive");
interactive.width = 736;
interactive.height = 225;
interactive.border = true;
let circle = interactive.circle(interactive.width / 2, interactive.height / 3, 50);
circle.classList.add('default');
let displayCircle = interactive.circle(0, 0, 6);
displayCircle.style.fill = '#333333';
let displayCircle2 = interactive.circle(0, 0, 6);
displayCircle2.style.fill = '#333333';
let scrubber = interactive.scrubber(100, 175, {});
let pathLength = circle.getTotalLength();
let start_point = circle.getPointAtLength(scrubber.value / (scrubber.max - scrubber.min) * 5  * (pathLength / 3));
let displayCircle3 = interactive.rectangle(start_point.x, start_point.y, 10, 5);
displayCircle3.style.fill = '#333333';
let xDisplay = interactive.text(600, 50, "time = ...");
xDisplay.addDependency(scrubber);
xDisplay.update = function () {
    xDisplay.contents = `time = ${Math.round(scrubber.value / (scrubber.max - scrubber.min) * 5 * 100) / 100}`;
};
function animate() {
    let currentPosition = scrubber.value / (scrubber.max - scrubber.min);
    let point;
    if (currentPosition * 5  * (pathLength / 3) < pathLength) {
        point = circle.getPointAtLength(currentPosition * 5  * (pathLength / 3));
    }
    else {
        point = circle.getPointAtLength((currentPosition * 5  * (pathLength / 3)) - pathLength);
    }
    let point2 = circle.getPointAtLength(currentPosition * 5  * (pathLength / 7.5));
    displayCircle.cx = point.x;
    displayCircle.cy = point.y;
    displayCircle2.cx = point2.x;
    displayCircle2.cy = point2.y;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);