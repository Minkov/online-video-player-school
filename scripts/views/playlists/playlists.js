window.views = window.views || {};
(function (scope) {

	function initView() {
		/* load HTML */
		var viewHTML;
		return loader.loadView('playlists')
			.then(function (responseViewHTML) {
				viewHTML = responseViewHTML;
				return persister.playlists.all();
			})
			.then(function (playlists) {
				/* create ViewModel */
				var viewModel = kendo.observable({
					title: 'My Playlists',
					playlists: playlists,
					newTitle: '',
					addPlaylist: function () {
						var title = viewModel.get('newTitle');
					persister.playlists.add(title)
							.then(function (playlistId) {
								viewModel.get('playlists').push({
									Title: title,
									Id: playlistId
								});
							});
					},
					removePlaylist: function () {
						console.log(remove);
					}
				});

				/* create and bind View to ViewModel */
				var view = new kendo.View(viewHTML, {
					model: viewModel
				});
				return view;
			});
	}

	scope.playlists = {
		init: initView
	};
}(window.views));