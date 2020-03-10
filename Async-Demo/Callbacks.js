//Call back is a function that we call when the result of an A-sync operation is ready


//Function call-
/**
 * Passing "1" as parameter for and recieving return values in "user" 
 */
getUser(1,function(user){
    console.log("User : ",user)

    //Nesting another function to get repo's of the username
    getRepository(user.gitHubUsername,(repos) =>{
        console.log('Repositories : ',repos)

        getCommits((commits) => {
            console.log('Number of commits : ',commits)
        });
    })

});
/**-Alternative for above code! Use Arrow function
 * 
    getUser(1,(user) =>{
    console.log("User : ",user)
    });
 *  
 */

function getUser(id, callback){
    setTimeout(() =>{
        console.log('\nReading a user from a database . . .');

        //id, gitHubUsername are parameter values that are being initialized and returned
        callback( {id: id, gitHubUsername: 'flick-23'} );
    }, 2000);
}


/**
 * Sync function :
 * function getRepositories(username){
 *  return ['repo1','repo2','repo3'];
 * }
 */

 //Async Function for the above
function getRepository(username,callback){
    setTimeout(() =>{
        console.log('\nCalling GitHub API . . . ');
        callback(['Repo 1', 'Repo 2', 'Repo 3', 'Repo 4']);
    }, 2000);
}


function getCommits(callback){
    setTimeout(() =>{
        console.log('\nCalling GitHub API . . . ');
        callback('23 commits');
    }, 2000);
}