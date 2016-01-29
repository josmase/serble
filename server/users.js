'use strict';

var log = require('log-util');

var app, db;

/**
 * Users module
 * @author Emil Bertillson, Serble
 * @version 2016-01-28
 */
var exp = {
  Profile: function (fn, ln, c, add, d, avt, cfg) {
    this.firstname = fn;
    this.lastname = ln;
    this.city = c;
    this.address = add;
    this.description = d;
    this.avatar_url = avt;
    this.config = cfg;
  },

  User: function (id) {
    this.id = id || null;
    this.username = null;
    this.password = null;
    this.email = null;
    this.ssn = null;
    this.profile = null;

    this.fetchUser = function (callback) {
      var options = {
        user_id: this.id
      };

      var self = this;
      var query = db.query('SELECT * FROM `account` WHERE ?', options, function (err, result) {
        if (err) {
          console.log("Database error: " + err);
        } else {
          var data = result[0];

          if (data) {
            self.username = data.username;
            self.password = data.password;
            self.email = data.email;
            self.ssn = data.ssn;

            callback();
          }
        }
      });
    };

    this.fetchProfile = function (callback) {
      var options = {
        user_id: this.id
      };

      var self = this;
      var query = db.query('SELECT * FROM `profile` WHERE ?', options, function (err, result) {
        if (err) {
          console.log("Database error: " + err);
        } else {
          var data = result[0];

          if (data) {
            self.profile = new exp.Profile(
              data.firstname,
              data.lastname,
              data.city,
              data.address,
              data.description,
              data.avatar_url,
              {
                show_city: (data.show_city >= 1),
                show_address: (data.show_address >= 1),
                show_age: (data.show_age >= 1),
                show_avatar: (data.show_avatar >= 1)
              }
            )

            callback();
          }
        }
      });
    };

    this.fetch = function (callback) {
      var self = this;

      this.fetchUser(function () {
        self.fetchProfile(function () {
          callback();
        });
      });
    }
  },

  /**
   * Sets the app and database object
   * @param appObj App object
   * @param dbObj Database object
   */
  use: function (appObj, dbObj) {
    app = appObj;
    db = dbObj;
  }
};

module.exports = exp;