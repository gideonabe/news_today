# ![NewsToday Banner](https://newstoday-nu.vercel.app/newsdesktop.png)

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
![Desktop Screenshot](https://newstoday-nu.vercel.app/newsdesktop.png)

### Tablet/iPad
![Tablet Screenshot](https://newstoday-nu.vercel.app/newstablet.png)

### Mobile
![Mobile Screenshot](https://newstoday-nu.vercel.app/newsmobile.jpeg)

---

## Technologies Used

<p>
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  </a>
  <a href="https://reactjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  </a>
  <a href="https://redux.js.org/" target="_blank">
    <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  </a>
  <a href="https://lucide.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Lucide_Icons-000000?style=for-the-badge&logo=lucide&logoColor=white" />
  </a>
  <a href="https://vercel.com/" target="_blank">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>


---

## Installation

1. Clone the repository:

      git clone https://github.com/gideonabe/news_today.git


2. Navigate into the project directory

     cd news_today

3. Install dependicies

npm install 
yarn install

4. Run the development server

npm run dev
yarn dev

5. Open http://localhost:3000 in your browser.


---


## Usage

- Toggle Theme: Click the Moon/Sun icon to switch between light and dark mode.

- Search: Use the search input to filter news (currently static placeholder).

- Navigation: Click menu items to navigate categories (can be linked to pages or APIs).

- Hamburger Menu: On mobile and tablet, click the hamburger to open the navigation menu overlay.

---

## Contributing

Contributions are welcome!

- Fork the repository

- Create a new branch: git checkout -b feature-name

- Make your changes and commit: git commit -m "Add new feature"

- Push to your branch: git push origin feature-name

- Open a Pull Request


---


## License

This project is licensed under the MIT License.