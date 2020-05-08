//When navigation dropdown button is clicked, the nav items will appear

let navDropdownBtn = document.getElementById('dropdown-btn');
let navItemContainer = document.getElementById('nav-item-container');

navDropdownBtn.addEventListener('click', function() {
	if(navItemContainer.hidden){
		navItemContainer.hidden = false;
	}else{
		navItemContainer.hidden= true
	}
});

///////////////////////////////////////////////
//WORKOUT PAGE STUFF
///////////////////////////////////////////////

//FUNCTIONS

//START AND PAUSE BUTTON FUNCTIONALITY
//will pause the timer if the pause button is pressed or if the remaining workout time is 0
function startPauseFunctionality(startBtn){
	startBtn.click(function(){
		if(startBtn.html() == "Start"){ //if the button text is start

			if($("#timer")[0].value.includes(":")){
				let minutesSeconds = $("#timer")[0].value.split(":");
				let onlySeconds = parseInt((minutesSeconds[0]*60),10) + parseInt(minutesSeconds[1],10);
				currentWorkout.remainingWorkoutTime = onlySeconds;
			}else{
				currentWorkout.remainingWorkoutTime = $("#timer")[0].value; //set remaining workout time to whatever is in the timer input
			}


			if(currentWorkout.remainingWorkoutTime >= 1){ //if workout time is > 1 second
				startBtn.html("Pause"); //change button text
				interval = setInterval(function(){ //start a timer which checks every second
					
					let currentWorkoutTime = currentWorkout.totalWorkoutTime - currentWorkout.remainingWorkoutTime +1;

					//updates the progress bars
					$("#total-progress").css("width",`${100-(currentWorkout.remainingWorkoutTime/currentWorkout.totalWorkoutTime*100)}%`);
					$("#total-progress").html(`${Math.floor(100-(currentWorkout.remainingWorkoutTime/currentWorkout.totalWorkoutTime*100))}%`);


					if(isResting){
						$("#current-progress").css("width",`${(currentMoveTime / currentWorkout.lengthOfRest * 100)}%`)
						$("#current-progress").html(`${currentWorkout.lengthOfRest - currentMoveTime}`)
					}else{
						$("#current-progress").css("width",`${(currentMoveTime / currentWorkout.lengthOfMove * 100)}%`)
						$("#current-progress").html(`${currentWorkout.lengthOfMove - currentMoveTime}`)
					}
					
			

					if(currentWorkout.remainingWorkoutTime >= 1){
						console.log(isResting)
						//highlights the current move
						let $currentMoveLI = $("#workout-list").children()[moveNumber-1];
						
						if(currentWorkoutTime <= currentWorkout.lengthOfMove){
							$("#current-move").html($($currentMoveLI).html()); 
							$("#current-move input").remove();
							$($currentMoveLI).css("border","10px solid yellow");
						}

						//when a move has finished
						if(currentWorkoutTime == currentWorkout.lengthOfMove || currentWorkoutTime == currentWorkout.lengthOfMove + ((currentWorkout.lengthOfMove + currentWorkout.lengthOfRest)*(moveNumber-1))){
							$($currentMoveLI).css("background-color","grey");
							$($currentMoveLI).css("border","1px solid #15325c");
							moveNumber += 1;
							currentMoveTime = 0;

							$("#current-progress").css("width","0")

							if(currentWorkout.lengthOfRest != 0){
								$("#current-move").html("<h2>Rest</h2>");
								console.log("okay rest");
								$("#current-progress").html(`${currentWorkout.lengthOfRest}`)
								isResting = true;
							}

							if(currentWorkout.lengthOfRest == 0){
								$($currentMoveLI).next().css("border","10px solid yellow");
								console.log("no resting now!")
								$("#current-progress").html(`${currentWorkout.lengthOfMove}`)
								isResting = false;
							}
							

						//when a rest has finished
						}else if(currentWorkoutTime == (currentWorkout.lengthOfMove+currentWorkout.lengthOfRest)*(moveNumber-1)){
							console.log("start next move");
							$($currentMoveLI).css("border","10px solid yellow");
							$("#current-move").html($($currentMoveLI).html());
							$("#current-progress").html(`${currentWorkout.lengthOfMove}`)
							$("#current-progress").css("width","0")
							isResting = false;
							currentMoveTime = 0;
						}

						currentWorkout.remainingWorkoutTime = currentWorkout.remainingWorkoutTime -1; //subtract 1s from the remaining workout time
						$("#timer")[0].value = convertSecToMin(currentWorkout.remainingWorkoutTime); //workout.remainingWorkoutTime;   //set the timer input value to the new remaining workout time
						currentMoveTime += 1;

						//beep sound
						let moveTime = $("#current-progress").html()
						if(moveTime <= 3){
							$("#beep").trigger("play");
						}

					}else{ //if remaining workout time is 0, stop the timer
						clearInterval(interval);
						startBtn.html("Start");
						$("#timer")[0].value = " ";
					}
				},1000);
			}
		}else{ //change button text and stop timer
			startBtn.html("Start");
			clearInterval(interval);
		}
	});
}

