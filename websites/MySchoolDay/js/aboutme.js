$(document).ready(function() {
	
	$("#aboutmeinfo").hide();
	
	$("#aboutmebutton").click(function() {
		$("#aboutmeinfo").fadeToggle(500);
	});
});