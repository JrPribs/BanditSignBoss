var previewAttached = function(images) {

	var thumbnailContainer = function(thumbnail, caption) {
		caption = caption || ''
		return ['<div class="col-xs-6 col-md-3">',
			'<span class="thumbnail">',
			thumbnail,
			'</span>',
			'<div class="caption">',
			caption,
			'</div>',
			'</div>'
		].join('\n');

	};

	if (images.files) {

		$('#alert').html('<div id="img-preview-alert" class="alert alert-info" role="alert"></div>')
		$("#img-preview-alert").fadeTo(2000, 500).slideUp(500, function() {
			
		});

		for (var i = 0; i < images.files.length; i++) {
			$('#img-preview-alert').prepend(images.files[i].name)
			var reader = new FileReader();
			reader.onload = function(e) {
				var imagePreview = $('<img>');
				console.log(e);
				imagePreview
					.attr('src', e.target.result)
					.width(150)
					.height(200)
					.addClass('img-thumb');
				var container = $('<div/>');
				container.append(imagePreview);
				imagePreview = thumbnailContainer(container.html());
				$('.imagepreviews').prepend(imagePreview);

			};
			reader.readAsDataURL(images.files[i]);
		};
	}


};
