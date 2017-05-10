// wybrane rozdanie
var selected = 1;
// liczba rozdań w turnieju (może się zmieniać -> barometr)
var boardCount = 0;
// liczba par w turnieju
var pairCount = 0;
// wybrana historia (0 = wyniki w formie tabelki)
var ajaxHistory = 0;
// czas odświeżania (ms)
var refreshTime = 10000;

// pamiętamy poprzednie wartości numeru historii i numeru
// rozdania, aby inteligentnie odświeżać tylko to co potrzeba
var prevHistory = -1;
var prevSelected = -1;

// szerokość pola długości pliku
var lengthCounterWidth = 12;
// znak nowej linii pierwszego wiersza
var newLineCombination = "\n";

/**
 * Sprawdź czy zadeklarowana przez RRBridge długość się zgadza.
 * Jeśli tak, obetnij dane do samej treści, jeśli nie - zwróć null.
 * @param rawdata
 */
function checkLength(rawdata) {
	var headerLength = lengthCounterWidth + newLineCombination.length;
	if(rawdata === null || rawdata.length == 0) {
		return null;
	} else if(rawdata.charAt(0) != '0') {
		// legacy mode
		return rawdata;
	} else if(rawdata.length < headerLength) {
		// za krótki plik
		return null;
	} else {
		var realData = rawdata.substring(headerLength);
		var declaredLength = parseInt(rawdata.substring(0, lengthCounterWidth), 10);
		if(declaredLength == realData.length) {
			return realData;
		} else {
			return null;
		}
	}
}

/**
 * Ustaw podaną historię i protokół w hashu
 */
function setHashData(hist, prot) {
	var hash = parseInt(prot)+parseInt(hist)*10000;
	if(!isNaN(hash) && hash >= 1)
		window.location.hash = hash;
}

/**
 * Ustaw część hashową adresu "na surowo"
 * @param data
 */
function setRawHash(data) {
	window.location.hash = data;
}

/**
 * Pobierz z hasha numer przeglądanej historii (0 = wyniki).
 */
function getHashHistory() {
	var hist = parseInt(Math.floor(parseInt(window.location.hash.replace('#', '')) / 10000));
	if(!isNaN(hist) && hist >= 0)
		return hist;
	else
		return 0;
}

/**
 * Pobierz z hasha numer przeglądanego protokołu
 */
function getHashProtocol() {
	var prot = parseInt(window.location.hash.replace('#', '')) % 10000;
	if(!isNaN(prot))
		return prot;
	else
		return 1;
}

/**
 * Ustaw dane rozdanie jako "wybrane" w górnym pasku nawigacji.
 */
function setSelectedBoard(number) {
	// inLine musi być parzyste, wyświetla się inLine+1 elementów.
	var inLine = 8;
	var pages = Math.floor((boardCount-1)/(inLine+1))+1;
	var offset = 0;
	
	if(pages == 1 || number <= inLine/2)
		offset = 0;
	else if(number >= boardCount-inLine/2)
		offset = boardCount-inLine-1;
	else
		offset = Math.floor(number-1-inLine/2);
	
	selected = number;
	var str = '<div class="navitem" style="margin-right: 10px"><a href="javascript:prevBoard();">&lt;&lt;</a></div>';
	str += '<div style="display: inline-block; vertical-align: middle">';
	str += '<div class=\"table\">';
	str += '<div class=\"row\">';
	for(var i=0;i<inLine+1;i++) {
		var boardNo = offset+i+1;
		if(boardNo > boardCount)
			break;
		str += '<div style="display: table-cell; width: 35px; text-align: center">';
		if(boardNo != selected)
			str += '<a href="javascript:loadBoard('+boardNo.toString()+');">'+boardNo.toString()+'</a> ';
		else
			str += '<a href="javascript:loadBoard('+boardNo.toString()+');"><span class="selected">'+boardNo.toString()+'</span></a> ';
		str += '</div>';
	}
	str += '</div></div>';
	str += '</div><div class="navitem" style="margin-left: 10px"><a href="javascript:nextBoard();">&gt;&gt;</a></div>';
	$('#nav').html(str);
}

