const got = require("got");
const cheerio = require("cheerio");

exports.find = (artist, title, cb) => {
    if (!artist | !title | !cb) {
        console.log("callbacks and variables are required");
        return;
    }
    var q = encodeURI(artist).replace(" ", "+") + "+" + encodeURI(title).replace(" ", "+");
    var url = "https://genius.com/api/search/song?page=1&q=" + q;
    got(url,{
        headers: {
            "Host": "genius.com",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "X-Requested-With": "XMLHttpRequest",
            "Connection": "keep-alive",
            "Referer": "https://genius.com/search?q=" + q,
            "DNT": "1",
            "TE": "Trailers"
        }
    }).then(function(response){
        if (JSON.parse(response.body).response.sections[0].hits[0]) {
            var data_url = "https://genius.com" + JSON.parse(response.body).response.sections[0].hits[0].result.path;
        } else {
            cb({code:"noResults",message:"There was no results for your query."}, null);
            return false;
        }
        // timeout is to prevent rate limiting
        setTimeout(function () {
            got(data_url, {
                headers: {
                    "Host": "genius.com",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:79.0) Gecko/20100101 Firefox/79.0",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive",
                    "Referer": "https://genius.com/search?q=" + q,
                    "DNT": "1",
                    "TE": "Trailers"
                }
            }).then(function(response) {
                var $ = cheerio.load(response.body);
                if ($(".song_body-lyrics p").text()) {
                    cb(null, $(".song_body-lyrics p").text());
                } else if ($(".song_body-lyrics").text()) {
                    cb(null, $(".song_body-lyrics").text());
                } else {
                    var errObj = {code:"scrapingFailed",message:"The song could not be scraped."}
                    cb(errObj, null);
                    return;
                }
            }).catch(function(e) {
                cb(e, null)
            })
        }, 500);
    }).catch(function(e) {
        cb(e, null)
    })
}