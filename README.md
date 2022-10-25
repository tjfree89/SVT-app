#SVT ROBOTICS APPLICATION
- This application will create a local server and an API, using Express.js. I will refer to this API as assignNewTasksRoute. The assignNewTasksRoute is tasked with accepting payloads that represent a task that needs to be assigned to the nearest robot or nearest robot with the highest battery life if there are more than 1 robot within 10 distance units. The assignNewTasksRoute will also make a GET request to another endpoint provided via SVT Robotics, as part of its middleware. When the SVT Robotics endpoint is hit an array of objects is returned as a response. Each object represents 1 worker bot of the fleet of 100 and contains the bot's id and an x,y coordinates. 

#TO RUN THIS PROJECT
- Clone to a local repository.
- Install necessary dependencies:
    - This project uses:
    - requests module
    - node, install if you have not done so already
    - Navigate to the project directory(folder)
    - Node comes with the Node Package Manager (NPM) by default, use this package manager to install all dependecies at once by running 'npm install' on the command line in the appropriate directory.
    - Add endpoints
    - When you are ready to start the server enter 'node app.js' in the terminal. You should see confirmation that the server is open and listening on a specified port #
        - When sending a new task object, send it as a querystring in the browser: https://localhost:3000/?loadId=_&x=_&y=_ you should see the best option in the console and 'Howdy' in the browser.



##MOVING FORWARD
###Suggestions and ideas for changes depending on the details of this project:
- Instead of filtering the bots within 10 feet of the payload just leave them sorted as is and return the first 
bot in the array. It will be the closest bot, if tied for distance will return bot with highest battery level.
- Adding authentication, so the user could only access bots information if logged in.
- Hosting in the cloud with Azure API manager instead of locally serving (since Azure is used at SVT)
- Using multiple processes to speed up task assignment and server tasks.
- Adding a boolean flag to each bot object, in the array of bots-objects response from the SVT Robotics endpoint to indicate whether each bot is currently executing a task. Meaning they cannot accept a new task until they finish the task they are on. Once they are finished with their task, it is possible that they wouldn't be the best suited bot.
    - Prevents re-assignment and task loss. 
    - Potentially only returning available bots in response
- Adding a jobs/tasks queue that tracks tasks arriving from the controller on the way to the assignNewTasksRoute API in case there aren't any available bots. If all bots are busy add to queue. 
- Look into the A* path finding algorithm as a new metric of distance to task, especially if the robots have obstacles to steer clear of (walls, elevators, vending machines, etc...). The distance formula can be applied to each portion of the path discovered by the A* algorithm that creates a right triangle using the two points that create the hypotaneuse of the right triangle. 
- Perform a time complexity analysis to figure out the best sorting method and delivery method for the response. Depending on the size of the fleet and order of bots objects in the response array, it might make sense to store a local copy/cached copy of the worker bots and update each bot as their stats change and re-order them appropriately (distance units then battery life)using a quicksort routine with a sorted list. Might be faster to use a cube or tim sort, have to do the analysis. I am using the .sort() method from the standard .js library which implements the merge sort routine.
- If there is an enormous amount of traffic not being addressed a load balancer could be an option using something like nginx.