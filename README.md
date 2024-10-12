# Cine Seekers

Cine Seekers is a frontend web project that allows users to explore a wide range of movies. The app integrates with a movie API from https://www.themoviedb.org/, and leverages Vue.js for building dynamic and responsive user interfaces. Users can view information about individual films and enjoy a fluid user experience across devices (user experience on tablets cannot be guranteed).

View it live at https://cine.weewillow.com or continue with installation below.

## Installation
To run this project locally:
1. Clone the repository:
  ```bash
  git clone https://github.com/WeeWillow/cine-seekers_code-challenge.git
```
2. Navigate to the project folder:
  ```bash
cd cine-seekers_code-challenge
```
3. Enable API Bearer token:
  ```bash
Create a '.env.local' file in the root directory.
```
4. Add your API token to '.env.local': 
  ```bash
If you don't have a token, you can find a guide here: https://developer.themoviedb.org/docs/getting-started
```
*NOTE: This step is crucial for the function of the API. You will find a '.env.example' file among the project files to get you started.*
  ```bash
VITE_BEARER_TOKEN = your_token_here
```

5. Install dependencies -
Using Node package manager (npm):
  ```bash
npm i
```
6. Run the development server:
  ```bash
  npm run dev
```

## Usage

Once the development server is running, you can access the application by navigating to http://localhost:[port-number] where [port-number] will be shown in the terminal when the server starts. The homepage allows you to explore a selection of films, and each film detail page provides more in-depth information.

To build the project for production, use:
```bash
npm run build
```

## Features

- API integration with The Movie Database (TMDB)
- Responsive design for desktop and mobile views
- Detailed film information, including cover images, titles, taglines and genres
- Simple, fun and intuitive user interface

## Technologies Used

- Vue.js (for building the frontend)
- Vite (for bundling)
- TMDB API (for fetching movie data)
- CSS (for styling and responsive design)