//when the reset button is clicked, it empty's the contents of the timer input and stops the timer
//it also clears the values in the currentWorkout object
function resetFunctionality(resetBtn){
	$(resetBtn).click(function(){
		currentWorkout = {}
		$("#timer").val(" ");
		clearInterval(interval);
		$("#start-btn").html("Start");
		$("#current-workout").css("max-height","0px");
		setTimeout(function(){
			$("#workout-list").empty();
		},1000)
		$("#number-of-moves").val(" ");
		$("#length-of-move").val(" ");
		$("#rest-time").val(" ");
		$("#timer").removeAttr("disabled");
		$("#timer").css("background-color","#8ad6cc");
		$("#total-progress-bar").remove();
		$("#current-progress-bar").remove();
		$(".preset-btn").css("background-color","#fec9ca");
		$("#current-info").remove();
		isResting = false;
		currentMoveTime = 1;

		moveNumber = 1;
	});
}

//takes the submitted youtube link and displays it
//takes the 'id' part of the link and creates an embed link
function handleYoutubeLink(event){
	event.preventDefault(); //prevent page reload
	let $youtubeInput = $('#hitt-input')[0].value;

	let $youtubeInputArr = $youtubeInput.split(""); //splits link into array elements

	//makes sure the while loop will not go infinite in case of a mistype or bad link
	if($youtubeInputArr.indexOf("=") !== -1){

		while($youtubeInputArr[0] !== "="){ //removes array elements until it finds an "=" where the 'id' of the link starts
			$youtubeInputArr.shift();
		}
	
		$youtubeInputArr.shift(); //removes the "=" from the array

		$youtubeInput = $youtubeInputArr.join(""); //rejoins the array into a string, creating a string with only the link 'id'

		//sets the src of the submitted link as a proper embedded link
		$('#video-player').attr('src', "https://www.youtube.com/embed/" + $youtubeInput);
		$('#video-player').show(); //makes the video player visible
	}

}


//SUBMIT BUTTON STUFF
//takes form info and adds it to an object for later reference
function submitFunctionality(submitButton){
	submitButton.click(function(event){
		event.preventDefault(); //prevents page reload

		//targetting all the submitted data
		let numberOfMoves = parseInt($('#number-of-moves')[0].value,10);
		let lengthOfMove = parseInt($('#length-of-move')[0].value,10);
		let lengthOfRest = parseInt($('#rest-time')[0].value,10);
		let totalWorkoutTime = (numberOfMoves*lengthOfMove)+(numberOfMoves*lengthOfRest) - lengthOfRest;

		//adds the form info to the workout object for reference
		currentWorkout.numberOfMoves = numberOfMoves;
		currentWorkout.lengthOfMove = lengthOfMove;
		currentWorkout.lengthOfRest = lengthOfRest;
		currentWorkout.totalWorkoutTime = totalWorkoutTime;
		currentWorkout.remainingWorkoutTime = totalWorkoutTime;

		//makes the timer the total workout time if it's > 0 and a number
		if($.isNumeric(totalWorkoutTime) && totalWorkoutTime >= 0){

			$("#timer").val(convertSecToMin(totalWorkoutTime));
		}else{
			$("#timer").val("Error! Try again.");
		}
		
		//clears the input boxes
		submitWorkout(currentWorkout)
	});
}

function submitWorkout(currentWorkout){

	$("#workout-list").empty(); //empties the workout move list before adding new stuff

	$.each(currentWorkout.moves,function(index,value){
		$("#workout-list").append(`<li id=${index} class="workout-move"><h2>${value.name}</h2></li>`) //appends list item with move name
		$(`#${index}`).append(moveFinishedBtn());
		if(value.description){
			$(`#${index}`).append(`<p>${value.description}</p>`);
		}
		if(value.sets !== false || value.reps !== false){
			$(`#${index}`).append(setsRepsCounter(index,value));
		}
		
		$(`input[name="${index}"]`).click(function(){
			let finishedCheck = $(this).parent().parent().parent().siblings("input");
			if($(`input[name="${index}"]`).length == $(`input[name="${index}"]:checked`).length && $(finishedCheck).is(":not(:checked)")){
				finishedCheck.click();
			}
		})
		
	})

	$(".workout-move-check").change(function(){
		if(this.checked){
			$(this).parent().css("background-color","grey")
		}else{
			$(this).parent().css({ 'background-color' : '', 'opacity' : '' });
		}
	})
	
	$("#current-workout").css('max-height',getHeight($("#current-workout")));
	
}

