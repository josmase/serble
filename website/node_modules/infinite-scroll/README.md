## infinite-scroll

Simple Infinite Scrolling Brick

## Install

```bash
$ npm install infinite-scroll
```

## Usage

```js
var InfiniteScroll = require('infinite-scroll')
var request = require('request')

module.exports = Brick(InfiniteScroll, {
  update: update,
  show: show
})

function update (app, done) {
  app.data || (app.data = []);

  request('/api/users/' + app.index, function (error, data) {
    if (error) return done(error);

    app.data = app.data.concat(data);
    done();
  });
}

function show (app) {
  app.brick.bind('ul.users li', app.data);
}
```
