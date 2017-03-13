function findGetParameter(parameterName) {
  var result = "",
      tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

function getTournaments() {
  return [{% for tournament in site.data.tournaments %}"{{ tournament }}",{% endfor %}];
}

function nextTournament() {
  var current = findGetParameter("from");
  var tournaments = getTournaments();
  var prev = "";
  for (var i in tournaments) {
    var t = tournaments[i];
    if (prev === current) {
      return t;
    }
    prev = t;
  }
  return current;
}

function redirect(url) {
  var where = window.location.protocol + "//" + window.location.host + "/" + url;
  window.location.replace(where);
}

function redirectNext() {
  redirect(nextTournament());
}

function prevTournament() {
  var current = findGetParameter("from");
  var tournaments = getTournaments();
  var prev = "";
  for (var i in tournaments) {
    var t = tournaments[i];
    if (t === current) {
      return prev;
    }
    prev = t;
  }
  return current;
}

function redirectPrev() {
  redirect(prevTournament());
}