function moveFinishedBtn(){
	let finishedBtn = '<input class="workout-move-check" type="checkbox">'
	return finishedBtn;
}

function setsRepsCounter(index,currentMove){
	let setsRepsDiv = $('<div id="sets-reps-div"></div>')[0];
	let ul = $('<ul> </ul')[0];
	for(let i=0 ; i<currentMove.sets; i++){
		$(ul).append(`<li><input type="checkbox" name="${index}"></li>`);
	}
	let p1 = `<p class="rep-counter">reps: ${currentMove.reps}</p>`;
	let p2 = `<p>Sets</p>`;

	$(setsRepsDiv).append(p2)
	$(setsRepsDiv).append(ul);
	$(setsRepsDiv).append(p1)

	return setsRepsDiv;
}
function convertSecToMin(timeInSeconds){
	//converts the time in seconds into seperate minutes and seconds variables
	let minutes = Math.floor(timeInSeconds/60);
	let seconds =  timeInSeconds - (minutes*60);
	
	//creates a time array with minutes and seconds
	//will add a 0 where needed, such as 3:'0'9 or 3:0'0'
	let time = [minutes,seconds];
	if(time[1] == 0){
		time[1] = 0+ "0";
	}else if(time[1] < 10){
		time[1] = "0" + time[1];
	}
	//returns a template literal of a nicely formatted time eg 3:14
	return `${time[0]}:${time[1]}`	
}

function convertMinToSec(timeInMinutes){
	let splitArray = timeInMinutes.split(":");
	let minutes = parseInt(splitArray[0]);
	let seconds = parseInt(splitArray[1]);
	let convertedTime = (minutes*60)+seconds;
	return convertedTime;
}

//Function changes the total workout time in the 'currentWorkout' object to the value of the timer input every keyup
function getTimerInputValue(){
	$('#timer').keyup(function(){
		if($("#timer")[0].value.includes(":")){
				let minutesSeconds = $("#timer")[0].value.split(":");
				let onlySeconds = parseInt((minutesSeconds[0]*60),10) + parseInt(minutesSeconds[1],10);
				currentWorkout.totalWorkoutTime = onlySeconds -1;
			}else{
				currentWorkout.totalWorkoutTime = parseInt(this.value,10); //set remaining workout time to whatever is in the timer input
			}

		
	})
}

function updateWorkout(currentWorkout){
	let totalWorkoutTime = (currentWorkout.numberOfMoves*currentWorkout.lengthOfMove)+(currentWorkout.numberOfMoves*currentWorkout.lengthOfRest) - currentWorkout.lengthOfRest;
	//adds the form info to the workout object for reference
	currentWorkout.totalWorkoutTime = totalWorkoutTime;
	currentWorkout.remainingWorkoutTime = totalWorkoutTime;

	//makes the timer the total workout time if it's > 0 and a number
	if($.isNumeric(totalWorkoutTime) && totalWorkoutTime >= 0){

		$("#timer").val(convertSecToMin(totalWorkoutTime));
	}else{
		$("#timer").val("Error! Try again.");
	}
}

