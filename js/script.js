
var ranbefore = false;

$(document).ready(function() {
	if(/(public)\.php/i.exec(window.location.href)!=null) return;
	setTimeout(addShareListener, 1000);
});

function addShareListener() {
	if (!ranbefore) {
		addGlobalListener('.nav-files');
		addGlobalListener('.nav-sharingin');
		addGlobalListener('.nav-sharingout');
		addGlobalListener('.nav-sharinglinks');
		addGlobalListener('.name');
		addGlobalListener('.crumb');
		ranbefore = true;
	}
	$('.action-share').ready(function() {
		$('.action-share').click(function() {
			addListener('#linkCheckbox');
			setTimeout(replaceUrl, 750);
		});
	});
}

function addListener(o) {
	$(o).ready(function() {
		$(o).click(function() {
			setTimeout(replaceUrl, 750);
		});
	});
}

function addGlobalListener(o) {
	$(o).ready(function() {
		$(o).click(function() {
			setTimeout(addShareListener, 1000);
		});
	});
}

function replaceUrl() {
	if ($('#linkText').css('display') == 'block') {
		var curUrl = $('#linkText').val();
		$('#linkText').val('Please wait...');
		makeUrl(curUrl);
	}
}

function makeUrl(curUrl, partUrl) {
	//alert(OC.linkTo("shorten","ajax/makeurl.php"));
	//$.post(OC.linkTo("shorten","ajax/makeurl.php"), { curUrl: curUrl }, function (data) {
	$.post("/owncloud/index.php/apps/shorten/makeurl", { curUrl: curUrl }, function (data) {
		$('#linkText').val(data);
	});
}
