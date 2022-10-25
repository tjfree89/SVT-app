
# SVT ROBOTICS APPLICATION
- This application will create a local server and an API using Express.js. The API accepts payloads for a POST request that represent a pallet needing to be moved, and will be assigned to the nearest robot or nearest robot with the highest battery life if there are more than 1 robots within 10 distance units. The API will also make a GET request to another endpoint (provided by SVT Robotics) as part of its middleware after the POST request.

## TO RUN THIS PROJECT
- Clone to a local repository.
- Install necessary dependencies:
    - This project uses:
        - requests module
        - node, install if you have not done so already
    - Navigate to the project directory(folder)
    - Node comes with the Node Package Manager (NPM) by default, use this package manager to install all dependecies at once by running 'npm install' on the command line in the appropriate directory.
    - When you are ready to start the server enter 'node app.js' in the terminal while in the directory of the project. You should see confirmation that the server is open and listening on a specified port #
        - When sending a new task object, send it as a querystring in the browser. ex: https://localhost:3000/?loadId=_&x=_&y=_ you should see the best option in the console (and 'Howdy' in the browser....edit: now you see the returned best robot for the job) and in the browser.



## MOVING FORWARD
### Suggestions and ideas for changes depending on the details of this project:
### Note: I did not implement exactly the same as in the requirements:
    - I commented out the filter statement which would get everything within 10 distance units and just sorted the bots so the best would always be first.

- Add remaining CRUD operations
- Adding authentication, so only a user could access bots information if logged in.
- Hosting in the cloud with Azure API manager instead of locally serving (since Azure is used at SVT)
- Using multiple processes to speed up task assignment and server tasks.
- Adding a boolean flag to each bot object to indicate whether each bot is currently executing a task. They cannot accept a new task until they finish the task they are on. Once they are finished with their task, it is possible that they wouldn't be the best suited bot.

    - Prevents re-assignment and task loss. 
    - Potentially only returning available bots in response?
- Adding a jobs/tasks queue that tracks tasks arriving from the controller on the way to the assignNewTasksRoute API in case there aren't any available bots. If all bots are busy add to queue. 
- Look into the A* path finding algorithm as a new metric of distance to task, especially if the robots have obstacles to steer clear of (walls, elevators, vending machines, etc...). The distance formula can be applied to each portion of the path discovered by the A* algorithm that creates a right triangle using the two points that create the hypotaneuse of the right triangle. 
- Perform a time complexity analysis to figure out the best sorting method and delivery method for the response. Depending on the size of the fleet and order of bots objects in the response array, it might make sense to store a local copy/cached copy of the worker bots and update each bot as their stats change and re-order them appropriately (distance units then battery life)using a quicksort routine with a sorted list. Might be faster to use a cube or tim sort, have to do the analysis. I am using the .sort() method from the standard .js library which implements the merge sort routine.
- If there is an enormous amount of traffic not being addressed a load balancer could be an option using something like nginx.
