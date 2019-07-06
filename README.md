React Moving Average
Description:
A moving average (MA) is a widely used indicator in technical analysis that helps smooth out price action by filtering out the noise from random price fluctuations. It is a trend-following, or lagging, indicator because it is based on past prices. The moving average is calculated over a period of time or certain number of past ticks/prices and is compared with the current tick/price. We want to create a screen that easily helps us in making buy/sell decisions for a set of FX currencies.

Additional Notes:
You are given: a REST API which has the list of currency pairs. You are also given a Websocket that simulates stock data. After connecting, you can start receiving data by sending a json message of the form {"currencyPair":"EURUSD"}. Your task is to design a screen similar to the one shown in the screenshot. There are 4 boxes, each belonging to a currency pair that can be selected from its dropdown. You will need to match the stylings in the screenshot accurately. The background color for each box depends on the moving average and current value of the security. There is an input box to determine how many previous ticks to account for while creating the moving average. The color of each box is determined by the current and moving average values. If the current value is greater than moving average the background needs to be red, suggesting 'SELL' .Conversely, if the current is lesser, the background needs to be green, suggesting 'BUY'. The brightness of green/red depends on how far the current value is from the moving average, the brightest red showing when the current is more than 5% higher than the current, then next level of brightness at 4.5% further reducing brightness at each step of 0.5% until 0. Conversely, the brightness of green also follows the same pattern.
## Available Scripts

To start the project, run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


