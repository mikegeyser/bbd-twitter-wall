This is a twitter wall that was built on-the-fly for the WE THINK CODE_ students
that visited BBD. Below are the sequence of steps that was followed, with a
brief explanation of each step.

*Disclaimer:* There may be some idiosyncrasies between different machines, particularly with regards to setting up nodejs and ruby for sass. This guide was written to explain
what we did, and relies on you having set up your machine properly. In fact,
[this entire demo is works-on-my-machine certified](https://blog.codinghorror.com/the-works-on-my-machine-certification-program/).

![](https://blog.codinghorror.com/content/images/uploads/2007/03/6a0120a85dcdae970b0128776ff992970c-pi.png)

If there are any problems with the code itself, questions about how it works, or
where you can find out more about a specific technology - we are happy to help.
Just log an issue on this repository and we'll get to it as soon as we can!

# References
- https://nodejs.org/
- https://expressjs.com/
- https://github.com/ttezel/twit
- http://socket.io/
- http://sass-lang.com/
- http://compass-style.org/
- https://css-tricks.com/glitch-effect-text-images-svg/
- http://jquery.com/
- http://masonry.desandro.com/

# Step 0
Install node.js, check out the code and install all dependent packages from
the root directory of the project:

```
>> git clone git@github.com:mikegeyser/bbd-twitter-wall.git
>> cd bbd-twitter-wall
>> npm install
```

# Step 1
Start with creating the skeleton of an express.js application, that has a single
route that accepts a GET request, and listens for requests at port 3000.

app.js

```
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

```
>> node index
```

Open a browser window and navigate to http://localhost:3000, and you should sendfile
a blank window with the words "Hello World" on it.

# Step 2
Update the express app to serve index.html, and allow static file access.

app.js

```
app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendfile('index.html');
});
```

index.html

```
<!doctype html>
<html>
  <head>
    <title>WTC</title>
  </head>
  <body>
    <div>// Welcome WE THINK CODE_ ers!</div>
  </body>
</html>
```
Reloading the page, you should now see the updated text.

# Step 3
Connect to the twitter stream using twit, you will need to sign up for API
access using your own twitter credentials. Then you specify what users or
hash tags you want to track, and provide a callback event for the twitter
stream.

```
var Twit = require("twit");
var T = new Twit({
  consumer_key: "{Your consumer key}",
  consumer_secret: "{Your consumer secret}",
  access_token: "{Your access token}",
  access_token_secret: "{Your access token secret}",
  timeout_ms: 60000
});
```

```
var stream = T.stream("statuses/filter", {
    track: "#javascript, @bbdsoftware, #WTC, @wethinkcode"
});
```

```
stream.on("tweet", function(status) {
    console.log({
        name: status.user.screen_name,
        text: status.text,
        created_at: status.created_at
    });
});
```

If you restart the script, and wait a while, you should see tweets being logged
in the console window.

# Step 4
Reference socket.io and inside the twitter stream, emit the data that we will
use on the front end.

```
var io = require('socket.io')(http);
```

```
io.emit("tweet", {
    name: status.user.screen_name,
    text: status.text,
    created_at: status.created_at
});
```

# Step 5
Create the basic styling for the project using sass and compass, and start
automatically compiling the sass into CSS. Then link the output CSS files, as
well as some scripts that you'll use later on.

sass/styles.scss

```
@import "compass/css3";

$grey: rgba(50,50,55,1.00);
$lightgrey: rgba(255, 255, 255, 0.15);
$glitch_1: rgba(200,0,0,1.00);
$glitch_2: rgba(0,50,55,1.00);

body {
  background-color: $grey;
  font-family: Source Code Pro;
  color: white;
}
```

```
compass watch sass/styles.scss
```

index.html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="stylesheets/styles.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
      <div class="welcome" data-text="// Welcome WE THINK CODE_ ers!">// Welcome WE THINK CODE_ ers!</div>

      <script src="/socket.io/socket.io.js"></script>
      <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
      <script src="https://npmcdn.com/masonry-layout@4.1/dist/masonry.pkgd.js"></script>
  </body>
</html>

```

# Step 6
Reference the glitch sass file that we created, and set the welcome text to
glitch.

sass/styles.scss

```
@import "glitch.scss";

.welcome {
  left: 400px;
  top: 10px;
  font-size: 60px;
  @include textGlitch("welcome", 15, white, $grey, $glitch_1, $glitch_2, 1000, 115);
}
```

# Step 7
Add the place holder markup to contain the glitched images, and load up the svg
image using an AJAX get. (This is a bit of a hack, for brevity, and you could
also just copy and paste the svg code in directly, but the file becomes a little unwieldy.) Lastly, update the sass file to glitch the image.

index.html

```
<div id="svg-container" style="overflow:hidden; width: 0px; height: 0px;"></div>

<div class="logo">
  <svg class="icon">
    <use xlink:href="#atc-logo"></use>
  </svg>
  <svg class="icon">
    <use xlink:href="#atc-logo"></use>
  </svg>
  <svg class="icon">
    <use xlink:href="#atc-logo"></use>
  </svg>
</div>
```

```
<script>
    $(document).ready(function(){
      $.get('ATC.svg').then(function(svg){
          $("svg", svg).prependTo('#svg-container');
      });
    });
</script>
```

sass/styles.scss

```
.logo {
  /*
    1. Namespace
    2. Intensity
    3. Fill Color
    4. Background
    5. Width (px)
    6. Height (px)
    5. Top (px, abs pos)
    6. Left (px, abs pos)
  */
  @include svgGlitch("logo", 12, white, $grey, $glitch_1, $glitch_2, 400, 200, -50, 0);
}

```

# Step 8
Put a div in the html page that will act as a container for all of the tweets
received. Then initialise the masonry jQuery plugin and the socket.io stream.
Then provide a callback for when a tweet is received that prepends a div containing
the tweet onto the beginning of the list of tweets, and call the masonry plugin
telling it to re-layout the page. Lastly, we add a bit of sass styling to ensure
that the tweets show up well on the screen, and we're done.

index.html

```
<div id="messages"></div>
```

```
var $messages = $('#messages');

$messages.masonry({
  itemSelector: 'div'
});

var socket = io();

socket.on('tweet', function(tweet){
  // Prepend the tweet.
  $messages.prepend('<div>' + tweet.name + ": <br /> " + tweet.text + '</div>');
  $messages.masonry( 'reloadItems' );
  $messages.masonry( 'layout' );

});
```

sass/styles.scss

```
#messages {
    margin: 5px;
    width: 100%;
}

#messages div {
    overflow: hidden;
    cursor: pointer;
    background: $lightgrey;
    border: inherit;
    border-radius: 4px;
    width: 350px;
    margin: 10px;
    padding: 5px;
}
```
