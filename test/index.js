const ftl = require("../");

var artist = "Fitz and The Tantrums";
var title = "I Just Wanna Shine";

ftl.find(artist, title, function(err, resp) {
    if (!err) {
        console.log(resp)
    } else {
        console.log(err)
    }
    // [Chorus]
    // I just wanna shine like the sun when it comes up
    // Run the city from the rooftops
    // 'Cause today’s gonna be my day
    // I just wanna climb to the top of a mountain
    // Standing tall when I'm howlin'
    // ...
})