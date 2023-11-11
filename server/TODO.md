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

# Bugs

thoughts with no image still have a post-img-wrap div that is 20px tall

