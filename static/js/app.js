function handleFooterReveal() {
  var formWrapper = document.querySelector(".js-form-wrapper");
  var footer = document.querySelector(".js-footer");
  if (formWrapper) {
    window.addEventListener("scroll", function () {
      var formBoundings = formWrapper.getBoundingClientRect();
      if (formBoundings.top + formBoundings.height < 0) {
        footer.classList.add("active");
      } else {
        footer.classList.remove("active");
      }
    });
  }
}

function handleApplyBtnClick() {
  var applyBtn = document.querySelector(".js-apply-btn");
  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      scrollTop(window, 0, 500);
    });
  }
}

window.addEventListener("load", function () {
  handleFooterReveal();
  handleApplyBtnClick();
  Accordion.registerEvents(".js-curriculum-accordion");
  Carousel.registerEvents(".js-carousel");
  ValidateForm.setFormData(formData);
  var formSubmitButton = document.querySelector(".js-submit-btn");
  if (formSubmitButton) {
    formSubmitButton.addEventListener("click", function () {
      ValidateForm.registerEvents(formData);
    });
  }
});
