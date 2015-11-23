'use strict';


var hotelsTemplate = require('../templates/hotels.hbs');
var HotelView = require('./HotelView')


var NoHotelView = Marionette.ItemView.extend({
	className: 'no-hotel',
	template: Handlebars.compile('<p>no hotel</p>'),
});

module.exports = Marionette.CompositeView.extend({
	className: 'hotels-container',
	template: hotelsTemplate,

	childViewContainer: '.hotels',
    childView: HotelView,
    emptyView: NoHotelView,

    initialize: function (opts) {
		this.collection = opts.collection;
    }
});