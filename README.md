<br />

<div align="center">
  <a href="https://github.com/nirmaljoji/c-lab-bot">
  </a>
  <h3 align="center">NCSU Arts and Crafts Center Chatbot</h3>
  <p align="center">
    🎨 Your Go-To Assistant for All Things Arts and Crafts at NCSU! 🎨
    <br />
    <a href="https://github.com/nirmaljoji/c-lab-bot"><strong>Explore the API docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/nirmaljoji/c-lab-bot">Report Bug</a>
    ·
    <a href="https://github.com/nirmaljoji/c-lab-bot/issues/new">Request Feature</a>
  </p>
</div>
<br>
<br>
<br>



## **🎨 NCSU Arts and Crafts Center Chatbot 🎨**
 
Welcome to our chatbot project, your one-stop solution for all queries related to the NCSU Arts and Crafts Center! This chatbot is designed to assist with membership pricing, equipment usage guides, item locations, and more.

- **Membership Pricing:** Get instant answers about different membership tiers and their costs.
- **Equipment Usage Guide:** Learn how to use various equipment available at the center.
- **Location of Items:** Find out where specific items are located within the center.
- **Event Information:** Stay updated with the latest events and workshops happening at the center.

## Table of Contents  

- [Why Choose This Chatbot!](#why-choose-this-chatbot)
- [Walkthrough](#walkthrough)
- [Project Techstack](#project-techstack)
- [Technical Overview](#technical-overview)
- [Getting started](#getting-started)

## **🧵 Why Choose This Chatbot!**

- **Efficient Query Handling:** Provides quick and accurate answers to common questions.
- **User-Friendly Interface:** Easy to interact with, ensuring a smooth user experience.
- **Data Security:** Ensures all user data is kept private and secure.

In today's fast-paced environment, having immediate access to accurate information is crucial. This chatbot helps streamline information retrieval, enhancing your experience at the NCSU Arts and Crafts Center.

## Screenshots

- Application
<img width='600' src="https://github.com/nirmaljoji/c-lab-bot/assets/40449660/3a160e61-adc4-418c-ab70-7ff235a8c789">

- Supabase pg vectos
<img width='600' src="https://github.com/nirmaljoji/c-lab-bot/assets/40449660/45963692-4072-41b4-8837-f73b8762274e">

- Postman process PDFs endpoint
<img width='600' src="https://github.com/nirmaljoji/c-lab-bot/assets/40449660/7df9921c-5c9b-42ca-b760-eb131c2d2a9d">


## Project TechStack

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original-wordmark.svg" alt="nextjs" width="20" height="20">Next.js</br>
<img src="https://cdn.jsdelivr.net/gh/supabase/supabase@main/web/static/supabase-logo-dark.png" alt="supabase" width="20" height="20"/> Supabase </br>
<img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="javascript" width="20" height="20"/> JavaScript </br>
<img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="python" width="20" height="20"/> Python </br>

## Technical Overview

This project utilizes a modern tech stack to ensure reliability and scalability:

- **Next.js:** For building the user interface and handling server-side rendering.
- **Supabase:** Provides the database and authentication services.
- **Langchain and OpenAI:** For the natural language processing and response generation.
- **Supabase Edge Functions:** To handle backend logic and API requests.

## Getting Started

Follow these steps to set up and run the chatbot on your local machine.

### Requirements:
* [Node.js](https://nodejs.org/en/) (recommended >= 14.x)
* [Supabase CLI](https://supabase.io/docs/guides/cli)
* [Docker](https://www.docker.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nirmaljoji/c-lab-bot.git
   ```
2. Run
   ```sh
   npm run dev
   npx supabase functions serve browser-with-cors --no-verify-jwt
   ```
3. Use localhost to interact with the application
