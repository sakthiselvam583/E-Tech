import React, { Component } from "react";
import CmsContent from "../../MiddleWare/CmsContent";
import renderHTML from "react-render-html";
import PreLoader from "../preloader.js"
import { ACCESS_POINT } from '../../config';
import Modal from "../modal";

class Dynamicth4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: "",
      date: "" ,
	  modal14:false,
		 loginstate:1,
		  AdId:'',
		requireLogin:false,
		userlog:localStorage.getItem("userDetails"),
	  //adminId: localStorage.getItem("swtnId"),
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
			//console.log(cusid) 
	    adminId=cusid;
		// }
      }
    const result = await CmsContent.samplesitepage(adminId,themeid)
    if (result) {
		//console.log(result.data); 
      if (result.data[0].Date != null && result.data[0].Date != undefined) {
        var dataformate = result.data[0].Date.split("-");
        this.setState({
          date: dataformate[2] + "-" + dataformate[1] + "-" + dataformate[0]
        });
      }
      if (result.data[0].sheetContent) {
        result.data[0].sheetContent = JSON.parse(result.data[0].sheetContent);
      }
    let LS=JSON.parse(localStorage.getItem("loginstate"));
	   //console.log(); 
	  if(result.data[0].requireLogin=='1'){
		  
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		  
	  }
	  this.setState({ pageList: result.data[0] ,pgid:themeid,AdId:adminId,loginstate: LS == null ? '1' : LS.loginstate  });
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
    const result = await CmsContent.samplesitepage(adminId,themeid);
    if (result) {
		if (result.data[0].Date != null && result.data[0].Date != undefined) {
        var dataformate = result.data[0].Date.split("-");
        this.setState({
          date: dataformate[2] + "-" + dataformate[1] + "-" + dataformate[0]
        });
      }
      if (result.data[0].sheetContent) {
        result.data[0].sheetContent = JSON.parse(result.data[0].sheetContent);
      }
     let LS=JSON.parse(localStorage.getItem("loginstate"));
	   //console.log(); 
	  if(result.data[0].requireLogin=='1'){
		  
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		  
	  }
	  this.setState({ pageList: result.data[0] ,pgid:themeid,AdId:adminId,loginstate:LS.loginstate});
	
    }
  }
 
 loadContent = arr => {
    return (
      <React.Fragment>
        {arr.map((ival, i) => {
          let width1;
          let width2;
          let content1 = [];
          let content2 = [];
          if (ival.order === 2) {
            width1 = ival.textwidth;
            content1.push(
              <p className="content-para">
                {renderHTML(ival.text ? ival.text : "")}
              </p>
            );
            width2 = ival.imagewidth;
            content2.push(<img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${ival.image}`} alt="something went wrong" />);
          } else if (ival.order === 1) {
            width1 = ival.imagewidth;
            content1.push(<img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${ival.image}`} alt="something went wrong" />);
            width2 = ival.textwidth;
            content2.push(
              <p className="content-para">
                {renderHTML(ival.text ? ival.text : "")}
              </p>
            );
          }
          return (
            <div className="row form-group col-sm-12">
              {width1 ? (
                <div className={`col-sm-${width1}`}>{content1}</div>
              ) : null}
              {width2 ? (
                <div className={`col-sm-${width2}`}>{content2}</div>
              ) : null}
            </div>
          );
        })}
      </React.Fragment>
    );
  }; 
  
 MobileSign = async (s,v) => {
    this.setState({[s]:v})
	if(this.state.userlog==null){
		window.location.href=`/${this.state.AdId}/`
	}else{
		window.location.href=`/samplesite/dynamicth4/${this.state.pageList.id}`;
	}
}


 render() {
	 const{pageList}=this.state;
	// console.log(pageList);
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
}else{
   return(
         <React.Fragment>
	    <div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}>
        <div class="container" style={{backgroundColor:"#3c5dac"}}> 
		<div class="row" style={{backgroundColor:"#3c5dac"}}>
          <div class="col-12" style={{marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                    <ol class="breadcrumb" style={{marginLeft:'0%'}}>
                            <li class="breadcrumb-item"><a href="/"><i class="fa fa-home"></i> Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{pageList.name}</li> 
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
						{pageList.name}
					 </h2>
                     </div>
				{pageList.sheetContent && pageList.sheetContent.length
                    ? this.loadContent(pageList.sheetContent)
                    : null}	 
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
}
}
}
export default Dynamicth4;