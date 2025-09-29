document.addEventListener("DOMContentLoaded", function () {

  // --- Global Variables ---
  const modal = document.getElementById("album-modal");
  const closeModalButton = document.querySelector(".modal .close-btn");
  const knowMoreButtons = document.querySelectorAll(".know-more-btn");
  const searchInput = document.querySelector('.search-bar input');
  const albumCards = document.querySelectorAll('.album-card');

  // IMPORTANT: Dynamically creating the audio element if it doesn't exist
  let audioPlayer = document.getElementById('album-audio');
  if (!audioPlayer) {
    audioPlayer = new Audio();
    audioPlayer.id = 'album-audio';
    // Append it to the body or modal-content for easy access/debugging
    document.body.appendChild(audioPlayer);
  }

  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');

  // --- Modal Logic (Song Loading) ---

  knowMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".album-card");

      // 1. Get song path and title
      const songSrc = card.getAttribute('data-song');
      const title = card.querySelector("h3").textContent;

      // 2. Pause and reset the currently playing audio
      audioPlayer.pause();
      audioPlayer.currentTime = 0;

      // 3. Load the new song source
      if (songSrc) {
        // Check if the path is relative to the current page (common error)
        const fullSongSrc = songSrc.startsWith('http') || songSrc.startsWith('/') ? songSrc : window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/' + songSrc;

        audioPlayer.src = fullSongSrc;
        audioPlayer.load();
        console.log(`Now Playing: ${title} from path: ${fullSongSrc}`);
      } else {
        console.warn(`Local song path missing for album: ${title}. Playback unavailable.`);
        audioPlayer.src = '';
      }

      // 4. Populate Modal with other information
      const cover = card.querySelector("img").src;
      const artist = card.querySelector("p").textContent;
      const description = card.querySelector(".description").textContent;

      document.getElementById("modal-album-cover").src = cover;
      document.getElementById("modal-album-title").textContent = title;
      document.getElementById("modal-album-artist").textContent = artist;
      document.getElementById("modal-album-description").textContent = description;

      // 5. Show Modal
      modal.style.display = "flex";
    });
  });

  // --- Audio Control Logic (Play/Pause) ---

  // Play Button Logic
  playBtn.addEventListener('click', function () {
    console.log("Music started playing")
    // Check if a song source is actually loaded
    if (audioPlayer.src !== window.location.href) {
      audioPlayer.play().catch(error => {
        // Log and alert the Autoplay Policy error
        console.error("Audio Playback Error (Autoplay Policy):", error);
        alert("Playback failed. Most browsers require a user interaction (like clicking the button) to start audio playback. Please ensure the song path is correct.");
      });
    } else {
      alert('Please Click into an album to load a song first!');
    }
  });

  // Pause Button Logic
  pauseBtn.addEventListener('click', function () {
    console.log("Music stopped ")
    audioPlayer.pause();
  });

  // Add logic to pause when the song ends
  audioPlayer.addEventListener('ended', function () {
    console.log("Song finished playing.");
    // Optional: Reset button state if you had a separate play/pause toggle
  });

  // --- Modal Close Logic (Pause audio when closed) ---
  function closeModal() {
    modal.style.display = "none";
    // Stop and reset audio when closing the modal
  }

  closeModalButton.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });


  // --- Recommended Albums Search Logic ---

  // The logic inside searchInput.addEventListener('input', ...) is correct:

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    albumCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const artist = card.querySelector('p').textContent.toLowerCase();

      if (title.includes(searchTerm) || artist.includes(searchTerm)) {
        // The correct display style depends on the parent (.albums) being a flex container.
        card.style.display = 'block'; // Or 'flex' if the card itself is flex-based internally
      } else {
        card.style.display = 'none';
      }
    });
  });


  // --- Other Logic (Follow Button, Smooth Scrolling) ---

  // Follow button logic
  document.querySelectorAll(".follow-btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("following");
      button.textContent = button.classList.contains("following") ? "Following" : "Follow";
    });
  });

  // Smooth Scrolling for Nav Links (this section was already perfect)
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    });
  });
});