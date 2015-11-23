'use strict';

global.Backbone = require('backbone');
global.Marionette = require('backbone.marionette');
global.Handlebars = require('handlebars');
global.$ = require('jquery');
global._ = require('lodash');
global.Q = require('q');

var App = require('./App');

new App().start();