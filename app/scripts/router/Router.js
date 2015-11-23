'use strict';

var RouterController = require('./RouterController');

module.exports = Marionette.AppRouter.extend({
    initialize: function (options) {
        this.controller = new RouterController({
            mainLayout: options.mainLayout,
            hotelsCollection: options.hotelsCollection
        });
    },

    appRoutes: {
        'hotels': 'listHotels',
        '*path': 'defaultRoute'
    }
});