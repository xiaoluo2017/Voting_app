# Voting_app
A powerful voting website supporting users to create polls and vote for options, users can manage their own polls

## Usage
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

## Features
As a visitor, you can:
* See everyone's polls on the home page
* By clicking on the specific poll, see the options and results in chart form of this poll 

As a log in user, in addition to the above, you also can:
* Create a poll with any number of possible items
* Vote on everyone's polls, if there is no matching option, you can add a custom one. And for each poll, you're only allowed to vote once
* Browse all your history polls
* Delete your poll

## Screenshot
* Home page
<img src="https://github.com/xiaoluo2017/Voting_app/blob/master/images/home.PNG">

* mypolls page
<img src="https://github.com/xiaoluo2017/Voting_app/blob/master/images/myPolls.PNG">

* newPoll page
<img src="https://github.com/xiaoluo2017/Voting_app/blob/master/images/newPoll.PNG">

* vote page
<img src="https://github.com/xiaoluo2017/Voting_app/blob/master/images/poll.PNG">

## Reference
This project was built with [Create React App](https://github.com/facebookincubator/create-react-app) and [Express Backend](https://daveceddia.com/create-react-app-express-backend/)</br>
I also use [Recharts](http://recharts.org/#/zh-CN/guide) to build charts, [React Router v4](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf) to help Choosing router and creating routes
