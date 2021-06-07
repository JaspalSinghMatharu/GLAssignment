var Carousel = (function () {
  var carousel,
    carouselFrame,
    nextBtn,
    prevBtn,
    paginationDots,
    carouselWidth,
    slideWidth,
    currentPos,
    isMobile,
    numberOfSlide,
    currentSlide;

  function _setSelector(selector) {
    carousel = document.querySelector(selector);
    carouselFrame = carousel.querySelector(".carousel");
    carouselItem = carouselFrame.querySelectorAll(".carousel-item");
    paginationDots = carousel.querySelectorAll(".pagination-item");
    nextBtn = carousel.querySelector(".carousel-next-btn");
    prevBtn = carousel.querySelector(".carousel-prev-btn");
    currentPos = 0;
    isMobile = window.innerWidth < 768;
    numberOfSlide = carouselItem.length;
    currentSlide = 0;
  }

  /** A function to set Active pagination dot */
  function updatePagination() {
    if (paginationDots) {
      for (var i = 0; i < paginationDots.length; i++) {
        paginationDots[i].classList.remove("active");
      }
      paginationDots[currentSlide].classList.add("active");
    }
  }

  /**  
    - A function to set the active position for the carousel frame
    - It transforms the frame with the calculated slide width
    - Reverses the carousel to the first or last index if the max or min slide position has achieved
    */
  function slide(btnType) {
    if (btnType == "next") {
      if (currentPos < carouselWidth - slideWidth) {
        currentPos = currentPos + slideWidth;
        currentSlide++;
      } else {
        currentPos = 0;
        currentSlide = 0;
      }
    }
    if (btnType == "prev") {
      if (currentPos > 0) {
        currentPos = currentPos - slideWidth;
        currentSlide--;
      } else {
        currentPos = carouselWidth - slideWidth;
        currentSlide = numberOfSlide - 1;
      }
    }
    updatePagination();
    carouselFrame.style.transform = "translateX(" + -currentPos + "px)";
  }
  /** A function to subscribe to events for carousel controls */
  function handleNextPrev() {
    nextBtn && nextBtn.addEventListener("click", slide.bind(null, "next"));
    prevBtn && prevBtn.addEventListener("click", slide.bind(null, "prev"));
  }

  /** A function to call the slide function in a setInterval to give an autopplay feature for mobile devices */
  function handleSlide() {
    setInterval(function () {
      slide("next");
    }, 5000);
  }

  /**  */
  function carouselInit() {
    carouselWidth = carouselFrame.scrollWidth;
    slideWidth = carouselItem[0].clientWidth;
    isMobile && handleSlide();
    handleNextPrev();
  }

  function registerEvents(selector) {
    _setSelector(selector);
    carouselInit();
  }

  return {
    registerEvents: registerEvents,
  };
})();