const popupLinks = document.querySelectorAll(".popup-link"),
body = document.querySelector("html"),
lockPadding = document.querySelectorAll(".lock-padding");
let unlock = !0;
const timeout = 500;
if (popupLinks.length > 0) {
   for (let a = 0; a < popupLinks.length; a++) {
      let b = popupLinks[a];
      b.addEventListener("click", function (a) {
         let c = b.getAttribute("href").replace("#", ""),
                d = document.getElementById(c);
            popupOpen(d), a.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0)
    for (let index = 0; index < popupCloseIcon.length; index++) {
        let c = popupCloseIcon[index];
        c.addEventListener("click", function (a) {
            popupClose(c.closest(".popup")), a.preventDefault();
        });
    }
function popupOpen(a) {
    if (a && unlock) {
        let b = document.querySelector(".popup.open");
        b ? popupClose(b, !1) : bodyLock(),
            a.classList.add("open"),
            a.addEventListener("click", function (a) {
                a.target.closest(".popup__content") || popupClose(a.target.closest(".popup"));
            });
    }
}
function popupClose(a, b = !0) {
    unlock && (a.classList.remove("open"), b && bodyUnLock());
}
function bodyLock() {
    let b = window.innerWidth - document.querySelector("body").offsetWidth + "px";
    if (lockPadding.length > 0)
        for (let a = 0; a < lockPadding.length; a++) {
            let c = lockPadding[a];
            c.style.paddingRight = b;
        }
    (body.style.paddingRight = b),
        body.classList.add("lock"),
        (unlock = !1),
        setTimeout(function () {
            unlock = !0;
        }, 500);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0)
            for (let a = 0; a < lockPadding.length; a++) {
                let b = lockPadding[a];
                b.style.paddingRight = "0px";
            }
        (body.style.paddingRight = "0px"), body.classList.remove("lock");
    }, 500),
        (unlock = !1),
        setTimeout(function () {
            unlock = !0;
        }, 500);
}
document.addEventListener("keydown", function (a) {
    if (27 === a.which) {
        let b = document.querySelector(".popup.open");
        popupClose(b);
    }
}),
    Element.prototype.closest ||
        (Element.prototype.closest = function (b) {
            for (var a = this; a; ) {
                if (a.matches(b)) return a;
                a = a.parentElement;
            }
            return null;
        }),
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
