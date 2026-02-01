# 💕 Valentine's Day Website

A romantic, interactive Valentine's Day website with playful animations and a mini-game.

## 🌟 Features

- **Interactive Question Screen**: Playful "Will you be my Valentine?" with smart yes/no buttons
  - Desktop: "No" button runs away from cursor
  - Mobile: "No" button shows playful responses
- **Celebration Animation**: Beautiful fireworks when "Yes" is clicked
- **Personal Message Section**: Easily customizable romantic message
- **Mini Game**: "Catch the Hearts" - tap falling hearts to score points
- **Animated Timeline**: Visual journey of your relationship
- **"Why I Love You" Cards**: Grid of reasons with hover effects
- **Easter Egg**: Click the "You Said Yes!" title 3 times for a secret message
- **Responsive Design**: Perfect on mobile and desktop
- **Starfield Background**: Twinkling stars throughout the experience

## 📂 File Structure

```
valentine-website/
├── index.html       # Main HTML structure
├── style.css        # All styling and animations
├── script.js        # Interactive functionality
└── README.md        # This file
```

## 🚀 Deployment on GitHub Pages

1. **Create a new repository** on GitHub (e.g., `valentine-2026`)
2. **Upload these files** to the repository:
   - `index.html`
   - `style.css`
   - `script.js`
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
4. **Your site will be live** at: `https://yourusername.github.io/valentine-2026/`

## ✏️ Customization Guide

### Personal Message (Main Content)

In `index.html`, find this section (around line 42):

```html
<!-- ⭐ EDIT YOUR MESSAGE HERE ⭐ -->
<p class="love-message">
    From the moment we met, you've brought light into my world...
</p>
<!-- ⭐ END OF EDITABLE MESSAGE ⭐ -->
```

Replace the text with your own personal message.

### Timeline Events

In `index.html`, find the timeline section (around line 63):

```html
<!-- ⭐ EDIT TIMELINE ITEMS HERE ⭐ -->
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h4>The Beginning</h4>
        <p>When our eyes first met and everything changed</p>
    </div>
</div>
<!-- Add more timeline items as needed -->
```

Edit the titles and descriptions to match your relationship milestones.

### "Why I Love You" Reasons

In `index.html`, find the reasons section (around line 95):

```html
<!-- ⭐ EDIT REASONS HERE ⭐ -->
<div class="reason-card">
    <div class="reason-icon">😊</div>
    <p>Your laugh is contagious</p>
</div>
<!-- Add more reason cards -->
```

Customize the emojis and reasons. You can add or remove cards as needed.

### Prague Prize Code

In `index.html`, find the prize section (around line 67) to customize:

```html
<div class="prize-code">PRAGUE2026</div>
```

Change `PRAGUE2026` to any secret code you want her to tell you!

You can also edit:
- The prize title: `Dinner for Two in Prague`
- The prize description
- The prize emojis: `🍽️✨🌃`

### Colors

To change the color scheme, edit CSS variables in `style.css` (line 6):

```css
:root {
    --color-primary: #8B1538;      /* Main burgundy */
    --color-secondary: #D4A5A5;    /* Rose */
    --color-accent: #FFB6C1;       /* Pink */
    --color-gold: #D4AF77;         /* Gold accents */
    --color-cream: #FFF8F0;        /* Text color */
    --color-dark: #2A1A1F;         /* Background */
}
```

## 🎮 Interactive Features

### Desktop vs Mobile Behavior

**Desktop (hover-enabled devices):**
- "No" button runs away from cursor on hover
- Smooth hover effects on all cards
- Button escapes to random positions

**Mobile (touch devices):**
- "No" button shows playful messages when tapped
- Touch-optimized interactions
- Simplified timeline layout

### Mini Game: Catch 50 Hearts! 🎯

**Objective:** Catch 50 hearts without missing any!

**Rules:**
- Hearts fall from the top - tap/click to catch them
- If ANY heart hits the ground, you have to start over
- Game gets progressively harder:
  - **0-9 hearts:** 1 heart at a time (warm-up)
  - **10-29 hearts:** 2 hearts at a time (moderate)
  - **30-50 hearts:** 3 hearts at a time (challenge!)
- Hearts have a generous click area, so you don't need to be pixel-perfect
- Larger hearts are easier to tap on mobile

**Grand Prize:**
- Reach 50 hearts to unlock a special surprise!
- A romantic "Dinner for Two in Prague" gift voucher appears
- Complete with a secret code: **PRAGUE2026**
- She'll need to tell you this code to prove she won! 🎁

### Easter Egg

Click the "You Said Yes! 💖" title **3 times** to reveal a secret message.

## 🎨 Design Details

- **Fonts**: Playfair Display (headers) + Cormorant Garamond (body)
- **Animations**: CSS-based for performance
- **Background**: Procedurally generated twinkling stars
- **Effects**: Fireworks, floating hearts, smooth transitions

## 📱 Browser Compatibility

Works on:
- Chrome, Firefox, Safari, Edge (latest versions)
- iOS Safari
- Android Chrome
- Desktop and mobile devices

## 💡 Tips

1. **Test on mobile** before sharing - the experience is optimized for phones
2. **Keep message concise** - 3-4 sentences works best
3. **Personalize the timeline** with real dates/events
4. **Share the link directly** - it works immediately after GitHub Pages deployment

## ❤️ Made with Love

Built with vanilla HTML, CSS, and JavaScript for a lightweight, romantic experience.

---

**Happy Valentine's Day! 💕**
