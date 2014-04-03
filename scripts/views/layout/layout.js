window.views = window.views || {};
(function (scope) {
	'use strict';
	var kendo = window.kendo,
		loader = window.loader;

	function initLayout() {
		return loader.loadView('layout')
			.then(function (layoutHTML) {
				return new kendo.Layout(layoutHTML);
			});
	}

	scope.layout = {
		init: initLayout
	};

}(window.views));