# Battleship Game: Play Against the Computer

## This project is a Battleship Game built with a React.js frontend and a Node.js/Express backend. The player competes against the computer, guessing where the computer's ships are hidden on a 10x10 grid.

# How to run

git clone https://github.com/aivmic/battleship_game.git

cd battleship_game

## Backend Setup

cd backend

Install dependencies:

npm install

Start the backend server:

npm start

## Frontend Setup

cd frontend

Install dependencies:

npm install

Start the frontend development server:

npm start


# Features
Dynamic Gameplay:

    Automatically generates a game board with ships of varying sizes placed randomly.
    Real-time feedback for hits, misses, and sunk ships.

Frontend:

    Built with React.js.
    Displays the game grid, tracks shots, and shows remaining ships and shots.
    Includes modals for notifications (e.g., when a ship is sunk or the game ends).
    Modern and responsive design.

Backend:

    Developed with Node.js and Express.
    Handles multiple players by maintaining independent game states for each session.
    Validates all game actions, including shots and game states.

Real-Time Updates:

    The grid updates dynamically with each shot, displaying hits, misses and untouched cells.

