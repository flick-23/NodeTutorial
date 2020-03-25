//All the callback functions replaced with promises from the file - Callbacks.js



// getUser(1,function(user){
//     console.log("User : ",user)

//     //Nesting another function to get repo's of the username
//     getRepository(user.gitHubUsername,(repos) =>{
//         console.log('Repositories : ',repos)

//         getCommits((commits) => {
//             console.log('Number of commits : ',commits)
//         });
//     })

// });


//Alternative for the above code in promises
//Consuming promises
getUser(1)
.then( user => getRepository(user.gitHubUsername))
.then( repos => getCommits(repos[0]))
.then(commits=>console.log('Number of commits : ',commits))
.catch(err=> console.log('Error ',err.message));

//remove 'callback' paramete.
//return a promise 
//replace callback with resolve/reject inside the function 
//repeat the same for all the callbacks

function getUser(id){
    return new Promise((resolve, reject) =>
    {
        //Kick off Async Code! 
        //Setting timer in this case
        setTimeout(() =>{
            console.log('\nReading a user from a database . . .');
            resolve( {id: id, gitHubUsername: 'flick-23'} );
        }, 2000);
    });
}


function getRepository(username){
    return new Promise((resolve, reject) =>
    {
        setTimeout(() =>{
            console.log('\nCalling GitHub API . . . ');
            resolve(['Repo 1', 'Repo 2', 'Repo 3', 'Repo 4']);
        }, 2000);
    });
}


function getCommits(repos){
    return new Promise((resolve, reject) =>
    {
        setTimeout(() =>{
            console.log('\nCalling GitHub API . . . ');
            resolve('23 commits');
        }, 2000);
    });
}