import React, { Component } from 'react';
import CmsContent from '../../MiddleWare/CmsContent';
import renderHTML from "react-render-html";
import { ACCESS_POINT } from "../../config";
import PreLoader from "../preloader.js"
import Modal from "../modal";

class ThemeFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
		pageList:"",
		date:"" ,
		Content:[], 
		contentTitle:"",
		InnerData:[],
		modal14:false,
		//adminId: localStorage.getItem("swtnId"),
		loginstate:1,
		AdId:'',
		userlog:localStorage.getItem("userDetails"),
	  requireLogin:false
    };
  }
  
  async componentDidMount() {
    let themeid = this.props.match.params.id;
	let cusid =localStorage.getItem("swtnId");
	let r = this.props.match.params.customerid;
     let adminId="";
     if(r){
        adminId = r;
     }    
	 else if(cusid == r || cusid){
		//if(cusid==r){
			console.log(cusid) 
	    adminId=cusid;
		// }
      }
	
    const result = await CmsContent.samplesitepage(adminId,themeid);
    
    if (result) {
		let LS=JSON.parse(localStorage.getItem("loginstate"));
	   //console.log(); 
	  if(result.data[0].requireLogin=='1'){
		  
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		  
	     }
		   this.setState({Content:result.data[0],loginstate:LS,AdId:adminId});
		  this.state.Content.sheetContent = JSON.parse(this.state.Content.sheetContent);
           this.setState({InnerData:this.state.Content.sheetContent})
      }
      
  }
  async componentWillReceiveProps(nextProps) {
    let themeid = nextProps.match.params.id;
	let cusid =localStorage.getItem("swtnId")
     let r = this.props.match.params.customerid;
     let adminId="";
     if(r){
        adminId = r;
     }    
	 else if(cusid == r || cusid){
		//if(cusid==r){
			console.log(cusid) 
	    adminId=cusid;
		// }
      }
    const result = await CmsContent.samplesitepage(adminId,themeid)
    if (result) {
      let LS=JSON.parse(localStorage.getItem("loginstate"));
	   //console.log(); 
	  if(result.data[0].requireLogin=='1'){
		  
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		  
	     }
		   this.setState({Content:result.data[0],loginstate:LS,AdId:adminId});
		  this.state.Content.sheetContent = JSON.parse(this.state.Content.sheetContent);
           this.setState({InnerData:this.state.Content.sheetContent})
    }
  } 
  
  MobileSign = async (s,v) => {
    this.setState({[s]:v})
	if(this.state.userlog==null){
		window.location.href=`/${this.state.AdId}/`
	}else{
		window.location.href=`/samplesite/th5/${this.state.Content.id}`;
	}
 }

