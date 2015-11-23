'use strict';

var weekendTemplate = require('../templates/weekend.hbs');

module.exports = Marionette.ItemView.extend({
	className: 'weekend',
	template: weekendTemplate,

	onRender: function () {
		var themes = this.model.get('topTheme');
		for (var i = 0; i < themes.length; i++) {
			var $span = $(document.createElement('span'))
				.addClass('weekend__theme')
				.html(themes[i]);
			this.$el.find('.themes').append($span);
		}
	}
});