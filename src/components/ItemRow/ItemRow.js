import React from 'react';
import classes from './ItemRow.css';

const ItemRow = (props) => {
    return(
        
    <div className={classes}>
    
    <h3>{props.title}</h3>
    <p>{props.description}</p>
    {props.found ? <p> V </p> : null}

    </div>
    );
    
};

export default ItemRow;