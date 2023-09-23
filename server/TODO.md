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

# Bugs
