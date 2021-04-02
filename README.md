# bot-sense
Twitter bot detection project for KSU SWE7903

## Project Structure
The project utilizes docker images to separate the services

* bot-ui (front-end)
* bot-int-services (integration services)
* bot-ml (machine learning)

## Local Deployment

1. CD to bot-build
2. Edit the `docker-compose.yml` file to reflect your local directories
2. Run the below to build the docker containers

    `docker-compose build`

3. Run the below to run the containers...

    `docker-compose up`

4. Open browser and navigate to: 

    `http://localhost:5001` (ML test screen)

    `http://localhost:3000` (Web landing screen)
