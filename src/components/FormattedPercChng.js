import React from 'react';
class FormattedPercChng extends React.Component {
    render() {
        var percChange = this.props.percChange;
        percChange = parseFloat(percChange).toFixed(2);

        if (parseFloat(percChange) > 0)
            percChange = '+' + percChange;
        else if (parseFloat(percChange) === 0)
            percChange = Math.abs(percChange).toFixed(2)

        return (
            <h2>{percChange}%</h2>
        )
    }
}

export default FormattedPercChng;
