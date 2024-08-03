'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);



const testimonials = document.querySelectorAll(".testimonial");
        const dots = document.querySelectorAll(".dot");
        let currentIndex = 1; 
        let autoPlayInterval;

        function showTestimonial(index) {
            if (index >= testimonials.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = testimonials.length - 1;
            } else {
                currentIndex = index;
            }

            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle("active", i === currentIndex);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
        }

        function updateTestData(index) {
            const nextIndex = (index + testimonials.length) % testimonials.length;
            const nextTestimonial = testimonials[nextIndex];
            const author = nextTestimonial.querySelector(".testimonial-author").textContent;
            const location = nextTestimonial.querySelector(".testimonial-location").textContent;
            document.querySelector(".test_data").innerHTML = `<div class="userinfo"><h5 style="margin:0;">${author}</h5><br><h6>${location}</h6></div>`;
        }

        function nextTestimonial() {
            updateTestData(currentIndex + 1);
            setTimeout(() => {
                showTestimonial(currentIndex + 1);
            }, 500); 
        }

        function prevTestimonial() {
            updateTestData(currentIndex - 1);
            setTimeout(() => {
                showTestimonial(currentIndex - 1);
            }, 500); 
        }

        function currentTestimonial(index) {
            updateTestData(index);
            setTimeout(() => {
                showTestimonial(index);
            }, 500); 
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextTestimonial, 3000); 
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        
        startAutoPlay();

       
        showTestimonial(currentIndex);
        updateTestData(currentIndex);

  
        document.querySelector(".next").addEventListener("click", () => {
            stopAutoPlay();
            nextTestimonial();
            startAutoPlay();
        });

        document.querySelector(".prev").addEventListener("click", () => {
            stopAutoPlay();
            prevTestimonial();
            startAutoPlay();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                stopAutoPlay();
                currentTestimonial(i);
                startAutoPlay();
            });
        });