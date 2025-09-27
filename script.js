document.addEventListener("DOMContentLoaded", function () {

  // --- Global Variables ---
  const modal = document.getElementById("album-modal");
  const closeModalButton = document.querySelector(".modal .close-btn");
  const knowMoreButtons = document.querySelectorAll(".know-more-btn");

  // অডিও প্লেয়ার এবং নিয়ন্ত্রণ বাটন
  const audioPlayer = document.getElementById('album-audio');
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');

  // --- Modal Logic (গান লোড করার মূল অংশ) ---

  knowMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".album-card");

      // 1. গানটি কার্ডের data-song অ্যাট্রিবিউট থেকে আনা হচ্ছে
      const songSrc = card.getAttribute('data-song');
      const title = card.querySelector("h3").textContent; // গানের নাম

      // 2. আগের কোনো গান চললে থামিয়ে রিসেট করা
      audioPlayer.pause();
      audioPlayer.currentTime = 0;

      // 3. যদি গানের পাথ পাওয়া যায়, তবে তা প্লেয়ারে লোড করা
      if (songSrc) {
        audioPlayer.src = songSrc;
        audioPlayer.load(); // নতুন সোর্স লোড করার জন্য বাধ্যতামূলক
        console.log(`Now loading: ${title} from path: ${songSrc}`);
      } else {
        // যদি গানের পাথ না থাকে, কনসোলে ওয়ার্নিং দেখাবে
        console.warn(`Local song path missing for album: ${title}. Playback unavailable.`);
        audioPlayer.src = '';
      }

      // 4. Modal-এ অন্যান্য তথ্য পপুলেট করা (যেমন আগে ছিল)
      const cover = card.querySelector("img").src;
      const artist = card.querySelector("p").textContent;
      const description = card.querySelector(".description").textContent;

      document.getElementById("modal-album-cover").src = cover;
      document.getElementById("modal-album-title").textContent = title;
      document.getElementById("modal-album-artist").textContent = artist;
      document.getElementById("modal-album-description").textContent = description;

      // 5. Modal দেখানো
      modal.style.display = "flex";
    });
  });

  // --- অডিও নিয়ন্ত্রণ লজিক (Play/Pause) ---

  // Play Button Logic
  playBtn.addEventListener('click', function () {
    if (audioPlayer.src && audioPlayer.src !== window.location.href) {
      // audioPlayer.src চেক করা হচ্ছে যাতে নিশ্চিত হয় যে এটিতে একটি ভ্যালিড গান লোড হয়েছে
      audioPlayer.play().catch(error => {
        // ব্রাউজারের অটো-প্লে নীতি (Autoplay Policy) এর কারণে প্লে না হলে এই ত্রুটি হয়
        console.error("Audio Playback Error (Autoplay Policy?):", error);
        alert("Playback failed. Please click 'Play' again or check your audio file path.");
      });
    } else {
      alert('Thee song is not loaded fully to play this song!');
    }
  });

  // Pause Button Logic
  pauseBtn.addEventListener('click', function () {
    audioPlayer.pause();
  });

  // --- Modal বন্ধ করার লজিক (বন্ধ হলে গান থামবে) ---
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      
      modal.style.display = "none";
    }
  });


  // --- Recommended Albums logic code 

  // প্রয়োজনীয় উপাদানগুলি ধরা (Get the necessary elements)
  const searchInput = document.querySelector('.search-bar input');
  const albumCards = document.querySelectorAll('.album-card');

  // ইনপুট বক্সে কোনো পরিবর্তন (টাইপ) হলে এই ফাংশনটি কাজ করবে
  searchInput.addEventListener('input', function () {
    // ইনপুট থেকে টেক্সট নেওয়া এবং সেটিকে ছোট হাতের অক্ষরে (lowercase) পরিবর্তন করা
    const searchTerm = searchInput.value.toLowerCase();

    // প্রত্যেকটি অ্যালবামের কার্ডের ওপর লুপ চালানো
    albumCards.forEach(card => {
      // গানের নাম এবং শিল্পীর নাম নেওয়া
      const title = card.querySelector('h3').textContent.toLowerCase();
      const artist = card.querySelector('p').textContent.toLowerCase();

      // চেক করা যে সার্চ টার্মটি টাইটেল বা আর্টিস্টের মধ্যে আছে কিনা
      if (title.includes(searchTerm) || artist.includes(searchTerm)) {
        // যদি খুঁজে পাওয়া যায়, কার্ডটি দেখানো
        card.style.display = 'block';
        // Note: আপনার CSS যদি flex ব্যবহার করে, 'block' এর জায়গায় 'flex' ব্যবহার করতে পারেন
        // card.style.display = 'flex';
      } else {
        // খুঁজে না পেলে কার্ডটি লুকিয়ে রাখা
        card.style.display = 'none';
      }
    });
  });

  // --- অন্যান্য লজিক (Follow Button, Smooth Scrolling) ---

  // Follow button logic
  document.querySelectorAll(".follow-btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("following");
      button.textContent = button.classList.contains("following") ? "Following" : "Follow";
    });
  });

  // Smooth Scrolling for Nav Links
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    });
  });
});