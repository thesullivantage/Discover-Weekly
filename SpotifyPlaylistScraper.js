var spotifyPlaylist = require('spotify-playlist');
var fs = require('fs')
const dotenv = require('dotenv');
const axios = require('axios')
dotenv.config();
const util = require('util')
var mongoose = require("mongoose");

var db = require("./models");
mongoose.connect("mongodb://localhost/SpotifyData", { useNewUrlParser: true })
    .catch(err => console.log("connection error: ", err));


const spotifyAxios = axios.create({
    // baseURL: "https://api.spotify.com/v1/playlists/37i9dQZEVXcPogECItVIUy/tracks",
    headers: {
        Authorization: 'Bearer ' + process.env.ACCESS_TOKEN,
        'Content-Type': 'application/json'
    }
});
spotifyAxios.get("https://api.spotify.com/v1/playlists/37i9dQZEVXcPogECItVIUy/tracks")
    .then((response) => {
        // console.log("Response: " + util.inspect(response.data.items, { showHidden: false, depth: 1 }))

        const sending = response.data.items.map(item => {
            var obj = {}
            if (item.track.album.name) {
                obj.Album = item.track.album.name
            }
            obj.Artists = item.track.artists.map(artist => {
                return {
                    "Name": artist.name,
                    "URI": artist.uri
                }
            })
            obj.Name = item.track.name;
            obj.URI = item.track.uri
            return obj;
        })

        db.Tracks.insertMany(sending)
        .then(()=>{
            console.log("done")
            mongoose.connection.close()
        })
        .catch(err => console.log("err: ", err))
        return;

    })
    .catch(err => { return console.log("err: ", err) })
    //     for (var i = 0; i < response.data.items.length; i++) {

    //         var obj = {};
    //         const abResponse = response.data.items[i].track

    //         obj.Album = item.album.name
    //         obj.Artists = item.artists.map(artist => {
    //             return {
    //                 "Name": artist.name,
    //                 "URI": artist.uri
    //             }
    //         })

    //         obj.Name = item.name;
    //         obj.URI = item.uri;

    //         // fs.readFile('results.json', function (err, data) {
    //         //             var json = JSON.parse(data)
    //         //             // for (var i = 0; i < result.playlist.tracks.length; i++) {}
    //         //             var toPush = JSON.stringify(obj)
    //         //             json.push(toPush)

    //         //             fs.writeFile("results.json", json, () => {
    //         //                 console.log("done")
    //         //             })
    //         // })

    //     }
    // })
    // .catch(err => {
    //     console.log("ERR: " + err)
    // })



