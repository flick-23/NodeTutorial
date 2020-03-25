//Create promises that are already resolved / rejected

const p = Promise.resolve({ id : 'flick'});
p.then(result => console.log(result));

//The call stack wont be visible if we pass only 'Reason for Rejection'. 
//Its a good practice to use the Error object
const q = Promise.reject(new Error('Reason for Rejection'));    
q.catch(error => console.log(error));