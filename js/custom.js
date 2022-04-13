	/* 	 */

$(function() {

	var durdur =0;

	$(".myBtn").hover(
		function(){
			if(durdur==0){
				durdur=1;
				$(this).find(".buttonIcon").animate({'top': '5px'},200);
				$(this).find(".buttonText").animate({'left': '18px'},200,function(){durdur=0;});
			}
		},
		function(){
			$(this).find(".buttonIcon").animate({'top': '55px'},200);
			$(this).find(".buttonText").animate({'left': '5px'},200);
		}
	);
	
		/* var body = $('body');
		var backgrounds = ['url(images/gemi2.jpg)','url(images/gemi1.jpg)','url(images/gemi2.jpg)','url(images/gemi3.jpg)','url(images/gemi1.jpg)','url(images/gemi2.jpg)'];
		var current = 0;
	
		function nextBackground() {
			
            body.css(		
				'background-image',
                backgrounds[Math.floor((Math.random() * backgrounds.length) + 1)]);
        
        setTimeout(nextBackground, 3000);

    }
    nextBackground();	 */
	
});
	
		function isNotEmpty(val){
			return (val === undefined || val == null || val.length <= 0) ? false : true;
		}

			function parseInt2(val){

				if(isNotEmpty(val)){
					return parseInt(val);
				}
				else{
					return 0;
				}

			}

	var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope) {

		$scope.toastData = {
		         title:"",msg:"",
		         showDuration:300,
		         hideDuration:1000,
		         newestOnTop:true,
		         positionClass: "toast-top-right",
		         progressBar:false,
		         onclick:null,
		         timeOut:5000,
		         extendedTimeOut: 1000,
		         showEasing: "swing",
		         hideEasing: "linear",
		         showMethod: "fadeIn",
		         hideMethod: "fadeOut",
		         type:"success",
		         closeButton: true,
		         debug: false,
		         preventDuplicates: false,
		         addClear:true
		     };

				 $(function () {
		             $("#input").on("change", function () {
		                 var excelFile,
		                     fileReader = new FileReader();

		                 $("#result").hide();

		                 fileReader.onload = function (e) {
		                     var buffer = new Uint8Array(fileReader.result);

		                     $.ig.excel.Workbook.load(buffer, function (workbook) {
		                         var column, row, newRow, cellValue, columnIndex, i,
		                             worksheet = workbook.worksheets(0),
		                             columnsNumber = 0,
		                             gridColumns = [],
		                             data = [],
		                             worksheetRowsCount;

		                         // Both the columns and rows in the worksheet are lazily created and because of this most of the time worksheet.columns().count() will return 0
		                         // So to get the number of columns we read the values in the first row and count. When value is null we stop counting columns:
		                         while (worksheet.rows(0).getCellValue(columnsNumber)) {
		                             columnsNumber++;
		                         }

		                         // Iterating through cells in first row and use the cell text as key and header text for the grid columns
		                         for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
		                             column = worksheet.rows(0).getCellText(columnIndex);
		                             gridColumns.push({ headerText: column, key: column });
		                         }

		                         // We start iterating from 1, because we already read the first row to build the gridColumns array above
		                         // We use each cell value and add it to json array, which will be used as dataSource for the grid
		                         for (i = 1, worksheetRowsCount = worksheet.rows().count() ; i < worksheetRowsCount; i++) {
		                             newRow = {};
		                             row = worksheet.rows(i);

		                             for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
		                                 cellValue = row.getCellText(columnIndex);
		                                 newRow[gridColumns[columnIndex].key] = cellValue;
		                             }

		                             data.push(newRow);
		                         }

		                         // we can also skip passing the gridColumns use autoGenerateColumns = true, or modify the gridColumns array
		                         createGrid(data, gridColumns);
		                     }, function (error) {
		                         $("#result").text("The excel file is corrupted.");
		                         $("#result").show(1000);
		                     });
		                 }

		                 if (this.files.length > 0) {
		                     excelFile = this.files[0];
		                     if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
		                         fileReader.readAsArrayBuffer(excelFile);
		                     } else {
		                         $("#result").text("The format of the file you have selected is not supported. Please select a valid Excel file ('.xls, *.xlsx').");
		                         $("#result").show(1000);
		                     }
		                 }

		             })
		         });

						 function createGrid(data, gridColumns) {
		 					var k = angular.element($('body')).scope().inputsJson.length;

								 var x = false;

								angular.forEach(data, function(value, i) {
								 if (!angular.isUndefined(value.tedarikciadi)) {
								 	value.id = k+1+i;
									angular.element($('body')).scope().inputsJson.push(value);
								}
								else{
									x = true;
								}
								});
		 						angular.element($('body')).scope().$apply();
								if (x) {
									$scope.toastData.msg= "Hatalı Excel Kontrol Edin";
									$scope.toastData.type = "warning";
									$scope.showToast($scope.toastData);

								}else{
									$scope.toastData.msg= "Yükleme Başarıyla Gerçekleşti";
									//$scope.toastData.title = "Kaydeldi";
									$scope.toastData.type = "success";
									$scope.showToast($scope.toastData);
								}
								angular.forEach($scope.inputsJson, function (roll) {
									roll.referanslar = parseFloat(roll.referanslar);
									roll.fiyat = parseFloat(roll.fiyat);
									roll.calisanSayisi = parseFloat(roll.calisanSayisi);
									roll.yonetsel = parseFloat(roll.yonetsel);
									roll.davranisIletisim = parseFloat(roll.davranisIletisim);
									roll.kaliteBelgeleri = parseFloat(roll.kaliteBelgeleri);
									roll.vade = parseFloat(roll.vade);
									roll.teknolojik = parseFloat(roll.teknolojik);
									roll.istekDurumu = parseFloat(roll.istekDurumu);
									roll.sektordekiDurumu = parseFloat(roll.sektordekiDurumu);
									roll.toplam = parseFloat(roll.toplam);
									});
						}



	$scope.letterCutter = function(letter,maxLength){
        if(letter.length > maxLength){
            letter = letter.substring(1, letter.length);
            letter = $scope.letterCutter(letter,maxLength);
        }
        return letter;
    }

	$scope.isNotEmpty = function(val){
		return (val === undefined || val == null || val.length <= 0) ? false : true;
	}

	$scope.myApp1 = $scope.myApp2 = $scope.myApp3 = $scope.myApp4 = $scope.myApp5 = $scope.myApp6 = $scope.myApp7 = $scope.myApp8 = $scope.myApp9 =  $scope.myApp10 = "";


	$scope.inputsJson = [{"id":"00","tedarikciadi":"Fenerbahce","referanslar":1,"fiyat":1,"calisanSayisi":1,"yonetsel":1,"davranisIletisim":1,"kaliteBelgeleri":1,"vade":1,"teknolojik":1,"istekDurumu":1,"sektordekiDurumu":1,"toplam":88},
						 {"id":"01","tedarikciadi":"Besiktas","referanslar":1,"fiyat":5,"calisanSayisi":2,"yonetsel":5,"davranisIletisim":8,"kaliteBelgeleri":4,"vade":3,"teknolojik":8,"istekDurumu":2,"sektordekiDurumu":5,"toplam":55},
						 {"id":"02","tedarikciadi":"Boyner","referanslar":2,"fiyat":5,"calisanSayisi":9,"yonetsel":6,"davranisIletisim":7,"kaliteBelgeleri":2,"vade":5,"teknolojik":9,"istekDurumu":5,"sektordekiDurumu":3,"toplam":12},
						 {"id":"03","tedarikciadi":"Vodafone","referanslar":3,"fiyat":2,"calisanSayisi":7,"yonetsel":9,"davranisIletisim":4,"kaliteBelgeleri":3,"vade":6,"teknolojik":6,"istekDurumu":4,"sektordekiDurumu":6,"toplam":23},
						 {"id":"04","tedarikciadi":"Ulker","referanslar":4,"fiyat":9,"calisanSayisi":5,"yonetsel":2,"davranisIletisim":5,"kaliteBelgeleri":5,"vade":2,"teknolojik":4,"istekDurumu":3,"sektordekiDurumu":7,"toplam":66},
						 {"id":"05","tedarikciadi":"Lenova","referanslar":4,"fiyat":9,"calisanSayisi":3,"yonetsel":2,"davranisIletisim":1,"kaliteBelgeleri":5,"vade":5,"teknolojik":6,"istekDurumu":5,"sektordekiDurumu":1,"toplam":99},
						 {"id":"06","tedarikciadi":"Asus","referanslar":1,"fiyat":5,"calisanSayisi":1,"yonetsel":5,"davranisIletisim":4,"kaliteBelgeleri":4,"vade":3,"teknolojik":8,"istekDurumu":2,"sektordekiDurumu":3,"toplam":11},
						 {"id":"07","tedarikciadi":"Apple","referanslar":7,"fiyat":2,"calisanSayisi":4,"yonetsel":1,"davranisIletisim":2,"kaliteBelgeleri":6,"vade":1,"teknolojik":4,"istekDurumu":2,"sektordekiDurumu":9,"toplam":23}];


	$scope.changedInput = function(){

		$scope.myTotal = parseInt2($scope.myApp1) + parseInt2($scope.myApp2) + parseInt2($scope.myApp3) + parseInt2($scope.myApp4) + parseInt2($scope.myApp5) + parseInt2($scope.myApp6) + parseInt2($scope.myApp7) + parseInt2($scope.myApp8) + parseInt2($scope.myApp9) + parseInt2($scope.myApp10) ;

	}

     $scope.reverseShow = function(param) {


		if(param == 'open'){

			$('.myForm').css({
				"display" : "inherit"
			});
			$('.myForm').animate({
				"marginTop" : "10%"
			});


			$scope.id;
			$scope.myApp0  = "";
			$scope.myApp1  = "";
			$scope.myApp2  = "";
			$scope.myApp3  = "";
			$scope.myApp4  = "";
			$scope.myApp5  = "";
			$scope.myApp6  = "";
			$scope.myApp7  = "";
			$scope.myApp8  = "";
			$scope.myApp9  = "";
			$scope.myApp10 = "";
			$scope.myTotal = "";

		}else{

			$( ".myForm" ).animate({
				"marginTop" : "-10%"
			}, 400, function() {
				$('.myForm').css({
					"display" : "none"
				});
			});
		}

		$scope.kaydetButonu = true;
		$scope.guncelleButonu = false;
		$scope.kapatButonu = true;
		$scope.geriButonu = false;

    }

		$scope.delete = function (param) {
								for(var i = 0; i<$scope.inputsJson.length; i++){
									if(param==$scope.inputsJson[i].id){
										for(var j = i; j<$scope.inputsJson.length-1; j++){
											$scope.inputsJson[j] = $scope.inputsJson[j+1];
										}
										$scope.inputsJson.length -= 1;
									}
								}
								$scope.toastData.msg= "Silindi.";
								$scope.toastData.type = "warning";
								$scope.showToast($scope.toastData);
						};


	$scope.save = function(){

		var param = parseInt($scope.inputsJson.length)+1;

		param = $scope.letterCutter( "00000" +param.toString(),2);

		$scope.newVal = {"id":param,"tedarikciadi": ($scope.myApp0) , "referanslar": parseInt2($scope.myApp1) ,"fiyat": parseInt2($scope.myApp2) ,"calisanSayisi": parseInt2($scope.myApp3) ,"yonetsel": parseInt2($scope.myApp4) ,"davranisIletisim": parseInt2($scope.myApp5) ,"kaliteBelgeleri": parseInt2($scope.myApp6) ,"vade": parseInt2($scope.myApp7) ,"teknolojik": parseInt2($scope.myApp8) ,"istekDurumu": parseInt2($scope.myApp9) ,"sektordekiDurumu": parseInt2($scope.myApp10) ,"toplam":parseInt2($scope.myTotal)};


		if($scope.myApp0.length >0 && $scope.myApp1.length >0 && $scope.myApp2.length >0 && $scope.myApp3.length >0 && $scope.myApp4.length >0 && $scope.myApp5.length >0 && $scope.myApp6.length >0 && $scope.myApp7.length >0 && $scope.myApp8.length >0 && $scope.myApp9.length >0 && $scope.myApp10.length >0){

			if($scope.id != undefined ){
				var log = [];

				angular.forEach($scope.inputsJson,function(val,i) {
					if($scope.id == val.id ){
						$scope.index = i;
					}
				}, log);
					console.log(log);

					$scope.inputsJson[$scope.index] = $scope.newVal;

						$scope.toastData.msg= "Güncelleme Başarıyla Gerçekleşti";
						$scope.toastData.type = "success";
						$scope.showToast($scope.toastData);

					$scope.id = undefined;

			}else{

				$scope.inputsJson.push($scope.newVal);
					$scope.toastData.msg= "İşlem Başarıyla Gerçekleşti";
					$scope.toastData.type = "success";
					$scope.showToast($scope.toastData);
			}

			$scope.newVal  = "";

		}else{

			$scope.toastData.msg= "Boş bırakılamaz !";
			$scope.toastData.type = "error";
			$scope.showToast($scope.toastData);
		}

	}

	 $scope.reverseShowTable = function(param) {

		if(param == 'open'){
			$('.myTable').css({
				"display" : "inherit"
			});
			$('.myTable').animate({
				"marginTop" : "10%"
			});
		}else{
			$( ".myTable" ).animate({
				"marginTop" : "-10%"
			}, 400, function() {
				$('.myTable').css({
					"display" : "none"
				});
			});
		}


    }

		$scope.edit = function (val){


			$scope.id = val.id;
			$scope.myApp0  = ''+val.tedarikciadi;
			$scope.myApp1  = ''+val.referanslar;
			$scope.myApp2  = ''+val.fiyat;
			$scope.myApp3  = ''+val.calisanSayisi;
			$scope.myApp4  = ''+val.yonetsel;
			$scope.myApp5  = ''+val.davranisIletisim;
			$scope.myApp6  = ''+val.kaliteBelgeleri;
			$scope.myApp7  = ''+val.vade;
			$scope.myApp8  = ''+val.teknolojik;
			$scope.myApp9  = ''+val.istekDurumu;
			$scope.myApp10 = ''+val.sektordekiDurumu;
			$scope.myTotal = ''+val.toplam;

			$('#reportModal').modal('hide');
			$('#myModal').modal('show');

				$scope.kaydetButonu = false;
				$scope.guncelleButonu = true;
				$scope.kapatButonu = false;
				$scope.geriButonu = true;
				$scope.orderByField = 'tedarikciadi';
				$scope.orderByField = 'referanslar';
				$scope.orderByField = 'fiyat';
				$scope.orderByField = 'calisanSayisi';
				$scope.orderByField = 'yonetsel';
				$scope.orderByField = 'davranisIletisim';
				$scope.orderByField = 'kaliteBelgeleri';
				$scope.orderByField = 'vade';
				$scope.orderByField = 'teknolojik';
				$scope.orderByField = 'istekDurumu';
				$scope.orderByField = 'sektordekiDurumu';
				$scope.reverseSort = false;

		}

		$scope.back = function(){

		 $('#myModal').modal('hide');
		 $('#reportModal').modal('show');

	 }

		var toastCount = 0;
		$scope.showToast = function (data) {
		  if(data.type == "error"){
		    data.timeOut = 2500;

		 }
		                     var shortCutFunction = $("#toastTypeGroup input:radio:checked").val();



		                     var toastIndex = toastCount++;

		                     toastr.options = {
		                             closeButton: data.closeButton,
		                             debug:data.debug,
		                             newestOnTop: data.newestOnTop,
		                             progressBar: data.progressBar,
		                             rtl: data.rtl,
		                             positionClass:data.positionClass|| 'toast-top-right',
		                             preventDuplicates:data.preventDuplicates,
		                             onclick: null,
		               timeOut: data.timeOut
		                     };

		                     if (data.BehaviorOnToastClick) {
		                             toastr.options.onclick = function () {
		                                     alert(data.BehaviorOnToastClickText);
		                             };
		                     }

		                     if (data.BehaviorOnToastCloseClick) {
		                             toastr.options.onCloseClick = function () {
		                                     alert(data.BehaviorOnToastCloseClickText);
		                             };
		                     }

		                     if (data.showDuration.length) {
		                             toastr.options.showDuration = parseInt(data.showDuration);
		                     }

		                     if (data.hideDuration.length) {
		                             toastr.options.hideDuration = parseInt(data.hideDuration);
		                     }

		                     if (data.timeOut.length) {
		                             toastr.options.timeOut = data.addClear ? 0 : parseInt(data.timeOut);
		                     }

		                     if (data.extendedTimeOut.length) {
		                             toastr.options.extendedTimeOut = data.addClear ? 0 : parseInt(data.extendedTimeOut);
		                     }

		                     if (data.showEasing.length) {
		                             toastr.options.showEasing = data.showEasing;
		                     }

		                     if (data.hideEasing.length) {
		                             toastr.options.hideEasing = data.hideEasing;
		                     }

		                     if (data.showMethod.length) {
		                             toastr.options.showMethod = data.showMethod;
		                     }

		                     if (data.hideMethod.length) {
		                             toastr.options.hideMethod = data.hideMethod;
		                     }
		         msg =data.msg;


		                     var $toast = toastr[data.type](data.msg, data.title);

		                     if(typeof $toast === 'undefined'){
		                             return;
		                     }

		                     if ($toast.find('#okBtn').length) {
		                             $toast.delegate('#okBtn', 'click', function () {
		                                     alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
		                                     $toast.remove();
		                             });
		                     }
		                     if ($toast.find('#surpriseBtn').length) {
		                             $toast.delegate('#surpriseBtn', 'click', function () {
		                                     alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
		                             });
		                     }
		                     if ($toast.find('.clear').length) {
		                             $toast.delegate('.clear', 'click', function () {
		                                     toastr.clear($toast, { force: true });
		                             });
		                     }
		                 }
});
