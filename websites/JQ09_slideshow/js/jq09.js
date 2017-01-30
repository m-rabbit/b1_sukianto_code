$(document).ready(function() {
	var imageName = ["images/floatingball.gif", "images/redball.gif", "images/eightball.gif"];
	var imageText = [
	"This is the floatingball",
	"This is the redball",
	"This is the eightball",
	];
	var indexNum = 0;
	
	$("#picture").click(function(){
		$("#picture").fadeOut(500, function() {
			$("#picture").attr("src", imageName[indexNum]);
			$("#picturetext").text(imageText[indexNum]);
			indexNum++;
			if (indexNum > 2) {
				indexNum = 0;
			}
			$("#picture").fadeIn(500);
		});
	});

	$("#btnadd").on("click", function(){
		//parseInt tells the program these values are integers
		//parseFloat tells the program these are decimal numbers
		//val() means read the form box
		//val(something) means write to the form box
		//alert is a pop-up box 
		var n1 = parseFloat($("#txtn1").val()); //decimal numbers
		var n2 = parseFloat($("#txtn2").val());
		//var n1 = parseInt($("#txtn1").val()); //Integers
		//var n2 = parseInt($("#txtn2").val());
		//var n1 = $("#txtn1").val(); //String
		//var n2 = p$("#txtn2").val();
		var r = n1 + n2;
		alert("addition result is " + r);
		$("#result").val(r);
		//return false means no carry over to other functions
		return false;	
	
	
	});//addition close
	
	$("#btnsub").on("click", function(){
		//parseInt tells the program these values are integers
		//parseFloat tells the program these are decimal numbers
		//val() means read the form box
		//val(something) means write to the form box
		//alert is a pop-up box 
		var n1 = parseFloat($("#txtn1").val());
		var n2 = parseFloat($("#txtn2").val());
		var r = n1 - n2;
		alert("subtraction result is " + r);
		$("#result").val(r);
		//return false means no carry over to other functions
		return false;	
	
	
	});//subtraction close
	
	$("#btnmultiply").on("click", function(){
		//parseInt tells the program these values are integers
		//parseFloat tells the program these are decimal numbers
		//val() means read the form box
		//val(something) means write to the form box
		//alert is a pop-up box 
		var n1 = parseFloat($("#txtn1").val());
		var n2 = parseFloat($("#txtn2").val());
		var r = n1*n2;
		alert("multiplication result is " + r);
		$("#result").val(r);
		//return false means no carry over to other functions
		return false;	
	
	
	});//multiply close
	
	$("#btndivision").on("click", function(){
		//parseInt tells the program these values are integers
		//parseFloat tells the program these are decimal numbers
		//val() means read the form box
		//val(something) means write to the form box
		//alert is a pop-up box 
		var n1 = parseFloat($("#txtn1").val());
		var n2 = parseFloat($("#txtn2").val());
		if(n2 == 0) {
			alert("Divide by zero");
			return;
		}
		var r = n1/n2;
		alert("division result is " + r);
		$("#result").val(r);
		//return false means no carry over to other functions
		return false;	
	
	
	});//multiply close
	$("#btnclear").on("click", function(){
		$("#txtn1").val("");
		$("#txtn2").val("");
		$("#result").val("");
		$("#txtn1").focus(); //return focus to the first number box
		return false;
	});//add clear close
});
//doc ready

/*
 * // text() READS what is there
 var hText = $("head1").text();
 var text1 ="The heading text is";
 var text2 = text1 + hText;
 //
 $("p").text(text2);
 $("p").eq(pIndex).css("background-color", "red");
 */

/*
 *
 * var imageName = [
 "images/floatingball.gif",
 "images/redball.gif",
 "images/eightball.gif"

 ];
 var pIndex = 0;

 $("#topToBottom").click(function() {
 $("p").css("background-color", "yellow");
 $("p").eq(pIndex).css("background-color", "red");
 pIndex++;
 if(pIndex > 2) {
 pIndex = 0;
 }

 }); //topToBottom

 $("#bottomToTop").click(function() {
 $("p").css("background-color", "yellow");
 $("p").eq(pIndex).css("background-color", "red");
 pIndex--;
 if(pIndex < 0) {
 pIndex = 2;
 }

 }); //topToBottom
 
 
 $("#picture").click(function() {
		$("#picture").attr("src", imageName[indexNum]);
		indexNum++;
		if (indexNum > 2) {
			indexNum = 0;
		}
	});
 *
 *
 *
 *
 *
 *
 */