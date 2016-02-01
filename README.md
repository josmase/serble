# serble

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

##Setup

Download [ruby] (http://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.1.7.exe)
Install  and add it to path then run `gem install compass`.
Download and install [nodejs] (https://nodejs.org/en/download/) and [git]  (https://git-scm.com/download/win)

Run ```npm install --global npm@latest
 npm install --global yo bower grunt-cli
 git clone https://github.com/te4-nti-umea/serble.git
 cd serble/client
 npm install && bower install```

Done


## Build & development
Run `grunt` for building and `grunt serve` for preview. 

## Testing

Running `grunt test` will run the unit tests with karma.


## Developer info

Article post SQL structure:
'author': Author ID (Use 0 for default system profile)
'title': Article title
'description': Article description
'payout': Article payout
'category': Article category
'loc': Article location object {lat: Latitude, long: Longitude}
'stage': Article stage, default 0
