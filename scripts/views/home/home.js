window.views = window.views || {};
(function (scope) {
	function initView() {
		/* load HTML */
		return loader.loadView('home')
			.then(function (viewHTML) {
				/* create ViewModel */
				var viewModel = {
							
					title: 'Welcome to our site',
					content: '<p>This application was developed for a live demo during а <a class="external" href="http://academy.telerik.com/school-academy/">Telerik School Academy training</a> focused on creating <a class="external" href="http://telerikacademy.com/Courses/Courses/Details/169">SPA applications with JavaScript</a></p>' +  
							'<p>This web application is developed using <a class="external" href="http://www.telerik.com/kendo-ui">Telerik KendoUI</a> framework and <a href="http://www.telerik.com/backend-services" class="external">Telerik Backend Services</a></p>'
							
				};
				/* create and bind View to ViewModel */
				var view = new kendo.View(viewHTML, {
					model: viewModel
				});
				return view;
			});
	}

	scope.home = {
		init: initView
	};
}(window.views));