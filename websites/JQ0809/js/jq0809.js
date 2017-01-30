$(document).ready(function() {
	
	$("h1").click(function() {
		//$(this).css("background-color", "red");
		//$(this).add("p").add("h2").add("h3").css("background-color", "red");
		$("p").not(".second").css("background-color", "red");
	});
});
