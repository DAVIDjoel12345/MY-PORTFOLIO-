const snapContainer = document.querySelector(".snap-container");
const navLinks = [...document.querySelectorAll("nav a")];
const revealItems = [...document.querySelectorAll(".reveal")];
const tiltItems = [...document.querySelectorAll(".tilt")];
const magneticItems = [...document.querySelectorAll(".magnetic")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { root: window.matchMedia("(max-width: 920px)").matches ? null : snapContainer, threshold: 0.18 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 330)}ms`;
  revealObserver.observe(item);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { root: window.matchMedia("(max-width: 920px)").matches ? null : snapContainer, threshold: 0.52 }
);

document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));

tiltItems.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 8}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px) scale(1.02)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});
