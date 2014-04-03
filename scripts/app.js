(function (scope) {
	'use strict';
	var layout,
		kendo = window.kendo,
		views = window.views,
		$ = window.$,
		userLoggedIn = false,
		navigationVisible = false,
		playlistsWidgetVisible = false,
		router = new kendo.Router({
			init: function (ev) {
				if (!persister.users.isOnline() && ev.url !== 'user' && ev.url !== 'user') {
					router.navigate('/user');
				}
			},
			change: function (ev) {
				if (persister.users.isOnline()) {
					if (!navigationVisible) {
						views.nav.init(navItems)
							.then(function (view) {
								console.log(view);
								layout.showIn('#main-nav', view);
								navigationVisible = true;
							});
					}
					if (!playlistsWidgetVisible) {
						views.playlists.init()
							.then(function (view) {
								layout.showIn('#playlists-widget', view);
								playlistsWidgetVisible = true;
							});
					}
				} else if (!persister.users.isOnline() && ev.url !== '/user' && ev.url !== 'user') {
					console.log('user not logged in');
					ev.preventDefault();
				}
			}
		}),
		navItems = [{
			title: 'Home',
			url: '#/'
		}, {
			title: 'Playlists',
			url: '#/playlists'
		}];

	router.route('/', function () {
		//Show HOME view
		console.log('---Home');
		views.home.init()
			.then(function (view) {
				//append to DOM
				layout.showIn('#page', view);
			});
	});

	router.route('/playlists', function (id) {
		views.playlists.init()
			.then(function (view) {
				//append to DOM
				layout.showIn('#page', view);
			});
	});

	router.route('/playlists/:id', function (id) {
		//Show SINGLE-PLAYLIST view
		console.log('---Single Playlist with id: ' + id);
		views.playlist.init(id)
			.then(function (view) {
				//append to DOM
				layout.showIn('#page', view);
			});
	});

	router.route('/player/:id', function (id) {
		//Show PLAYER view
		console.log('---Player for playlist');
		views.player.init(id)
			.then(function (view) {
				//append to DOM
				layout.showIn('#page', view);
			});
	});

	router.route('/player/:playlistId/play/:videoId', function (playlistId, videoId) {
		console.log('---Player for playlist with id \'' + playlistId + '\'');
		views.player.init(playlistId, videoId)
			.then(function (view) {
				//append to DOM
				layout.showIn('#page', view);
			});
	});

	router.route('/user', function () {
		console.log('---User login form');
		views.user.init()
			.then(function (view) {
				//append to DOM
				layout.showIn('#page', view);
			});
	});

	function appStart() {
		views.layout.init()
			.then(function (theLayout) {
				//init the layout
				layout = theLayout;
				layout.render('#root');
				router.start();
			});
	}

	scope.app = {
		start: appStart
	};
}(window));