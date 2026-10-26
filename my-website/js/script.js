// script.js: JavaScript for the whole website

// ---------- Nav: highlight the current page (runs on every page) ----------
const currentPage = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('nav li a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ---------- Image movement while hovering (only runs on pages with images) ----------
const hoverScale = 1.15; // zoom amount on hover
const maxMove = 20;      // how far the image shifts (px)

document.querySelectorAll('.zoom-container').forEach((container) => {
  const zoomImg = container.querySelector('.zoom-img');
  if (!zoomImg) return;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    zoomImg.style.transform = `scale(${hoverScale}) translate(${x * -maxMove}px, ${y * -maxMove}px)`;
  });
});

// ---------- Mouse event functions ----------

// Function 1: runs when the mouse moves over a cover image (onmouseover)
function zoomIn(img) {
  img.style.transform = 'scale(1.15)';
}

// Function 2: runs when the mouse moves off a cover image (onmouseout)
function zoomOut(img) {
  img.style.transform = 'scale(1)';
}

// Function 3: runs when a Read more / Show less button is clicked (onclick)
function toggleReview(btn) {
  const more = btn.closest('.review-text').querySelector('.more-text');
  const isHidden = more.hidden;

  more.hidden = !isHidden;
  btn.textContent = isHidden ? 'Show less' : 'Read more';
  btn.setAttribute('aria-expanded', isHidden);
}

// ---------- Form validation: presence, range and length checks ----------
function validateForm() {
  let name = document.getElementById("name").value.trim();
  let age = document.getElementById("age").value;
  let message = document.getElementById("msg").value.trim();
  let error = document.getElementById("formError");

  error.style.color = "#C62828"; // red for errors

  // Presence check
  if (name == "") {
    error.innerHTML = "Please enter your name.";
    return false;
  }

  // Range check (an empty age also fails here)
  if (age == "" || age < 16 || age > 99) {
    error.innerHTML = "Age must be between 16 and 99.";
    return false;
  }

  // Length check
  if (message.length < 10) {
    error.innerHTML = "Please write a message of at least 10 characters.";
    return false;
  }

  error.style.color = "green";
  error.innerHTML = "Thank you. Your message has been sent.";
  document.getElementById("contactForm").reset();
  return false; // stops the page reloading (we have no server)
}