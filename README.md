# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

<img width="1319" alt="interactive card" src="https://github.com/cr1deg0/Interactive-card-details-form/assets/86016298/19bc3a07-1a27-472a-ab22-525fe7d8a047">

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages if (** changed from original challenge, where form validation took place after form sent):
  - Any input field is empty
  - The card name, number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Links

- [Solution URL](https://www.frontendmentor.io/solutions/interactive-card-details-form-YtYVSmYACk)
- [Live Site URL](https://incredible-baklava-bc3e30.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React router](https://reactrouter.com/en/main)
- [Testing Library](https://testing-library.com/docs/)

### What I learned

I've used this project to learn about react router. It's a simple routing solution, routing only between two paths for a single page application.

It's also the first time using Jest and Testing Library to validate the code. I decided to do an end to end testing of the app, verifying the flow of user interactions as well as the rendering of the main components.

As usual, particular attention has been paid to try to make the form accessible, specially with the field error messages. Instead of validating the form afer submision, I decided to provide real time validation feedback, disabling the option to submit the form until all the fields are valid.

It's been a great opportunity to revise validation with regular expressions, specially for valid credit card numbers.

### Useful resources

- [Regular-Expresions info](https://www.regular-expressions.info/creditcard.html) - This site provides regular expresions for different credit cards.
- [Accessible React Forms from Carl Rippon](https://www.carlrippon.com/accessible-react-forms/) - This is an article on accessible react forms that helped me understand how to define accessible validation messages.
- [Testing Playground](https://testing-playground.com/) - To verify testing library sugested queries

## Author

- Frontend Mentor - [@cr1deg0](https://www.frontendmentor.io/profile/cr1deg0)
