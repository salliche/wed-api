'use strict';

module.exports = Backbone.Model.extend({
	url: 'http://api.weekendesk.com/api/weekends.json?orderBy=priceQuality&locale=fr_FR&limit=50&page=0'
});