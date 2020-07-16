import React, { Component } from 'react';
import Modal from "../modal"; 
import { ACCESS_POINT } from "../../config";
import CmsContent from '../../MiddleWare/CmsContent';
import PreLoader from "../preloader"
import SinglePage from "./singlepage"
import Pagination from "react-js-pagination";
  //require("bootstrap/less/bootstrap.less");
  
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  }, 
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

class ThemeTen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		data: false,
		content:[],
		Adminlog:localStorage.getItem("Admin"),
	  userlog:localStorage.getItem("userDetails"),
	  modal14: false,
	  AdId:0,
	  screen: window.screen.height,
	  loginstate:1,
	  NextComponant:false,
	  content:false
		}
	}
	

	
componentDidMount() {
		let themeid = this.props.match.params.id;
		this.process(themeid);
	}
	componentWillReceiveProps(nextProps) {
		let themeid = nextProps.match.params.id
		this.process(themeid);
	}	
	
process=async(themeid)=>{
	let cusid =localStorage.getItem("swtnId")
        let r = this.props.match.params.customerid;
        let adminId="";
        if(r){
              adminId = r;
       }else if(cusid == r || cusid){
		adminId=cusid;
		 }
	const {data} = await CmsContent.samplesitepage(adminId,themeid);
	if(data){ 
	   // let LS=JSON.parse(localStorage.getItem("loginstate"));
	   if(data.requireLogin=='1' || data.requireLogin=='yes'){
		   //console.log(1);
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		}
		this.setState({ data: data[0],AdId:adminId,loginstate:1 });
		await this.getJsondata(data[0],adminId);
	}
}	

