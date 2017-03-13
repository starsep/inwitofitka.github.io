// RRBridge Bidding Data by Filip Czaplicki
// https://github.com/starsep/rrbridge-bidding-data

// based on https://github.com/emkael/jfrpary-bidding-data/blob/master/res/javas/bidding.js

var columns_number;
var contract_column;

function count_columns() {
    columns_number = 0;
    contract_column = -1;
    for (var x = $("td[rowspan=2]:contains('ns')"); x.html() !== undefined; x = x.next()) {
        if (x.html() === 'kont.') {
            contract_column = columns_number;
        }
        columns_number++;
    }
    columns_number += 2;
}

function remove_bidding() {
    $("#bidding_popup").remove();
}

function show_bidding() {
    remove_bidding();
    var elem = $(this);
    var board = elem.attr('data-board');
    var pair = elem.attr('data-pair');
    $.get('bid-' + board + '-' + pair + '.html', function (data) {
        setTimeout(display_bidding(elem, data), 50);
    });
}

function display_bidding(element, bidding) {
    var popup = $('<div id="bidding_popup"></div>');
    // console.log("ADDING");
    popup.css({
        'position': 'absolute',
        'width': '250px',
        'left': element.offset().left + element.width(),
        'top': element.offset().top
    });
    popup.html(bidding);
    $('body').append(popup);
}

function contract_html(pair, board) {
    var result = ' <a href="javascript:void(0)" class="biddingLink" data-pair="' + pair + '" data-board="' + board + '">';
    result += '<img src="img/link.png" />';
    result += '</a>';
    return result;
}

function inject_contract_board(row) {
    var contract_td = row.children().first();
    var pair = contract_td.children().first().html();
    for (var i = 0; i < contract_column; i++) {
        contract_td = contract_td.next();
    }
    contract_td.html(contract_td.html() + contract_html(pair, selected));
}

function inject_contracts_boards() {
    var results_rows = $("td[rowspan=2]:contains('ns')").parent().parent().next().children();
    var row = results_rows.first();
    for (var i = 0; i < results_rows.length; i++, row = row.next()) {
        inject_contract_board(row);
    }
}

function inject_contract_history(row) {
    var contract_td = row.find("td>img").first().parent();
    var pair = ajaxHistory;
    var board = contract_td.prev().prev().children().first().html();
    contract_td.html(contract_td.html() + contract_html(pair, board));
}

function inject_contracts_histories() {
    var history = $('td>a[href="javascript:loadBoard(1);"]');
    if (history.size() == 0) {
        return;
    }
    var results_rows = history.parent().parent().parent().children();
    var row = results_rows.first();
    for (var i = 0; i < results_rows.length; i++, row = row.next()) {
        inject_contract_history(row);
    }

}

function inject_contracts() {
    inject_contracts_boards();
    inject_contracts_histories();
    $('a.biddingLink').each(function() {
        $(this).unbind('click').click(show_bidding);
    });
}

function make_bidding() {
    count_columns();
    inject_contracts();
}

function remove_bidding_links() {
    $('a.biddingLink').remove();
}

function make_bidding_with_timeout() {
    remove_bidding_links();
    setTimeout(
        function () {
            make_bidding();
        }, 200);
}

function init_bidding() {
    $(document).click(remove_bidding);
    $(window).hashchange(make_bidding_with_timeout);
}

init_bidding();
