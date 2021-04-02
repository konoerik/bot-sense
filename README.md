# bot-sense
Twitter bot detection project for KSU SWE7903

## Project Structure
The project utilizes docker images to separate the services

* bot-ui (front-end)
* bot-int-services (integration services)
* bot-ml (machine learning)

## Local Deployment

1. CD to bot-build
2. Run the below to build the docker containers

    `docker-compose build`

3. Run the below to run the containers...

    `docker-compose up`

4. Open browser and navigato to: 

    `http://localhost:5001`

5. Click on the test screen 'find bot' button. This will make a call to other docker container to complete the ML process.
    This part is not complete yet, but running the above shows how we can run different services in different independant modules. 
