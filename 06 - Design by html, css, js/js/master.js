// Get Fav background from localStorage
let favBackground = localStorage.getItem("fav-background");

// Use fav background
if (favBackground !== null) {
  document.querySelector(".landing-page").style.backgroundImage = favBackground;
}

// Get color options from local storage
let mainColor = localStorage.getItem("color-option");

// Use stored color in local storage
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
}

// Add class active to chossen color from local storage
document.querySelectorAll(".colors-list li").forEach((element) => {
  element.classList.remove("active");

  if (element.dataset.color === mainColor) {
    element.classList.add("active");
  }
});

// Random background option
let backgroundOption = true;

// Variable to control the background interval
let backgroundInterval;

// Check if there is localStorage background item
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
    if (backgroundLocalItem === "true") {
      document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
      document.querySelector(".random-backgrounds .no").classList.add("active");
    }
  });
}

// Toggle spin class on icon
document.querySelector(".toggel-setting .fa-gear").onclick = function () {
  // Toggle fa-spin class on self
  this.classList.toggle("fa-spin");

  // Toggle open class on maim settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on all list items
colorsLi.forEach((li) => {
  // Click on evry list item
  li.addEventListener("click", (e) => {
    // Set color on root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // Set color in local storage
    mainColor = localStorage.setItem("color-option", e.target.dataset.color);

    handelActive(e);
  });
});

// Switch random backgrounds options
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop on all spans
randomBackEl.forEach((span) => {
  // Click on evry span
  span.addEventListener("click", (e) => {
    handelActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Select landing page elelment
let landingPage = document.querySelector(".landing-page");

// Get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change background image url
      landingPage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;

      // Save fav background in localStorage
      localStorage.setItem("fav-background", `url(imgs/${imgsArray[randomNumber]})`);
    }, 10000);
  }
}

randomizeImgs();

// Select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills off set top (Height above skills section)
  let skillsOffsetTop = ourSkills.offsetTop;
  // console.log("skillsOffsetTop", skillsOffsetTop);

  // Skills outer height (Height of skills section)
  let skillsOuterHeight = ourSkills.offsetHeight;
  // console.log("skillsOuterHeight", skillsOuterHeight);

  // Window height
  let windowHeight = this.innerHeight;
  // console.log("windowHeight", windowHeight);

  // Window scroll top
  let windowScrollTop = this.pageYOffset;
  // console.log("windowScrollTop", windowScrollTop);

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay element
    let overlay = document.createElement("div");

    // Add class to overlay
    overlay.className = "popup-overlay";

    // Append overlay to the body
    document.body.appendChild(overlay);

    // Create popup box
    let popupBox = document.createElement("div");

    // Add class to popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create heading
      let imgHeading = document.createElement("h3");

      // Create text for heading
      let imgText = document.createTextNode(img.alt);

      // Append text to the heading
      imgHeading.appendChild(imgText);

      // Append heading to popup box
      popupBox.appendChild(imgHeading);
    }

    // Create the image
    let popupImage = document.createElement("img");

    // Set image source
    popupImage.src = img.src;

    // Add image to popup box
    popupBox.appendChild(popupImage);

    // Add popup box to body
    document.body.appendChild(popupBox);

    // Create the close span
    let closeButton = document.createElement("span");

    // Create the close button text
    let closeButtonText = document.createTextNode("X");

    // Append text to close button
    closeButton.appendChild(closeButtonText);

    // Append button to popup box
    popupBox.appendChild(closeButton);

    // Add class to closr button
    closeButton.className = "close-button";
  });
});

// Close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove the current popup
    e.target.parentElement.remove();

    // Remove the overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all links
const allLinks = document.querySelectorAll(".links a");

function scrolToSection(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrolToSection(allBullets);
scrolToSection(allLinks);

// Handel active state
function handelActive(ev) {
  // Remove class active from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add class active to target element
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handelActive(e);
  });
});

// Reset button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("color-option");
  // localStorage.removeItem("background-option");
  // localStorage.removeItem("bullets_option");

  window.location.reload();
};

// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop propagation
  e.stopPropagation();

  // Toggle class menu-active on button
  this.classList.toggle("menu-active");

  // Toggle class open on links
  tLinks.classList.toggle("open");
};

// Click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check if menu is open
    if (tLinks.classList.contains("open")) {
      // Toggle class menu-active on button
      toggleBtn.classList.toggle("menu-active");

      // Toggle class open on links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop propagation
tLinks.onclick = function (e) {
  e.stopPropagation();
};
