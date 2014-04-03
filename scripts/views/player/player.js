window.views = window.views || {};
(function (scope) {
	'use strict';

	function findVideoById(videos, id) {
		console.log('----------------');
		for (var i = 0; i < videos.length; i += 1) {
			console.log(videos[i]);
			if (videos[i].Id === id) {
				return i;
			}
		}
		console.log('Id not found');
		console.log('----------------');
		return 0;
	}

	function initView(playlistId, videoId) {
		/* load HTML */
		var viewHTML;
		return loader.loadView('player')
			.then(function (responseViewHTML) {
				viewHTML = responseViewHTML;
				return persister.playlists.single(playlistId);
			})
			.then(function (playlist) {
				/* create ViewModel */
				var videoIndex = (videoId) ? findVideoById(playlist.videos, videoId) : 0;
				console.log(videoIndex);
				var viewModel = kendo.observable({
					id: playlist.Id,
				title: playlist.Title,
					videos: playlist.videos,
					currentVideo: playlist.videos[videoIndex]
				});
				/* create and bind View to ViewModel */
				var view = new kendo.View(viewHTML, {
					model: viewModel
				});
				return view;
			});
	}
	scope.player = {
		init: initView
	};
}(window.views));