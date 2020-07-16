import React, { Component } from 'react';
import CmsContent from '../../MiddleWare/CmsContent';
import { ACCESS_POINT } from "../../config";
import Collapse from "@kunukn/react-collapse";
import renderHTML from "react-render-html";
import PreLoader from "../preloader";
import "./style.css" 
import Modal from "../modal";
 
class ThemeSix extends Component {
  constructor(props) {
    super(props);
    this.state = {
		pageList:"",
		date:"" ,
		Content:[],
		Content2:[],
		contentTitle:"",
		InnerData:[],
		open:false,
		modal14:false,
		AdId:0,
	  loginstate:1,
	  userlog:localStorage.getItem("userDetails"),
	  requireLogin:false
		//adminId: localStorage.getItem("swtnId")
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
		    this.AddArray()
      }
	}
 async componentWillReceiveProps(nextProps) {
    let themeid = nextProps.match.params.id;
	let cusid =localStorage.getItem("swtnId")
  // let adminId="";
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
		   this.AddArray()
    }
  }
	
	 
 AddArray=()=>{
	 const{InnerData}=this.state;
	 let array=[];
	 array=InnerData;
	   
	 let array1=[];
	 array.map((ival,i)=>{
		 let kkk={};
		 kkk.name=ival.name;
		 kkk.link=ival.link;
		 kkk.icon=ival.icon;
		 kkk.files=ival.files;
		 kkk.tray=ival.tray;
		 kkk.drop=false;
	//console.log(kkk);	 
	  array1.push(kkk)
	 }) 
	// console.log(array1);
	 this.setState({InnerData:array1})
	// console.log(InnerData)
 } 
Dropopen=(d,i,c)=>{
	//d.preventDefault();
	//console.log(c);
	let{InnerData}=this.state;

	if(c==false){
		InnerData[i].drop=true;
		
	}
	else if(c==true){
		InnerData[i].drop=false;
	}
	this.setState({InnerData});
	//console.log(InnerData[3].drop); 
}

MobileSign = async (s,v) => {
    this.setState({[s]:v})
	if(this.state.userlog==null){
		window.location.href=`/${this.state.AdId}/`
	}else{
		window.location.href=`/samplesite/th6/${this.state.Content.id}`;
	}
 }
  
  render(){
	  const{Content,InnerData}=this.state;
	  let title=Content.contentTitle1;
	  let content=[];
	  
	  InnerData.map((ival,i)=>{
		  let index=i+1;
		  if(ival.files==0){
			  content.push(
			 
                   <div className="row form-group">
                  <div className="col-sm-1" />
                  <div className="col-sm-2">
                  <p style={{color:'slategray',fontSize:'17px'}}>{index}</p>
					</div>
				   <div className="col-sm-8">
				   {ival.files==0&&(
					   <a href={`${ACCESS_POINT}/superAdmin/file?fileurl=${ival.link}`} target="_blank"><p style={{color:'slategray',fontSize:'17px'}}>{ival.name}</p></a>
					   )}
				   </div> 
				   <div className="col-sm-1" />
				   </div>
				   
			  )
		  }else{
			 // let clor=`'blue'`;
			 
			 let caret=[];
			  let changeTB="fa fa-caret-down";
			  if(ival.drop==true){
				  changeTB="fa fa-caret-up";
				  caret=[<i class={changeTB} style={{fontSize:'18px',color:'red'}}></i>] 
			  }else if(ival.drop==false){
				  changeTB=changeTB;
				  caret=[<i class={changeTB} style={{fontSize:'18px',color:'blue'}}></i>] 
			  }
			  
			  
			    
			  
			   content.push(
			    
                   <div className="row form-group">
                  <div className="col-sm-1" />
                  <div className="col-sm-2">
                      <p style={{color:'slategray',fontSize:'17px'}}>{index}</p>
					</div>
				   <div className="col-sm-8">
				   <span style={{cursor:'pointer'}} onClick={d=>this.Dropopen(d,i,ival.drop)}><p>{ival.name}&nbsp;{caret}</p> </span>
				    
					<Collapse 
                     
					isOpen={ival.drop}>
					<div>
				   {ival.files.map((jval,j)=>{
						return (
					 <div>
					<a href={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.link}`} target="_blank"><p style={{color:'slategray',fontSize:'17px'}}>{jval.name}</p></a>
					</div>) 
					})
					} 
					</div> 
					</Collapse>
				   </div>
				   <div className="col-sm-1" />
				   </div>
			
			   
			   )
		  }
	  })

	 if(!title){
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
   }
	  else{
    return(	
	<React.Fragment>
              <div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}>
        <div class="container" style={{backgroundColor:"#3c5dac"}}> 
            <div class="row" style={{backgroundColor:"#3c5dac"}}> 
				{/*Theme5{this.props.data}*/}
	         
                <div class="col-10" style={{marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" style={{marginLeft:'0%'}}>
                            <li class="breadcrumb-item"><a href={"/"}><i class="fa fa-home"></i>Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page" style={{ textTransform:'capitalize'}}>{title}</li>
                        </ol>
                    </nav>
                </div>
				                 <br/>
                 <br/>

     <div class="about-us-area section-padding-0-100" style={{marginTop:'2%',width:'100%'}}>
        <div class="container">
            <div class="row">
			{/*<div class="col-1"></div>*/}
                <div class="col-12">
                    <div class="about-content" style={{marginTop:"17px",paddingTop:'50px',boxShadow:'0 10px 30px 0 #000000'}}>
                       <div class="section-heading text-center">
                             
                       <h2 class="post-title"  style={{color:"#191919", textTransform:'capitalize'}}>
							 {title}
                      </h2> 
                      </div>
						{content}
					
					<div class="post-share">
						 {Content.content1&&(
						 <p>
						  {renderHTML(Content.content1)} 
						 </p> 
						  )} 
						 </div>
						  </div>
						</div> 
						</div>
						</div>
      </div>
	</div>
	</div>
	</div>

           </React.Fragment>)
	  }
  }
}
export default ThemeSix;
