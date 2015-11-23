'use strict';

var WeekendView = require('./WeekendView');


var NoWeekendView = Marionette.ItemView.extend({
	className: 'no-weekend',
	template: Handlebars.compile('<p>no weekend</p>')
});

module.exports = Marionette.CompositeView.extend({
	className: 'hotel',
	template: Handlebars.compile(
		'<div class="label">{{label}}</div>' +
		'<div class="infos">' +
		'	<span class="position"></span>' +
		'	<span class="review"></span>' +
		'</div>' +
		'<div class="weekends hidden"></div>'),


	childViewContainer: '.weekends',
    childView: WeekendView,
    emptyView: NoWeekendView,

	ui: {
		$label: '.label',
		$position: '.position',
		$review: '.review'
	},

	events: {
		'click @ui.$label': 'onLabelClick'
	},

	initialize: function () {
		this.collection = new Backbone.Collection(this.model.get('weekend'));
	},

	onRender: function () {
		this.ui.$position.html(this.model.get('location').address);
		this.ui.$review.html('review: ' + this.model.get('review').average);
	},

	onLabelClick: function (event) {
		var $target = $(event.currentTarget).siblings('.weekends');
		$target.toggleClass('hidden');
	}
});