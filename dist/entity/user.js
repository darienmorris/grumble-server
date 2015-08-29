"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var User = (function () {
  function User(userID) {
    _classCallCheck(this, User);

    this.userID = userID;
  }

  _createClass(User, null, [{
    key: "register",
    value: function register(user) {}
  }, {
    key: "login",
    value: function login() {
      return "POTATO!";
      // var conString = "postgres://"+config.db.sql.user+":"+config.db.sql.password+"@"+config.db.sql.server+"/"+config.db.sql.database+'?ssl=true';
      //       pg.connect(conString, function(err, client, done) {
      //           if(err) {
      //           }
      //           else {
      //               client.query('SELECT * FROM users', function(err, result) {
      //                   //call `done()` to release the client back to the pool
      //                   done();

      //                   if(err) {
      //                       console.log("there is an error", err);
      //                     // return console.error('error running query', err);
      //                   }

      //                   reply(result.rows);
      //               });
      //           }

      //       });
    }
  }]);

  return User;
})();

module.exports = User;