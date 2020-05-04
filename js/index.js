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

//when the reset button is clicked, it empty's the contents of the timer input and stops the timer
//it also clears the values in the workout object
function resetFunctionality(resetBtn){
	$(resetBtn).click(function(){
		workout.totalWorkoutTime = 0;
		workout.remainingWorkoutTime = 0;
		workout.numberOfMoves = 0;
		workout.lengthOfMove = 0;
		workout.lengthOfRest = 0;
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
		$("#current-timer").html(" ");

		moveNumber = 1;
	});
}

//SUBMIT BUTTON STUFF
//takes form info and adds it to an object for later reference
function submitFunctionality(submitButton){
	submitButton.click(function(event){
		event.preventDefault(); //prevents page reload

		//targetting all the submitted data
		let $numberOfMoves = parseInt($('#number-of-moves')[0].value,10);
		let $lengthOfMove = parseInt($('#length-of-move')[0].value,10);
		let $lengthOfRest = parseInt($('#rest-time')[0].value,10);
		let $totalWorkoutTime = ($numberOfMoves*$lengthOfMove)+($numberOfMoves*$lengthOfRest) - $lengthOfRest;

		//adds the form info to the workout object for reference
		workout.numberOfMoves = $numberOfMoves;
		workout.lengthOfMove = $lengthOfMove;
		workout.lengthOfRest = $lengthOfRest;
		workout.totalWorkoutTime = $totalWorkoutTime;
		workout.remainingWorkoutTime = $totalWorkoutTime;
		workout.currentMoveTime = $lengthOfMove;
		workout.currentRestTime = $lengthOfRest;

		//makes the timer the total workout time if it's > 0 and a number
		if($.isNumeric($totalWorkoutTime) && $totalWorkoutTime >= 0){

			$("#timer").val(convertTimeToMinutes($totalWorkoutTime));
		}else{
			$("#timer").val("Error! Try again.");
		}
		
		//clears the input boxes
		$('#number-of-moves').val(" ");
		$('#length-of-move').val(" ");
		$('#rest-time').val(" ");

		//unchecks any autofill checkboxes
		for(let i = 0 ; i< $('.workout-check').length ; i++){
			if($('.workout-check')[i].checked){
				submitWorkout($('.workout-check')[i].id) //will display the infomation corresponding to that workout ID
			}
			$('.workout-check')[i].checked = false;
		}

	});
}

function submitWorkout(workoutID){
	//declare the index of the specific workout in the specific workouts array
	let specificWorkoutIndex

	//matches the id inputted to the index of the specific workout in the array to make sure the proper workout is targetted
	for(let i = 0 ; i < specificWorkouts.length ; i++){
		if(specificWorkouts[i].id == workoutID){
			specificWorkoutIndex = i;
		}
	}

	let currentWorkout = specificWorkouts[specificWorkoutIndex]; //just made this for clarity later on

	$("#workout-list").empty(); //empties the workout move list before adding new stuff

	for(let i = 0 ; i < currentWorkout.moveList.length ; i++){
		$("#workout-list").append(`<li class="workout-move">${currentWorkout.moveList[i]}</li>`) //appends list item with move name

	}
	
	$(".workout-move").append(moveFinishedBtn());

	$(".workout-move-check").click(function(){
		if(this.checked){
			$(this).parent().css("background-color","grey")
		}else{
			$(this).parent().css({ 'background-color' : '', 'opacity' : '' });
		}
	})

	if(currentWorkout.reps != false){

		$(".workout-move").append(setsRepsCounter(currentWorkout))
		for(let i=0 ; i<currentWorkout.reps.length ; i++){
			let currentRepCounter = $(".rep-counter")[i];
			$(currentRepCounter).html(`Number of Reps: ${currentWorkout.reps[i]}`);
		}
	}

	$("#current-timer").html(`${currentWorkout.lengthOfMove}`);
	$("#current-workout").css('max-height','1500px');

	presetWorkout = currentWorkout;
}

function moveFinishedBtn(){
	let finishedBtn = '<input class="workout-move-check" type="checkbox">'
	return finishedBtn;
}

