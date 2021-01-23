// 개발자의 실수를 잡아줌
// - 흔히 발생하는 코딩 실수를 잡아내서 예외를 발생시킵니다.
// - 상대적으로 안전하지 않은 액션이 발생하는 것을 방지하거나 그럴 때 예외를 발생시킵니다. 예를 들자면 전역객체들에 접근하려 한다거나 하는 것들이겠지요.
// - 혼란스럽거나 제대로 고려되지 않은 기능들을 비활성화시킵니다.
"use stric";

// Navbar 이벤트
const navbar = document.querySelector("#navbar"); // Navbar 가져오기
const navbarHeight = navbar.getBoundingClientRect().height; // Navbar 높이 가져오기

// 전체 이벤트
// - 스크롤이 될 때 Navbar 높이를 판별하여 색 변경
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//  Navbar 클릭 이벤트
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar 토글 버튼
const navbarToggleBtn = document.querySelector(".navbar__toggle-button");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Contact Me Button 클릭 이벤트
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Home 화면 페이드 아웃
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Arrow Up Show
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Arrow Up Click
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove Selection
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });

    projectContainer.classList.remove("anim-out");
  }, 300);
});

// 스크롤 이벤트 메서드
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
