import React from 'react';
class FormattedPrice extends React.Component {
    render() {

        var price = this.props.price;
        price = parseFloat(Math.round(price * 10000) / 10000).toFixed(4);
        var dotIndex = price.indexOf('.');
        var beforeDecimal = price.substring(0, dotIndex);
        var twoDecimalAfterDot = price.substring(dotIndex + 1, dotIndex + 3);
        var lasttwoDecimal = price.substring(price.length - 2, price.length);
        return (
            <div className="price-f"><h1>{beforeDecimal}</h1>
                <span>.</span>
                <h3>{twoDecimalAfterDot}</h3>
                <h1>{lasttwoDecimal}</h1>
            </div>
        )
    }
}

export default FormattedPrice;
