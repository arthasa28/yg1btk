// Nav Toggle
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });

  // Close menu when clicking link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
    });
  });
};

// Scroll Reveal
const scrollReveal = () => {
  const reveals = document.querySelectorAll(".fade-in");
  const checkScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;
    reveals.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        box.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Trigger once on load
};

navSlide();
scrollReveal();

//Script Submit to Form

const scriptURL =
  "https://script.google.com/macros/s/AKfycby3zoyhuBvaZVTOyZpwT-ZXBKPvjvbEvC8pQ2IflIhBt-SbG1fuD5r7edj0iGbECzVh/exec";
const form = document.querySelector(".contact-form form");
const alertBox = document.getElementById("form-alert");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  alertBox.className = "form-alert"; // reset class
  alertBox.innerHTML = "Sending...";
  alertBox.style.display = "block";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    });

    if (!response.ok) throw new Error("Network error");

    alertBox.classList.add("success");
    alertBox.innerHTML = "✅ Message sent successfully!";

    form.reset(); // Kosongkan form
  } catch (error) {
    alertBox.classList.add("error");
    alertBox.innerHTML = "❌ Failed to send message. Please try again.";
  }

  // Auto hide after 3 sec
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
});
