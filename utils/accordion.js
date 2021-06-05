var Accordion = (function() {
    var accordion, accordionHead, accordionBody;

    function _setSelector(selector) {
        accordion = document.querySelector(selector);
        accordionHead = accordion.querySelectorAll('.accordion-list__item');
    }

    function resetActiveItem() {
        var activeAccordionItem = accordion.querySelector('.accordion-list__item.active');
        if(activeAccordionItem) {
            activeAccordionBody = activeAccordionItem.querySelector('.accordion-body');
            activeAccordionBody.style.height = 0;
            activeAccordionItem.classList.remove('active');
        }
    }

    function handleAccordionClick() {
        for(var i=0; i < accordionHead.length; i++) {
            accordionHead[i].addEventListener('click', function() {
                var isOpen = this.classList.contains('active');
                var accordionBody = this.querySelector('.accordion-body');
                if(!isOpen) {
                    resetActiveItem();
                    var scrollHeight = accordionBody.scrollHeight;
                    accordionBody.style.height = scrollHeight + 'px';
                    this.classList.add('active');
                }
                else {
                    accordionBody.style.height = 0;
                    this.classList.remove('active');
                }
            })
        }
    }

    function registerEvents(selector) {
        _setSelector(selector)
        handleAccordionClick();
    }

    return {
        registerEvents: registerEvents
    }
})();