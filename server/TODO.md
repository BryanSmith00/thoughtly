Refactor out jwt.verify to a helper

authMiddleware currently performs the verify for the home page

make a new / endpoint that isnt protected by auth

implement user following

Log in page missing forgot password link

sanitize inputs (backend before inserting anything into a database)

regex for password and username fields on login and signup forms (pattern)

add confirm password for sign up form

react infinite scroller for progressive loading

feed css drop shadow?

delete button for thoughts if they belong to you

clean up the rerendering of feed when using the post modal. Only change the state key when a post is made, new state will be needed in home

add profile to header

make any text with @* link to the profile

website footer

thought like count should be state to allow for rerendering

thought like svg only updates the first on the page, do they need different ids?

thoughts should display svgs based on if youve already interacted with them

post modal should have variant for replying which means route cannot be hardcoded

remember me button on login page, change endpoint response to expires: false else 1 day cookies?

Either set username by default or prompt user on sign up page

change user route to /id rather than /user/id, will require protecting all used routes and preventing accounts with certain names

# p1 
landing page with logo for people with no cookies

for now just send back landing page from backend / route if no cookie
in future add exception if they've clicked past it, boolean check?
maybe needs new cookie for first time landers

# Bugs

if the backend isnt running the frontend will display a failed to load message but upon server restarting page has to be refreshed to bring posts back, spa navigating to home doesnt reload the content