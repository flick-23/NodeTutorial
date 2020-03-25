//Promise-based Approach
// getUser(1)
// .then( user => getRepository(user.gitHubUsername))
// .then( repos => getCommits(repos[0]))
// .then(commits=>console.log('Number of commits : ',commits))
// .catch(err=> console.log('Error ',err.message));

//Async-Await approach
/**Code Looks like its Sync, but works like Async
 * function should always be decorated with Async modifier
 * User TRY & CATCH for errors, because unlike promises this doesnt have .then . catch
 */

async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepository(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err){
        console.log('Error',err.message);
    }
}

displayCommits();

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
            //resolve(['Repo 1', 'Repo 2', 'Repo 3', 'Repo 4']);
            reject(new Error('Could not get the repository'));  //rejecting to check working of try catch block
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