getJsondata=async(data,adminId)=>{
	try{
		const User = await CmsContent.getFreedom('*','tbl_maptogroup',`groupid=${data.sheetContent} and status=1`);
		if(User){
			const UserDetail = await CmsContent.getFreedom('*','tbl_user_web',`id=${User.data[0].userid}`);
			let UserDetail1=[];
			UserDetail1=UserDetail.data[0];
			//console.log(UserDetail1);
			this.setState({userid:UserDetail1.id});
			localStorage.setItem("UserID", UserDetail1.id);
			localStorage.setItem("userName", UserDetail1.userName);
			//console.log(localStorage.getItem("UserID"));
		}
	const result = await CmsContent.getUserJson(this.state.userid);
	if(result){
	let content=[];
	let body = result.data.body;
	//console.log(body);
	body.map(async(ival,i)=>{
		if(ival.type===1){
			let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];
		let innercontent= this.typeOne(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===2){
			let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];
		let innercontent= this.typeTwo(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===3){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeThree(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===4){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeFour(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===5){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeFive(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===6){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeSix(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===7){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeSeven(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===8){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeEight(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===9){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeNine(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}else if(ival.type===10){
		  let title=[];
        title=[<h3 style={{marginTop:'25px',color:`${ival.fcolour}`,fontSize:`${ival.fsize+'px'}`}}>{ival.title}</h3>];	
		 let innercontent= this.typeTen(ival);
		//if(ival.width==='Half'||ival.width==='half'){
		return content.push(<div style={{width:'100%'}}>{title}
		 <div className="row form-group">
		{innercontent}</div>
		</div>)	
		}
		});
		      let Filter=[];
			  let OtherFilter=[];
		     let wait = await content.map(async(ival,i)=>{
				  if(i<=3){
					  Filter.push(ival);
				  }else{
					  OtherFilter.push(ival)
				  }
			  })
			  let Calc = content.length / 3;
			  console.log(Calc)
			  this.setState({Page1:Filter,AllData:content,DataLength:content.length,Calc});
			  await Promise.all(wait);
			  this.handlePageChange(1);  
		//await this.setState({content:Filter});
	}
		}catch(error){
			console.log(error);
		}
 	
}

typeOne=(ival)=>{
	let content=[];
  ival.content.map((jval,j)=>{
	  content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body">
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`} onClick={()=>this.Nextdata(jval,ival.type)}
          style={{width:'100%',height:'236px'}}   />
          </div>
         </div> </div>)
   });
  return content
}

typeTwo=(ival)=>{
	let content=[];
  ival.content.map((jval,j)=>{
	// console.log(jval);
	  content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body">
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
		  onClick={()=>this.Nextdata(jval,ival.type)}
          style={{width:'100%',height:'236px'}}   />
          </div>
         </div> </div>)
   });
  return content
}

typeThree=(ival)=>{
	let content=[];
	ival.content.map((jval,j)=>{
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body"><a href={`${jval.link}`} target='_blank'>
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
          style={{width:'100%',height:'236px'}}/></a>
          </div>
         </div> </div>) 
	});
	return content;
}

typeFour=(ival)=>{
	let content=[];
	 
	ival.content.map((jval,j)=>{
		// console.log(jval);
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body">
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
		  onClick={()=>this.Nextdata(jval,ival.type)}
          style={{width:'100%',height:'236px'}}/>
          </div>
         </div> </div>) 
	});
	return content;
}

typeFive=(ival)=>{
	let content=[];
	ival.content.map((jval,j)=>{
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body">
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
		  onClick={()=>this.Nextdata(jval,ival.type)}
          style={{width:'100%',height:'236px'}}/>
          </div>
         </div> </div>) 
	});
	return content;
}

typeSix=(ival)=>{
	let content=[];
	ival.content.map((jval,j)=>{
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body">          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`} onClick={()=>this.Nextdata(jval,ival.type)}  
          style={{width:'100%',height:'236px'}}/>
          </div>
         </div> </div>) 
	});
	return content;
}

typeSeven=(ival)=>{
	let content=[];
	ival.content.map((jval,j)=>{
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body"><a href={`${jval.link}`} target='_blank'>
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
          style={{width:'100%',height:'236px'}}/></a>
          </div>
         </div> </div>) 
	});
	return content;
}

typeEight=(ival)=>{
	let content=[];
	ival.content.map((jval,j)=>{
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body"><a href={`https://difuza.com/DF/WizardForm/${this.state.userid}/${jval.quizId}/${jval.id}`} target='_blank'>
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
          style={{width:'100%',height:'236px'}}/></a>
          </div>
         </div> </div>) 
	});
	return content;
}

typeNine=(ival)=>{
	let content=[];
	ival.content.map((jval,j)=>{
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body"><a href={`https://difuza.com/DF/FormView/${this.state.userid}/${jval.form[0].parentid}/${jval.id}`} target='_blank'>
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
          style={{width:'100%',height:'236px'}}/></a>
          </div>
         </div> </div>) 
	});
	return content;
}

typeTen=(ival)=>{
	let content=[];
	
	ival.content.map((jval,j)=>{
		content.push(
		 <div className="col-sm-4">
            <div class="card text-white bg-light mb-3" style={{maxWidth: '30rem'}}>
           <div class="card-header" style={{color:'black'}}>{jval.name}</div>
           <div class="card-body"><a href={` https://difuza.com/DF/SurveyForm/${this.state.userid}/${jval.survey}/${jval.id}`} target='_blank'>
          <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.thumbnail }`}
          style={{width:'100%',height:'236px'}}/></a>
          </div>
         </div> </div>) 
	});
	return content;
}

Nextdata=async(data,type)=>{
	//console.log(type); 
	this.setState({nextdata:data,NextComponant:true,type});
	window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
}




 /*handlePageChange(pageNumber) {
	 const{DataLength,AllData,Page1}=this.state;
	 console.log(DataLength);
	 console.log(AllData); 
	let Arr=[];
	let pg = pageNumber+1;
	let cg = 3;
	 if(pageNumber!=2){
		 cg=pageNumber + 3 ;
	 }
	if(pageNumber==1){
		this.setState({content:Page1})
	}else{
	    AllData.map((ival,i)=>{
			if(i<=cg && i>pg){
				Arr.push(ival);
			}
		});
		console.log(Arr.length)
		this.setState({content:Arr})
	}
		window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    console.log(`active page is ${pageNumber}`); 
    this.setState({activePage: pageNumber});
  }*/
  
  handlePageChange(pageNumber) {
	   const{DataLength,AllData,Page1}=this.state;
    let upperLimit = parseInt(pageNumber)*3;
    let lowerLimit = upperLimit - 3;
    let data =[];
    if(upperLimit <= DataLength){
       data = AllData.slice(lowerLimit,upperLimit);
    }else{
       data = AllData.slice(lowerLimit);
    } 
    this.setState({
        content:data,
        activePage:pageNumber
    })
	window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }


render() {
	const{data}=this.state;
	if(!this.state.content){
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
}else{
	return(
	<React.Fragment>
		<div class="breadcrumb-area" >
	<div class="container" >
		<div class="row" >
	<div class="col-10" style={{ marginTop: '7%' }}>
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb" style={{ marginLeft: '0%' }}>
		<li class="breadcrumb-item"><a href={`/`}><i class="fa fa-home"></i>Home</a></li>
		<li class="breadcrumb-item active" aria-current="page">{this.state.data.name}</li>
			</ol>
		</nav>
	</div>
		<br /><br />
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
		 {this.state.NextComponant ? <button type="button"  
		class="btn btn-primary"  
		style={{marginBottom:'10px'}}
		onClick={()=>this.setState({NextComponant:false})}>BACK</button> :null }
		{this.state.NextComponant ? <SinglePage data={this.state.nextdata} type={this.state.type}/> : null}
		{this.state.NextComponant==false && this.state.content ? this.state.content : null}
		 
	 <div>
	 {this.state.NextComponant==false ? 
	   <div className="row form-group">
                  <div className="col-sm-3" />
                  <div className="col-sm-6">
        <Pagination
          activePage={this.state.activePage}
          totalItemsCount={`${this.state.Calc}0`} 
          pageRangeDisplayed={this.state.Calc}
		  onChange={this.handlePageChange.bind(this)}
	 /> 
	 </div>
	  <div className="col-sm-3" />
	  </div>
	 : null }
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
export default ThemeTen;