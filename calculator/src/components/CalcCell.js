import React from 'react';
import '../css/CalcCell.css';

const CalcCell = (props) => {
    let buttonClass = props.className ? ' ' + props.className : '';

    return (
        <button className={'calcCell' + buttonClass}
            style={{gridColumnStart: props.column, gridRowStart: props.row}}
            onClick={props.onClick}>
            {props.number}
        </button>
    );
};

export default CalcCell;