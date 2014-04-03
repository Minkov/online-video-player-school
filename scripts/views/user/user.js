(function (scope) {
	'use strict';

	function initView() {
		/* load HTML */
		return loader.loadView('user')
			.then(function (viewHTML) {
				/* create ViewModel */
				console.log('View: User');
				var viewModel = kendo.observable({
					title: 'Login or register user',
					loginVisible: true,
					registerVisible: false,
					username: 'SampleUser',
					displayname: '',
					password: '123456q',
					login: function () {
						//TODO: validation
						var username = viewModel.get('username'),
							password = viewModel.get('password');
						persister.users.login(username, password)
							.then(function () {
								console.log('user logged in');
								window.location.href = '#/';
							});
					},
					register: function () {
						var username = viewModel.get('username'),
							displayname = viewModel.get('displayname'),
							password = viewModel.get('password');
						persister.users.register(username, displayname, password)
							.then(function () {
								return persister.users.login(username, password);
							})
							.then(function () {
								console.log('user logged in');
								window.location.href = '#/';
							});
					},
					switchForm: function (ev) {
						var type = ev.target.getAttribute('data-type'),
							loginVisibleValue = (type === 'login') ? true : false,
							registerVisibleValue = (type === 'register') ? true : false;
						viewModel.set('loginVisible', loginVisibleValue);
						viewModel.set('registerVisible', registerVisibleValue);
					}
				});

				/* create and bind View to ViewModel */
				var view = new kendo.View(viewHTML, {
					model: viewModel
				});
				return view;
			});
	}

	scope.user = {
		init: initView
	};
}(window.views));