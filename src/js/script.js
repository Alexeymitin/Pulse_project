//Slider
document.addEventListener("DOMContentLoaded", () => {
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

    //tabs

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

    //Toggle slide

    const itemContent = document.querySelectorAll(".catalogue-item__content"),
        itemContentBack = document.querySelectorAll(".catalogue-item__list"),
        linkMore = document.querySelectorAll(".catalogue-item__link"),
        linkBack = document.querySelectorAll(".catalogue-item__back");

    // function toggleClass(n) {
    //     itemContent.forEach(() => {
    //         itemContent[n].classList.toggle("catalogue-item__content_active");
    //     });
    //     itemContentBack.forEach(() => {
    //         itemContentBack[n].classList.toggle("catalogue-item__list_active");
    //     });
    // }

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
});
