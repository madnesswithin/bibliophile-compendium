document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const bookInput = document.getElementById('book-input');
  const saveBtn = document.getElementById('save-book-btn');
  const bookDisplay = document.getElementById('current-book-display');
  const stardustContainer = document.getElementById('stardust-container');

  // 1. Lore Collection Array
  const loreQuotes = [
    { text: "Life before death. Strength before weakness. Journey before destination.", author: "Brandon Sanderson" },
    { text: "Depending on where you began the story, it was about a girl who became a monster.", author: "Maggie Stiefvater" },
    { text: "Be wary of the cards, for they are tricky, and magic is a dangerous game.", author: "Rachel Gillig" },
    { text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", author: "J.K. Rowling" },
    { text: "A purpose is not a path. It is a destination.", author: "Brandon Sanderson" }
  ];

  // Randomize quote on tab open
  const randomLore = loreQuotes[Math.floor(Math.random() * loreQuotes.length)];
  quoteText.textContent = `"${randomLore.text}"`;
  quoteAuthor.textContent = `- ${randomLore.author}`;

  // 2. Load currently tracked book from Chrome Storage
  chrome.storage.local.get(['currentBook'], (result) => {
    if (result.currentBook) {
      bookDisplay.textContent = result.currentBook;
    }
  });

  // 3. Save new book to Chrome Storage
  saveBtn.addEventListener('click', () => {
    const bookTitle = bookInput.value.trim();
    if (bookTitle) {
      chrome.storage.local.set({ currentBook: bookTitle }, () => {
        bookDisplay.textContent = bookTitle;
        bookInput.value = '';
      });
    }
  });

  // Handle 'Enter' key press
  bookInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveBtn.click();
  });

  // 4. Generate Stardust Environment
  const particleCount = 40; // Adjust for denser/lighter dust

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize starting positions and sizes
    const size = Math.random() * 3 + 1; // 1px to 4px
    const posX = Math.random() * 100; // 0% to 100% viewport width
    
    // Randomize animation durations to make movement feel organic
    const floatDuration = Math.random() * 10 + 10; // 10s to 20s
    const twinkleDuration = Math.random() * 3 + 2; // 2s to 5s
    const floatDelay = Math.random() * 10; // Staggered start times

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    
    particle.style.animationDuration = `${floatDuration}s, ${twinkleDuration}s`;
    particle.style.animationDelay = `-${floatDelay}s, 0s`; // Negative delay starts them immediately mid-screen

    stardustContainer.appendChild(particle);
  }
});
