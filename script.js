function LocomotiveScrollTrigger(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
LocomotiveScrollTrigger();

function Loader(){
  function startLoader(){
    let counter = document.querySelector(".counter");
    let currentValue = 0;
  
    function updateCounter(){
      if(currentValue >= 100){
        counter.textContent = "100%";
        return;
      }
  
      let incremented = Math.floor(Math.random() * 10) + 1;
      currentValue = Math.min(currentValue + incremented, 100);
  
      counter.textContent = currentValue + "%";
      let delay = Math.floor(Math.random() * 100) + 50;
  
      setTimeout(updateCounter, delay);
    }
    updateCounter();
  }
  startLoader();
  
  gsap.to(".counter",{
    delay: 2.8,
    opacity:0,
    onComplete: () => {
      document.querySelector(".counter").style.zIndex = "-1";
    }
  })
  
  gsap.to(".bar",{
    delay: 3.2,
    height: 0,
    stagger:{
      amount: 0.5
    },
    onComplete: () => {
      document.querySelector(".overlay").style.zIndex = "-1";
    }
  })
}
Loader();

function afterLoader(){
  gsap.from(".page1 nav .logo img",{
    delay: 4,
    duration: 2,
    y: "50%",
    ease: "Power4.Out",
    opacity:0
  })
  
  gsap.from(".page1 nav .logo .services",{
    delay: 4,
    duration: 2,
    y: "50%",
    ease: "Power4.Out",
    opacity:0
  })
  
  gsap.from(".page1 nav .nav-links",{
    delay: 4,
    duration: 2,
    y: "50%",
    ease: "Power4.Out",
    opacity:0
  })
  
  gsap.from(".page1 nav .search-section",{
    delay: 4,
    duration: 2,
    y: "50%",
    ease: "Power4.Out",
    opacity:0
  })
  
  gsap.to(".page1 .hero .line",{
    delay: 4,
    duration: 2,
    width: "45vw",
    ease: Power4.easeOut
  })
  
  gsap.from(".page1 .hero .para .paragraphs p",{
    delay: 4,
    duration: 2,
    y: "50%",
    ease: "Power4.Out",
    opacity:0,
    stagger: {
      amount: 0.5
    }
  })
  
  gsap.from(".page1 .law .left .heading h1",{
    delay: 4,
    duration: 2,
    y: "50%",
    ease: "Power4.Out",
    opacity:0,
    stagger: {
      amount: 0.5
    }
  })
  
  gsap.from(".page1 .law .left h3",{
    delay: 4,
    duration: 2,
    y: "60%",
    ease: "Power4.Out",
    opacity:0
  })
  
  gsap.from(".page1 .law .right",{
    delay: 4,
    duration: 2,
    y: "50%",
    ease: "Power4.Out",
    opacity:0
  })
}
afterLoader();

function servicesAnimation(){
  let services = document.querySelector("nav .logo .services");
  let servicesOverlay = document.querySelector(".services-overlay");
  
  services.addEventListener("mouseenter",() => {
    servicesOverlay.style.top = 0;
  })
  
  servicesOverlay.addEventListener("mouseleave",() => {
    servicesOverlay.style.top = "-100%";
  })
}
servicesAnimation();

function servicesImageAnimation(){
  
let center = document.querySelector(".center");
let fixed = document.querySelector(".fixed");
let elems = document.querySelectorAll(".elem");

center.addEventListener("mouseenter", () => {
  fixed.style.opacity = "1";
  fixed.style.visibility = "visible";
});

center.addEventListener("mouseleave", () => {
  fixed.style.opacity = "0";
  fixed.style.visibility = "hidden";
});

// Har `.elem` par hover hone par `background-image` update karein
elems.forEach(function (e) {
  e.addEventListener("mouseenter", () => {
    let image = e.getAttribute("data-image");

    // Smooth transition ke liye pehle opacity zero kar ke update karo
    fixed.style.opacity = "0";
    
    setTimeout(() => {
      fixed.style.backgroundImage = `url(${image})`;
      fixed.style.opacity = "1";
    }, 200); // Thoda sa delay diya taake image smoothly transition ho
  });
});
}
servicesImageAnimation();

function menuAnimation() {
  
let menuContainer = document.querySelector(".menu-container");
let  menu = document.querySelector(".page1 nav .search-section .ri-menu-3-line");
let cross = document.querySelector(".menu-container nav .search-section .ri-contract-left-right-line");

menu.addEventListener("click", () => {
  menuContainer.style.top = "0";
  menuContainer.style.opacity = 1;
})

cross.addEventListener("click", () => {
  menuContainer.style.top = "-100%";
  menuContainer.style.opacity = 0;
})
}
menuAnimation();

function counterBorders(){
  gsap.to(".counter-wrapper .counter-wrapper-top .counter-wrapper-top-line",{
    duration: 6,
    width: "37vw",
    ease: "power4.out",
    scrollTrigger:{
      trigger: ".counter-wrapper .counter-wrapper-top .counter-wrapper-top-line",
      scroller: "#main",
      // markers: true,
      start: "top 60%",
      end: "top 30%",
      scrub: 2
    }
  })
  
  gsap.to(".counter-wrapper .counter-wrapper-center .counter-wrapper-center-line",{
    duration: 6,
    width: "37vw",
    ease: "power4.out",
    scrollTrigger:{
      trigger: ".counter-wrapper .counter-wrapper-center .counter-wrapper-center-line",
      scroller: "#main",
      // markers: true,
      start: "top 60%",
      end: "top 30%",
      scrub: 2
    }
  })
  
  gsap.to(".counter-wrapper .counter-wrapper-bottom .counter-wrapper-bottom-1 .counter-wrapper-bottom-line",{
    duration: 6,
    width: "25vw",
    ease: "power4.out",
    scrollTrigger:{
      trigger: ".counter-wrapper .counter-wrapper-bottom .counter-wrapper-bottom-1 .counter-wrapper-bottom-line",
      scroller: "#main",
      // markers: true,
      start: "top 60%",
      end: "top 30%",
      scrub: 2
    }
  })
}
counterBorders();

function arrow(){
  let arrow = document.querySelector(".page1 .law .right i");
  let counterWrapper = document.querySelector(".counter-wrapper");

  arrow.addEventListener("click", () => {
    counterWrapper.scrollIntoView({behavior: "smooth"});
  })
}
arrow();

function numberCounter(){
  let num = document.querySelectorAll(".num");
  let interval = 1800;
  
  let startCounter = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let values = entry.target;
        let startValue = 0;
        let endValue = parseInt(values.getAttribute("data-value"));
        let duration = Math.floor(interval / endValue);
  
        let numbers = setInterval(() => {
          startValue += 1;
          values.textContent = startValue;
  
          if (startValue == endValue) {
            clearInterval(numbers);
          }
        }, duration);
  
        observer.unobserve(values); // Ek bar chalne ke baad dobara na chale
      }
    });
  };
  
  let observer = new IntersectionObserver(startCounter, { threshold: 0.5 });
  
  num.forEach((value) => {
    observer.observe(value);
  });
}
numberCounter();

function Lines(){
  gsap.to(".page2 .page2-services-line",{
    duration: 8,
    width: "100%",
    ease: "power4.out",
    scrollTrigger:{
      trigger: ".page2 .page2-services-line",
      scroller: "#main",
      // markers: true,
      start: "top 60%",
      end: "top 30%",
      scrub: 2
    }
  })
  
  gsap.to(".page3 .page3-line",{
    duration: 8,
    width: "100%",
    ease: "power4.out",
    scrollTrigger:{
      trigger: ".page3 .page3-line",
      scroller: "#main",
      // markers: true,
      start: "top 60%",
      end: "top 30%",
      scrub: 2
    }
  })
}
Lines();

function accordian(){
  let questions = document.querySelectorAll(".question");
  
  questions.forEach((acc) => {
    acc.addEventListener("click", function () {
      let answer = this.nextElementSibling;
  
      // Check if the answer is already open
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null; // Close answer
      } else {
        // Close all other open answers
        document.querySelectorAll(".answer").forEach((ans) => {
          ans.style.maxHeight = null;
        });
  
        answer.style.maxHeight = answer.scrollHeight + "px"; // Open answer
      }
    });
  });
}
accordian();