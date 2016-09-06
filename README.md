This is a twitter wall that was built on-the-fly for the WE THINK CODE_ students
that visited BBD. Below are the sequence of steps that was followed, with a
brief explanation of each step.

# Step 0
Install node.js, check out the code and install all dependendant packages from
the root directory of the project:

```
> git clone git@github.com:mikegeyser/bbd-twitter-wall.git
> cd bbd-twitter-wall
> npm install
```

# Step 1

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
# Step 2

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

# Step 3

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

# Step 4

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

Create sass/styles.scss

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

Copy sass/glitch.scss

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

Copy ATC.svg
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
