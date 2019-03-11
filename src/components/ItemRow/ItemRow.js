import React from 'react';
import classes from './ItemRow.css';
import { Row, Col } from 'antd';

const ItemRow = (props) => {
    return(
        
    <Row>
        <Col span={2}>
        </Col>
        <Col span={2} className={classes.CheckBox}>
            {props.found ? <p className={classes.Check}> V </p> : <p>?</p>}
        </Col>
        
        <Col span={20}>
            
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </Col>

    </Row>
    );
    
};

export default ItemRow;