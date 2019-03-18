//babel(es2015)
"use strict";

var section = document.querySelectorAll("section"),
    point = document.querySelectorAll(".navigation__item"),
    downWrap = document.querySelector(".mountains__down"),
    down = document.querySelector(".mountains__button"),
    slider = document.querySelector(".slider__list"),
    input = document.querySelector(".slider__input"),
    pointActive = "navigation__item--active"; //Плавный скролл

var anim = function anim(sel, duration) {
  var to = document.querySelector(sel).getBoundingClientRect().top,
      temp;
  return function (sel) {
    cancelAnimationFrame(temp);
    var start = performance.now();
    var from = window.pageYOffset || document.documentElement.scrollTop;
    requestAnimationFrame(function step(timestamp) {
      var progress = (timestamp - start) / duration;
      1 <= progress && (progress = 1);
      window.scrollTo(0, from + to * progress | 0);
      1 > progress && (temp = requestAnimationFrame(step));
    });
  };
}; //END
//Скролл при нажатии на кнопку "Листайте вниз"


var scrollBtn = anim(".basics", 1000);
down.addEventListener("click", scrollBtn); //END
//Установка активного элемента навигации при скролле

window.onscroll = function () {
  var scroll = window.pageYOffset || document.documentElement.scrollTop;
  scroll > 1 ? downWrap.style.opacity = "0" : downWrap.style.opacity = "1";

  for (var i = 0; i < point.length; i++) {
    if (point[i].classList.contains(pointActive)) {
      point[i].classList.remove(pointActive);
    }
  }

  if (scroll < section[0].scrollHeight / 2) {
    point[0].classList.add(pointActive);
  } else if (scroll > section[0].scrollHeight / 2 && scroll < section[0].scrollHeight * 1.5) {
    point[1].classList.add(pointActive);
  } else {
    point[2].classList.add(pointActive);
  }
}; //END
//Установка активного элемента навигации при клике


for (var x = 0; x < point.length; x++) {
  point[x].addEventListener("click", function (evt) {
    if (this.classList.contains(pointActive)) {
      return false;
    } else {
      for (var y = 0; y < point.length; y++) {
        if (point[y].classList.contains(pointActive)) {
          point[y].classList.remove(pointActive);
        }
      }

      this.classList.add(pointActive);
    }
  });
} //END
//Слайдер


var showSliderValue = function showSliderValue() {
  if (input.value > 30 && input.value < 70) {
    slider.style.transform = "translateX(-100%)";
  } else if (input.value > 70) {
    slider.style.transform = "translateX(-200%)";
  } else {
    slider.style.transform = "translateX(0%)";
  }
};

input.addEventListener("input", showSliderValue, false); //END
//Именение ползунка при "touch"

var start = function start() {
  return input.classList.add("slider__input--active");
},
    end = function end() {
  return input.classList.remove("slider__input--active");
};

(function () {
  input.addEventListener("touchend", end, false);
  input.addEventListener("touchcancel", end, false);
  input.addEventListener("touchmove", start, false);
})(); //END