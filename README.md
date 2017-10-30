# Voting_app
A powerful voting website supporting users to create polls and vote for options, users can manage their own polls<br/>
<p align="center" margin-bottom="0">
  <a href="http://www.hnclone.win" target="_blank">
    <img alt="Voting App Clone Demo" width="auto" height="auto" src="https://github.com/xiaoluo2017/Voting_app/blob/master/images/Capture.PNG">
  </a>
</p>
<p align="center">
  <a href="https://shielded-fortress-87400.herokuapp.com/">Live Demo</a>
</p>

## Getting Started
* Clone Repo 
```
git clone https://github.com/xiaoluo2017/Voting_app.git
```
* Set the database_url in ```./route/config.js```
* Install dependencies for the back-end 
```
cd Voting_app && npm install
```
* Run the back-end 
```
PORT=3001 node bin/www
```
In Windows: 
```
set PORT=3001 && node bin/www
```
* Install dependencies for the font-end 
```
cd client && npm install
```
* Run the front-end 
```
npm start
```
* open your browser and go to localhost:3000

## Desciption
As a visitor, you can:
* See everyone's polls on the home page
* By clicking on the specific poll, see the options and results in chart form of this poll 

As a login user, in addition to the above, you also can:
* Create a poll with any number of possible items
* Vote on everyone's polls, if there is no matching option, you can add a custom one. And for each poll, you're allowed to vote only  once
* Browse all of your history polls
* Delete your poll

## Demo
A demonstration of this app can be seen [running on heroku](https://shielded-fortress-87400.herokuapp.com/)

## Built With
* [React](https://facebook.github.io/react/) - a Javascript Library for Building User Interfaces
* [Redux](http://redux.js.org/) - State Management
* [Node](https://nodejs.org) - a Javascript Runtime
* [Express.js](http://expressjs.com) - The Web Framework
* [Mongodb](http://mongodb.github.io/node-mongodb-native/2.0/) - Database
* [Recharts](http://recharts.org/#/zh-CN/guide) - React Chart Library
* [react-bootstrap](https://react-bootstrap.github.io/) - Bootstrap rebuilt for React
* [react-router-v4](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf) - Front-end Router

## Reference
This project was built with [Create React App](https://github.com/facebookincubator/create-react-app) and [Express Backend](https://daveceddia.com/create-react-app-express-backend/)</br>
