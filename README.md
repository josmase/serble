# serble

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

##Setup

setup for the server and client
###Client
Download [ruby] (http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.1.7.exe) (add it to path),
[nodejs] (https://nodejs.org/en/download/) and [git]  (https://git-scm.com/download/win)

Run 

`npm install --global npm@latest`

 `npm install --global yo bower grunt-cli`
 
 `git clone https://github.com/te4-nti-umea/serble.git`
 
 `cd serble/client`
 
`gem install compass`

 `npm install && bower install` 
Done

###Server

 Download and install [MySql] (http://dev.mysql.com/downloads/mysql/) and createa a user "serble" with the password "serble"
 
 `cd ../server`
 
 `npm install`
 
 `mysql -u "serble" "-pserble" "serble" < "/sql/serble.sql"`

`mysql -u "serble" "-pserble" "serble" < "/sql/data.sql"`

## Build & development
###Client

Run `grunt` for building and `grunt serve` for preview. 

###Server

Run `node app.js` to start the server.
## Testing

Running `grunt test` will run the unit tests with karma.
