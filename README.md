# Semantic-Trustworthy-News
CMPE 58H Course Project Repository

Who are we?
---
1. Atakan Güney
2. Esra Önal
3. Meriç Turan

Building with Docker
---

Before starting the app, you need to have done following instructions
- Install Docker
- To set graphdb:
    - Create two folders named 'data' and 'logs' under 'graphdb-docker'
    - Put the free edition of graphdb .zip file under 'graphdb-docker/free-edition'

- Create .env file under root directory
- Define following variables in .env:
    - API_HOST
    - API_PORT

    - REACT_APP_PORT_DOCKER_IMG
    - REACT_APP_PORT

- Run the following command:
    `make build`
    
- Before fetching any news, do not forget to create a repository named as **STN** in working branch of GraphDB. Otherwise, database actions won't work.

- Our ontology is under directory `neo4j/ontology/trustworthy-news.ttl`. Please import this file into **STN** repository on GraphDB.

- Occasionally, you may need to run the following command to clear the cache `docker-compose down -v`, and build the project from scratch. This is sometimes required due to the newly added modules.