//////////////
function presetSelect(clickedButton){
	//change bg color of the buttons to the default and change the selected one's bg color
	$(".preset-btn").css("background-color","#fec9ca");
	$(clickedButton).css("background-color","#fa999a");

	$(specificWorkouts).each(function(index,value){
		if(this.id == $(clickedButton).val()){
			currentWorkout = {}
			currentWorkout = specificWorkouts[index];
		}
	})

	//remove progress bars and current move div
	 	$("#current-info").remove();
	 	$("#total-progress-bar").remove();
	 	$("#current-progress-bar").remove();

	//if the workout is not customizable
	if(currentWorkout.customizable == false){
		//disables the input fields, enables the warning text, clears the inputs, closes customizer
		$("#customize-warning").show()
		$("#customize-container form input").attr("disabled","disabled");
	 	$("#customize-container form input").css("background-color","lightgrey");
	 	$("#customize-container form input[type='text']").val(" ");
	 	$("#preset-workout-container .dropdown").click(toggleCustomizer("close"));

	 	$("#timer-container").removeClass("sticky");
	
	}else{//if the workout IS customizable

		//open the customizer

		//enables the input fields, removes the warning text
		$("#customize-warning").hide()
		$("#customize-container form input").removeAttr("disabled");
	 	$("#customize-container form input").css("background-color","#fec9ca");
	 	
	 	//autofills the inputs if the workout is customizable
	 	$("#number-of-moves").val(currentWorkout.numberOfMoves);
	 	$("#length-of-move").val(currentWorkout.lengthOfMove);
	 	$("#rest-time").val(currentWorkout.lengthOfRest);

	 	let progressBar = "<div id='total-progress-bar' class='progess-bar'></div>";
	 	let progress = "<div id='total-progress' class='progress'>0%</div>";
	 	let infoDiv = "<div id='current-info'></div>"
	 	let currentMoveh1 = "<h1>Current Move</h1";
	 	let currentMoveh2 = "<h2 id='current-move'><h2>"
	 	//if the progress bar doesn't exist, make it
	 	if(!$("#total-progress-bar").length){
	 		$("#timer-container").append(progressBar);
	 		$("#total-progress-bar").append(progress);
	 		$("#timer-container").append(infoDiv);
	 		$("#current-info").append(currentMoveh1);
	 		$("#current-info").append(currentMoveh2);
	 		$("#current-move").append(`<h2>${currentWorkout.moves.move1.name}</h2>`);
	 		$("#timer-container").append("<div id='current-progress-bar' class='progess-bar'></div>");
	 		$("#current-progress-bar").append(`<div id='current-progress'class='progress'>${currentWorkout.lengthOfMove}</div>`);

	 	}

	 	
	 	
	 	$("#timer-container").addClass("sticky");
	}
	return currentWorkout
}

//will get the max height of all the elements nested inside the passed element 
//to make max-height transitions flow properly at any height
function getHeight(elements){
	let totalHeight = 0;
	$(elements).children().each(function(){
		let heightOfCurrentElement = $(this).outerHeight(true); //this will autocalculate the true height (margin and padding included)
		totalHeight += heightOfCurrentElement;
	});
	return (`${totalHeight}px`);
}

function toggleCustomizer(openOrClose){
	if(openOrClose == "close"){ //close customizer
		$("#customize-container").css("max-height","0"); //change height of customizer to 0
		$("#customizer-caret").removeClass("caret-down");
	
		customizerOpen = false; //toggle to false
	}else if(openOrClose == "open"){ //open customizer
		$("#customize-container").css("max-height", getHeight($("#customize-container")))
		$("#customizer-caret").addClass("caret-down");
		customizerOpen = true; //toggle to true
	}
}

//RUNS ON STARTUP

//Timer related variables
let currentWorkout = {};
let interval;
let moveNumber = 1;
let audio = document.getElementById("beep");
audio.volume = 0.4;
let isResting = false;
let currentMoveTime = 1;


//Variables
let customizerOpen = false;
let dropdownAnimationTime = "0.5s";

$(".dropdown").click(function(){
	if(customizerOpen){
		toggleCustomizer("close")
	}else{
		toggleCustomizer("open")
	}
	
});

////////////////
//Event Handlers
////////////////

//when a preset button is pressed, submit the workout using the data returned from presetSelect function
$("#preset-btn-container button").click(function(){
	submitWorkout(presetSelect(this));
	if(currentWorkout.customizable){
		$("#timer").css("background-color","#8ad6cc")
		$("#timer").removeAttr("disabled");
		updateWorkout(currentWorkout)
	}else{
		$("#timer").val(" ");
		$("#timer").attr("disabled","true");
		$("#timer").css("background-color","lightgrey")
	}
	
});

//when clicked, turns the timer format into seconds
$("#convert-to-sec").click(function(){
	let timerValue = $("#timer").val();
	$("#timer").val(convertMinToSec(timerValue));
	$(this).addClass('selected');
	$("#convert-to-min").removeClass("selected");
})

//when clicked, turns the timer format into minutes
$("#convert-to-min").click(function(){
	let timerValue = $("#timer").val();
	$("#timer").val(convertSecToMin(timerValue));
	$(this).addClass('selected');
	$("#convert-to-sec").removeClass("selected");
})

//closes customizer when close button is clicked
$("#close-preset").click(function(){
	toggleCustomizer("close");
})

//functionality for preset reset button
$("#reset-preset").click(function(){
	$("#customize-container form input").removeAttr("disabled");
	$("#customize-container form input[type='button']").val(" ")
	$("#customize-container form input").css("background-color","#fec9ca");
	$("#customize-warning").hide()
	$(".preset-btn").css("background-color","#fec9ca");
	currentWorkout = {};
})

//added to the page on load
submitFunctionality($("#timer-submit"));
startPauseFunctionality($("#start-btn"));
resetFunctionality($('#reset-btn'));

$("#youtube-submit").click(handleYoutubeLink); //will run if youtube link submit button is pressed

//constantly running
getTimerInputValue();