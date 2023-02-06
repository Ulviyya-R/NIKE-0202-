$("input, select").on("input", function () {
	var value = $(this).val();
	if ($(this).is("#number")) {
		value = value.replace(/(.{4})/g, "$1 ");
		$(".card-number .mono").text(value);
	} else if ($(this).is("#holder")) {
		$(".card-holder .mono").text(value);
	} else if ($(this).is("#month")) {
		var date = value + $(".card-date .mono").text().slice(2, 8);
		$(".card-date .mono").text(date);
	} else if ($(this).is("#year")) {
		var date = $(".card-date .mono").text().slice(0, 3) + value;
		$(".card-date .mono").text(date);
	} else if ($(this).is("#ccv")) {
		$(".card-code .mono").text(value);
	}
});