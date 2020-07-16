import React, { Component } from "react";
import CmsContent from "../../MiddleWare/CmsContent";
import renderHTML from "react-render-html";
import PreLoader from "../preloader.js"
import { ACCESS_POINT } from '../../config';
import Modal from "../modal";
//import 'froala-editor/css/froala_editor.pkgd.min.css';
//import 'froala-editor/css/froala_style.css';

class CommonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: "",
      date: "" ,
	  adminId: localStorage.getItem("swtnId"),
	  userlog:localStorage.getItem("userDetails"),
	  modal14: false,
	  AdId:0,
	  loginstate:1
	 };
	
}
  async componentDidMount() {
	  let themeid = this.props.match.params.id; 
	 // let loginstate=this.props.match.params.loginstate;
	  let cusid =localStorage.getItem("swtnId");
	  let r = this.props.match.params.customerid;
      let adminId=""; 
	 
	// this.setState({loginstate});
      if(r){
        adminId = r;
     }    
	 else if(cusid == r || cusid){
		//if(cusid==r){
			//console.log(cusid) 
	    adminId=cusid;
		// }
      }
	
      this.pageView(adminId,themeid);
  }
  async componentWillReceiveProps(nextProps) {
	 let themeid = nextProps.match.params.id; 
	// let loginstate=nextProps.match.params.loginstate;
	  let cusid =localStorage.getItem("swtnId");
	  let r = this.props.match.params.customerid;
      let adminId="";
	 // console.log(cusid);
	 //this.setState({loginstate});
     if(r){
        adminId = r;
     }    
	 else if(cusid == r || cusid){
		//if(cusid==r){
			//console.log(cusid) 
	    adminId=cusid;
		// }
      }
	// console.log(adminId);
      this.pageView(adminId,themeid); 
  }
 
 pageView=async(adminId,themeid)=>{
	 
	try{
    const result = await CmsContent.samplesitepage(adminId,themeid);
    if (result) {
		//console.log(result.data);  
	 if (result.data[0].Date != null && result.data[0].Date != undefined) {
        var dataformate = result.data[0].Date.split("-");
        this.setState({
          date: dataformate[2] + "-" + dataformate[1] + "-" + dataformate[0]
        });
		
      }
	  let LS=JSON.parse(localStorage.getItem("loginstate"));
	   console.log( LS); 
	  if(result.data[0].requireLogin=='1'){
		  
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		  
	  }

	  
	  this.setState({ pageList: result.data[0] ,pgid:themeid,AdId:adminId,loginstate: LS==null ? '1': LS.loginstate});
	}
	}catch(error){
		console.log(error);
	}
	 
 }
 
  /* async componentWillReceiveProps(nextProps) {
    let themeid = nextProps.match.params.id;

  
    
    const result = await CmsContent.samplesitepage(themeid);
    if (result) {
      if (result.data[0].Date != null && result.data[0].Date != undefined) {
        var dataformate = result.data[0].Date.split("-");
        this.setState({
          date: dataformate[2] + "-" + dataformate[1] + "-" + dataformate[0]
        });
      }
      this.setState({ pageList: result.data[0],pgid:themeid});
    }
  } */
  
  
  coverContent = con => {
    if (this.state.pageList.linkto) {
      //console.log(this.state.pageList.linkto)
      return <a href={`${this.state.pageList.linkto}`} target="_blank">{con}</a>;
    }
    return con;
  }; 

MobileSign = async (s,v) => {
    this.setState({[s]:v})
	if(this.state.userlog==null){
		window.location.href=`/${this.state.AdId}/`
	}else{
		window.location.href=`/samplesite/commonpg/${this.state.pageList.id}`;
	}
}

 render() {
	  const { pageList, date,pgid} = this.state;
	  let head=[];
	  //console.log(pageList); 
	  let image3= pageList.file2;
	  if(image3=='-'){
		   image3=null;
	   }else{
		   image3=image3;
	   }
	  let image = pageList.file;
	  let image1 = pageList.thumbnail;
	    if(image1=='-'){
		   image1=null;
	   }else{
		   image1=image1;
	   }
	   if(image=='-'){
		   image=null;
	   }else{
		   image=image;
	   }
	  if(pageList.id!=='247'){
		  
		  head.push(
		   <div class="col-10" style={{marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" style={{marginLeft:'0%'}}>
							<li class="breadcrumb-item"><a href={"/"}><i class="fa fa-home"></i>Home</a></li>
		                    <li class="breadcrumb-item active" aria-current="page">{pageList.contentTitle1}</li>	
						</ol>
                    </nav>
                </div>
		       )
	  }else{
		   head.push(
		   <div class="col-10" style={{marginTop:'7%'}}>
			   {/*<nav aria-label="breadcrumb">
                        <ol class="breadcrumb" style={{marginLeft:'4%'}}>
							<li class="breadcrumb-item"><a href={"/"}><i class="fa fa-home"></i>Home</a></li>
		                    <li class="breadcrumb-item active" aria-current="page">{pageList.contentTitle1}</li>	
						</ol>
			   </nav>*/}
                </div>
		       )
		  
	  }
  
if(!pageList){
 return <PreLoader/>
}else if(this.state.requireLogin==true){
	console.log(this.props.match.params.loginstate)  
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
}
else{
   return(
         <React.Fragment>
	<div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}>
        <div class="container" style={{backgroundColor:"#3c5dac"}}> 
            <div class="row" style={{backgroundColor:"#3c5dac"}}> 
				{head}              
             <br/>  
             <br/>
	<div class="about-us-area section-padding-0-100"  style={{width:'100%',marginTop:'2%'}}>
		 <div class="container">
            <div class="row">
				{/*<div class="col-1"></div>*/}
             <div class="col-12">
			 <div class="about-content" style={{marginTop:"17px",paddingTop:'50px',boxShadow:'0 10px 30px 0 #000000'}}> 
				 <div class="section-heading text-center">
					 <h2 class="post-title" style={{color:"#191919"}}>
                        {pageList.contentTitle1}
                     </h2>
						</div>
					<div
                      className="row form-group"
                      style={{ textAlign: "center" }}
                    >
                      <div className="col-sm-12">
                        {image &&
                          this.coverContent(
                            <img
                              className="box-shadow-img"
                              src={`${ACCESS_POINT}/superAdmin/file?fileurl=${image}`}
                              alt="something went wrong"
                            />
                          )}
                      </div>
                    </div>
					<div class="post-share">
						{pageList.content1 && pageList.id !=251&&
                        <p>
                    {renderHTML(pageList.content1)}
                        </p>}
						{pageList.content1 && pageList.id==251&&
						<p style={{textAlign:'center',fontSize:'20px'}}>
                         {renderHTML(pageList.content1)}
                          </p>
							}												   
					 </div>
					 <div
                      className="row form-group"
                      style={{ textAlign: "center" }}
                    >
                      <div className="col-sm-12">
                        {image1 &&
                          this.coverContent(
                            <img
                              className="box-shadow-img"
                              src={`${ACCESS_POINT}/superAdmin/file?fileurl=${image1}`}
                              alt="something went wrong"
                            />
                          )}
                      </div>
                    </div>
					  
					   <div
                      className="row form-group"
                      style={{ textAlign: "center" }}
                    >
                      <div className="col-sm-12">
                        {image3 &&
                          this.coverContent(
                            <img
                              className="box-shadow-img"
                              src={`${ACCESS_POINT}/superAdmin/file?fileurl=${image3}`}
                              alt="something went wrong"
                            />
                          )}
                      </div>
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
}
export default CommonPage;