## Overview
The RPS Survey Platform is a web application built to address the needs of researchers in conducting surveys and collecting data from participants. It provides a user-friendly interface for researchers to create surveys, analyze results, and manage participants. Additionally, participants can access the platform to take surveys and contribute data. Below, you'll find information about the project, including its architecture, database schema, and usage flow. 
> Note: This project was built for the Applied Behavioral Science Lab at KU to conduct the generalized matching law research.

## Features
- Survey Creation: Researchers can create and customize surveys according to their research needs.
- Participant Management: Researchers can manage participants, including creation and deletion.
- Role-Based Authentication: Implemented role-based authentication to provide different access levels for researchers and participants.
- Data Collection: Utilized local storage and periodic batch data saving to ensure smooth data collection.
- Data Analysis: Provides a view in Postgres to export as a CSV and perform data analysis.

## Database Schema
Below is the schema of the PostgreSQL database used in the project:

<img width="928" alt="Screen Shot 2024-03-08 at 12 34 14 PM" src="https://github.com/bhavik-goplani/RPS-Survey/assets/56516858/981ff35f-60bb-4d12-ae09-3c053d815a34">


## Flow of the Research Platform
1. Requirements Gathering: Identified three main challenges - data integrity, participant user experience, and enabling participant access to the platform.
2. Database Modeling: Utilized data normalization techniques to ensure data integrity, scalability, and simplified querying process.
3. Role-Based Authentication: The platform implements role-based authentication with two roles: researcher and participant. This is managed in the auth schema of PostgreSQL, with two functions for creating and deleting participants. This gives role-based access to the API endpoints and database tables, ensuring that participants can access the platform to take part in surveys.
4. Researcher point of view: Created a user-friendly dashboard for researchers to create surveys and links for participants.
5. Participant point of view: Participants get an email with credentials to log in and participate in the survey. Data gets saved in local storage and is periodically sent in batches to the database even in the event of browser closure or interruptions.
6. Deployment: The project is built using Next.js & Supabase and hosted using Vercel at [RPS Survey App](https://rps-survey.info)

## Technologies Used
- Next.js
- PostgreSQL
- Supabase
- React 
- Typescript
- HTML/CSS
