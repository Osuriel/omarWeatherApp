const config = require('./config');
const http = require('http');

const { API_KEY } = config;

const printData = data => {
  try {
    cleanData = JSON.parse(data);
    console.log(cleanData);
    console.dir(cleanData);
    console.log(`The temperature in ${cityAndState[0]}, ${cityAndState[1]} is: ${cleanData.current_observation.temperature_string}`);
  } catch(e) {
    printError(e);
  }

};

const printError = e => console.error('Error is:', e.message);

const getInfo = cityAndState => {
  const city = cityAndState[0];
  const state = cityAndState[1];

  const URL = `http://api.wunderground.com/api/${API_KEY}/conditions/q/${state}/` +
  `${city.replace(' ', '_')}.json`;

  console.log('URL: ', URL);
  try {

    const request = http.get(URL, response => {
      let dataString = '';
      response.on('data', data => dataString += data);

      response.on('end', () => printData(dataString));

      response.on('error', printError);

    });

  } catch(e) {

    printError(e)
  }

}

const cityAndState = process.argv.slice(2);
getInfo(cityAndState);
