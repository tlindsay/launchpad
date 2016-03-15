var apis, coords, getWeatherIcon, intersect, intersection, located,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

apis = {
  forecast: {
    endpoint: "https://api.forecast.io/forecast",
    key: 'aaa93803cd15d3b0cc3eec06e0e20018'
  },
  nasa: {
    endpoint: 'https://api.nasa.gov/planetary/apod',
    key: 'oi5Qw99OwyRKa43TPEquG2kbdKCd0eifOT5sA4uk'
  }
};

coords = {};

located = false;

this.getWeather = function() {
  console.info('getting weather');
  return navigator.geolocation.getCurrentPosition(function(p) {
    var f, req;
    f = apis.forecast;
    coords = p.coords;
    located = true;
    req = new XMLHttpRequest();
    req.open('GET', "" + f.endpoint + "/" + f.key + "/" + coords.latitude + "," + coords.longitude, true);
    req.onload = function() {
      var response;
      response = JSON.parse(req.responseText);
      $('.weather').removeClass('loading');
      $('.weather .summary').html(response.currently.summary);
      $('.weather .temperature').html("" + (~~response.currently.apparentTemperature) + "&deg;F");
      return $('.weather .icon').html(getWeatherIcon(response.currently.icon));
    };
    return req.send();
  });
};

this.getMemory = function() {
  return new Promise(function(resolve) {
    return chrome.system.memory.getInfo(function(info) {
      var mem;
      mem = {
        available: info.availableCapacity / Math.pow(10, 9),
        total: info.capacity / Math.pow(10, 9)
      };
      return resolve(mem);
    });
  });
};

getWeatherIcon = function(icon) {
  var conditions, req, svg, uri;
  conditions = icon.split('-');
  uri = [];
  svg = '';
  if (intersect(['cloudy', 'rain', 'wind', 'fog', 'snow', 'hail', 'sleet'], conditions)) {
    uri.push('Cloud');
  }
  if (__indexOf.call(conditions, 'rain') >= 0) {
    uri.push('Rain');
  }
  if (__indexOf.call(conditions, 'fog') >= 0) {
    uri.push('Fog');
  }
  if (__indexOf.call(conditions, 'snow') >= 0) {
    uri.push('Snow');
  }
  if (intersect(['hail', 'sleet'], conditions)) {
    uri.push('Hail');
  }
  if (__indexOf.call(conditions, 'wind') >= 0) {
    uri.push('Wind');
  }
  if (__indexOf.call(conditions, 'night') >= 0) {
    uri.push('Moon');
  }
  if (__indexOf.call(conditions, 'day') >= 0) {
    uri.push('Sun');
  }
  if (intersect(['rain', 'hail', 'sleet', 'snow'], conditions)) {
    uri.push('Alt');
  }
  req = new XMLHttpRequest();
  req.open('GET', "assets/icons/weather/" + (uri.join('-')) + ".svg", false);
  req.onload = function() {
    return svg = req.responseText;
  };
  req.send();
  return svg;
};

intersection = function(a, b) {
  var value, _i, _len, _ref, _results;
  if (a.length > b.length) {
    _ref = [b, a], a = _ref[0], b = _ref[1];
  }
  _results = [];
  for (_i = 0, _len = a.length; _i < _len; _i++) {
    value = a[_i];
    if (__indexOf.call(b, value) >= 0) {
      _results.push(value);
    }
  }
  return _results;
};

intersect = function(a, b) {
  return intersection(a, b).length > 0;
};

this.initWeather();

this.getMemory().then(function(result) {
  console.log('got it!');
  return console.log("" + result.available + "/" + result.total);
});
