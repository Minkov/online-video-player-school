(function (scope) {

	function loadView(name) {
		var promise = new RSVP.Promise(
			function (resolve, reject) {
				var path = 'scripts/views/' + name + '/' + name + '.html';
				$.ajax({
					url: path,
					success: function (html) {
						resolve(html);
					},
					error: function (err) {
						reject(err);
					}
				});
			});
		return promise;
	}

	scope.loader = {
		loadView: loadView
	};
}(window));