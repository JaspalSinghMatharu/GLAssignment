var Accordion = (function () {
  var accordion, accordionHead, accordionBody;

  function _setSelector(selector) {
    accordion = document.querySelector(selector);
    accordionHead = accordion.querySelectorAll(".accordion-head");
  }

  /** A function to collapse active slide so as to keep only one index open at a time */
  function resetActiveItem() {
    var activeAccordionItem = accordion.querySelector(
      ".accordion-list__item.active"
    );
    if (activeAccordionItem) {
      activeAccordionBody =
        activeAccordionItem.querySelector(".accordion-body");
      activeAccordionBody.style.height = 0;
      activeAccordionItem.classList.remove("active");
    }
  }

  /** A function that adds a click event to accordion head
   * It calculates the scroll height of the accordion body and  applys height to it
   * Also if the same active element is clicked then will collapse it
   */
  function handleAccordionClick() {
    for (var i = 0; i < accordionHead.length; i++) {
      accordionHead[i].addEventListener("click", function () {
        var accordionItem = this.closest(".accordion-list__item");
        var isOpen = accordionItem.classList.contains("active");
        var accordionBody = accordionItem.querySelector(".accordion-body");
        if (!isOpen) {
          resetActiveItem();
          var scrollHeight = accordionBody.scrollHeight;
          accordionBody.style.height = scrollHeight + "px";
          accordionItem.classList.add("active");
        } else {
          accordionBody.style.height = 0;
          accordionItem.classList.remove("active");
        }
      });
    }
  }

  function registerEvents(selector) {
    _setSelector(selector);
    handleAccordionClick();
  }

  return {
    registerEvents: registerEvents,
  };
})();
