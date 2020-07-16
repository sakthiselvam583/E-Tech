import React, { Component } from 'react';
import CmsContent from '../../MiddleWare/CmsContent';
import { ACCESS_POINT } from "../../config";
import PreLoader from "../preloader"
//import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import renderHTML from "react-render-html";
import Modal from "../modal";

class ThemeSeven extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: false,
			modal14:false,
		    loginstate:1,
		     AdId:'',
			 requireLogin:false,
			 userlog:localStorage.getItem("userDetails"),
			//adminId: localStorage.getItem("swtnId")
		}
	}
	componentDidMount() {
		let themeid = this.props.match.params.id;
		this.process(themeid);
	}
	componentWillReceiveProps(nextProps) {
		let themeid = nextProps.match.params.id;
		this.process(themeid);
	}
	process = async (themeid) => {
		
		let cusid =localStorage.getItem("swtnId")
        let r = this.props.match.params.customerid;
        let adminId="";
        if(r){
        adminId = r;
            }    
	     else if(cusid == r || cusid){
		//if(cusid==r){
		//	console.log(cusid) 
	       adminId=cusid;
		// }
          } 
		const {data} = await CmsContent.samplesitepage(adminId,themeid);
		// let { data } = await CmsContent.getFreedom(
		// 	'*',
		// 	'tbl_pages',
		// 	`themeId ='7'`
		// );
		if (data && data.length) {
			
			let LS=JSON.parse(localStorage.getItem("loginstate"));
	   //console.log(); 
	  if(data[0].requireLogin=='1'){
		  
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		  
	     }
		data[0].sheetContent = data[0].sheetContent.split('SDAS/Video/').join(`${ACCESS_POINT}/superAdmin/file?fileurl=SDAS/Video/`);
			//console.log(data[0].sheetContent)
         this.setState({data:data[0],AdId:adminId,loginstate: LS ==null ? '1' : LS.loginstate});			
			//this.setState({  });
			//console.log(this.state.data); 
		}
	}
 
 MobileSign = async (s,v) => {
    this.setState({[s]:v})
	if(this.state.userlog==null){
		window.location.href=`/${this.state.AdId}/`
	}else{
		window.location.href=`/samplesite/th7/${this.state.pageList.id}`;
	}
} 


	render() {
		if (this.state.data) {
			return (
				<React.Fragment>
					<div class="breadcrumb-area" style={{ backgroundColor: "#3c5dac" }}>
						<div class="container" style={{ backgroundColor: "#3c5dac" }}>
							<div class="row" style={{ backgroundColor: "#3c5dac" }}>
								<div class="col-10" style={{ marginTop: '7%' }}>
									<nav aria-label="breadcrumb">
										<ol class="breadcrumb" style={{ marginLeft: '0%' }}>
											<li class="breadcrumb-item"><a href={`/`}><i class="fa fa-home"></i>Home</a></li>
											<li class="breadcrumb-item active" aria-current="page">{this.state.data.name}</li>
										</ol>
									</nav>
								</div>
								<br />
								<br />
								<div class="about-us-area section-padding-0-100" style={{ width: '100%', marginTop: '2%' }}>
									<div class="container">
										<div class="row">
											<div class="col-12">
												<div class="about-content" style={{ marginTop: "17px", paddingTop: '50px', boxShadow: '0 10px 30px 0 #000000' }}>
													<div class="section-heading text-center">
														<h2 class="post-title" style={{ color: "#191919" }}>
															{this.state.data.name}
														</h2>
													</div>
													{renderHTML(this.state.data.sheetContent)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			)
		}else if(this.state.requireLogin==true){
	//console.log(this.props.match.params.loginstate)  
	return(
	<React.Fragment>
	 {this.state.modal14===true&&(
	   <Modal 
	 modal14={this.state.modal14}
	 these={this.MobileSign}
	 customerid={this.state.AdId} 
	 loginstate={this.state.loginstate}
	 />)} 
	<PreLoader/>
	</React.Fragment>
	)
}else {
			return <PreLoader />
		}
	}
}
export default ThemeSeven;
