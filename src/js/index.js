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

    //Modal windows

    function bindModal(
        triggerSelector,
        modalSelector,
        closeSelector = ".modal .modal__close",
        formsSelector = "form",
        overlaySelector = ".overlay"
    ) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelectorAll(closeSelector),
            forms = document.querySelectorAll(formsSelector),
            overlay = document.querySelector(overlaySelector);

        function closeModal(modalWindowForClose) {
            modalWindowForClose.classList.remove("active", "fade");
            overlay.classList.remove("active", "fade");
            document.body.style.overflow = "";
        }

        function openModal(modalWindowForOpen) {
            modalWindowForOpen.classList.add("active", "fade");
            overlay.classList.add("active", "fade");
            document.body.style.overflow = "hidden";
        }

        trigger.forEach((item) => {
            item.addEventListener("click", (e) => {
                if (
                    triggerSelector === '[data-modal="thanks"]' ||
                    triggerSelector === ".modal .button"
                ) {
                    forms.forEach((it) => {
                        it.addEventListener("submit", (e) => {
                            e.preventDefault();
                            setTimeout(() => {
                                openModal(document.querySelector("#thanks"));
                            });
                            closeModal(document.querySelector("#consult"));
                            closeModal(document.querySelector("#order"));
                        });
                    });
                } else {
                    openModal(modal);
                }
            });
        });

        overlay.addEventListener("click", (e) => {
            const target = e.target;
            if (target === overlay) {
                closeModal(modal);
            }
            close.forEach((item) => {
                if (target === item) {
                    closeModal(modal);
                }
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.code === "Escape" && modal.classList.contains("active")) {
                closeModal(modal);
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
                });
            });
        }
    }

    bindModal('[data-modal="consult"]', "#consult");
    bindModal('[data-modal="thanks"]', "#thanks");
    bindModal('[data-modal="order"]', "#order");
    bindModal(".modal .button", "#thanks");

    //Mask for russian phone

    const phoneInputs = document.querySelectorAll('input[name="phone"]');

    function getInputNumbersValue(input) {
        return input.value.replace(/\D/g, "");
    }

    function onPhoneInput(e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            formattedInputValue = "",
            selectionStart = input.selectionStart;

        if (!inputNumbersValue) {
            return (input.value = "");
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") {
                inputNumbersValue = "7" + inputNumbersValue;
            }
            let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }

    function onPhoneKeyDown(e) {
        let input = e.target;
        if (e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
            input.value = "";
        }
    }

    phoneInputs.forEach((item) => {
        item.addEventListener("input", onPhoneInput);
        item.addEventListener("keydown", onPhoneKeyDown);
    });

    //ScrollUp

    const scrollUP = document.querySelector(".pageup");

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;

        if (scrollTop >= 1600) {
            scrollUP.classList.add("active", "fadePageUP");
        } else {
            scrollUP.classList.remove("active", "fadePageUP");
        }
    });
});
