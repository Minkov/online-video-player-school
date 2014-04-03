window.views = window.views || {};
(function (scope) {

	function normalizeUrl(originalUrl) {
		if (originalUrl.indexOf('youtube') >= 0) {
			var beginIndex = originalUrl.indexOf('v=');
			var id = originalUrl.substr(beginIndex + 'v='.length);
			var endIndex = id.indexOf('&');
			if (endIndex != -1) {
				id = id.substr(0, endIndex);
			}
			return '//www.youtube.com/embed/' + id + '?autoplay=1';
		} else {
			// TODO
		}
	}

	function initView(id) {
		/* load HTML */
		var viewHTML;
		return loader.loadView('playlist')
			.then(function (responseViewHTML) {
				viewHTML = responseViewHTML;
				return persister.playlists.single(id);
			})
			.then(function (playlist) {
				/* create ViewModel */
				var viewModel = kendo.observable({
					id: playlist.Id,
					title: playlist.Title,
					newTitle: '',
					newUrl: '',
					videos: playlist.videos,
					playerUrl: '#/player/' + playlist.Id,
					addVideo: function () {
					var title = viewModel.get('newTitle'),
							url = normalizeUrl(viewModel.get('newUrl')),
							playlistId = viewModel.get('id');
						persister.playlists.addVideo(id, {
							title: title,
							url: url
						})
							.then(function (videoId) {
								var title = viewModel.get('newTitle'),
									url = viewModel.get('newUrl'),
									newVideo = {
										Title: title,
										Playlist: viewModel.get('id'),
										Id: videoId
									};
								viewModel.get('videos').push(newVideo);

								viewModel.set('newTitle', '');
								viewModel.set('newUrl', '');
							});
					}
				});
				/* create and bind View to ViewModel */
				var view = new kendo.View(viewHTML, {
					model: viewModel,
					wrap: false
				});
				return view;
			});
	}

	scope.playlist = {
		init: initView
	};
}(window.views));