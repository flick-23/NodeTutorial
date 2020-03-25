//An object that holds eventual result of an Async Operation
/**
 * Initially in Pending state 
 *      If all good => Fullfiled
 *      else => error
 */


 //resolve & reject are basically functions
 const p = new Promise((resolve, reject) => {
    //Some async work like access data etc
    
    setTimeout(() =>{                                                 
      resolve(1); //if everything is good

      reject(new Error('message'));     //if there's a prob, throw the error, dont just display a message 
    }, 2000);
    
 });

 //Consuming the promise
//catch - Used to catch any error
//then - getting the result of our async operation
 p
 .then( result => console.log('Result : ',result))
 .catch(err => console.log('Error! ',err.message));