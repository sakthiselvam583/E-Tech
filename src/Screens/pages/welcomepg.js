import React, { Component } from "react";


class Welcomepg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: "",
      date: "" ,
	  //adminId: localStorage.getItem("swtnId"),
	 };
	
}

async componentDidMount() {
         
	
}

 
 render() {
	  //console.log( localStorage.getItem("swtnId"));
 return(
         <React.Fragment>
	<div class="breadcrumb-area">
        <div class="container" > 
            <div class="row" > 
				<div class="col-10" style={{marginTop:'7%'}}>
                  </div>				
                  <br/> 
                 <br/>
				     <div class="about-us-area section-padding-0-100"  style={{width:'100%',marginTop:'2%'}}>
					      <div class="container">
                                <div class="row">
								   {/*<div class="col-1"></div>*/}
                                        <div class="col-12">
										    <div class="" style={{marginTop:"17px",width:'100%',}}> 
											   <div class="section-heading text-center">
											   <h2 class="post-title" style={{color:"#191919"}}>
                                                 Welcome  Page
                                               </h2>
											   
										        </div>
												 <div class="post-share">
												  
												</div>
										   </div>
										 </div>
				                    {/*<div class="col-1"></div>*/}
				                </div>
						  </div>
				     </div>
			 </div>
		</div>
	</div>
				  
         </React.Fragment>

       )

}
}
export default Welcomepg;