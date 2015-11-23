'use strict';

var HotelsView = require('./../HotelsView');

module.exports = Marionette.Controller.extend({
    initialize: function (options) {
        this.mainLayout = options.mainLayout;
        this.hotelsCollection = options.hotelsCollection;
    },

    defaultRoute: function () {
        Backbone.history.navigate('hotels', {
            trigger: true,
            replace: false
        });
    },

    listHotels: function () {
        var hotelsView = new HotelsView({
            collection: this.hotelsCollection
        });
        this.mainLayout.content.show(hotelsView);
    }
});