# Lottery

## Description

**Lottery** is an online betting application (like Loto in France).

Bets are available for a **limited** time and users can choose up to **5 numbers** from a grid ranging from 1 to 20. At the end of the betting time.

Users can **claim their prize** with a **multiplier** according to the number of numbers corresponding to those of the bet (randomly chosen during creation)

multipliers -> good numbers: 1 -> 5; 0.8 -> 4; 0.6 -> 3 ; 0.4 -> 2; 0.2 -> 1; 0 -> 0

## Stack

### Frontend
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra-UI](https://chakra-ui.com/)

### Backend
- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/)
- [Express](https://www.expressjs.com/)
- [Firebase](https://firebase.google.com/)

### Database
- [Firestore](https://firebase.google.com/docs/firestore/)

### Tasks queue
I use cron job to create 1 new game every day at 9:00 AM and execute games every hour.

## Installation

To use lottery at home, please follow the instructions bellow at the root of the project

### Frontend

```bash
cd lottery_app/
yarn install
# -> Setup .env file on your side using .env.example file
# -> Setup res/firebase-config.json on your side using res/firebase-config.json.example file
# -> Setup res/lottery-server.json on your side using res/lottery-server.json.example file
yarn start
```

### Backend

```bash
cd lottery_server/
yarn install
# -> Setup .env file on your side using .env.example file
# -> Setup res/firebase-config.json on your side using res/firebase-config.json.example file
# -> Setup res/lottery-server.json on your side using res/lottery-server.json.example file
yarn dev
```

### Tasks queue
Cron jobs:
 - src/tasks/newGame.ts: Every day at 9:00 AM
 - src/tasks/execGame.ts: Every hour

## Backend routes

|Route|Method|Protected|Description|
|-----|------|---------|-----------|
|`/auth`|POST|NO|Register or login user|
|||||
|||||
|`/user`|GET|YES|Get user profile|
|`/user`|DELETE|YES|Delete user|
|`/user`|PUT|YES|Update user|
|`/user/getGames`|GET|YES|Get all games played by a user filtered by game creation date|
|||||
|||||
|`/game/getAll`|GET|YES|Get all available games|
|`/game/new/:gameId`|POST|YES|Participate to a game|
|`/game/claim/:gridId`|POST|YES|Claim prize for an old grid|

### Tasks
`execGame` -> Execute game

`newGame` -> Create a new game

## Frontend screens

[-> Go to frontend Readme](https://github.com/ZerLock/lottery/tree/main/lottery_app)

## Mainteners

- [Léo Dubosclard](https://linkedin.com/in/leo-dubosclard/)
