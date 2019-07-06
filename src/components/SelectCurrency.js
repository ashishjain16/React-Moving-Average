import React from 'react';
class SelectCurrency extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onCurrencyChange(event.target.value);
    }

    formatName(name) {
        return name.substring(0, 3) + "/" + name.substring(3, 6);
    }
    render() {
        const options = this.props.currencyPairs.map((currency) =>
            <option key={currency.currency_name} value={currency.currency_name}>{this.formatName(currency.currency_name)}</option>
        );
        return (
            <select value={this.props.selectedCurrency} onChange={this.handleChange}>
                {options}
            </select>
        );
    }
}

export default SelectCurrency;
