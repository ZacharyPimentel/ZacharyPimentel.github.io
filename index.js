//makes the nav image and my name get a border on hover
$(".navbar-brand").hover(function(){
		$("#portrait").css("border-color","#CF6347");
		$("#name").css("border-bottom-color","#CF6347");
		$("#name").css("color","white");
	},function(){
		$("#portrait").css("border-color","#343A40");
		$("#name").css("border-bottom-color","#343A40");
		$("#name").css("color","lightgrey");
});

