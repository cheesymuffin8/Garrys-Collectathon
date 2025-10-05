// ChatGPT made the majority of this script. I had no idea how difficult it was
// to do seemingly simple things in JavaScript

// Default items
const defaultItems = {
  watermelon: false,
  kettle: false,
  golden_statue: false,
  balloon_head: false,
  hula_girl: false,
  cactus: false,
  computer: false,
  skull: false,
  mini_globe: false,
  old_boot: false,
};

// Load from sessionStorage or use defaults
let items = JSON.parse(sessionStorage.getItem("items")) || { ...defaultItems };

// Helper to format item names (replace underscores with spaces and capitalize words)
function formatItemName(name) {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper to format status text
function formatStatus(collected) {
  return collected ? "Collected" : "Not Collected";
}

// Check collected items
function areItemsCollected(names, all = true) {
  if (typeof names === "string") names = [names];

  if (all) {
    return names.every(name => items[name] === true);
  } else {
    return names.some(name => items[name] === true);
  }
}

// Storage functions
function saveItems() {
  sessionStorage.setItem("items", JSON.stringify(items));
}

function collectItem(name) {
  if (items.hasOwnProperty(name) && !items[name]) {
    items[name] = true;
    saveItems();
  }
}

function removeItem(name) {
  if (items.hasOwnProperty(name)) {
    items[name] = false;
    saveItems();
  }
}

function toggleItem(name) {
  if (items.hasOwnProperty(name)) {
    items[name] = !items[name];
    saveItems();
  }
}

// Display items
function showItems(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.innerHTML = ''; // clear previous content

  for (const [name, collected] of Object.entries(items)) {
    // Container for each item
    const itemContainer = document.createElement('div');
    itemContainer.style.marginBottom = '10px';
    itemContainer.setAttribute("class", "TopBar unselectable-text");

    // Name div (formatted)
    const nameDiv = document.createElement('div');
    nameDiv.textContent = formatItemName(name);

    // Status div (formatted and colored)
    const statusDiv = document.createElement('div');
    statusDiv.textContent = formatStatus(collected);
    statusDiv.style.color = collected ? 'limegreen' : 'red';
    statusDiv.setAttribute("class", "Status unselectable-text");

    // Append name and status to container
    itemContainer.appendChild(nameDiv);
    itemContainer.appendChild(statusDiv);

    // Append container to parent
    el.appendChild(itemContainer);
  }
  checkAllCollected();
}

// Handle .collect hover and clicks
function setupCollectibles() {
  const collectDivs = document.querySelectorAll(".collect");

  collectDivs.forEach(div => {
    const itemName = div.id;

    // Only add hover cursor if item not collected
    if (!items[itemName]) div.classList.add("hoverable");

    // Click to collect
    div.addEventListener("click", () => {
      if (!items[itemName]) {
        collectItem(itemName);
        showItems("items");
        div.classList.remove("hoverable"); // remove grab cursor after collection
      }
    });
  });
}

function updateConditionalElements() {
  // Appears
  document.querySelectorAll(".appears").forEach(el => {
    const item = el.dataset.requiredItem;
    if (areItemsCollected(item)) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });

  // Disappears
  document.querySelectorAll(".disappears").forEach(el => {
    const item = el.dataset.requiredItem;
    if (areItemsCollected(item)) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });
}

const messageBg = document.createElement("div");
messageBg.id = "allCollectedBackground";
messageBg.style.display = "flex"
messageBg.style.position = "absolute";
messageBg.style.top = "0";
messageBg.style.left = "0";
messageBg.style.width = "100%";
messageBg.style.height = "100%";
messageBg.style.display = "flex";
messageBg.style.justifyContent = "center";
messageBg.style.alignItems = "center";
messageBg.style.backgroundColor = "rgba(255,255,255,0)";
messageBg.style.backdropFilter = "blur(50px)";
messageBg.style.zIndex = "200";
messageBg.style.transition = "opacity 0.5s ease";
messageBg.style.opacity = "0"; // hidden by default

const coolvetica = new FontFace("Coolvetica", "url('../Fonts/coolvetica.ttf')");

// Create the message text
const messageText = document.createElement("div");
messageText.id = "allCollectedText";
messageText.style.display = "flex"
messageText.style.position = "absolute"
messageText.textContent = "You collected everything!";
messageText.style.color = "rgba(9, 255, 0)";
messageText.style.fontWeight = "bold";
messageText.style.backgroundColor = "rgba(0,0,0,0.5)"
messageText.style.padding = "1%"
messageText.style.borderRadius = "0.5vw"
messageText.style.textAlign = "center";
messageText.style.fontSize = "1.25vw";
messageText.style.textShadow = "0 0 10px rgba(9, 255, 0, 0.8)";
messageText.style.fontFamily = "sans-serif"; // fallback until loaded

// Load and apply the Coolvetica font
coolvetica.load().then(loadedFont => {
  document.fonts.add(loadedFont);
  messageText.style.fontFamily = "'Coolvetica', sans-serif, arial";
  console.log("Coolvetica font loaded successfully");
}).catch(err => {
  console.error("Failed to load Coolvetica font:", err);
});

const resetButton = document.createElement("button");
resetButton.textContent = "Reset Progress";
resetButton.style.display = "flex";
resetButton.style.position = "absolute";
resetButton.style.bottom = "20%";
resetButton.style.padding = "1.1% 2%";
resetButton.style.border = "0.2vw solid rgba(0, 0, 0, 1)";
resetButton.style.borderRadius = "0.5vw";
resetButton.style.background = "rgba(0,0,0,0.5)";
resetButton.style.color = "red";
resetButton.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.8)";
resetButton.style.fontWeight = "bold";
resetButton.style.cursor = "pointer";
resetButton.style.fontSize = "1vw";
resetButton.style.transition = "borderColor 0.5s, background 0.3s, transform 0.2s";
resetButton.addEventListener("mouseenter", () => {
  resetButton.style.background = "rgba(255, 0, 0, 0.2)";
  resetButton.style.transform = "scale(1.05)";
  resetButton.style.borderColor = "rgb(255, 0, 0)"
});
resetButton.addEventListener("mouseleave", () => {
  resetButton.style.background = "rgba(0,0,0,0.4)";
  resetButton.style.transform = "scale(1)";
  resetButton.style.borderColor = "rgb(0, 0, 0)"
});

