import React, { Component } from "react";
import Test from "./test";

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearchkey: "",
      data: "",
      themeId: null,
      show: false
    };
  }

render() {
   
    return (
      <React.Fragment>
        <header
          className="header-area"
          style={{backgroundColor: '#ffffff',height:'80px'}}  
        >
		<div className="classy-nav-container breakpoint-off">
            <div className="container-fluid" style={{backgroundColor: '#ffffff'}}>
			 <nav className="classy-navbar justify-content-between" id="nikkiNav" style={{backgroundColor: '#ffffff', padding: '0px' }}>
			 <a href={"/"} >
					 <div style={{ width: '74%' }}>
                    <img
                      src={`http://35.169.94.138/dev/swtn/src/Screens/Swtn.jpeg`} 
                      alt=""
                      style={{ width: '76%', marginTop: '31%', marginLeft: '22%' }} />
 
					</div>
                  <div><p style={{ fontSize: '11px', fontWeight: 'bolder' }}>Social Watch - Tamilnadu</p>
                  </div> 
			 </a>
			 {/* <div className="top-social-info">
					 <a href="#" data-toggle="tooltip" data-placement="bottom" title="Facebook"><i className="fa fa-facebook" aria-hidden="true" /></a>
                      <a href="#" data-toggle="tooltip" data-placement="bottom" title="Twitter"><i className="fa fa-twitter" aria-hidden="true" /></a>
                      <a href="#" data-toggle="tooltip" data-placement="bottom" title="Instagram"><i className="fa fa-instagram" aria-hidden="true" /></a>
                      <a href="#" data-toggle="tooltip" data-placement="bottom" title="Pinterest"><i className="fa fa-pinterest" aria-hidden="true" /></a>
                      <a href="#" data-toggle="tooltip" data-placement="bottom" title="RSS Feed"><i className="fa fa-rss" aria-hidden="true" /></a>
                      
			 </div>*/} 
			 </nav>
			</div>
			</div>
        <Test/> 
        </header>
      </React.Fragment>
    );
  }
}
