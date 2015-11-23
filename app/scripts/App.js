
'use strict';

var MainLayout = require('./MainLayout');
var SearchModel = require('./SearchModel');
var Router = require('./router/Router');

module.exports = Marionette.Application.extend({
    history: Backbone.history,

    onStart: function () {
        this.getSearch()
            .fail(function () {
                console.error('error when loading hotels');
            })
            .then(_.bind(function () {
                this.hotelsCollection = new Backbone.Collection(this.hotels)
            }, this))
            .done(_.bind(function () {
                this.init();
            }, this));
    },

    getSearch: function () {
        this.searchModel = new SearchModel();
        return this.searchModel.fetch()
            .then(_.bind(function (data) {
                this.hotels = data.exactMatch;
            }, this),
            function (xhr, textStatus, err) {
                console.error('error while fetching hotels');
                throw err;
            })
    },

    init: function () {
        this.addRegions({
            mainRegion: 'body'
        });

        this.mainLayout = new MainLayout();
        this.mainRegion.show(this.mainLayout);
        
        this.router = new Router({
            mainLayout: this.mainLayout,
            hotelsCollection: this.hotelsCollection
        });

        this.history.start({
            pushState: false
        });
    }
});