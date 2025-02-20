// task 10
const axios = require("axios");
var url = 'http://localhost:5001/';
async function getBooksAsync() {
    try {
        var response = await axios.get(url);
        console.log(`response asyn \n${JSON.stringify(response.data, null, 4)}`)
    } catch (ex) {
        console.log("Error " + ex)
    }
}
function getBooksPromise() {
    axios.get(url)
        .then(response => {
            console.log(`response promise \n${JSON.stringify(response.data, null, 4)}`)
        })
        .catch(error => {
            console.log("Error " + ex)
        })
}
getBooksAsync();
getBooksPromise();

