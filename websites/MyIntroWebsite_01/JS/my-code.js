$(document).ready(function() {

	$("p").hide();
	
	$("#favPic").hide();
	
	$("h1").click(function() {
		$(this).next().fadeToggle(500);
	});
	
	$("h2").click(function() {
		$(this).next().fadeToggle(500);
	});

});
