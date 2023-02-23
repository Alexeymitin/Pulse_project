//Slider
document.addEventListener("DOMContentLoaded", () => {
    //Slider

    const slides = document.querySelectorAll(".slider__slide"),
        prev = document.querySelector(".slider__control-prev"),
        next = document.querySelector(".slider__control-next");

    let slideIndex = 1;

    showSlides(slideIndex);

    function hideSlides() {
        slides.forEach((e) => {
            e.classList.remove("slider__slide_active", "fade");
        });
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides[slideIndex - 1].classList.add("slider__slide_active", "fade");
    }

    function plusSlides(n) {
        hideSlides();
        showSlides((slideIndex += n));
    }

    prev.addEventListener("click", () => plusSlides(-1));

    next.addEventListener("click", () => plusSlides(1));

    //Tabs

    const tabs = document.querySelectorAll(".catalogue__tab"),
        tabsContent = document.querySelectorAll(".catalogue__content"),
        tabsParent = document.querySelector(".catalogue__tabs");

    function hideTabContent() {
        tabs.forEach((e) => e.classList.remove("catalogue__tab_active"));
        tabsContent.forEach((e) =>
            e.classList.remove("catalogue__content_active", "fade")
        );
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("catalogue__content_active", "fade");
        tabs[i].classList.add("catalogue__tab_active");
    }

    hideTabContent();
    showTabContent();

    tabs.forEach((e, i) => {
        e.addEventListener("click", () => {
            hideTabContent();
            showTabContent(i);
        });
    });

    //Toggle item content

    const itemContent = document.querySelectorAll(".catalogue-item__content"),
        itemContentBack = document.querySelectorAll(".catalogue-item__list"),
        linkMore = document.querySelectorAll(".catalogue-item__link"),
        linkBack = document.querySelectorAll(".catalogue-item__back");

    function toggleClass(item, grade, n) {
        item[n].classList.toggle(`${grade}`);
    }

    function changeContent(item) {
        item.forEach((e, i) => {
            e.addEventListener("click", (evt) => {
                evt.preventDefault();
                toggleClass(itemContent, "catalogue-item__content_active", i);
                toggleClass(itemContentBack, "catalogue-item__list_active", i);
            });
        });
    }

    changeContent(linkMore);
    changeContent(linkBack);

    //Modal

    const buttonsConsult = document.querySelectorAll('[data-modal="consult"]'),
        button = document.querySelector('[data-modal="thanks"]'),
        buttonsCatalogue = document.querySelectorAll(".button_catalogue"),
        overlay = document.querySelector(".overlay"),
        modalConsult = document.querySelector("#consult"),
        modalOrder = document.querySelector("#order"),
        modalThanks = document.querySelector("#thanks"),
        close = document.querySelectorAll(".modal__close");

    buttonsConsult.forEach((e) => {
        e.addEventListener("click", () => {
            overlay.classList.add("active", "fade");
            modalConsult.classList.add("active", "fade");
            document.body.style.overflow = 'hidden';
        });
    });

    button.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.add("active", "fade");
        modalThanks.classList.add("active", "fade");
    });

    buttonsCatalogue.forEach((e) => {
        e.addEventListener("click", () => {
            overlay.classList.add("active", "fade");
            modalOrder.classList.add("active", "fade");
        });
    });

    function closeModal() {
        overlay.classList.remove("active", "fade");
        modalConsult.classList.remove("active", "fade");
        modalOrder.classList.remove("active", "fade");
        modalThanks.classList.remove("active", "fade");
        document.body.style.overflow = ''
    }

    overlay.addEventListener("click", (e) => {
        if (e.target == overlay || e.target.classList.contains('modal__close')) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (
            (e.code === "Escape" &&
                modalConsult.classList.contains("active")) ||
            modalOrder.classList.contains("active") ||
            modalThanks.classList.contains("active")
        ) {
            closeModal();
        }
    });
    // overlay.addEventListener("click", (e) => {
    //     if (e.target == overlay || e.target === close) {
    //         closeModal();
    //     }
    // });

    // close.forEach((e) => {
    //     e.addEventListener("click", closeModal);
    // });
});
