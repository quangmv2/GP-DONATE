import React from "react";
import { Select } from 'antd';

const Hastag = props => (
    <Select
        className={props.className ?? ''}
        mode="tags" style={{ width: '100%' }} placeholder="Hastags" onChange={value => props.setHastags(value)}
        options={props.hastagsValue}
    >
    </Select>
);

export default Hastag;