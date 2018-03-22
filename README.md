PROJECT STROM
=====================

A real-time electric vehicle charging point search app. 
Find charging points near your destination. See when one will become available. Pay for your charge and receive notifications when your charge is complete.
We ease EV drivers 'low-battery' anxiety for a seamless charging experience.

### Features
* The charging station icons indicate the location of the parkades. Their color indicates the current usage level of each parkade, with green indicating less than 50%, 50% - 75% for orange, and over 75% for red. 
* The cluster with the number on it indicates the number of parkades in that area. Upon magnification, the cluster will separate into separate parkades.
* Fully responsive, streamlined for use on mobile and desktop.
* To find chargers near your intended destination, you can search your destination into the search bar.
* The handicap sign can be toggled to view only handicapped parking spots.
* To view information about the parkade, press a charging icon to bring up the information on each parking spot
* The availability of each parking spot is indicated, with real time updates via websockets, along with the time left until each spot becomes available.
* To start a charging session, first signup by pressing the hamburger icon next to the search bar and selecting the `Sign Up` button. 
* Then, press the `Start Session` button on the bottom of the screen, then enter the number of the charger you wish to use.
* Once you have started a session, you will receive SMS notifications; one when there are five minutes left in your session, and another when your session is complete. (For demonstration purposes, Strom is currently set up to send SMS messages 15 and 20 seconds after starting a session.)
* Now that your charging session has begun, you can see the charge on your vehicle and the time left in your session by pressing the hamburger icon next to the search bar.

### Installation

Go into your console and clone the repo and install dependencies:
```
git clone git@github.com:cgrowntree/strom_browser.git strom_browser
npm i

```

Leave the directory and create a new folder for the Strom server, and install the dependencies:

```
git clone git@github.com:philosophiaAbendrot/strom_server.git strom_server
cd strom_server
npm i
```

Strom server uses PostgreSQL database. Make sure that you have Postgres installed on your system, and that you have created a user and database using the Postgres console. Also, Strom uses Twilio to send text notifications. To enable this, sign up for a Twilio account and register a Twilio number. 

Within the strom_server folder, copy the .env_example file and rename it '.env'.
Go into the .env file and fill in the fields, in the following format, and save:

```
DB_USER=<database_user_name>
DB_PASS=<database_user_password>
DB_NAME=<database name>
DB_PORT=5432
DB_SSL=true
TWILIO_SID=<your_twilio_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_NUMBER=<your_twilio_number>
```
Next, setup the databases by typing the following commands:
```
knex migrate:latest
knex seed:run
```

Now you are ready to use Strom.

### Usage

Start the server by navigating into the server directory and typing `npm start` into your terminal.
Next, start the client side app: Leave the server running and navigate to the Strom browser directory in another terminal window. Then, start the client server by typing `npm start`.

Then, you can open a browser, and navigate to http://localhost:3000 to use the app.


### Future Features
* Charger registration UI for users who want to register chargers
* User GPS location tracking, autofocus map on the user's location
* Provide driving directions for users to the charging spot

### Dependencies
"babel-core": "^6.26.0"
"babel-loader": "^7.1.4"
"babel-preset-es2015": "^6.24.1"
"babel-preset-react": "^6.24.1"
"babel-preset-stage-0": "^6.24.1"
"css-loader": "^0.28.10"
"eslint": "^4.18.2"
"eslint-plugin-react": "^7.7.0"
"file-loader": "^1.1.11"
"material-ui": "^0.20.0"
"moment": "^2.21.0"
"node-sass": "^4.8.1"
"react": "^15.6.1"
"react-dom": "^15.6.1"
"react-google-maps": "^9.4.5"
"react-icons": "^2.2.7"
"react-moment": "^0.7.0"
"react-router-dom": "^4.2.2"
"react-scripts": "^1.1.1"
"recompose": "^0.26.0"
"sass-loader": "^6.0.7"
"sockjs-client": "^1.1.2"
"style-loader": "^0.20.3"
"url-loader": "^1.0.1"
"webpack": "^4.1.1"
"webpack-dev-server": "^3.1.1"