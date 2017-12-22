const weather = require('./weather');
const getInfo = weather.getInfo;

const cityAndState = process.argv.slice(2);
getInfo(cityAndState);
