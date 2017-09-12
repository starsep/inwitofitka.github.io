// RRBridge Bidding Data by Filip Czaplicki
// https://github.com/starsep/rrbridge-bidding-data

// based on https://github.com/emkael/jfrpary-bidding-data/blob/master/res/javas/bidding.js

/*global $, jQuery, alert*/

"use strict";

var standardGet;

var columnsNumber;
var contractColumn;

function countColumns() {
    columnsNumber = 0;
    contractColumn = -1;
    for (var x = $("td[rowspan=2]:contains('ns')"); x.html() !== undefined; x = x.next()) {
        if (x.html() === 'kont.') {
            contractColumn = columnsNumber;
        }
        columnsNumber++;
    }
    columnsNumber += 2;
}

function removePopups() {
    $(".biddingPopup").remove();
}

function displayPopup(element, content) {
    var popup = $('<div class="biddingPopup"></div>');
    popup.css({
        'position': 'absolute',
        'width': '250px',
        'left': element.offset().left + element.width(),
        'top': element.offset().top
    });
    popup.html(content);
    $('body').append(popup);
}

function showPopup(prefix, elem) {
    var board = elem.attr('data-board');
    var pair = elem.attr('data-pair');
    standardGet(prefix + board + '-' + pair + '.html', function (data) {
        removePopups();
        displayPopup(elem, data);
    });
}

function showBidding() {
    var elem = $(this);
    showPopup('bid-', elem);
}

function showForum() {
    var elem = $(this);
    showPopup('forum-', elem);
}

function contractHtml(pair, board) {
    var result = ' <a href="javascript:void(0)" class="biddingLink" data-pair="' + pair + '" data-board="' + board + '">';
    result += '<img src="img/link.png" />';
    result += '</a>';
    return result;
}

function forumHtml(pair, board) {
    var result = ' <a href="javascript:void(0)" class="forumLink" data-pair="' + pair + '" data-board="' + board + '">';
    result += '<img src="img/forum.png" />';
    result += '</a>';
    return result;
}


function injectContractBoard(row) {
    var contractTd = row.children().first();
    var pair = contractTd.children().first().html();
    for (var i = 0; i < contractColumn; i++) {
        contractTd = contractTd.next();
    }
    contractTd.html(contractTd.html() + contractHtml(pair, selected) + forumHtml(pair, selected));
}

function injectContractsBoards() {
    var resultsRows = $("td[rowspan=2]:contains('ns')").parent().parent().next().children();
    var row = resultsRows.first();
    for (var i = 0; i < resultsRows.length; i++, row = row.next()) {
        injectContractBoard(row);
    }
}

function injectContractHistory(row) {
    var contractTd = row.find("td>img").first().parent();
    var pair = ajaxHistory;
    var board = contractTd.prev().prev().children().first().html();
    contractTd.html(contractTd.html() + contractHtml(pair, board) + forumHtml(pair, board));
}

function injectContractsHistories() {
    var history = $('td>a[href="javascript:loadBoard(1);"]');
    if (history.size() === 0) {
        return;
    }
    var resultsRows = history.parent().parent().parent().children();
    var row = resultsRows.first();
    for (var i = 0; i < resultsRows.length; i++, row = row.next()) {
        injectContractHistory(row);
    }

}

function injectContracts() {
    injectContractsBoards();
    injectContractsHistories();
    $('a.biddingLink').each(function() {
        $(this).unbind('click').click(showBidding);
    });
    $('a.forumLink').each(function() {
        $(this).unbind('click').click(showForum);
    });
}

function makeBidding() {
    removeLinks();
    countColumns();
    injectContracts();
}

function removeLinks() {
    $('a.biddingLink').remove();
    $('a.forumLink').remove();
}

function initBidding() {
    $(document).click(removePopups);
    hackGet();
    makeBidding();
}

function hackGet() {
    standardGet = $.get;
    $.get = function (a, d, e, f) {
        return standardGet(a, function(x) {
            d(x);
            makeBidding();
        }, e, f);
    };
}

initBidding();

