var axios = require('axios');
//fill these out if I get rate limited by github's api limit and need a key 
var id = 'YOUR_CLIENT_ID';
var sec = 'YOUR_SECRET_ID';
var param = '?client_id=' + id + '&client_secret=' + sec;

// promises; axios.get gets usernames, axios.all (when all aquired, loops through usernames, then our .then function runs and we have the info (the promise) at our disposal)
function getUserInfo(username){
    return axios.get('https://api.github.com/users/' + username)
}
//add (+ param) to the end of username if need to

function getRepos(username){
    //fetch username repos
        return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos){
    //calculate all stars that user has
    return repos.data.reduce(function(acc, curr){
        return acc + curr.stargazers_count
    }, 0)
}

function getPlayersData(player){
    //get repos
    //getTotalStars
    //return object with that data 
    return getRepos(player.login)
        .then(getTotalStars)
        .then(function(totalStars){
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        })
}

function calculateScores(players){
    //return an array after algorithm calcs winner
    return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars 
    ]
}

var helpers = {
    getPlayersInfo: function(players){
        return axios.all(players.map(function(username){
            return getUserInfo(username)
        })).then(function(info){
            return info.map(function(user){
                return user.data;
            })
        }).catch(function(err){
            console.warn('Error in getPlayersInfo', err)
        })
    },
    battle: function(players){
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);

        return axios.all([playerOneData, playerTwoData])
        .then(calculateScores)
        .catch(function(err){console.warn('Error in getPlayersInfo: ', err)})
    }
};

module.exports = helpers;