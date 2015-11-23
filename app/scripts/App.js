
'use strict';

var MainLayout = require('./MainLayout');
var SearchModel = require('./SearchModel');
var Router = require('./router/Router');

module.exports = Marionette.Application.extend({
    history: Backbone.history,

    onStart: function () {
        console.log('start App');

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
        var deferred = Q.defer();

        this.searchModel = new SearchModel();
        this.searchModel.fetch({
            success: _.bind(function (data) {
                this.hotels = data.get('exactMatch');
                deferred.resolve();
            }, this),
            error: _.bind(function () {
                console.error('erreur while fetching hotels');
                deferred.reject();
            }, this)
        });
        
        return deferred.promise;
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