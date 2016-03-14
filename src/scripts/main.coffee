apis =
  forecast:
    endpoint: "https://api.forecast.io/forecast"
    key: 'aaa93803cd15d3b0cc3eec06e0e20018'
  nasa:
    endpoint: 'https://api.nasa.gov/planetary/apod'
    key: 'oi5Qw99OwyRKa43TPEquG2kbdKCd0eifOT5sA4uk'

coords = {}
located = false

# Get dat weather
@initWeather = () ->
  console.info 'getting weather'
  navigator.geolocation.getCurrentPosition (p) ->
    f = apis.forecast
    coords = p.coords
    located = true

    req = new XMLHttpRequest()
    req.open 'GET',
      "#{f.endpoint}/#{f.key}/#{coords.latitude},#{coords.longitude}",
      true
    req.onload = () ->
      response = JSON.parse req.responseText
      $('.weather').removeClass('loading')
      $('.weather .summary').html response.currently.summary
      $('.weather .temperature').html "#{~~response.currently.apparentTemperature}&deg;F"
      $('.weather .icon').html getWeatherIcon(response.currently.icon)
    req.send()

@initMemory = () ->
  console.info 'getting available memory'
  chrome.system.memory.getInfo (info) ->
    console.log "#{info.availableCapacity / 10**9}/#{info.capacity / 10**9} available"

getWeatherIcon = (icon) ->
  conditions = icon.split('-')
  uri = []
  svg = ''

  # Parse Forecast into icon path
  uri.push('Cloud') if intersect(['cloudy', 'rain', 'wind', 'fog', 'snow', 'hail', 'sleet'], conditions)
  uri.push('Rain') if 'rain' in conditions
  uri.push('Fog') if 'fog' in conditions
  uri.push('Snow') if 'snow' in conditions
  uri.push('Hail') if intersect(['hail', 'sleet'], conditions)
  uri.push('Wind') if 'wind' in conditions
  uri.push('Moon') if 'night' in conditions
  uri.push('Sun') if 'day' in conditions
  uri.push('Alt') if intersect(['rain', 'hail', 'sleet', 'snow'], conditions)

  # Load the icon
  req = new XMLHttpRequest()
  req.open 'GET',
    "assets/icons/weather/#{uri.join('-')}.svg",
    false
  req.onload = () -> svg = req.responseText
  req.send()

  return svg

intersection = (a, b) ->
  [a, b] = [b, a] if a.length > b.length
  value for vlue in a when value in b

@initWeather()
@initMemory()

theUltimateAnswer = () ->
  new Promise (resolve) ->
    setTimeout (() -> value = 42; resolve value), 3000

promise = theUltimateAnswer()

promise.then (result) ->
  alert result
