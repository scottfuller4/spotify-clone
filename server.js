// const express = require("express");
// const request = require("request"); // "Request" library
// const cors = require("cors");
// const querystring = require("query-string");
// const app = express();
// app.use(express.static(__dirname + "/public")).use(cors());

// const client_id = "8e5e35500b7d415f8230aed47a4a0c2a";
// const client_secret = "91224ab4a9414da1ace717b1699a2534";
// const redirect_uri = "http://localhost:8080/callback";
// const server_address = "http://localhost:8081"; // by default it should be http://localhost:8080 or 8081 by default
// const frontend_server_port = "8080"; // your Vue server port (8080 or 8081 by default)
// const scope = "user-read-email user-read-private";

// app.get("/login", function (req, res) {
//   console.log("executed");
//   // redirect to Spotify login page
//   res.writeHead(302, {
//     Location: encodeURI(
//       `https://accounts.spotify.com/authorize` +
//         `?client_id=${client_id}` +
//         `&response_type=code` +
//         `&redirect_uri=${redirect_uri}` +
//         `&scope=${scope}` +
//         `&show_dialog=true`
//     ),
//   });
//   res.send();
// });

// app.get("/callback", function (req, res) {
//   console.log("did you run?");
//   //change '/callback' if your redirect_uri has different ending (without slash at the end)
//   // after successful login make api call to get you profile's data
//   const code = req.query.code || null;
//   const authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     form: {
//       code: code,
//       redirect_uri: redirect_uri,
//       grant_type: "authorization_code",
//     },
//     headers: {
//       Authorization:
//         "Basic " +
//         new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//     },
//     json: true,
//   };

//   console.log({ authOptions });

//   request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       const access_token = body.access_token;
//       console.log({ access_token });
//       const refresh_token = body.refresh_token;
//       console.log({ refresh_token });
//       //pass the tokens to the browser as a query params to make requests from there
//       res.redirect(
//         server_address + `?token=${access_token}`
//         // +
//         //   querystring.stringify({
//         //     access_token: access_token,
//         //     // refresh_token: refresh_token,
//         //   })
//       );
//     } else {
//       res.redirect(
//         server_address +
//           querystring.stringify({
//             error: "invalid_token",
//           })
//       );
//     }
//   });
// });

// // port on with your Vue app is running
// app.listen(frontend_server_port);

// var http = require("http");

// /* Create an HTTP server to handle responses */

// http
//   .createServer(function (request, response) {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.write("Hello World");
//     response.end();
//   })
//   .listen(8888);

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
var front_end_address = "http://localhost:8080";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        console.log({ access_token });

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          front_end_address +
            "/?" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

console.log("Listening on 8888");
app.listen(8888);
