Refactor out jwt.verify to a helper

authMiddleware currently performs the verify for the home page

make a new / endpoint that isnt protected by auth

implement user following

Log in page missing forgot password link

sanitize inputs (backend before inserting anything into a database)

regex for password and username fields on login and signup forms (pattern)

add confirm password for sign up form

add logout route that deletes cookie and redirects to login page

if user is logged in, dont let them visit the login or signup pages

make it so the email and password fields dont empty on submitting login form, same for sign up

add 404 routes for anything not in the route list

do we even need a home route on the backend or should the frontend component just return and the feed component fetches all the data

factor feed out from home component into its own nested component

take data from home response and put it into thoughts

feed css drop shadow?

user pages with link in thought




finish lifting post state up from feed to home so that the state can be update from the create thought modal

does updating the state in home cause feed to re render? if not force a re render?




# Bugs