render(){
	 const{Content,InnerData}=this.state;
	 // console.log(Content); 
	 let text=Content.content1;
	 let ContentTitle=Content.contentTitle1;
   if(!ContentTitle){
	   return <PreLoader/>
   }else if(this.state.requireLogin==true){
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
   }else if(Content.contentTitle2=='true'){
	   console.log(1);
	   let content=[];
	   InnerData.map((ival,i)=>{
	 if(parseInt(Content.id) !== 291){
		 content.push(
	<div className="row form-group">
    <div className="col-sm-1"/>
		<div className="col-sm-10">
			<div class="about-content" style={{boxShadow:'0 5px 10px 0 #0000008f',padding:'12px'}}>
			  <div className="row form-group"> 
			          <div className="col-sm-12"> 
					  {ival.title&&(<p style={{fontSize:'14px'}}>
					  {renderHTML(ival.title)} 
					  </p>)}
			             </div>
                  </div>
		   
			</div> 
		</div>
	<div className="col-sm-1"/>
	</div>
		 )
	}
      else{	
		 content.push(
	<div className="row form-group">
    <div className="col-sm-2"/>
		<div className="col-sm-8">
			<div class="about-content" style={{boxShadow:'0 5px 10px 0 #0000008f',padding:'12px'}}>
			  <div className="row form-group"> 
			          <div className="col-sm-8"> 
					  {ival.title&&(<p style={{fontSize:'14px'}}>
					  {renderHTML(ival.title)} 
					  </p>)}
			             </div>
                  <div className="col-sm-4"> 
				    
				  </div>
				  </div>
		  
			</div> 
		</div>
	<div className="col-sm-2"/>
	</div>
		 
		 )
	  }
	 })
	   return(
         <React.Fragment>
	<div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}> 
        <div class="container" style={{backgroundColor:"#3c5dac"}}> 
            <div class="row" style={{backgroundColor:"#3c5dac"}}> 
                <div class="col-10" style={{marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" style={{marginLeft:'0%'}}>
                         <li class="breadcrumb-item"><a href={`/`}><i class="fa fa-home"></i>Home</a></li>
							<li class="breadcrumb-item active" aria-current="page">{Content.contentTitle1}</li>
                        </ol>
                    </nav>
                </div>
                 <br/>
                 <br/>
				     <div class="about-us-area section-padding-0-100" style={{width:'100%',marginTop:'2%'}}>
					      <div class="container">
                                <div class="row">
								    <div class="col-12">
										    <div class="about-content" style={{marginTop:"17px",paddingTop:'50px',boxShadow:'0 10px 30px 0 #000000'}}>
											   <div class="section-heading text-center">
											   <h2 class="post-title" style={{color:"#191919"}}> 
												   {Content.contentTitle1} 
                                               </h2>
											   </div>
												{content}
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
	    
   }else{	  
    return (
	<React.Fragment>
	 <div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}>
        <div class="container" style={{backgroundColor:"#3c5dac"}}> 
            <div class="row" style={{backgroundColor:"#3c5dac"}}> 
				<div class="col-12" style={{marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                            <ol class="breadcrumb" style={{marginLeft:'0%'}}>
                            <li class="breadcrumb-item"><a href="/"><i class="fa fa-home"></i> Home</a></li>
                           <li class="breadcrumb-item active" aria-current="page">{ContentTitle}</li> 
                        </ol>
                    </nav>
                </div>
				<br/> 
                 <br/>
         <div class="about-us-area section-padding-0-100" style={{marginTop:'2%',width:'100%'}}>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="about-content" style={{marginTop:"17px",paddingTop:'50px',boxShadow:'0 10px 30px 0 #000000'}}>
                       <div class="section-heading text-center">
                         <h2 class="post-title" style={{color:"#191919"}}>
							  {ContentTitle}
						 </h2>
                        </div>
						<div class="post-share">
						<p>
						 {text&&(
							 renderHTML(text)
							 )}
						</p>
						<br/><br/>
                        </div> 
						{InnerData.map((ival,i)=>{
							return(
                            <div>
							<div class="post-share">
							<p>{ival.title&&(
								 renderHTML(ival.title)
								 )}
							 </p>
							</div>  
							 <br/><br/>
							<div class="row">
                             <div class="col-1"></div>
							 <div class="col-4">
							 {ival.thumbnail&&(
							 <img
                              className="box-shadow-img"
                              src={`${ACCESS_POINT}/superAdmin/file?fileurl=${ival.thumbnail}`}
                              alt="something went wrong"
                            />
							 )}
							</div>
						    <div class="col-6">
							{ival.files.map((jval,j)=>{
								return(
							 <div>
							 <a href={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.link}`}><p> 
							 <img
                              className="box-shadow-img"
							  src={`${ACCESS_POINT}/superAdmin/file?fileurl=SDAS/Video/download_1586853763899.jpg`}
                             style={{width:'14px',marginBottom:'2px'}}
									 />
							 {jval.name}</p></a><br/>								 
							 </div>
							  )
							})
							}
							</div>
							</div>
                            </div>)
						})
						}
						</div>
						</div></div>
						</div></div>
	</div>
	</div>
	</div>
	</React.Fragment>)
   } 
  } 
}
export default ThemeFive;
