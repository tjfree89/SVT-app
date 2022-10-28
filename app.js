const express = require('express');
const req = require('express/lib/request');
const { get } = require('express/lib/response');
const app = express();
//if setting up a desired port, add PORT to env.sh file.
const port = 5001;
const request = require('request');



const requestOptions = {
    url: 'https://60c8ed887dafc90017ffbd56.mockapi.io/robots',
    method: 'GET',
    json:{},
}

/*If we had more files such as separate router files, we would make everything available
under folder 'SVTROBOTICS'
app.use(express.static('SVTROBOTICS'));
*/


const calculateDistanceUnits = (x1,x2,y1,y2) => {
    //return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));

    //use this to test sort function...if distance is the same, sort by batterylevel
    return Math.floor(Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))); 
    
  }

//to get the best bot, assuming that the req uses a query with payload
/*req.query = {
    loadId: 231, req.query.loadId
    x: 5, req.query.x
    y: 3  req.query.y
    } etc...
    bots/?loadId=231&x=5&y=3
     */
/*filterbots....Filter bots that are all within 10 units of the load.

*/
// const filterBots = (req, res, next) => {
//     closeBots = req.bots.filter((bot) => {
//         return bot.distance <= 10;
//     });
//     closeBots = closeBots.sort((a,b) => {
//         return b.batteryLevel - a.batteryLevel
//     });
// }
//sort returns the best bots as is
const sortBots = async(req, res, next) => {
    req.bots = await req.bots.sort((a,b) => {
        if(a.distance === b.distance){
            return b.batteryLevel - a.batteryLevel;
        }
        return a.distance - b.distance;
    });
    closerTenBots = req.bots.filter((bot) => {
        return bot.distance <=10;
    });
    if(closerTenBots.length > 0){
        req.bots = closerTenBots.sort((a,b) => {
            return b.batteryLevel - a.batteryLevel;
        });
        const returnObj = {
            robotId: req.bots[0].robotId,
            distanceToGoal: req.bots[0].distance,
            batteryLevel: req.bots[0].batteryLevel
           }
           console.log(req.bots);
           console.log(`The best bot is ${JSON.stringify(returnObj)}`)
            res.status(200).send(returnObj);

    }else{
   //quick formatting fix
   const returnObj = {
    robotId: req.bots[0].robotId,
    distanceToGoal: req.bots[0].distance,
    batteryLevel: req.bots[0].batteryLevel
   }
   console.log(req.bots);
   console.log(`The best bot is ${JSON.stringify(returnObj)}`)
    res.status(200).send(returnObj);
    }
    /* After we have sorted we will send back the response with the first bot in the array. It will be the closest bot
    and have the highest battery level.
    */

}
//add the calculated distance to the bots
const addCalculatedDistance = (req, res, next) =>{
    
    req.bots = req.bots.map((bot) =>{
        bot.distance = calculateDistanceUnits(bot.x, req.query.x, bot.y, req.query.y);
        return bot;
    });
    
}
    //how we get bots then next(); then map calculated distance to bots
app.post('/api/robots/closest/', (req, res, next) => {
        
    if(queryArguments.hasOwnProperty('LoadId') && queryArguments.hasOwnProperty('x') && queryArguments.hasOwnProperty('y')){
        const task = {
            loadId: req.query.loadId,
            x: req.query.x,
            y: req.query.y
        }
        tasks.push(task);
        next();

}else{
    res.status(400).send('BAD REQUEST');
}
});
app.get('/bots/', (req, res, next) => {
    let bots;
    request(requestOptions, (err, response, body) => {
        if (err) {
          console.log(err);
        } else if (response.statusCode === 200) {
          req.bots = body;
          
          addCalculatedDistance(req,res,next);
          sortBots(req,res,next);
        } else {
          console.log(response.statusCode);
        }
      });    
      
    //   res.status(200).send(`Howdy`);
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});