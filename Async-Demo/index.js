console.log('Before');      //sync - code

//Example of Async function

setTimeout(() => {
    console.log('Reading a user from the database ....');
}, 2000);   //function is called after 2 seconds.

console.log('After');       //sync - code