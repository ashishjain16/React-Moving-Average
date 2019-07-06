import React from 'react';
class NoOfTicks extends React.Component {

    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onMinusClick = this.onMinusClick.bind(this);
    }

    onPlusClick(event) {
        this.props.onPlusClick();
    }

    onMinusClick(event) {
        this.props.onMinusClick();
    }

    render() {
        var noOfTicks = this.props.noOfTicks;
        noOfTicks = noOfTicks > 9 ? noOfTicks : "0" + noOfTicks;
        return (
            <div className="noofticks">
                <span className="noOfticksText">No. of Ticks</span>
                <div>
                    <h3> <a onClick={this.onMinusClick}>-&nbsp;</a></h3>
                    <span className="ticks">{noOfTicks}</span>
                   <h3><a onClick={this.onPlusClick}>&nbsp;+</a></h3>
                </div>
            </div>
        )
    }
}

export default NoOfTicks;
