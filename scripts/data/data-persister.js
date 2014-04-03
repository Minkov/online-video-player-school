(function (scope) {
	'use strict';
	var apiKey = '7KYx6zXDsKYhGCWS',
		app = new Everlive(apiKey),
		currentUserId = '',
		isUserLoggedIn = false;

	function addPlaylist(title) {
		return app.data('Playlists')
			.create({
				Title: title
			})
			.then(function (data) {
				return data.result.Id;
			});
	}

	function getVideos(playlistId) {
		return app.data('Videos').get({
			Playlist: playlistId
		})
			.then(function (data) {
				return data.result;
			});
	}

	function getPlaylists() {
		if (!isUserLoggedIn) {
			var promise = new RSVP.Promise(function (resolve, reject) {
				resolve([]);
			});
			return promise;
		} else {
			console.log('Persister: get playlists for user with ID: ' + currentUserId);
			return app.data('Playlists').get({
				CreatedBy: currentUserId
			})
			//return app.data('Playlists').get()
			.then(function (data) {
				console.log('Persister: playlists got for user with ID: ' + currentUserId);
				return data.result;
			});
		}
	}

	function getPlaylistById(id) {
		var playlist;
		return app.data('Playlists').getById(id)
			.then(function (data) {
				playlist = data.result;
				console.log(id);
				return getVideos(id);
			})
			.then(function (videos) {
				playlist.videos = videos;
				return playlist;
			});
	}

	function addVideoForPlaylist(playlistId, video) {
		return app.data('Videos')
			.create({
				Title: video.title,
				Url: video.url,
				Playlist: playlistId
			})
			.then(function (data) {
				return data.result.Id;
			});
	}

	function loginUser(username, password) {
		return app.Users.login(username, password)
			.then(function (user) {
				isUserLoggedIn = true;
				console.log(user);
				return app.Users.currentUser();
			})
			.then(function (user) {
				currentUserId = user.result.Id;
				return username;
			});
	}

	function registerUser(username, displayname, password) {
		return app.Users.register(username, password, {
			DisplayName: displayname
		})
			.then(function () {
				return username;
			});
	}

	function logoutUser() {
		return app.Users.logout()
			.then(function () {
				currentUserId = '';
				isUserLoggedIn = false;
			});
	}

	function isUserOnline() {
		return isUserLoggedIn;
	}


	scope.persister = {
		playlists: {
			add: addPlaylist,
			all: getPlaylists,
			single: getPlaylistById,
			addVideo: addVideoForPlaylist
		},
		users: {
			login: loginUser,
			register: registerUser,
			logout: logoutUser,
			isOnline: isUserOnline
		}
	};
}(window));