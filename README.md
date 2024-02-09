# Money Tracker

Welcome to Money Tracker, your financial productivity companion!

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [License](#license)

## Overview

Unleash the power of financial control with our intuitive Money Tracker. Seamlessly manage income and expenses, set personalized goals, and witness your financial dreams come to life. Experience the freedom of informed financial choices and shape a brighter, more prosperous future.

## Features

- **Track Amount :** Know the sum total of expenses and income, and the balance.
- **Records :** Keep track of your income and expenses with detailed records.
- **Visualization :** Explore your financial history effortlessly through insightful charts.

## Project Structure
<pre>
  money-tracker/
  ┣ backend/
    ┣ controllers/
      ┗ moneyTrackerController.js
    ┣ models/
      ┗ MoneyTrackerModel.js
    ┣ routes/
      ┗ moneyTracker.js
    ┣ .env
    ┣ package-lock.json
    ┣ package.json
    ┗ server.js
  ┗ frontend/
    ┣ public/
    ┣ src/
      ┣ assets/
        ┗ no-graph.mp4
      ┣ components/
        ┣ ChartComponent.jsx
        ┣ Navbar.jsx
        ┣ RecordDetails.jsx
        ┣ RecordForm.jsx
        ┣ ScrollToTopButton.jsx
        ┗ Statistic.jsx
      ┣ context/
        ┗ RecordContext.jsx
      ┣ data/
        ┗ testData.js
      ┣ hooks/
        ┗ useRecordContext.js
      ┣ pages/
        ┗ Home.jsx
      ┣ App.jsx
      ┣ index.css
      ┗ main.jsx
    ┣ index.html
    ┣ package-lock.json
    ┣ package.json
    ┗ README.md
</pre>

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    cd frontend
    npm install
    ```

3. Start the application:

    ```bash
    # Start the frontend
    cd frontend
    npm run dev

    # Start the backend
    cd backend
    npm start
    ```

4. Open your browser and visit [http://localhost:8000](http://localhost:8000) to access Money Tracker.

## Dependencies

- **Express:** Fast and minimalist web framework for Node.js.
- **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
- **Cors:** Middleware for enabling Cross-Origin Resource Sharing.
- **Nodemon:** Utility for automatically restarting the server during development.
- **React ChartJS 2:** React wrapper for Chart.js to create interactive charts.
- **React Icons:** A set of customizable icons for React projects.
- **Vite:** Next-generation frontend tooling.

## License

This project does not currently have a specific open-source license. All rights are reserved.
