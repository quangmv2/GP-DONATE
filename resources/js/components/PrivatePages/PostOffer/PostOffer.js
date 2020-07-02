import React, { Component } from "react";
import {HeaderNavigation} from 'components/Atoms';
import './PostOffer.scss';
export class PostOffer extends Component {
    
    render() {
        return (
            <div class="">
                <div className="container ">
                    <HeaderNavigation 
                    headerName='post an offer'
                    />
                </div>
            </div>
        );
    }
}




export default PostOffer;
