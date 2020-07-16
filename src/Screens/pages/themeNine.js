import React, { Component } from 'react';
import CmsContent from '../../MiddleWare/CmsContent';
import renderHTML from "react-render-html";
import { ACCESS_POINT } from "../../config";
import PreLoader from "../preloader.js"
import GallerPop from "../galleryPop";
import Test from "../Header/test"
import Modal from "../modal";


class ThemeNine extends Component { 
  constructor(props) {
    super(props);
    this.state = {
		pageList:"",
		date:"" ,
		Content:[], 
		contentTitle:"",
		InnerData:[],
		modal14:false,
		data:[],
		Alldata:[],
		modal14:false,
		 loginstate:1,
		  AdId:'',
		requireLogin:false,
		userlog:localStorage.getItem("userDetails"),
			 
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
 
gallerypop=async (d,k,j) =>{
	console.log(k);
	let arr=[];
	this.state.InnerData.map((ival,i)=>{
		if(i===k){
		 arr.push(ival);	
		}
	});
	console.log(arr);
	this.setState({Alldata:arr,data:d,modal14:true});
} 
 
MobileSign=async (s,v) =>{
	this.setState({[s]:v}); 
	
}

MobileSign1 = async (s,v) => {
    this.setState({[s]:v})
	if(this.state.userlog==null){
		window.location.href=`/${this.state.AdId}/`
	}else{
		window.location.href=`/samplesite/th9/${this.state.Content.id}`;
	}
 }
  
render(){
	  const{Content,InnerData}=this.state;
	  //console.log(InnerData);
	 // let Allcontent=[];
	if(!InnerData.length){
		return <PreLoader/>
	}else if(this.state.requireLogin==true){
	   return(
	<React.Fragment>
	 {this.state.modal14===true&&(
	   <Modal  
	 modal14={this.state.modal14}
	 these={this.MobileSign1} 
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
		{this.state.modal14===true &&(
				 <GallerPop 
				 modal14={this.state.modal14}
				 these={this.MobileSign}
				 data={this.state.data}
				 Alldata={this.state.Alldata}
				 />) }
		<Test {...this.props}/>
	 <div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}>
       <div class="container" style={{backgroundColor:"#3c5dac"}}> 
         <div class="row" style={{backgroundColor:"#3c5dac"}}> 
		 <div class="col-12" style={{marginTop:'7%'}}>
            <nav aria-label="breadcrumb">
             <ol class="breadcrumb" style={{marginLeft:'0%'}}>
               <li class="breadcrumb-item"><a href="/"><i class="fa fa-home"></i> Home</a></li>
               <li class="breadcrumb-item active" aria-current="page">{Content.contentTitle1}</li> 
              </ol>
            </nav>
             </div>
				<br/> 
                 <br/>
				 
	<div class="about-us-area section-padding-0-100" style={{marginTop:'2%',width:'100%'}}>
        <div class="container">
            <div class="row">
                <div class="col-12">
		<div class="about-content" style={{marginTop:"17px",padding:'55px',paddingTop:'50px',boxShadow:'0 10px 30px 0 #000000'}}>
            <div class="section-heading text-center">
            <h2 class="post-title" style={{color:"#191919"}}>
			{Content.contentTitle1}
			</h2>
			</div>
			{InnerData.map((ival,i)=>{
		    return(
			 <React.Fragment>
			 <div className="row form-group">
              <div className="col-sm-12">
			  <div class="section-heading text-center">
              <h4 class="post-title" style={{color:"#191919"}}>
				  {ival.title}
			</h4>
			</div>
			  </div>
			</div>
			<div className="row form-group">
                
			{ival.files.map((jval,j)=>{
				return(
				 <div style={{paddingRight:'3px',paddingLeft:'3px'}}>
				 <img 
				 style={{height:'200px'}}
                 src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.Img}`}
                 alt="something went wrong"
				 onClick={()=>this.gallerypop(jval,i,j)}
                 /> 
				 <p  onClick={()=>this.gallerypop(jval,i,j)} style={{cursor:'pointer',marginTop:'-31px',textAlign:'center'}}>{jval.name.slice(0,10)}</p>
				 </div>
				
				)
			})}
			  
				</div>
			 </React.Fragment>
			)
	   })
			}	  
        </div>		
     </div>
        </div>
      </div></div>		
		 </div>
		 </div>
		 </div>
		 </React.Fragment>
	)	
   }
}

}

export default ThemeNine;	
  