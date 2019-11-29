# Semantic-Trustworthy-News
CMPE 58H Course Project Repository

Building with Docker
---

Before starting the app, you need to have done following instructions
- Install Docker
- Make a directory neo4j
- Under neo4j, you need to create two other directories
    - data
    - logs
- Create .env file under root directory
- Define following variables in .env:
    - API_HOST
    - APP_SERVER_PORT

    - REACT_APP_PORT_DOCKER_IMG
    - REACT_APP_PORT

    - NEO4J_USERNAME
    - NEO4J_PASSWORD
    - NEO4J_BOLT_PORT
    - NEO4J_BROWSER_PORT

- Run the following command:
    `make build`

To start the backend and the frontend
---

1. Go to backend `cd backend` and run `npm install`
2. Go to frontend `cd ../frontend` and run `yarn install`
3. Go back `cd ..` and run `npm install`
4. Finally, run `npm start`

Both Backend API and Frontend app should be run.


Who are we?
---
1. Atakan Güney
2. Esra Önal
3. Meriç Turan