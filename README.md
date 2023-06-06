# Bot de Trading para Bitso

Este es un bot de trading automatizado que utiliza el indicador RSI (Relative Strength Index) para realizar operaciones de compra y venta en la plataforma Bitso. El bot se ejecuta periódicamente y toma decisiones basadas en el estado del RSI para aprovechar posibles oportunidades de mercado.

## Requisitos

- Node.js (versión X.X.X)
- Claves de API de Bitso

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
Navega hasta el directorio del proyecto:

bash
Copy code
cd tu-repositorio
Instala las dependencias necesarias:


npm install
Asigna tus claves de API de Bitso como variables de entorno:

export LLAVE=<tu-api-key>
export CLAVE=<tu-api-secret>
Uso
Para iniciar el bot de trading, ejecuta el siguiente comando:


npm start
El bot comenzará a ejecutarse y realizará operaciones de acuerdo a las condiciones del indicador RSI. Puedes consultar la salida y los detalles de las operaciones en la consola.

Configuración
Dentro del archivo index.js, puedes ajustar los siguientes parámetros de configuración según tus necesidades:

symbol: El par de criptomonedas que deseas operar (ejemplo: 'btc_usdt').
interval: El intervalo de tiempo para obtener los datos históricos (ejemplo: '1m' para 1 minuto).
rsiPeriod: El período utilizado para calcular el RSI.
rsiOverboughtThreshold: El umbral de sobrecompra del RSI.
rsiOversoldThreshold: El umbral de sobreventa del RSI.
tradeAmount: La cantidad a comprar o vender en cada operación.
Asegúrate de ajustar estos parámetros de acuerdo a tu estrategia de trading.

Contribución
Si deseas contribuir a este proyecto, siéntete libre de hacerlo. Puedes abrir un pull request y estaremos encantados de revisarlo.

Aviso legal
Ten en cuenta que este bot de trading se proporciona con fines educativos y de prueba. No garantizamos resultados ni nos hacemos responsables de las pérdidas o ganancias incurridas por su uso. Utilízalo bajo tu propio riesgo.