import React from 'react';
import './App.css';
import MovingAverageScreener from './components/MovingAverageScreener';
const API_URL = "https://restsimulator.intuhire.com/currency_pairs";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currencyPairs: [] };
    }

    componentDidMount() {
        fetch(API_URL)
            .then(res => res.json())
            .then((result) => {
                this.setState({ currencyPairs: result })
            })
    }

    render() {
        return (
            <div className="flex-container">
                <div className="row">
                    <div className="column">
                        <MovingAverageScreener currencyPairs={this.state.currencyPairs} 
                        defaultCurrency="EURUSD" noOfTicks="11" />
                    </div>
                    <div className="column">
                        <MovingAverageScreener currencyPairs={this.state.currencyPairs}
                         defaultCurrency="GBPUSD" noOfTicks="7" />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <MovingAverageScreener currencyPairs={this.state.currencyPairs}
                         defaultCurrency="USDINR" noOfTicks="4" />
                    </div>
                    <div className="column">
                        <MovingAverageScreener currencyPairs={this.state.currencyPairs}
                         defaultCurrency="AUDUSD" noOfTicks="8" />
                    </div>
                </div>
            </div>
                 
        );
    }
}

export default App;
