# ![image](https://github.com/user-attachments/assets/aeb5fd35-ee65-47b5-9072-813ab4df153d)

## Battleship Game built with a React.js frontend and a Node.js backend. The player competes against the computer, guessing where the computer's ships are hidden on a 10x10 grid.

### Ship Sizes

    1 ship of size 5: Occupies 5 cells (the largest ship).
    1 ship of size 4: Occupies 4 cells.
    2 ships of size 3: Each occupies 3 cells.
    3 ships of size 2: Each occupies 2 cells.
    3 ships of size 1: Each occupies 1 cell (the smallest ships).

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

# Images of game

![image](https://github.com/user-attachments/assets/debb2972-25f9-47c6-8d4b-f2738986437c)

![image](https://github.com/user-attachments/assets/35b95732-8302-4e90-ae94-cf78d0d47fc8)




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

