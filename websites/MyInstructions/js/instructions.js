$("document").ready(function() {

	$("h2").hide();
	$("h3").hide();

	$("h1").click(function() {
		$("h2").animate({
			/* for font-size, can also use hide, show, or toggle
			 example "font-size: "toggle""*/
			"font-size" : "toggle",
		}, 1000, function() {

			$("h3").fadeToggle(1000);

		});

	});

	$("#pic").click(function() {

		$("#pic").after('<div><img class="imgCenter images" id="snow02" src="images/snowboard_2_600.png" alt="snowboard 2 600"></div>');

		$("#snow02").after('<h4 id="click03">Click here to see picture 3...</h4>');

	$("#click03").click(function() {

		$("#click03").after('<div><img class="imgCenter images" id="snow03" src="images/snowboard_3_600.png" alt="snowboard 3 600"></div>');

		$("#snow03").after('<h4 id="click04">Click here to see picture 4...</h4>');

	$("#click04").click(function() {

		$("#click04").after('<div><img class="imgCenter images" id="snow04" src="images/snowboard_4_600.png" alt="snowboard 4 600"></div>');

		$("#snow04").after('<h4 id="click05">Click here to see picture 5...</h4>');

	$("#click05").click(function() {

		$("#click05").after('<div><img class="imgCenter images" id="snow05" src="images/snowboard_5_600.png" alt="snowboard 5 600"></div>');
	});
	});
	});
});});

/*$(this).text("Clicked"); */

/*$("p").text("Clicked"); */

/*$("p").html('<b style="color:red;">Ouch!</b>You clicked me!');*/

/*$("#jq").html('<b style="color:red;">Ouch!</b>You clicked me!');*/

/*$("#jq").empty();8*/