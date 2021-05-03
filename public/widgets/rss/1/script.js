/***
 * usage Example:
 * Url = http://rss.cnn.com/rss/edition.rss
 * var rssUrl = atob(rssUrl)
 *
 * // Final URL =
 * 	var HOST = `https://digitaldot.vercel.app`
 * 	var finalUrl = `${HOST}/widgets/rss/1/?rssUrl=${rssUrl}`
 *
 */
$(document).ready(function ($) {

	const documentHeight = $(document).height();
	const documentWidth = $(document).width();
	$('body').css({
		'width': `${documentWidth}px`,
		'height': `${documentHeight}px`,
	});

	$('#jssor_1').css({
		'width': `${documentWidth}px`,
		'height': `${documentHeight}px`,
	});

	$('#slides_container').css({
		'width': `${documentWidth}px`,
		'height': `${documentHeight}px`,
	});

	$('#thumb_container').css({
		'width': `${documentWidth}px`,
		'height': `${documentHeight}px`,
	});

	$('#thumb_prototype').css({
		'width': `${documentWidth}px`,
		'height': `${documentHeight / 4}px`,
	});
});


window.jssor_1_slider_init = function () {
	var jssor_1_options = {
		$AutoPlay: 1,
		$Idle: 1000,
		$PauseOnHover: 0,
		$SlideDuration: 100,
		$ThumbnailNavigatorOptions: {
			$Class: $JssorThumbnailNavigator$,
			$Rows: 1,
			$SpacingX: 1,
			$SpacingY: 1,
			$Orientation: 2,
			$Align: 1
		}
	};

	new $JssorSlider$("jssor_1", jssor_1_options);
};

// NOTE:: Add "alt" class to "blog-card" inorder to place image on right
// const HOST_URL = "https://digitaldot.vercel.app";
const HOST_URL = "";

const getImageFromRssItem = (rssItem) => {
	let image = '';
	if (rssItem["media:group"] && rssItem["media:group"]["media:content"] && rssItem["media:group"]["media:content"].length) {
		image = rssItem["media:group"]["media:content"][0]['$'].url;
	}

	return image;
}

const getRssFromUrl = (rssUrl) => fetch(`${HOST_URL}/api/rss/${rssUrl}`)
	.then(response => response.json())
	.then(data => {
		const items = data.items;
		items.forEach(item => {
			let jslide = `<div>
				<div data-u="thumb">
					<div class="blog-card">
						<div class="meta">
							<div class="photo" style="background-image: url(${getImageFromRssItem(item)})"></div>
						</div>
						<div class="description">
							<h1>${item.title}</h1>
							<h2>${item.pubDate}</h2>
							<p>${item.description}</p>
							<p class="read-more"><a target="_blank" href="${item.link}">Read More</a></p>
						</div>
					</div>
				</div>
			</div>`;

			const slidesEle = document.querySelector('#slides_container');
			slidesEle.insertAdjacentHTML('beforeend', jslide);

		})
		jssor_1_slider_init();
	}).catch((err) => {
		console.log("🚀 ~ file: index.html ~ line 314 ~ getRssFromUrl ~ err", err)
	})


const urlParams = new URLSearchParams(window.location.search);
const rssUrl = urlParams.get('rssUrl');

let decodedRssUrl = atob(rssUrl);


const finalRssUrl = encodeURIComponent(decodedRssUrl);
getRssFromUrl(finalRssUrl)
