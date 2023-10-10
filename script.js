/* Генерация предсказания должна происходить при клике на кнопку «предсказать судьбу» */
/* Заранее заготовь 3-5 предсказаний и в зависимости от того, как лягут карты судьбы (или что скажет Math.random) показывай их пользователю */
/* Подставляй текст нового предсказания в .current-forecast h1 */
/* Показывай процент вероятности, с которым предсказание сбудется — в верстке это .current-forecast p */
/* Данный процент также нужно генерировать автоматически, он может принимать значения от 0 до 100% */
/* Совет: заведи функцию-хелпер, которая будет заниматься только генерацией данных в диапазоне от min до max и используй ее где нужно */
/* При генерации нового предсказания старое предсказание должно добавляться в начало списка «Мои предсказания» — .forecasts  */
/* Для добавления предсказания в список воспользуйся шаблоном forecast-item */

/*ENG*/
/* The forecast have to be generated when you click on the “predict fate” button */
/* Prepare 3-5 forecasts in advance and, depending on how the fate cards turn out (or what Math.random says), show them to the user */
/* Insert the text of the new forecast into .current-forecast h1 */
/* Show the percentage of probability with which the forecast will come true - in the layout this is .current-forecast p */
/* This percentage also have to be generated automatically; it can take values from 0 to 100% */
/* Tip: create a helper function that will only generate data in the range from min to max and use it where needed */
/* When generating a new forecast, the old forecast must be added to the beginning of the “My forecasts" list - .forecasts */
/* To add a forecast to the list, use the forecast-item template */

const forecasts = ['Любит!', 'Не любит :(', 'Плюнет :(', 'Поцелует!', 'К сердцу прижмет!', 'К черту пошлет :(', 'Замуж возьмет!'];
const button = document.querySelector('.forecast-btn');
const currentForecastText = document.querySelector('.current-forecast h1');
const currentForecastProbability = document.querySelector('.current-forecast p');
const template = document.querySelector('#forecast-item');
const myForecasts = document.querySelector('.forecasts');


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // max inclusive
}

function getForecast() {
  const index = getRandomNumber(0, forecasts.length - 1);
  currentForecastText.textContent = forecasts[index];  
}

function getProbability() {
  const probability = getRandomNumber(0, 100);
  let grade = null;

  switch(true) {
    case probability <= 20:
      grade = 'очень маловероятно'; // very unlikely
      break;
    case probability > 20 && probability <= 40:
      grade = 'маловероятно';  // unlikely
      break;
    case probability > 40 && probability <= 60:
      grade = 'вероятно';  // probably
      break;
    case probability > 60 && probability <= 80:
      grade = 'очень вероятно'; // very likely
      break;
    case probability > 80 && probability < 100:
      grade = 'почти точно'; // almost exactly
      break;
    default:
      grade = 'абсолютно точно'; // absolutely 
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
  getForecast();
  getProbability();
}

button.addEventListener('click', generateEverything);