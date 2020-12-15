$(document).ready(function (){
	//создаём переменные для расчётов
	var imt, imtHeight, calories, bmr, bmrAge, bmrHeight, bmrWeight,
	caloriesBju, proteinsOne, proteinsTwo, fatsOne, fatsTwo, carbOne, carbTwo;
	
	//плавная прокрутка к результату
	var $page = $('html, body');
	$('a[href*="result"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
	});

	$('#calculate').click(function() {
		//проверка на выбор пола пользователя
		if (($('[name="gender"]'))[0].checked == false &
			($('[name="gender"]'))[1].checked == false) {
			alert('Вы не выбрали ваш пол!');
		}

		//проверка на заполнение полей
		else if (age.value=="" || height.value == "" || weight.value =="") {
			alert('Пожалуйста, введите ваши данные!');
		}

		//проверка на заполнение целыми числами
		else if (Number.isInteger(Number(age.value))==false) {
			alert('Пожалуйста, введите ваш возраст корректно!');
		}

		else if (Number.isInteger(Number(height.value))==false) {
			alert('Пожалуйста, введите ваш рост в сантимаетрах!');
		}

		else if (Number.isInteger(Number(weight.value))==false) {
			alert('Пожалуйста, введите ваш вес в килограммах!');
		}

		//если выбран мужской пол
		else if (($('[name="gender"]'))[0].checked == true) {
			//расчитываем имт и по Формула Миффлина-Сан Жеора дневную норму калорий
			bmrAge = 4.92 * age.value;
			bmrHeight = 6.25 * height.value;
			bmrWeight = 9.99 * weight.value;
			imtHeight = height.value / 100;
			imt = (weight.value/(imtHeight*imtHeight)).toFixed(2);

			bmr = bmrWeight + bmrHeight - bmrAge + 5;

			//дневная норма калорий расчитывается и из физ.нагрузок, поэтому тут идёт выборка
			switch(parseInt($('#select').val())){
				case 1:
				calories = Math.round(bmr * 1.2);
				break;
				case 2:
				calories = Math.round(bmr * 1.375);
				break;
				case 3:
				calories = Math.round(bmr * 1.55);
				break;
				case 4:
				calories = Math.round(bmr * 1.725);
				break;
				case 5:
				calories = Math.round(bmr * 1.9);
				break;
			}

			switch(parseInt($('#select__bju').val())){
				case 1:
				caloriesBju = Math.round(calories - (calories*0.2));
				proteinsOne = (caloriesBju * 0.25 / 4).toFixed(1);
				proteinsTwo = (caloriesBju * 0.35 / 4).toFixed(1);
				fatsOne = (caloriesBju * 0.2 / 8.88).toFixed(1);
				fatsTwo = (caloriesBju * 0.4 / 8.88).toFixed(1);
				carbOne = (caloriesBju * 0.25 / 4).toFixed(1);
				carbTwo = (caloriesBju * 0.5 / 4).toFixed(1);
				$('.calories__bju').html('Суточная норма потребления калорий для похудения: <b>'
					+ caloriesBju + '</b> кКал');
				$('.bju').html('БЖУ для похудения: <br><b>' + proteinsOne + '-' + proteinsTwo +'г</b> белков <br><b>'+
				 	fatsOne+ '-' +fatsTwo+'г</b> жиров <br><b>'+
					carbOne+'-'+carbTwo+'г</b> углеводов');
				break;
				case 2:
				caloriesBju = Math.round(calories);
				proteinsOne = (caloriesBju * 0.2 / 4).toFixed(1);
				proteinsTwo = (caloriesBju * 0.25 / 4).toFixed(1);
				fatsOne = (caloriesBju * 0.3 / 8.88).toFixed(1);
				fatsTwo = (caloriesBju * 0.35 / 8.88).toFixed(1);
				carbOne = (caloriesBju * 0.5 / 4).toFixed(1);
				carbTwo = (caloriesBju * 0.6 / 4).toFixed(1);
				$('.calories__bju').html('Суточная норма потребления калорий для поддержки веса: <b>'
					+ caloriesBju + '</b> кКал');
				$('.bju').html('БЖУ для поддержки веса: <br><b>' + proteinsOne + '-' + proteinsTwo +'г</b> белков <br><b>'+
				 	fatsOne+ '-' +fatsTwo+'г</b> жиров <br><b>'+
					carbOne+'-'+carbTwo+'г</b> углеводов');
				break;
				case 3:
				caloriesBju = Math.round(calories + (calories*0.2));
				proteinsOne = (caloriesBju * 0.2 / 4).toFixed(1);
				proteinsTwo = (caloriesBju * 0.25 / 4).toFixed(1);
				fatsOne = (caloriesBju * 0.3 / 8.88).toFixed(1);
				fatsTwo = (caloriesBju * 0.35 / 8.88).toFixed(1);
				carbOne = (caloriesBju * 0.5 / 4).toFixed(1);
				carbTwo = (caloriesBju * 0.6 / 4).toFixed(1);
				$('.calories__bju').html('Суточная норма потребления калорий для набора веса: <b>'
					+ caloriesBju + '</b> кКал');
				$('.bju').html('БЖУ для набора веса: <br><b>' + proteinsOne + '-' + proteinsTwo +'г</b> белков <br><b>'+
				 	fatsOne+ '-' +fatsTwo+'г</b> жиров <br><b>'+
					carbOne+'-'+carbTwo+'г</b> углеводов');
				break;
			}

			//добавляем класс для блока резульатов
			$('.result__info').addClass('active');

			//в тег p с классом imt выводим индекс массы тела
			$('.imt').html('Индекс массы тела: <b>'+imt+'<b/>');

			//в тег p с классом calories выводим суточную норму калорий
			$('.calories').html('Суточная норма потребления калорий: <b>'+ calories + '</b> кКал');
		}

		//если выбран женский пол
		else if (($('[name="gender"]'))[1].checked == true) {
			bmrAge = 4.92 * age.value;
			bmrHeight = 6.25 * height.value;
			bmrWeight = 9.99 * weight.value;
			imtHeight = height.value / 100;
			imt = (weight.value/(imtHeight*imtHeight)).toFixed(2);

			bmr = bmrWeight + bmrHeight - bmrAge - 161;

			switch(parseInt($('#select').val())){
				case 1:
				calories = Math.round(bmr * 1.2);
				break;
				case 2:
				calories = Math.round(bmr * 1.375);
				break;
				case 3:
				calories = Math.round(bmr * 1.55);
				break;
				case 4:
				calories = Math.round(bmr * 1.725);
				break;
				case 5:
				calories = Math.round(bmr * 1.9);
				break;
			}

			switch(parseInt($('#select__bju').val())){
				case 1:
				caloriesBju = Math.round(calories - (calories*0.2));
				proteinsOne = (caloriesBju * 0.25 / 4).toFixed(1);
				proteinsTwo = (caloriesBju * 0.35 / 4).toFixed(1);
				fatsOne = (caloriesBju * 0.2 / 8.88).toFixed(1);
				fatsTwo = (caloriesBju * 0.4 / 8.88).toFixed(1);
				carbOne = (caloriesBju * 0.25 / 4).toFixed(1);
				carbTwo = (caloriesBju * 0.5 / 4).toFixed(1);
				$('.calories__bju').html('Суточная норма потребления калорий для похудения: <b>'
					+ caloriesBju + '</b> кКал');
				$('.bju').html('БЖУ для похудения: <br><b>' + proteinsOne + '-' + proteinsTwo +'г</b> белков <br><b>'+
				 	fatsOne+ '-' +fatsTwo+'г</b> жиров <br><b>'+
					carbOne+'-'+carbTwo+'г</b> углеводов');
				break;
				case 2:
				caloriesBju = Math.round(calories);
				proteinsOne = (caloriesBju * 0.2 / 4).toFixed(1);
				proteinsTwo = (caloriesBju * 0.25 / 4).toFixed(1);
				fatsOne = (caloriesBju * 0.3 / 8.88).toFixed(1);
				fatsTwo = (caloriesBju * 0.35 / 8.88).toFixed(1);
				carbOne = (caloriesBju * 0.5 / 4).toFixed(1);
				carbTwo = (caloriesBju * 0.6 / 4).toFixed(1);
				$('.calories__bju').html('Суточная норма потребления калорий для поддержки веса: <b>'
					+ caloriesBju + '</b> кКал');
				$('.bju').html('БЖУ для поддержки веса: <br><b>' + proteinsOne + '-' + proteinsTwo +'г</b> белков <br><b>'+
				 	fatsOne+ '-' +fatsTwo+'г</b> жиров <br><b>'+
					carbOne+'-'+carbTwo+'г</b> углеводов');
				break;
				case 3:
				caloriesBju = Math.round(calories + (calories*0.2));
				proteinsOne = (caloriesBju * 0.2 / 4).toFixed(1);
				proteinsTwo = (caloriesBju * 0.25 / 4).toFixed(1);
				fatsOne = (caloriesBju * 0.3 / 8.88).toFixed(1);
				fatsTwo = (caloriesBju * 0.35 / 8.88).toFixed(1);
				carbOne = (caloriesBju * 0.5 / 4).toFixed(1);
				carbTwo = (caloriesBju * 0.6 / 4).toFixed(1);
				$('.calories__bju').html('Суточная норма потребления калорий для набора веса: <b>'
					+ caloriesBju + '</b> кКал');
				$('.bju').html('БЖУ для набора веса: <br><b>' + proteinsOne + '-' + proteinsTwo +'г</b> белков <br><b>'+
				 	fatsOne+ '-' +fatsTwo+'г</b> жиров <br><b>'+
					carbOne+'-'+carbTwo+'г</b> углеводов');
				break;
			}

			$('.result__info').addClass('active');

			$('.imt').html('Индекс массы тела: <b>'+imt+'<b/>');
			
			$('.calories').html('Суточная норма потребления калорий: <b>'+ calories + '</b> кКал');
		}
	});
});

//кнопка наверх
	$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('.btn__top').fadeIn();
    } else {
        $('.btn__top').fadeOut();
    }
	});

$(".btn__top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
});