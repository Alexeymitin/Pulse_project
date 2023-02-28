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
        tabsContent = document.querySelectorAll(".catalogue__content");

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

    // const buttonsConsult = document.querySelectorAll('[data-modal="consult"]'),
    //     buttonThanks = document.querySelector('[data-modal="thanks"]'),
    //     buttonsCatalogue = document.querySelectorAll(".button_catalogue"),
    //     overlay = document.querySelector(".overlay"),
    //     modalConsult = document.querySelector("#consult"),
    //     modalOrder = document.querySelector("#order"),
    //     modalThanks = document.querySelector("#thanks"),
    //     close = document.querySelectorAll(".modal__close"),
    //     inputs = document.querySelectorAll("input"),
    //     forms = document.querySelectorAll("form");

    // forms.forEach((form) => {
    //     form.addEventListener("submit", (e) => {
    //         e.preventDefault();

    //         let statusMessage = document.createElement("div");
    //         statusMessage.classList.add("status");
    //         form.appendChild(statusMessage);

    //         const formData = new FormData(item);
    //     });
    // });

    // function openModal(modal) {
    //     modal.classList.add("active", "fade");
    //     overlay.classList.add("active", "fade");
    //     document.body.style.overflow = "hidden";
    // }

    // function closeModal() {
    //     modalConsult.classList.remove("active", "fade");
    //     modalOrder.classList.remove("active", "fade");
    //     modalThanks.classList.remove("active", "fade");
    //     overlay.classList.remove("active", "fade");
    //     document.body.style.overflow = "";
    // }

    // buttonsConsult.forEach((e) => {
    //     e.addEventListener("click", () => {
    //         openModal(modalConsult);
    //     });
    // });

    // buttonThanks.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     openModal(modalThanks);
    // });

    // buttonsCatalogue.forEach((button, i) => {
    //     button.addEventListener("click", (event) => {
    //         const modalDescr = modalOrder.querySelector(".modal__descr"),
    //             target = event.target,
    //             subtitle = document.querySelectorAll(
    //                 ".catalogue-item__subtitle"
    //             );
    //         if (target === button) {
    //             subtitle.forEach(() => {
    //                 modalDescr.textContent = `${subtitle[i].textContent}`;
    //             });
    //         }
    //         openModal(modalOrder);
    //     });
    // });

    // overlay.addEventListener("click", (e) => {
    //     if (
    //         e.target == overlay ||
    //         e.target.classList.contains("modal__close")
    //     ) {
    //         closeModal();
    //     }
    // });

    // close.forEach((e) => {
    //     e.addEventListener("click", closeModal);
    // });

    // document.addEventListener("keydown", (e) => {
    //     if (
    //         (e.code === "Escape" &&
    //             modalConsult.classList.contains("active")) ||
    //         modalOrder.classList.contains("active") ||
    //         modalThanks.classList.contains("active")
    //     ) {
    //         closeModal();
    //     }
    // });

    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            overlay = document.querySelector(".overlay");

        function closeModal() {
            modal.classList.remove("active", "fade");
            overlay.classList.remove("active", "fade");
            document.body.style.overflow = "";
        }

        function openModal() {
            modal.classList.add("active", "fade");
            overlay.classList.add("active", "fade");
            document.body.style.overflow = "hidden";
        }

        trigger.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();

                openModal();
            });
        });

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay || e.target === close) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.code === "Escape" && modal.classList.contains("active")) {
                closeModal();
            }
        });

        if (triggerSelector == ".button_catalogue") {
            trigger.forEach((button, i) => {
                button.addEventListener("click", (event) => {
                    const modalDescr = modal.querySelector(".modal__descr"),
                        target = event.target,
                        subtitle = document.querySelectorAll(
                            ".catalogue-item__subtitle"
                        );
                    if (target === button) {
                        subtitle.forEach(() => {
                            modalDescr.textContent = `${subtitle[i].textContent}`;
                        });
                    }
                    openModal();
                });
            });
        }
    }

    bindModal('[data-modal="consult"]', "#consult", "#consult .modal__close");
    bindModal('[data-modal="thanks"]', "#thanks", "#thanks .modal__close");
    bindModal(".button_catalogue", "#order", "#order .modal__close");
});
