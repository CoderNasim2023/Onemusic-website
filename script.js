
document.addEventListener("DOMContentLoaded", function () {
  // Follow button  code
  const followButton = document.querySelectorAll(".follow-btn");
  followButton.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("following");
      button.textContent = button.classList.contains("following")
        ? "Now Following"
        : "Follow";
    });
  });

  // Modal functionality code
  const modal = document.getElementById("album-modal");
  const closeModalButton = document.querySelector(".modal .close-btn");
  const knowMoreButtons = document.querySelectorAll(".know-more-btn");

  knowMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".album-card");
      const cover = card.querySelector("img").src;
      const title = card.querySelector("h3").textContent;
      const artist = card.querySelector("p").textContent;
      const description = card.querySelector(".description").textContent;

      document.getElementById("modal-album-cover").src = cover;
      document.getElementById("modal-album-title").textContent = title;
      document.getElementById("modal-album-artist").textContent = artist;
      document.getElementById("modal-album-description").textContent =
        description;

      modal.style.display = "flex";
    });
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