// Reset logic
resetButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset your progress?")) {
    // Clear item data and restore defaults
    items = { ...defaultItems };
    saveItems();
    showItems("items");
    updateConditionalElements();
    checkAllCollected();
    window.location.href = window.location.origin + "/index.html";
  }
});

messageBg.appendChild(messageText);
messageBg.appendChild(resetButton);

// Append background to game frame after DOM loads
window.addEventListener("DOMContentLoaded", () => {
  updateConditionalElements();

  const frame = document.getElementById("gameFrame");
  if (frame) {
    frame.style.position = "relative";
    frame.appendChild(messageBg);
  }

  setupCollectibles();
  showItems("items");
});

// Visibility controls
function setAllCollectedVisible(visible) {
  messageBg.style.opacity = visible ? "1" : "0";
  messageBg.style.pointerEvents = visible ? "auto" : "none";
}

function checkAllCollected() {
  const allCollected = Object.values(items).every(v => v === true);
  setAllCollectedVisible(allCollected);
}

// Call after collecting an item
const originalCollectItem = collectItem;
collectItem = function(name) {
  originalCollectItem(name);
  updateConditionalElements();
  checkAllCollected();
};

// Globalize functions for debugging or external calls
window.collectItem = collectItem;
window.removeItem = removeItem;
window.toggleItem = toggleItem;
window.showItems = showItems;
window.areItemsCollected = areItemsCollected;
window.setupCollectibles = setupCollectibles;

// Save immediately
saveItems();

// Run on page load to initialize collectibles
window.addEventListener("DOMContentLoaded", () => {
  setupCollectibles();
  showItems("items"); // Display current state automatically
});
