/* Генерация предсказания должна происходить при клике на кнопку «предсказать судьбу» */

/* Заранее заготовь 3-5 предсказаний и в зависимости от того, как лягут карты судьбы (или что скажет Math.random) показывай их пользователю */

/* Подставляй текст нового предсказания в .current-forecast h1 */

/* Показывай процент вероятности, с которым предсказание сбудется — в верстке это .current-forecast p */

/* Данный процент также нужно генерировать автоматически, он может принимать значения от 0 до 100% */

/* Совет: заведи функцию-хелпер, которая будет заниматься только генерацией данных в диапазоне от min до max и используй ее где нужно */

/* При генерации нового предсказания старое предсказание должно добавляться в начало списка «Мои предсказания» — .forecasts  */

/* Для добавления предсказания в список воспользуйся шаблоном forecast-item */

const forecasts = ['Любит!', 'Не любит :(', 'Плюнет :(', 'Поцелует!', 'К сердцу прижмет!', 'К черту пошлет :(', 'Замуж возьмет!'];
const button = document.querySelector('.forecast-btn');
const currentForecastText = document.querySelector('.current-forecast h1');
const currentForecastProbability = document.querySelector('.current-forecast p');
const template = document.querySelector('#forecast-item');
const myForecasts = document.querySelector('.forecasts');


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // max включительно, нужно для вероятности
}

function generateForecast() {
  const index = getRandomNumber(0, forecasts.length - 1);
  currentForecastText.textContent = forecasts[index];  
}

function calcProbability() {
  const probability = getRandomNumber(0, 100);
  let grade = null;

  //очень захотелось куда-нибудь switch пристроить на практике
  switch(true) {
    case probability <= 20:
      grade = 'очень маловероятно';
      break;
    case probability > 20 && probability <= 40:
      grade = 'маловероятно';
      break;
    case probability > 40 && probability <= 60:
      grade = 'вероятно';
      break;
    case probability > 60 && probability <= 80:
      grade = 'очень вероятно';
      break;
    case probability > 80 && probability < 100:
      grade = 'почти точно';
      break;
    default:
      grade = 'абсолютно точно';
  }

  currentForecastProbability.textContent = `Вероятность: ${probability}% (то есть это ${grade})`;
}

function makeForecastsByTemplate(text, probability) {
  const forecastItem = template.content.cloneNode(true);  

  forecastItem.querySelector('h3').textContent = text;
  forecastItem.querySelector('p').textContent = probability;
    
  return forecastItem;
}

function generateEverything() {
  if (currentForecastText.textContent != '') {     
    const forecastCard = makeForecastsByTemplate(currentForecastText.textContent, currentForecastProbability.textContent);     
    myForecasts.prepend(forecastCard);
  }
  generateForecast();
  calcProbability();
}

button.addEventListener('click', generateEverything);

