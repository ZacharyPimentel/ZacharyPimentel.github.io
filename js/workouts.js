//this is an array of workouts used in the fitness.html page

let specificWorkouts = [
	{
		title: "Warmup/Abs",
		id: "warmup-abs",
		numberOfMoves: 8,
		lengthOfMove: 30,
		lengthOfRest: 0,
		customizable: true,
		moves: {
			move1: {
				name: "Plank Toe Touch",
				description: false,
				sets: false,
				reps: false,
			},
			move2:{
				name: "Lunge Twist",
				description: false,
				sets: false,
				reps: false,
			},
			move3:{
				name: "Russian Twist",
				description: false,
				sets: false,
				reps: false,
			},
			move4:{
				name: "Plank Dips",
				description: false,
				sets: false,
				reps: false,
			},
			move5:{
				name: "Plank Taps",
				description: false,
				sets: false,
				reps: false,
			},
			move6:{
				name: "Side Plane",
				description: false,
				sets: false,
				reps: false,
			},
			move7:{
				name: "Side V Ups",
				description: false,
				sets: false,
				reps: false,
			},
			move8:{
				name: "Plank",
				description: false,
				sets: false,
				reps: false,
			},
		},//end moves
	},//end workout
	{
		title: "Day 1 - Leg Band Day",
		id: "michee-legs", //"day1-legs-check",
		numberOfMoves: 8,
		lengthOfMove: 0,
		lengthOfRest: 60,
		customizable: false,
		moves: {
			move1: {
				name: "Half Squat Side Steps",
				description: false,
				sets: 4,
				reps: 20,
			},
			move2:{
				name: "Jumping Jacks",
				description: false,
				sets: 4,
				reps: 25,
			},
			move3:{
				name: "Jump Squats",
				description: false,
				sets: 4,
				reps: 25,
			},
			move4:{
				name: "Glute Bridge to Toe Touch",
				description: false,
				sets: 4,
				reps: 16,
			},
			move5:{
				name: "From Abductions",
				description: false,
				sets: 4,
				reps: 20,
			},
			move6:{
				name: "Plank Glute Kickbacks",
				description: false,
				sets: 4,
				reps: 20,
			},
			move7:{
				name: "Half Squat Reverse Stepback",
				description: false,
				sets: 4,
				reps: 16,
			},
			move8:{
				name: "Pulse Squat",
				description: false,
				sets: 4,
				reps: 30,
			},
		},//end moves
	}, //end workout

	//1UP WORKOUTS_______________________________________________________________
	{
		title: "1UP - Week 1 Monday",
		id:"1up-wk1-mon",
		numberOfMoves: 11,
		lengthOfMove: false,
		lengthOfRest: false,
		customizable:false,
		moves: {
			move1: {
				name: "Biceps Curl",
				description: "Static Hold: Every 5th Rep, conplete a 5 second static hold at the top of the movement",
				sets: 3,
				reps: "12-15",
			},
			move2:{
				name: "Triceps Kickback",
				description: false,
				sets: 4,
				reps: "12-15",
			},
			move3:{
				name: "Hammer Curl",
				description: false,
				sets: 4,
				reps: "12-15",
			},
			move4:{
				name: "Overhead Triceps Extension",
				description: false,
				sets: 4,
				reps: "12-15",
			},
			move5:{
				name: "Concentration Curls",
				description: "Partial Reps: 4 sets, Complete x12 Full Reps, then immediately complete x6 '1/2' Reps at the bottom of movement",
				sets: 3,
				reps: "10-12",
			},
			move6:{
				name: "Triceps Dips",
				description: false,
				sets: 4,
				reps: "20",
			},
			move7:{
				name: "Weighted Sit-ups",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move8:{
				name: "Side Bend",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move9:{
				name: "Russian Twist",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move10:{
				name: "Elbow Plank",
				description: false,
				sets: 5,
				reps: "1 Min Hold",
			},
			move11:{
				name: "Side Plank",
				description: false,
				sets: 5,
				reps: "1 Min Hold",
			},		
		},//end moves
	},//end workout
	{
		title: "1UP - Week 1 Wednesday",
		id:"1up-wk1-wed",
		numberOfMoves: 10,
		lengthOfMove: false,
		lengthOfRest: false,
		customizable:false,
		moves: {
			move1: {
				name: "Wide Row",
				description: false,
				sets: 4,
				reps: "10-12",
			},
			move2:{
				name: "Dumbell Dead Lift",
				description: false,
				sets: 4,
				reps: "12-15",
			},
			move3:{
				name: "Kneeling One Arm Row",
				description: "Pick a Heavy Weight : 8-10 reps, immediately pick a Lighter Weight: 8-10 reps",
				sets: 4,
				reps: "8-10",
			},
			move4:{
				name: "Dumbell Pullover",
				description: false,
				sets: 4,
				reps: "12-15",
			},
			move5:{
				name: "Narrow Row",
				description: "Pick a heavy weight: 8-10 reps, immediately pick a lighter weight: 8-10 reps",
				sets: 4,
				reps: "8-10",
			},
			move6:{
				name: "Weighted Sit-ups",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move7:{
				name: "Side Bend",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move8:{
				name: "Russian Twist",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move9:{
				name: "Elbow Plank",
				description: false,
				sets: 5,
				reps: "1 Min Hold",
			},
			move10:{
				name: "Side Plank",
				description: false,
				sets: 5,
				reps: "1 Min Hold",
			},		
		},//end moves
	},//end workout
	{
		title: "1UP - HITT Cardio",
		id:"1up-hitt",
		numberOfMoves: 12,
		lengthOfMove: 60,
		lengthOfRest: 0,
		customizable:true,
		moves: {
			move1: {
				name: "Predator Jack (Drop down in open squat)/Seal Jack",
				description: false,
				sets: false,
				reps: false,
			},
			move2:{
				name: "High Plank Hot Hands / from Knees",
				description: false,
				sets: false,
				reps: false,
			},
			move3:{
				name: "One leg Pogo Jumps/ Pogo Jumps",
				description: false,
				sets: false,
				reps: false,
			},
			move4:{
				name: "Double Crab Kick / Crab Kicks",
				description: false,
				sets: false,
				reps: false,
			},
			move5:{
				name: "High Knee + Burpee / Run in place + Mod Burpee",
				description: false,
				sets: false,
				reps: false,
			},
			move6:{
				name: "T Rotations / From Knees",
				description: false,
				sets: false,
				reps: false,
			},
			move7:{
				name: "Split Squat Jump / Split Switch Jump",
				description: false,
				sets: false,
				reps: false,
			},
			move8:{
				name: "Bear Plank Walkout / Bear Plank Step Backs",
				description: false,
				sets: false,
				reps: false,
			},
			move9:{
				name: "Speed Bag Forward & Back Run / Speed Bag + Run in place",
				description: false,
				sets: false,
				reps: false,
			},
			move10:{
				name: "Knee Tuck / Squat Jump",
				description: false,
				sets: false,
				reps: false,
			},	
			move11:{
				name: "Jump Squat",
				description: false,
				sets: false,
				reps: false,
			},		
			move12:{
				name: "Jumping Jacks",
				description: false,
				sets: false,
				reps: false,
			},			
		},//end moves
	},//end workout
	{
		title: "1UP - Week1 Friday",
		id:"1up-wk1-fri",
		numberOfMoves: 11,
		lengthOfMove: false,
		lengthOfRest: false,
		customizable:false,
		moves: {
			move1: {
				name: "Incline Push-Ups",
				description: false,
				sets: 4,
				reps: "20",
			},
			move2:{
				name: "Decline Push Ups",
				description: false,
				sets: 4,
				reps: "20",
			},
			move3:{
				name: "Dumbbell Push-Ups",
				description: false,
				sets: 4,
				reps: "20",
			},
			move4:{
				name: "Floor Press",
				description: false,
				sets: 4,
				reps: "12-15",
			},
			move5:{
				name: "Jumping Lunges",
				description: false,
				sets: 4,
				reps: "20",
			},
			move6:{
				name: "Sidestep Wide Squat",
				description: false,
				sets: 4,
				reps: 20,
			},
			move7:{
				name: "Weighted Sit-ups",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move8:{
				name: "Side Bend",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move9:{
				name: "Russian Twist",
				description: false,
				sets: 4,
				reps: "15-20",
			},
			move10:{
				name: "Elbow Plank",
				description: false,
				sets: 5,
				reps: "1 Min Hold",
			},
			move11:{
				name: "Side Plank",
				description: false,
				sets: 5,
				reps: "1 Min Hold",
			},		
		},//end moves
	},//end workout
]//end specific workouts array