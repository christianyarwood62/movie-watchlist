# Movie Watchlist App

A React-based movie watchlist application built to demonstrate state management using Redux Toolkit, UI-driven filtering, and clean separation of concerns. The app mirrors real-world product functionality such as browsing, searching, tracking watch status, and rating content. This project can be displayed by running the following in the terminal:

```
npm install
npm run dev
```

## Project Goals

- Demonstrate scalable global state management using Redux Toolkit
- Build a clear UI flow across multiple pages using client-side routing
- Model complex UI state such as watch status, filtering, and ratings
- Create a clean, minimal interface focused on usability

## Tech Stack

- **React** – Component-based UI development
- **Redux Toolkit** – Global UI state management (movies, watchlist, filters, ratings)
- **React Redux** – State binding between Redux store and components
- **React Router (BrowserRouter)** – Client-side routing between pages
- **Styled Components** – Component-scoped styling using the **_styled-components_** npm package
- **JavaScript (ES6+)**

## Core Features

1. Movie Browsing & Search

- Browse a predefined list of movies, that is fetched from an external movie API
- Search functionality to filter movies by title
- Each movie displays key metadata including:
  - Runtime
  - Release year
  - IMDb rating
  - Poster image

2. Watchlist Management

- Add movies to a personal “To Watch” list
- Dedicated Watchlist page showing selected movies
- Ability to remove movies from the watchlist

3. Watch Status & Filtering

- Toggle movies between watched and unwatched states
- Filter watchlist to show:
  - All movies
  - Watched movies
  - Unwatched movies

4. Login system

- Users are able to sign up and log into their own accounts which will display their watchlist which is stored in redux toolkit memory

### Future features

4. Movie Rating

- Users can rate movies directly from the watchlist
- Rating a movie automatically marks it as watched
- Demonstrates derived state and Redux reducer logic

## Pages

- **Movie List** - Browse and search available movies
- **Watch List** - Manage watched/unwatched movies and ratings

## Design decisions

- Dark-themed UI to match modern streaming platforms
- Muted grey typography for readability and focus
- Top navigation bar with clear access to both pages
- Grid layout for movie browsing with large poster imagery
- List layout for watchlist

## Key Learnings

This project demonstrates my ability to:

- Design and implement Redux state slices and reducers
- Manage derived and conditional UI state
- Structure an SPA page application with multiple page components
- Make UI and UX decisions without relying on UI libraries
