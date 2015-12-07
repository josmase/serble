var Brick = require("brick");
var on = require("on-off");
var debounce = require("debounce-fn");

var InfiniteScroll = Brick({
  New: New,
  ready: ready,
  more: more
});

module.exports = InfiniteScroll;

function New (attrs) {
  var grid = InfiniteScroll(attrs);
  grid.index = 1;
  return grid;
}

function ready (grid) {
  var more = debounce(grid.more, 500);
  on(window, 'scroll', more);
  on(window, 'resize', more);
}

function more (grid) {
  grid.index++;
  grid.brick.refresh();
}
