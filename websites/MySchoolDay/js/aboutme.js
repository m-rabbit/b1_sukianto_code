$(document).ready(function() {
	
	$("#aboutmeinfo").hide();
	
	$("#aboutmebutton").click(function() {
		$("#aboutmeinfo").fadeToggle(500);
	});
	
	$(".mousechange").mouseenter(function() {
		$(this).css("font-size", "5em");
		$(this).css("color", "#0000FF");
	});
	
	$(".mousechange").mouseleave(function() {
		$(this).css("font-size", "4em");
		$(this).css("color", "#FFFFFF");
	});
});
