console.log('Before');      //sync - code

//Example of Async function
setTimeout(() => {
    console.log('Reading a user from the database ....');
}, 2000);   //function is called after 2 seconds.


console.log('After');       //sync - code

/**
 * The 1st line is executed, 9th line's execution is initially blocked, and is executed only after the
 * execution of 1st line. That is Sync Programming (blocking)
 */

