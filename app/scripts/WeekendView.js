'use strict';

module.exports = Marionette.ItemView.extend({
	className: 'weekend',
	template: Handlebars.compile(
		'<div class="label">{{label}}</div>' +
		'<img class="image" src="{{imageUrl}}" />' +
		'<div class="themes">' +
		'	<span>Themes: </span>' +
		'</div>'),

	onRender: function () {
		var themes = this.model.get('topTheme');
		for (var i = 0; i < themes.length; i++) {
			var $span = $(document.createElement('span'))
				.addClass('theme')
				.html(themes[i]);
			this.$el.find('.themes').append($span);
		}
	}
});