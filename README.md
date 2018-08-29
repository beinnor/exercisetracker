# exercisetracker
FCC: Apis and Microservices Projects - Exercise Tracker 

## Link to user stories
https://forum.freecodecamp.org/t/exercise-tracker-project-with-testable-user-stories-guinea-pigs-needed/73232


## User Stories

- [x] I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
- [x] I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
- [x] I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.
- [ ] I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
- [ ] I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
