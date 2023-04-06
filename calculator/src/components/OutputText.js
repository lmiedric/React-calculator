import React from 'react'
import '../css/OutputText.css';

const OutputText = (props) => {
    return (
        <input disabled type="text" className='outputText'
            style={{ gridColumn: props.column, gridRowStart: props.row }}
            placeholder='Result'
            value={props.value} />
    );
};

export default OutputText;