/**
 * Przejdź do poprzedniego rozdania.
 */
function prevBoard() {
	var newSelect = selected-1;
	if(newSelect == 0)
		newSelect = boardCount;
	loadBoard(newSelect);
}

/**
 * Przejdź do następnego rozdania.
 */
function nextBoard() {
	var newSelect = selected+1;
	if(newSelect > boardCount)
		newSelect = 1;
	loadBoard(newSelect);
}

/**
 * Pobierz wszystkie dane (raz)
 * @param isAjaxRequest Czy to jest ajax? (nie = request użytkownika)
 */
function loadData(isAjaxRequest) {
	// pierwsze ładowanie danych
	// zrealizuj URL
	ajaxHistory = getHashHistory();
	selected = getHashProtocol();

	// wyniki lub historie
	if(isAjaxRequest || prevHistory != ajaxHistory) {
		if(ajaxHistory == 0) {
			$.get('pary.txt', function(data) {
				var checked = checkLength(data);
				if(checked !== null) {
					$('#pairscontent').html(checked);
				}
			});
		}
		else {
			$.get('h'+ajaxHistory.toString()+'.txt', function(data) {
				var checked = checkLength(data);
				if(checked !== null) {
					checked = $("#history-link-template").html() + checked;
					$('#pairscontent').html(checked);
				}
			}).fail(function() {
				// jeżeli historia nie jest dostępna, to może wyniki są
				loadResults();
			});
		}
	}
	
	if(isAjaxRequest || prevSelected != selected) {
		$.get('d'+selected+'.txt', function(data) {
			var checked = checkLength(data);
			if(checked !== null) {
				$('#rightleft').html(checked);
			}
		});
	
		$.get('p'+selected+'.txt', function(data) {
			var checked = checkLength(data);
			if(checked !== null) {
				$('#boardscontent').html(checked);
			}
		});
	}
	
	$.get('boardCount.txt', function(data) {
		var checked = checkLength(data);
		if(checked !== null) {
			var splitted = checked.split("\n");
			boardCount = splitted[0];
			pairCount = splitted[1];
			setSelectedBoard(selected);
		}
	});
	
	prevHistory = ajaxHistory;
	prevSelected = selected;
	
}

/**
 * Funkcja pomocnicza dla syncData(ms_time).
 * Obchodzi problem z niemożnością przekazania
 * argumentów do setTimeout.
 */
function realSyncData() {
	loadData(true);
	setTimeout(realSyncData, refreshTime);
}

/**
 * Synchronizuj dane co ustalony czas (milisekundy).
 */
function syncData(ms_time) {
	refreshTime = ms_time;
	realSyncData();
}

/**
 * Załaduj wyniki.
 */
function loadResults() {
	ajaxHistory = 0;
	setHashData(0, selected);
}

/**
 * Załaduj rozdanie o numerze (number) do panelu podglądu rozdań.
 */
function loadBoard(number) {
	setSelectedBoard(number);
	setHashData(ajaxHistory, number);
}

/**
 * Załaduj historię o numerze (number) do panelu
 * z wynikami.
 */
function loadHistory(number) {
	ajaxHistory = number;
	setHashData(number, selected);
}

/**
 * Pokaż popup o podanej treści.
 */
function showTooltip(content, event) {
	$("#tooltip").remove();
	var offset = 20;
	var posX = event.pageX+offset;
	var posY = event.pageY;
	$("body").append('<div id="tooltip" style="position: absolute; left:'+posX.toString()+
			'px; top:'+posY.toString()+'px; display: inline-block; border: 1px solid #aaa;'+
			'background-color: white; padding-left: 3px; padding-right: 3px; box-shadow: 0px 0px 5px 0px #000;">'+content+'</div>');
}

/**
 * Schowaj popup.
 */
function hideTooltip() {
	$("#tooltip").remove();
}