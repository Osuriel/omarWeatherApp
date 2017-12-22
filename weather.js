const config = require('./config');
const http = require('http');

const { API_KEY } = config;

const printData = (data, cityAndState) => {
  try {
    cleanData = JSON.parse(data);

    if (!cleanData.current_observation || !cleanData.current_observation.temperature_string) {
      console.log('ran inside if');
      const message = ` Could not find the weather for ${cityAndState[0]}, ${cityAndState[1]}`;
      const tempNotFoundError = new Error(message);
      printError(tempNotFoundError);

      return;
    }

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

  try {

    const request = http.get(URL, response => {

      if (response.statusCode !== 200) {
        const message = `There was an error getting the weather, STATUSCODE: ${response.statusCode} | ` +
        `${http.STATUS_CODES[response.statusCode]} `;
      }

      let dataString = '';
      response.on('data', data => dataString += data);

      response.on('end', () => printData(dataString, cityAndState));

    }).on('error', printError);;

  } catch(e) {
    const urlError = new Error('URL parsing error');
    printError(urlError);
  }

}

module.exports = { getInfo };
