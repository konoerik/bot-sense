# bot-sense
Twitter bot detection project for KSU SWE7903

## Project Structure
The project utilizes docker images to separate the services

* bot-ui (front-end)
* bot-int-services (integration services)
* bot-ml (machine learning)

## Local Deployment with Docker

1. CD to bot-build
2. Edit the `docker-compose.yml` file to reflect your local directories
   * For Windows, make sure to include the full path and escape backslashes (e.g. `C:\\Workspace\\bot-sense\\...`)
2. Run the below to build the docker containers

    `docker-compose build`

3. Run the below to run the containers...

    `docker-compose up`

4. Open browser and navigate to: 

    `http://localhost:5001` (ML test screen)

    `http://localhost:3000` (Web landing screen)

## Local Deployment of Services

To test services individually and outside of Docker, you can simply install the requirements and run each service in its own terminal session as shown below:

1. For *bot-ml* and *bot-int-services*, install the requirements and launch the Flask app.

    ```
    cd bot-ml/int-services
    python3 -m pip install -r requirements.txt
    python3 app.py
    ```

    Check the corresponding server in `http://localhost:5000/5001`

2. For the UI portion, ensure you jave NodeJS installed and `npm` package manager

    ```
    cd bot-ui
    npm install
    npm start
    ```

    Check the front-end in `http://localhost:3000`

Having all three services running you can now use the app locally.