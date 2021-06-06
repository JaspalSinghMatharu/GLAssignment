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
    paginationDots = carousel.querySelectorAll('.pagination-item');
    nextBtn = carousel.querySelector(".carousel-next-btn");
    prevBtn = carousel.querySelector(".carousel-prev-btn");
    currentPos = 0;
    isMobile = window.innerWidth < 768 ;
    numberOfSlide = carouselItem.length;
    currentSlide= 0;
  }

  function updatePagination() {
    for(var i = 0; i < paginationDots.length; i++) {
        paginationDots[i].classList.remove('active');
    }
    paginationDots[currentSlide].classList.add('active');
  }

  function slide(btnType) {
    if (btnType == "next") {
      if (currentPos < carouselWidth - slideWidth) {
        currentPos = currentPos + slideWidth;
        currentSlide++;
      } else {
        currentPos = 0;
        currentSlide= 0
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

  function handleNextPrev() {
    nextBtn && nextBtn.addEventListener("click", slide.bind(null, "next"));
    prevBtn && prevBtn.addEventListener("click", slide.bind(null, "prev"));
  }

  function handleSlide() {
    setInterval(function () {
      slide('next');
      console.log('active slide', currentSlide);
    }, 5000);
  }

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

Carousel.registerEvents(".js-carousel");
