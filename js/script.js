'use strict'
// Slider //
const slideDuration = 5000;
const slides = [...document.querySelectorAll(".slide")];
const progressList = document.querySelector("#progress-list");
const titleElement = document.querySelector("#hero-title");
const subtitleElement = document.querySelector("#hero-subtitle");
const previousButton = document.querySelector(".slider-arrow--prev");
const nextButton = document.querySelector(".slider-arrow--next");
const playToggle = document.querySelector("#toggle-play");
const heroSlider = document.querySelector(".hero-slider");
const accountLink = document.querySelector(".account-link");
const accountPanel = document.querySelector(".account-panel");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");

let currentIndex = 0;
let timerId = null;
let isPlaying = true;
let timerStartedAt = 0;
let remainingTime = slideDuration;

// progress bars under the slider //
function buildSlider() {
    slides.forEach((slide, index) => {
        const progressTrack = document.createElement("button");
        progressTrack.className = `progress-track${index === 0 ? " is-active" : ""}`;
        progressTrack.type = "button";

        const progressFill = document.createElement("span");
        progressFill.className = "progress-fill";

        progressTrack.appendChild(progressFill);
        progressTrack.addEventListener("click", () => showSlide(index));
        progressList.appendChild(progressTrack);
    });
}

// autoplay timer //
function restartTimer(duration = slideDuration) {
    window.clearTimeout(timerId);

    if (!isPlaying) {
        return;
    }

    remainingTime = duration;
    timerStartedAt = Date.now();
    timerId = window.setTimeout(() => {
        showSlide(currentIndex + 1);
    }, duration);
}

// Restarts the progress bar //
function restartProgressAnimation(track) {
    track.classList.remove("is-active");
    void track.offsetWidth;
    track.classList.add("is-active");
}

// Updates hero progress bars //
function updateProgress(index) {
    const tracks = [...document.querySelectorAll(".progress-track")];

    tracks.forEach((track, trackIndex) => {
        track.classList.remove("is-active", "is-complete");

        if (trackIndex < index) {
            track.classList.add("is-complete");
        }

        if (trackIndex === index && isPlaying) {
            restartProgressAnimation(track);
        }
    });
}

// Switches image and center text //
function showSlide(nextIndex) {
    currentIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
        const isActive = index === currentIndex;
        slide.classList.toggle("is-active", isActive);
    });

    titleElement.textContent = slides[currentIndex].querySelector(".slide-copy h2").textContent;
    subtitleElement.textContent = slides[currentIndex].querySelector(".slide-copy p").textContent;
    heroSlider.classList.toggle("is-paused", !isPlaying);
    updateProgress(currentIndex);
    remainingTime = slideDuration;
    restartTimer();
}

// resumes the hero timer and progress //
function togglePlayback() {
    isPlaying = !isPlaying;
    playToggle.classList.toggle("is-paused", !isPlaying);
    heroSlider.classList.toggle("is-paused", !isPlaying);
    playToggle.querySelector("i").className = isPlaying ? "bx bx-pause" : "bx bx-play";

    if (isPlaying) {
        restartTimer(remainingTime);
    } else {
        window.clearTimeout(timerId);
        remainingTime = Math.max(0, remainingTime - (Date.now() - timerStartedAt));
    }
}

previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
nextButton.addEventListener("click", () => showSlide(currentIndex + 1));
playToggle.addEventListener("click", togglePlayback);