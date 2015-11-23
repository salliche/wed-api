'use strict';

var hotelTemplate = require('../templates/hotel.hbs');
var WeekendView = require('./WeekendView');


var NoWeekendView = Marionette.ItemView.extend({
	className: 'no-weekend',
	template: Handlebars.compile('<p>no weekend</p>')
});

module.exports = Marionette.CompositeView.extend({
	className: 'hotel',
	template: hotelTemplate,

	childViewContainer: '.weekends',
    childView: WeekendView,
    emptyView: NoWeekendView,

	ui: {
		$title: '.title',
		$position: '.position',
		$review: '.review'
	},

	events: {
		'click @ui.$title': 'onLabelClick'
	},

	initialize: function () {
		this.collection = new Backbone.Collection(this.model.get('weekend'));
	},

	onRender: function () {
		this.ui.$position.html(this.model.get('location').address);
		this.ui.$review.html('review: ' + this.model.get('review').average);
	},

	onLabelClick: function (event) {
		var $target = $(event.currentTarget).closest('.hotels').find('.weekends');
		$target.toggleClass('hidden');
	}
});