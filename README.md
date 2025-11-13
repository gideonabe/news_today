# ![NewsToday Banner](https://newstoday-nu.vercel.app/newstoday.png)

# NewsToday

NewsToday is a modern, responsive news website built with **Next.js 13**, **React**, and **Tailwind CSS**. It features a dynamic navbar, dark/light mode toggle, mobile-friendly design, and a clean, user-friendly interface for browsing news across multiple categories.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Fully **responsive design** (mobile, tablet, desktop)
- Dark and light theme toggle
- Dynamic navigation bar with:
  - Logo
  - Search bar (centered on tablet/iPad)
  - Notifications
  - Profile avatar
  - Hamburger menu for mobile and tablet
- Multi-category navigation: Top Stories, World, Politics, Business, Tech, Culture
- Hamburger menu overlays content (does not push it down)
- Smooth animations for opening/closing menus
- **LocalStorage** theme persistence

---

## Demo

You can check the live demo here: [https://newstoday-nu.vercel.app/](https://newstoday-nu.vercel.app/)

---

## Screenshots

### Desktop
![Desktop Screenshot](https://newstoday-nu.vercel.app/newstoday.png)

### Tablet/iPad
![Tablet Screenshot](https://your-image-link.com/tablet.png)

### Mobile
![Mobile Screenshot](https://your-image-link.com/mobile.png)

---

## Technologies Used

- [Next.js 13](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/) (deployment)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/newstoday.git


2. Navigate into the project directory

cd news_today

3. Install dependicies

npm install 
# or
yarn install

4. Run the development server

npm run dev
# or 
yarn dev

5. Open http://localhost:3000 in your browser.


Usage

Toggle Theme: Click the Moon/Sun icon to switch between light and dark mode.

Search: Use the search input to filter news (currently static placeholder).

Navigation: Click menu items to navigate categories (can be linked to pages or APIs).

Hamburger Menu: On mobile and tablet, click the hamburger to open the navigation menu overlay.


## Folder Structure
newstoday/
│
├─ app/
│   ├─ page.tsx
│   ├─ layout.tsx
│   └─ components/
│       └─ Navbar.tsx
├─ public/
│   └─ images/
├─ styles/
│   └─ globals.css
├─ package.json
└─ README.md


Contributing

Contributions are welcome!

Fork the repository

Create a new branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Add new feature"

Push to your branch: git push origin feature-name

Open a Pull Request


License

This project is licensed under the MIT License.
