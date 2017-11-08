# Sserpdrow-UI
About: The Sserpdrow UI is used for managing blogs and pages.  Data is stored within a NoSQL database.

## Links
Client UI: https://mind-blowing-desert-bandits.github.io/sserpdrow-client/
Client UI Repo: https://github.com/Mind-Blowing-Desert-Bandits/sserpdrow-client
API Repo: https://github.com/Mind-Blowing-Desert-Bandits/sserpdrow-api
API Endpoint: https://sserpdrow-mbdb-api.herokuapp.com/

## Technologies Used
HTML5; JQUERY; Javascript;

## Unsolved Problems
Use of an npm plugin for text editing
Reformatting of dates returned from the database
General UI and user flow


## Planning, Process, and Problem Solving Strategy
We originally had some issues with understanding what our Prompt was asking for us to create.  To address this, we whiteboarded a high level flow or what the user experience would be for the UI.  On the backend, we whiteboarded what we expected the corresponded BSON would look like.  After that was done, we gave each other assignments to tackle during the weekend.  We all created user stories, and discussed them on Monday.  After that was done, we split into teams of two to focus on specific application features.

We worked out a daily workflow for the team. We first met together for a brief stand-up meeting in the morning to address the main features we would work on during the day and then met up periodically during the day to provide updates on how the features were progressing and also to brainstorm if we hit any snags that involved the whole team. This enabled us to problem solve effectively

The largest challenge was visualizing the user experience given the need to create multiple pages for each user as well as blog posts. We addressed this issue by creating a sites collection that consisted of a site id, title, date, a blogposts array consisiting of blog objects, and a pages array consisting of user pages.

## Link to wireframes and user stories
User Stories
1. As a visitor I want to be able to sign up for Sserpdrow
2. As a visitor, I want to be able to view all pages on Sserpdrow
3. As a visitor, I want to be able to read blog posts on the page I am accessing on Sserpdrow
4. As a user, I want to be able sign in to Sserpdrow
5. As a user, I want to be able to sign out of Sserpdrow
6. As a user, I want to be able to change my password
7. As a user, I want to be able to create a page on Sserpdrow
8. As a user, I want to be able to create the title of my page on Sserpdrow
9. As a user, I want to be able to create a description for my page on Sserpdrow
10. As a user, I want to be able to edit the title of my page on Sserpdrow
11. As a user, I want to be able to edit the description for my page on Sserpdrow
12. As a user, I want to be able to create a blog post on my page
13. As a user, I want to be able to edit a blog post on my page
14. As a user, I want to be able to delete a blog post on my page
15. As a user, I want to be able to view all of my blog posts
16. As a user, I want to be able to view a specific blog post of mine

Early WireFrames:
https://imgur.com/6Od15aY
