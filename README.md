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

### Serverless Functions and GraphQL mutations

Serverless functions let you run server-side code without having to run a dedicated server.

Netlify let you code your functions in Javascript. An example of a function called hello.js would be:

```Javascript
exports.handler = async function(event, context) {
    return {
        statusCode:200,
        body: JSON.stringify ({message: "Hello World"})
    }
}
```
That's it! Your little server is ready!

In this project I used Netlify Serverless Functions to call the Strapi API for creating and updating the database.

I had to learn also how to do mutations in GraphQL:

```Javascript
const UPDATE_CONTATTO = `mutation($id: ID!, $nome: String, $cognome: String, $cellulare: String, $professione: String, $chi_cerca: String, $sponsorAmico: String, $eventi: [ID]) {
    updateContatto(
      input: {
        where: { id: $id }
        data: { nome: $nome, cognome: $cognome, cellulare:$cellulare, professione:$professione, chi_cerca:$chi_cerca, sponsorAmico:$sponsorAmico, eventi: $eventi}
      }
    ) {
      contatto {
        cognome
        nome
        email
        cellulare
        professione
        chi_cerca
        sponsorAmico
        slug
        eventi {
          id
          titolo
          data
          online_offline
          location
          location_indirizzo
          partecipanti {
            nome
            cognome
          }
        }
      }
    }

  }`;
```
### Unique slug

When someone signs up for an event, the app updates the db and generates a unique member profile page with this slug: bsdating.com/firstName-lastName

What happens if two people with same name sign up?

Because the slug is unique I had to handle this by making first a request to see if there is already a profile page with that name. If the name is taken I had to run another request to see if the new slug: bsdating.com/firstName-lastName-2 is taken. If this slug exists I had to run another call with the new slug: bsdating.com/firstName-lastName-3.

Basically I had to implement an infinite loop! Don't know if this is a standard solution.

If you have any suggestions for best practices on this point please let me know.

### Mailchimp API
When a new participant sign up to an event, the email is also added to Mailchimp. I created a serverless function which let you interact with the MailChimp API.
### Review system and Telegram API
The member can visit a profile page of another member and give him a review. As soon as the database is update Strapi send a notification to the Telegram Channel of the Community by making a post request to "https://api.telegram.org/bot". To achieve that I took advantage of the lifecycles of Strapi which let you run some code after a new entry is updated (see: api/testimonial/models/testimonials.js)

### User authentication
To implement the user authentication I used Vuex, a State Management Pattern. When you have multiple components that share a common state, passing props can be tedious for deeply nested components. Vuex let you extract the shared state out of the components and manage it in a central store. I used Vuex also for managing feedback messages from the API to the user and the review system.

JWT tokens coming from Strapi are stored in the local storage.
### Algolia
After watching this wonderful [episode of Learn with Jason](https://www.learnwithjason.dev/javascript-autocomplete), for the search functionality I wanted to implement a powerful autocomplete solution using an open source library from Algolia.
The episode is based on a React project so I had to work a bit to find a Vue 2 solution (I used the library vue-instantsearch and the plugin gridsome-plugin-algolia to update the Algolia index every time the site rebuilds).

## References
- [How to Build a Learning Platform with Strapi CMS and Gridsome](https://strapi.io/blog/how-to-build-a-learning-platform-with-strapi-cms-and-gridsome-1?utm_campaign=Strapi%20Monthly%20NL%20&utm_medium=email&_hsmi=130869349&_hsenc=p2ANqtz-9Rr3C9POPINoHuHaaJAEO_CFgp3OFJRmwshUt9unzquRqBn53YqWzEgdQO88uOPrErYd-PSExQ4gUFENHzhxgXFk0nYYgf4GiSNxVO_dNJjjVMpRc&utm_content=130869349&utm_source=hs_email)
- [Javascript Autocomplete - Algolia](https://www.learnwithjason.dev/javascript-autocomplete)
- [Mailchimp API](https://mailchimp.com/developer/marketing/guides/quick-start/)



