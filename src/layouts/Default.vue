<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">Home</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/eventi/">Eventi</g-link>
        <g-link class="nav__link" to="/programma/">In programma</g-link>
      </nav>
    </header>
    <slot />
    <footer class="footer">
      <h2>Chi sono gli organizzatori</h2>
      <div class="host-bio">
        <div class="photo">
          <g-image
            class="round"
            src="~/assets/images/maurizio-mancini.jpg"
            alt=""
          ></g-image>
        </div>
        <div class="host-details">
          <p>
            <strong>Maurizio Mancini</strong> è un consulente immobiliare Remax
          </p>
          <div class="host-links">
            <a href="https://www.youtube.com/channel/UCAWp8eukTvsEimrcZTfiztw"
              >Seguimi su YouTube
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-youtube"
              >
                <path
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                ></path>
                <polygon
                  points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                ></polygon></svg
            ></a>
          </div>
        </div>
      </div>
      <div class="host-bio">
        <div class="photo">
          <g-image
            class="round"
            src="~/assets/images/stefano-frontini.png"
            alt=""
          ></g-image>
        </div>
        <div class="host-details">
          <p>
            <strong>Stefano Frontini</strong> è un consulente energetico Repower
            e Utility Manager certificato.
          </p>
          <a class="sito" href="https://www.pilloledienergia.com/"
            >www.pilloledienergia.com</a
          >
          <div class="host-links">
            <a href="https://www.youtube.com/channel/UCR-O1aNnCvdtANr8Yf7h_RQ"
              >Seguimi su YouTube
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-youtube"
              >
                <path
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                ></path>
                <polygon
                  points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                ></polygon></svg
            ></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --primary: #ddd;
  --dark: #333;
  --light: #fff;
  --text: #403c4a;
  --shadow: 0 1px 5px rgba(104, 104, 104, 0.8);
  --text-emphasized: #201d29;
  --white: #fff;
  --gray-medium: #b1acb9;
  --pink: #ff87d4;
  --yellow: #ffe742;
  --blue: #87fffb;
  --text-muted: #78757f;
  --pink-dark: #c10b7e;
  --black: #171321;
  --gradient: linear-gradient(
    2deg,
    var(--pink) 0%,
    var(--yellow) 50%,
    var(--blue) 100%
  );
}

html,
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.45;
  box-sizing: border-box;
  color: var(--dark);
}

*,
:after,
:before {
  box-sizing: border-box;
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
}

/* .layout {
  max-width: 760px;
  margin: 0 auto;
   padding-left: 20px;
  padding-right: 20px;
} */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: calc(0.25rem + 9px);
  padding-top: 0.25rem;
  border-bottom: 1px solid var(--text);
  overflow: hidden;
  position: relative;
  background: var(--black);
  /* padding-left: 2rem;
  padding-right: 2rem; */
}

.header:after {
  background: var(--gradient);
  bottom: 0;
  content: "";
  height: 9px;
  left: 0;
  position: absolute;
  width: 100%;
}

.nav {
  gap: 0rem;
  align-items: center;
  display: flex;
}

.header a {
  color: var(--white);
  display: block;
  line-height: 1;
  font-weight: 900;
  padding: 1rem;
}

a {
  text-decoration: none;
}

.footer {
  align-items: center;
  background: var(--black);
  display: flex;
  flex-direction: column;
  padding: 2rem 5vw 2rem;
  position: relative;
  gap: 1rem;
}

.footer:after {
  background: var(--gradient);
  top: 0;
  content: "";
  height: 9px;
  left: 0;
  position: absolute;
  width: 100%;
}

.footer h2 {
  color: var(--white);
}

.photo {
  width: 150px;
  height: 150px;
  background: var(--gradient);
  padding: 3px;
  border-radius: 50%;
  margin: 0 auto;
}

.round {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.host-links {
  gap: 1.5rem;
  color: var(--pink);
  display: flex;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  justify-content: center;
}

.host-links a {
  gap: 0.5rem;
  align-items: center;
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  font-size: 0.725rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.sito {
  color: var(--grey-medium);
}

.host-bio {
  color: var(--gray-medium);
  display: block;
  max-width: 510px;
  width: 90vw;
}

.host-details {
  text-align: center;
}
@media (min-width: 650px) {
  .host-bio {
    gap: 2.5rem;
    align-items: center;
    display: grid;
    grid-template-columns: min(160px, 25%) min(340px, 70%);
    color: var(--gray-medium);
    max-width: 510px;
    width: 90vw;
  }
  .host-links {
    justify-content: flex-start;
  }
  .host-details {
    text-align: left;
  }
  .nav {
    gap: 2rem;
  }
  .header {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
