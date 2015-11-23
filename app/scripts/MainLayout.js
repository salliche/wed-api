'use strict';

var mainTemplate = require('../templates/main.hbs');

module.exports = Marionette.LayoutView.extend({
	id: 'main-layout',
    template: Handlebars.compile(mainTemplate()),

    regions: {
        content: '#content'
    }
});