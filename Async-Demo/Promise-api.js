//Create promises that are already resolved / rejected

const p = Promise.resolve({ id : 'flick'});
p.then(result => console.log(result));

//The call stack wont be visible if we pass only 'Reason for Rejection'. 
//Its a good practice to use the Error object
const q = Promise.reject(new Error('Reason for Rejection'));    
q.catch(error => console.log(error));

//Parallel Promises

//First this async operation is executed
const p1 = new Promise((resolve) =>{
    setTimeout(() =>{
        console.log('Aysnc operation 1 ..');
        resolve(1);
    }, 2000);
});

//then this is executed
const p2 = new Promise((resolve) =>{
    setTimeout(() =>{
        console.log('Aysnc operation 2 ..');
        resolve(2);
    }, 2000);
});

//KickOff both these sync operations and do something when result of both is ready

//returns a new promise, when all promises in this array are resolved
Promise.all([p1,p2])
.then(result =>console.log(result));
