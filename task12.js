// task 12
const axios = require("axios");
var author = "Dante Alighieri";
var url = 'http://localhost:5001/author/' + author;
async function funcAsync() {
    try {
        var response = await axios.get(url);
        console.log(`response asyn \n${JSON.stringify(response.data, null, 4)}`)
    } catch (ex) {
        console.log("Error " + ex)
    }
}
function funcPromise() {
    axios.get(url)
        .then(response => {
            console.log(`response promise \n${JSON.stringify(response.data, null, 4)}`)
        })
        .catch(error => {
            console.log("Error " + ex)
        })
}
funcAsync();
funcPromise();

