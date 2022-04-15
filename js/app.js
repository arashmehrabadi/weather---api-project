let timezone = document.querySelector(".timezone"),
  icon = document.querySelector(".icon"),
  degreeSec = document.querySelector(".degree-sec"),
  degree = document.querySelector(".degree"),
  tempType = document.querySelector(".temp-type"),
  tempDesc = document.querySelector(".temp-desc");

const getLocation = async () => {
  let url = "http://ip-api.com/json/?fields=status,city,lat,lon,timezone,query";

  let response = await fetch(url);
  let data = await response.json();
  //   console.log(data);
  return data;
};

const getWeather = async (lat, lon) => {
  let APIKey = "85b55d39a4e85854df93d87f32a4907f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  let response = await fetch(url);
  let data = await response.json();
    // console.log(data);
  return data;
};

function getDayOrNight() {
  let dayOrNight;
  let now = new Date();
  // console.log(now.getHours());
  let hour = now.getHours();
  if (hour >= 6 && hour <= 18) {
    dayOrNight = "Day";
  } else {
    dayOrNight = "Night";
  }
  return dayOrNight;
}
// console.log(getDayOrNight());
getDayOrNight();

function getIcon(weatherMain) {
  let icon;
  switch (weatherMain) {
    case "Atmosphere":
      icon = ` <i class="fa-solid fa-hurricane"></i>`;
      break;
    case "Clouds":
      icon = `<i class="fa-solid fa-cloud"></i>`;
      break;
    case "Drizzle":
      icon = `<i class="fa-solid fa-cloud-drizzle"></i>`;
      break;
    case "Rain":
      icon = `<i class="fa-solid fa-cloud-rain"></i>`;
      break;
    case "Thunderstorm":
      icon = `<i class="fa-solid fa-cloud-bolt-sun"></i>`;
      break;
    case "Clear":
      if (getDayOrNight() == "Day") {
        icon = ` <i class="fa-solid fa-sun"></i>`;
      } else {
        icon = `<i class="fa-solid fa-moon"></i>`;
      }
      break;
  }
  return icon
}

function getTemp(weTemp) {
  let kelvin = weTemp,
    fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32,
    centigrade = kelvin - 273.15,
    temp = {
      kelvin: Math.floor(kelvin),
      fahrenheit: Math.floor(fahrenheit),
      centigrade: Math.floor(centigrade),
    };
  return temp;
}

getLocation().then((loc) => {
  timezone.textContent = loc.city;
//  console.log(loc);
  return  getWeather(loc.lat , loc.lon)
})
.then((we)=>{
  console.log(we);
  weTemp = we.main.temp;
  weIcon = we.weather [0].main;
  weDesc = we.weather[0].description

  let iconWeather = getIcon(weIcon)
  console.log(iconWeather);
  icon.innerHTML = `<div>${iconWeather}</div>`
  tempDesc.textContent = weDesc
  degree.textContent = weTemp
  degreeSec.addEventListener('click',()=>{
    if (tempType.textContent == "K") {
      tempType.textContent = 'F'
      degree.textContent = getTemp(weTemp).fahrenheit
      console.log('object1');
      // console.log(tempType.textContent);
    }else if (tempType.textContent == 'F') {
      tempType.textContent = 'C'
      degree.textContent = getTemp(weTemp).centigrade
      console.log('object2');
    }else if (tempType.textContent == 'C') {
      tempType.textContent = 'K'
      degree.textContent = getTemp(weTemp).kelvin
      console.log('object3');
    }
  })
})





