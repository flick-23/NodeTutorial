//Named Functions help organise the Call Backs Hell (nested CallBacks) & makes code look cleaner
// It's another approach of A-Sync Programming

//rewriting code in callBack using Named Functions method

//We will replace each anonymous function with named function to flatten the struture of code.



//Replaced all callback functions with named functions
getUser(1,displayUser);

getRepository('flick_23',displayRepositories);
       
getCommits((displayCommits));   


//Named functions with their respective operations
function displayCommits(commits){
    console.log(commits);
}

function displayRepositories(repos){
    console.log('Repositories : ',repos);
}

function displayUser(user){
    console.log("User : ",user);
}


//Functio logics
function getUser(id, callback){
    setTimeout(() =>{
        console.log('\nReading a user from a database . . .');

        //id, gitHubUsername are parameter values that are being initialized and returned
        callback( {id: id, gitHubUsername: 'flick-23'} );
    }, 2000);
}



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