/////////////////////////////////////////////////////
//THIS SEARCH BOX FUNCTIONALITY USES ORIGINAL CODE
////////////////////////////////////////////////////

//Search bar is case insensitive
//When user types into search box, only photos that match the caption text will appear 


//The file name, title, and captions for each photo are stored in this array
var photoInfo = [
	{
		fileName:'01.jpg',
		title:'Hay Bales',
		caption: 'I love hay bales. Took this snap on a drive through the countryside past some straw fields.'
	},
	{
		fileName:'02.jpg',
		title:'Lake',
		caption:'The lake was so calm today. We had a great view of the snow on the mountains from here.'
	},
	{
		fileName:'03.jpg',
		title: 'Canyon',
		caption:'I hiked to the top of the mountain and got this picture of the canyon and trees below.'
	},
	{
		fileName:'04.jpg',
		title:'Iceberg',
		caption:'It was amazing to see an iceberg up close, it was so cold but didn’t snow today.'
	},
	{
		fileName:'05.jpg',
		title: 'Desert',
		caption:'The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons.'
	},
	{
		fileName:'06.jpg',
		title: 'Fall',
		caption:'Fall is coming, I love when the leaves on the trees start to change color.'
	},
	{
		fileName:'07.jpg',
		title: 'Plantation',
		caption:'I drove past this plantation yesterday, everything is so green!'
	},
	{
		fileName:'08.jpg',
		title: 'Dunes',
		caption:'My summer vacation to the Oregon Coast. I love the sandy dunes!'
	},
	{
		fileName:'09.jpg',
		title: 'Countryside Lane',
		caption:'We enjoyed a quiet stroll down this countryside lane.'
	},
	{
		fileName:'10.jpg',
		title:'Sunset',
		caption:'Sunset at the coast! The sky turned a lovely shade of orange.'
	},
	{
		fileName:'11.jpg',
		title:'Cave',
		caption:'I did a tour of a cave today and the view of the landscape below was breathtaking.'
	},
	{
		fileName:'12.jpg',
		title:'Bluebells',
		caption:'I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in.'
	},
];

//This function filters photos based on the text inputted in a text field.
//Filtered out photos are hidden from the page
function filterPhotos(){

	//gets text from the input field and stores it in all lowercase letters
	var inputText = document.getElementById("search-field").value.toLowerCase(); 

	var $numberOfPhotos = $(".photo-list img").length; //finds the number of photos

	var $photoList = $(".photo-list img"); //selects all img decendants of an element with the class 'photo-list'
	var photoList = $.makeArray($photoList); //turns the array-like object into a real array

	//This loops through each image and hides or shows it based on the inputted text
	for(i = 0; i < $numberOfPhotos; i++){

		var currentImg = photoList[i];
		var currentCaptionInfo = photoInfo[i].caption.toLowerCase(); //gets the caption for the current photo

		//if the inputted text matches a piece of the caption, show it. If not, hide it
		if(currentCaptionInfo.includes(inputText)){
			currentImg.removeAttribute('hidden','true');
		}else{
			currentImg.setAttribute('hidden','true');
		}
	}
}