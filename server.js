const express = require('express');
const ccxt = require('ccxt');
const axios = require('axios');
const { RSI } = require('technicalindicators');

// Configuración del bot
const apiKey = process.env.LLAVE;
const secretKey = process.env.CLAVE;
const symbol = 'ars_usdt';
const rsiPeriod = 14;
const rsiOverboughtThreshold = 70;
const rsiOversoldThreshold = 30;
const tradeAmount = 0.01; // Cantidad a comprar o vender en cada operación

// Crear instancia de intercambio (Exchange)
const exchange = new ccxt.bitso({
  apiKey: apiKey,
  secret: secretKey,
});

// Función para obtener el precio actual
async function getCurrentPrice() {
  const tickerUrl = exchange.urls.api + '/ticker';
  const tickerResponse = await axios.get(tickerUrl, {
    params: {
      book: symbol,
    },
  });
  const ticker = tickerResponse.data.payload;
  return parseFloat(ticker.last);
}

// Función para obtener los datos históricos de precios
async function getHistoricalData() {
  const ohlcvUrl = exchange.urls.api + '/trades';
  const ohlcvResponse = await axios.get(ohlcvUrl, {
    params: {
      book: symbol,
      aggregate: 1,
      limit: rsiPeriod + 1,
    },
  });
  const ohlcvData = ohlcvResponse.data.payload.trades;
  const closePrices = ohlcvData.map(d => parseFloat(d.price));
  return closePrices;
}

// Función para calcular el RSI
function calculateRSI(prices) {
  const input = {
    values: prices,
    period: rsiPeriod,
  };
  const rsi = RSI.calculate(input);
  return rsi[rsi.length - 1];
}

// Función para realizar una orden de compra de mercado
async function buyOrder(quantity) {
  const feePercentage = 0.02; // 2% de comisión
  const currentPrice = await getCurrentPrice();
  const fee = quantity * currentPrice * feePercentage;
  const order = await exchange.createOrder(symbol, 'market', 'buy', quantity - fee);
  console.log('Orden de compra realizada con éxito:');
  console.log('Cantidad:', quantity);
  console.log('Precio:', currentPrice);
  console.log('Comisión:', fee);
  console.log('Total:', quantity - fee);
  console.log('Orden:', order);
}

// Función para realizar una orden de venta de mercado
async function sellOrder(quantity) {
  const feePercentage = 0.02; // 2% de comisión
  const currentPrice = await getCurrentPrice();
  const fee = quantity * feePercentage;
  const order = await exchange.createOrder(symbol, 'market', 'sell', quantity - fee);
  console.log('Orden de venta realizada con éxito:');
  console.log('Cantidad:', quantity);
  console.log('Precio:', currentPrice);
  console.log('Comisión:', fee);
  console.log('Total:', quantity - fee);
  console.log('Orden:', order);
}

// Función principal del bot
async function runBot() {
  try {
    // Cargar los mercados disponibles en el intercambio
    await exchange.loadMarkets();

    // Obtener el precio actual
    const currentPrice = await getCurrentPrice();

    // Obtener los datos históricos de precios
    const historicalData = await getHistoricalData();

    // Calcular el RSI
    const rsi = calculateRSI(historicalData);

    // Comprobar las condiciones para realizar una operación
    if (rsi > rsiOverboughtThreshold) {
      // Vender si el RSI está por encima del umbral de sobrecompra
      await sellOrder(tradeAmount);
    } else if (rsi < rsiOversoldThreshold) {
      // Comprar si el RSI está por debajo del umbral de sobreventa
      await buyOrder(tradeAmount);
    }

    // Imprimir información en la consola
    console.log('Precio actual:', currentPrice);
    console.log('RSI:', rsi);

  } catch (error) {
    console.error('Error en el bot de trading:', error);
  }
}

// Crear servidor Express
const app = express();

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Hola, este es el servidor de prueba.');
});

// Ruta para ejecutar el bot de trading
app.get('/bot', (req, res) => {
  runBot(); // Ejecutar el bot inmediatamente
  res.send('El bot de trading se ha iniciado.');
});

// Puerto de escucha
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
    // Ejecutar el bot cada cierto intervalo de tiempo
    const intervalTime = 1 * 60 * 1000; // 5 minutos (en milisegundos)
    setInterval(runBot, intervalTime);
  console.log(`Servidor en ejecución en http://localhost:${port}/`);
});

