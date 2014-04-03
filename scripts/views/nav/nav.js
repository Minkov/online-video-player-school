window.views = window.views || {};
(function (scope) {
	'use strict';

	function initView(items) {
		/* load HTML */
		return loader.loadView('nav')
			.then(function (viewHTML) {
				/* create ViewModel */
				var viewModel = {
					items: items
				};
				/* create and bind View to ViewModel */
				var view = new kendo.View(viewHTML, {
					model: viewModel
				});
				return view;
			});
	}

	scope.nav = {
		init: initView
	};
}(window.views));