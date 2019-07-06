import React from 'react';
import SelectCurrency from './SelectCurrency';
import FormattedPrice from './FormattedPrice';
import FormattedPercChng from './FormattedPercChng';
import NoOfTicks from './NoOfTicks';
import Chart from './Chart';

class MovingAverageScreener extends React.Component {
  wsconnection;
  data = [];
  lastTickData = 0;
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: this.props.defaultCurrency,
      noOfTicks: this.props.noOfTicks,
      currentPrice: 0,
      percChange: 0,
      movingAverage: 0,
      bgColor: "rgb(255, 0, 0)"
    }

    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
    this.onMinusClick = this.onMinusClick.bind(this);

  }
  componentDidMount() {
    this.initilizeWebSocket();
  }

  initilizeWebSocket() {
    this.wsconnection = new WebSocket('wss://stocksimulator.intuhire.com');
    this.wsconnection.onopen = this.onopen.bind(this);
    this.wsconnection.onerror = this.onerror.bind(this);
    this.wsconnection.onmessage = this.onmessage.bind(this);
  }

  componentWillUnmount() {
    this.wsconnection.close();
  }

  onopen = function () {
    this.sendcurrencyMsg(this.state.selectedCurrency);
  };

  // Log errors
  onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };

  // Log messages from the server
  onmessage = function (e) {
    //console.log('Server: ' + e.data);
    var price = +e.data;

    if (this.data.length >= this.state.noOfTicks)
      this.data.shift();
    this.data.push(price);

    var ma = this.calcMovingAverage(this.data);
    var bgColor = this.calcBGColor(ma, price);
    var percChng = ((price - this.lastTickData) / price) * 100;
    this.setState({ movingAverage: ma, currentPrice: price, percChange: percChng, bgColor: bgColor });
    //console.log('Server: ' + JSON.stringify(this.state));
    this.lastTickData = price;
  };

  sendcurrencyMsg(currPair) {
    var data = { "currencyPair": currPair };
    this.wsconnection.send(JSON.stringify(data));
  }

  calcMovingAverage(data) {
    var arrayData = data.slice(0, this.state.noOfTicks);
    var ma = arrayData.reduce((a, b) => a + b, 0) / arrayData.length;
    return ma.toFixed(4);
  }

  calcBGColor(ma, price) {
    var percChng = ((price - ma) / price) * 100;
    var isSell = price > ma ? true : false;
    var diff = Math.abs(percChng) / 0.5;
    var colorVal = parseInt(255 - ((10 - diff) * 15));

    var colorCode = "";
    if (isSell)
      colorCode = "rgb(" + colorVal + ", 0, 0)" //red
    else
      colorCode = "rgb(0," + colorVal + ", 0)" //green

    return colorCode;
  }

  onCurrencyChange(newVal) {
    this.setState({
      selectedCurrency: newVal,
      currentPrice: 0,
      percChange: 0,
      movingAverage: 0
    });
    this.data = [];
    this.wsconnection.close();
    this.initilizeWebSocket();
  }

  onPlusClick() {
    var noOfTicks = +this.state.noOfTicks + 1;
    this.setState({ noOfTicks: noOfTicks });
  }

  onMinusClick() {
    var noOfTicks = +this.state.noOfTicks - 1;
    if (noOfTicks > 0) {
      this.setState({ noOfTicks: noOfTicks });
    
      if(noOfTicks < this.data.length)
      {
        this.data.shift();
      }
    }
  }

  render() {
    return (
      <div className="movingavg" style={{ backgroundColor: this.state.bgColor }}>
        <div>
          <span className="div-select">
            <SelectCurrency currencyPairs={this.props.currencyPairs}
              onCurrencyChange={this.onCurrencyChange}
              selectedCurrency={this.state.selectedCurrency}
            />
          </span>
          <span className="divperc"><FormattedPercChng percChange={this.state.percChange} /></span>
        </div>
        <div>
          <FormattedPrice price={this.state.currentPrice} />
          <NoOfTicks noOfTicks={this.state.noOfTicks}
            onPlusClick={this.onPlusClick}
            onMinusClick={this.onMinusClick}
            onNoOfTicksChange={this.onNoOfTicksChange}
          />
        </div>
        <div className="chart">
          <Chart data={this.data} />
       </div>
      </div>

    );
  }
}

export default MovingAverageScreener;
