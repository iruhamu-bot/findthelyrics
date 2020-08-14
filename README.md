# findthelyrics
NPM package to find lyrics to any given song.

[NPMJS](https://www.npmjs.com/package/findthelyrics) Package | [Github](https://github.com/n0rmancodes/findthelyrics) Repo

## How is it done?

It scrapes Genius to find the lyrics.

## Sample Code

This code gets the lyrics of ``I Just Wanna Shine`` by ``Fitz and The Tantrums``.

```js
const ftl = require("findthelyrics");

var artist = "Fitz and The Tantrums";
var title = "I Just Wanna Shine";

ftl.find(artist, title, function(err, resp) {
    console.log(resp)
    // [Chorus]
    // I just wanna shine like the sun when it comes up
    // Run the city from the rooftops
    // 'Cause today’s gonna be my day
    // I just wanna climb to the top of a mountain
    // Standing tall when I'm howlin'
    // ...
})
```