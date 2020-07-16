import React, { Component } from "react";
import "./style1.css";
import { ACCESS_POINT } from "../config";

export default class preLoader extends Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <React.Fragment>
	  <div class="breadcrumb-area">
        <div class="container" style={{backgroundColor:"#fff"}}>
            <div class="row" style={{backgroundColor:"#fff"}}> 
	  
	  <div class="about-us-area section-padding-0-100" style={{width:'100%',marginTop:'14%' }}>
					      <div class="container">
	                   
					   <div class="row"> 
								   <div class="col-1"></div>
								   <div class="col-10">
	                              <div class="loader">Loading...</div>
					             </div>
					              <div class="col-1"></div>
						</div>		   
	          
			 </div>
			 </div>
			 
			 </div>
			 </div>
			 </div>
		 
      </React.Fragment> 
    );
  }
}