function setsRepsCounter(currentWorkout){
	let setsRepsDiv = $('<div id="sets-reps-div"></div>')[0];
	let ul = $('<ul> </ul')[0];
	for(let i=0 ; i<currentWorkout.sets; i++){
		$(ul).append(`<li>${'<input type="checkbox">'}</li>`);
	}
	console.log(ul)
	let p1 = `<p class="rep-counter"></p>`;
	let p2 = `<p>Sets</p>`;

	$(setsRepsDiv).append(p2)
	$(setsRepsDiv).append(ul);
	$(setsRepsDiv).append(p1)
	
	console.log(setsRepsDiv)
	return setsRepsDiv;
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

function presetWorkoutUpdate(workoutMoves){
	let currentMoveTime = workout.totalWorkoutTime - workout.remainingWorkoutTime;
	console.log(currentMoveTime);
	let currentWorkoutTime = 0;
	let currentIndex = 0;
	let isResting;
	console.log(currentIndex)
	if(currentIndex == 0){
		isResting = false;
	}

	console.log(isResting)
	if(isResting == false ){
		if(currentMoveTime == workout.lengthOfMove){ //if the time = the length of a move
			console.log("first move finished, rest");
			//update the list
			//stop highlighting the current move
			//dim the list
			//cross out the current move
			currentWorkoutTime += workout.lengthOfMove;
			currentMoveTime = 0;
			isResting = true;
			currentIndex += 1;
			console.log(currentIndex)
		}
	}else if(isResting == true){
		if(currentMoveTime == workout.lengthOfRest){
			console.log("rest over, next move");
			currentWorkoutTime += workout.lengthOfRest;
			currentMoveTime = 0;
			isResting = false;
		}
	}
	

}


//START AND PAUSE BUTTON FUNCTIONALITY
//will pause the timer if the pause button is pressed or if the remaining workout time is 0
function startPauseFunctionality(startBtn){
	startBtn.click(function(){
		if(startBtn.html() == "Start"){ //if the button text is start
			//changes seconds to minutes
			if($("#timer")[0].value.includes(":")){
				let minutesSeconds = $("#timer")[0].value.split(":");
				let onlySeconds = parseInt((minutesSeconds[0]*60),10) + parseInt(minutesSeconds[1],10);
				workout.remainingWorkoutTime = onlySeconds;
			}else{
				workout.remainingWorkoutTime = $("#timer")[0].value; //set remaining workout time to whatever is in the timer input
			}


			if(workout.remainingWorkoutTime >= 1){ //if workout time is > 1 second
				startBtn.html("Pause"); //change button text
				interval = setInterval(function(){ //start a timer which checks every second

					let currentWorkoutTime = workout.totalWorkoutTime - workout.remainingWorkoutTime +1;

					console.log(currentWorkoutTime);


					if(workout.remainingWorkoutTime >= 1){

						//highlights the current move
						let $currentMoveLI = $("#workout-list").children()[moveNumber-1];

						
						
						if(currentWorkoutTime <= workout.lengthOfMove){
							$("#current-move").html($($currentMoveLI).html()); 
							$("#current-move input").remove();
							$($currentMoveLI).css("border","10px solid yellow");
						}

						//when a move has finished
						if(currentWorkoutTime == workout.lengthOfMove || currentWorkoutTime == workout.lengthOfMove + ((workout.lengthOfMove + workout.lengthOfRest)*(moveNumber-1))){
							$($currentMoveLI).css("background-color","grey");
							$($currentMoveLI).css("border","1px solid #15325c");
							moveNumber += 1;
							if(workout.lengthOfRest != 0){
								$("#current-move").html("Rest");

								$("#current-timer").html(workout.currentRestTime + 1);
								workout.currentMoveTime = workout.lengthOfMove;
							}

							if(workout.lengthOfRest == 0){
								$($currentMoveLI).next().css("border","10px solid yellow");
								$("#current-timer").html(workout.lengthOfMove + 1);
							}
							

						//when a rest has finished
						}else if(currentWorkoutTime == (workout.lengthOfMove+workout.lengthOfRest)*(moveNumber-1)){
							console.log("start next move");
							$($currentMoveLI).css("border","10px solid yellow");
							$("#current-move").html($($currentMoveLI).html());

							$("#current-timer").html(workout.lengthOfMove + 1);
							workout.currentRestTime = workout.lengthOfRest;
						}

						workout.remainingWorkoutTime = workout.remainingWorkoutTime -1; //subtract 1s from the remaining workout time
						let moveTime = $("#current-timer").html()
						if(moveTime <= 4){
							$("#beep").trigger("play");
						}
						console.log(moveTime);
						$("#current-timer").html(moveTime - 1);


						$("#timer")[0].value = convertTimeToMinutes(workout.remainingWorkoutTime); //workout.remainingWorkoutTime;   //set the timer input value to the new remaining workout time


						if($("#workout-list").children().length > 0){//CHECKS IF THERE IS PLANNED WORKOUT
							//run function which does all the colors and timings and removings of moves
							// presetWorkoutUpdate(presetWorkout.moveList);
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

function convertTimeToMinutes(timeInSeconds){
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

//takes any checkbox and will fill out the workout form automatically based on information in the specific 'workouts' array
function autofillWorkoutForm(checkbox){
	for(let i = 0 ; i < specificWorkouts.length ; i++){
		console.log(specificWorkouts[i].id)
		console.log(this)
		if(specificWorkouts[i].id == this.id && this.checked){
			updateWorkoutInfo(specificWorkouts[i].numberOfMoves, specificWorkouts[i].lengthOfMove, specificWorkouts[i].lengthOfRest)
		}
		// else{
		// 	this.checked = false;
		// 	updateWorkoutInfo(" ", " ", "")
		// }
	}
}

//helper function to update the workout object's information
function updateWorkoutInfo(numberOfMoves,lengthOfMove,lengthOfRest){
	$('#number-of-moves').val(numberOfMoves);
	$('#length-of-move').val(lengthOfMove);
	$('#rest-time').val(lengthOfRest);
}

//Function changes the total workout time in the 'workout' object to the value of the timer input every keyup
function getTimerInputValue(){
	$('#timer').keyup(function(){
		if($("#timer")[0].value.includes(":")){
				let minutesSeconds = $("#timer")[0].value.split(":");
				let onlySeconds = parseInt((minutesSeconds[0]*60),10) + parseInt(minutesSeconds[1],10);
				workout.totalWorkoutTime = onlySeconds -1;
			}else{
				workout.totalWorkoutTime = parseInt(this.value,10); //set remaining workout time to whatever is in the timer input
			}

		
	})
}

//RUNS ON STARTUP

//Array which holds specific workout information for autopopulating the form
let specificWorkouts = [
	{
		title: "Warmup/Abs",
		id: "warmup-check",
		numberOfMoves: 8,
		lengthOfMove: 30,
		lengthOfRest: 0,
		sets: 1,
		reps: false,
		moveList: ["Plank Toe Touch","Lunge Twist","Russian Twist","Plank Dips","Plank Taps","Side Plane","Side V Ups","Plank"],
	},
	{
		title: "Day 1 - Leg Band Day",
		id: "day1-legs-check",
		numberOfMoves: 8,
		lengthOfMove: 0,
		lengthOfRest: 60,
		sets: 4,
		reps: [20,25,25,16,20,20,16,30],
		moveList: ["Half Squat Side Steps", "Jumping Jacks","Jump Squats","Glute Bridge to Toe Touch", "From Abductions","Plank Glute Kickbacks","Half Squat Reverse Stepback","Pulse Squat"],
	}
]

//Timer related variables
let interval;
let presetWorkout;
let moveNumber = 1;

//all submitted form data for the workout is stored here
let workout= {};

//added to the page on load
submitFunctionality($("#timer-submit"));
startPauseFunctionality($("#start-btn"));
resetFunctionality($('#reset-btn'));
let audio = document.getElementById("beep");
audio.volume = 0.5;

$(".workout-check").click(autofillWorkoutForm); //function will run when any checkbox with that class is clicked
$("#youtube-submit").click(handleYoutubeLink); //will run if youtube link submit button is pressed

//constantly running
getTimerInputValue();

convertTimeToMinutes(231)

