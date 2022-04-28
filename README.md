# Business Speed Dating

Business Speed Dating is a community created to connect professionals and entrepreneurs.

The app allows the Business Speed Dating organizers to promote events, manage participant registrations and access a database of all participants/members.

## The challenge
- Participants should be able to register for the event.
- Participants should be able to receive a confirmation email.
- Organizers should be able to receive an email notification when someone signs up for the event.
- The site should show the record of past events and the calendar of upcoming events
- Participants should be able to register and become members.
- Community members should have their own profile page.
- Community members should be able to login and:
  - download the list of past event participants;
  -  do research to find other participants by name and / or profession;
  -  give reviews to other members;
  -  change their profile data.
- When someone gives a review to another member an automatic notification should be sent to the telegram channel.
- All participant and event data should be stored in a database.
- Organizers should be able to access the database via a graphical interface.
- Organizers should be autonomous in uploading a new event on the site.

## Links
[https://www.bsdating.com/](https://www.bsdating.com/).

## Setup

```bash
# Clone the following repository - frontend
$ git clone https://github.com/StefanoFrontini/bsp

# Go into the repository
$ cd bsp

# Install Gridsome CLI
$ npm install --global @gridsome/cli

# Install dependencies
$ npm install

# Run the frontend
$ gridsome develop
```

## Built with
### Frontend
- HTML
- Javascript
- CSS Flexbox and Grid
- Vue 2
- Vuex
- Gridsome (Static Site Generator)
- GraphQL
- Nodemailer
- Algolia
- Deployed on Netlify

### Backend
- Strapi v3 (Headless CMS)
- Netlify Serverless functions
- Cloudinary
- Deployed on Heroku

## What I learned

### GraphQL queries to update the DB
### Give feedback to users
### Serverless functions
### Mailchimp API
### Telegram API
### User authentication
### Review system
### Algolia

