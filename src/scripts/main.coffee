apis =
  forecast:
    endpoint: "https://api.forecast.io/forecast"
    key: 'aaa93803cd15d3b0cc3eec06e0e20018'
  nasa:
    endpoints:
      apod: 'https://api.nasa.gov/planetary/apod'
      mars: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos'
    key: 'oi5Qw99OwyRKa43TPEquG2kbdKCd0eifOT5sA4uk'

coords = {}
located = false

# Get dat weather
@getWeather = () ->
  console.info 'getting weather'
  navigator.geolocation.getCurrentPosition (p) ->
    f = apis.forecast
    coords = p.coords
    located = true

    url = "#{f.endpoint}/#{f.key}/#{coords.latitude},#{coords.longitude}"
    ajax url, {}, (err, res) ->
      if err
        $('.weather .summary').html 'Weather Failed'
      else
        $('.weather').removeClass 'loading'
        $('.weather .summary').html res.currently.summary
        $('.weather .temperature').html "#{~~res.currently.apparentTemperature}&deg;F"
        getWeatherIcon(res.currently.icon).then (result) ->
          $('.weather .icon').html result

@getMemory = () ->
  return new Promise (resolve) ->
    chrome.system.memory.getInfo (info) ->
      mem =
        available: info.availableCapacity / 10**9
        total: info.capacity / 10**9
      resolve mem

@getMars = () ->
  n = apis.nasa
  url = "#{n.endpoints.mars}?sol=#{randomNum 1200, 940}&camera=navcam&api_key=#{n.key}"
  ajax url, {}, (err, res) ->
    if err
      $('.mars .pic').text 'Mars Failed'
    else
      $('.mars').removeClass 'loading'
      $('.mars .pic').html "<img src=\"#{res.photos[randomNum res.photos.length].img_src}\" />"

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
  url = "assets/icons/weather/#{uri.join('-')}.svg"
  return new Promise (resolve, reject) ->
    ajax url, {}, (err, res) =>
      console.log res
      console.log err
      if err
        reject()
      else
        resolve(res)

intersection = (a, b) ->
  [a, b] = [b, a] if a.length > b.length
  value for value in a when value in b

intersect = (a, b) ->
  return intersection(a, b).length > 0

randomNum = (max,min=0) ->
  return Math.floor(Math.random() * (max - min) + min)

window.onload = () =>
  window.$ = u
  @getWeather()

  @getMemory().then (result) ->
    console.log "#{result.available}/#{result.total}"

  @getMars()
