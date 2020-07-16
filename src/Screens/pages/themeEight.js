import React, { Component } from 'react';

import renderHTML from "react-render-html";

import { Alert } from "reactstrap";

import Modal from "../modal";
import PreLoader from "../preloader.js";
import { ACCESS_POINT } from "../../config";
//import FormMiddleWare from '../Components/FormMiddleware';
import SingleSelect from "../Components/SingleSelect"; 
import CmsContent from '../../MiddleWare/CmsContent';

class ThemeEight extends Component  {
  constructor(props) {
    super(props);
    this.state = {
		date:[],
		answerJson: [],
		FormId:0,
		formjson: [],
        json: [],
        arr: [],
        data: [],
        checked: false,
        answerJson: [],
        error: [],
        number: 0, 
        showEnd: false,
        alertVisible: false,
        color: "success",
        totalValidateJsonLength: 0,
		contentTitle1:'',
		dataimage:'',
		captchacapture:'',
		Cap:false,
		errorcaptchacapture:'',
		userDetail:'',
		adminId: localStorage.getItem("swtnId"),
	  userlog:localStorage.getItem("userDetails"),
	  modal14: false,
	  AdId:0,
	  loginstate:1
		
    };
  }
  
 async componentDidMount() { 
   // let adminId =159;
	 let userlog = localStorage.getItem("userDetails");
	     userlog = JSON.parse(userlog);
		 if(userlog==null){
			 userlog={id:12345,userName:'XYZ',mobileNumber:123456789,email:'xyz@gmail.com',customerId:78}
			 //console.log(userlog)
		 }
		 //console.log(userlog);
		 this.setState({userDetail:userlog});
	 let userId = userlog.id; 
	let themeid = this.props.match.params.id;
	//let adminId = this.props.match.params.customerid;
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
	//console.log(adminId)
       const result = await CmsContent.samplesitepage(adminId,themeid);
       if (result) {
		   //let LS=JSON.parse(localStorage.getItem("loginstate"));
	   //console.log(); 
	  if(result.data[0].requireLogin=='1' || result.data[0].requireLogin=='yes'){
		  
		  if(this.state.userlog==null){
			 await this.setState({modal14:true,requireLogin:true}); 
		  }else{ 
			  this.setState({modal14:false,requireLogin:false});
		  }
		  
	  }
		// console.log(result.data); 
		 let data = result.data[0];
		  let FormId =  data.sheetContent;
		  let customerId = data.customerId;
		  let contentTitle1 = data.name;
		  let pageId = parseInt(data.id);
		  let Cap = data.subTitleId;
		  this.setState({FormId,adminId,customerId,contentTitle1,pageId,userId,AdId:adminId});//loginstate:LS.loginstate}); 
		  if(Cap=='true'){
              var captcha = await CmsContent.createcaptcha();
              this.captchareset();
             // console.log(captcha.data);
			  this.setState({ dataimage: captcha.data.data, captchacapturevalid: captcha.data.text ,Cap:true})
		  }
		 };
		 this.getForm(this.state.FormId); 
      
  }
  
  MobileSign = async (s,v) => {
    this.setState({[s]:v})
	if(this.state.userlog==null){
		window.location.href=`/${this.state.AdId}/`
	}else{
		window.location.href=`/samplesite/th8/${this.state.pageId}`;
	}
}
  
 getForm=async formid=>{
	 console.log(formid);
	let result = await CmsContent.getTwoConditionedValue('tbl_formquestion', 'parentid', formid, 1, 1); 
	let answerJson = [];
	//console.log(result.data);
        result.data.map((ival, i) => {
            answerJson[ival.id] = { answer: '-', formid: ival.parentid, questionId: ival.id };
        })
           // console.log(answerJson);
	await this.setState({ data: result.data, answerJson });
	await this.process();
 } 
 
 async answers(label, index, options = null, key = null, type, questionId, formid) {
        console.log(label)
		console.log(index)
		console.log(options)
		console.log(key)
		console.log(type)
		console.log(questionId)
		console.log(formid);
        let answerJson = await this.state.answerJson;

        if (type == "text") {
            answerJson[questionId] = { answer: label, questionId: questionId, formid: formid };
        } else if (type == 'textarea') {
            answerJson[questionId] = { answer: label, questionId: questionId, formid: formid };
        } else if (type == 'selectbox') {
            answerJson[questionId] = { answer: label.label, value: label.value, questionId: questionId, formid: formid };
        } else if (type == 'radio') {
            answerJson[questionId] = { answer: label, value: key, questionId: questionId, formid: formid };
        } else if (type == 'checkbox') {
            let check = [];
            options.map((ival, i) => {
                var checkBox = document.getElementById(`inlineCheckbox${index}${i}`);
                if (checkBox.checked == true) {
                    check.push(ival)
                }
            });
            answerJson[questionId] = { answer: check.toString(), value: key, questionId: questionId, formid: formid };
        }
        await this.setState({ answerJson });
    }
 
process = async () => { 
		  let data = await this.state.data;
		  //console.log(data);
		  if (data) {
			  let arr = data;
              let contentJson = [];
			  if (arr && arr.length) {
				   let answerJson = await this.state.answerJson;
                    let answerJsons = answerJson.length;
					let json = await arr.map(async (item, index) => {
						 if (item.type == 'text') {
							 await contentJson.push(
							 <div>
                                <div className="row form-group">
                                    <div className="col-sm-2" />
                                    <div className="col-sm-2">
                                        <label htmlFor="position">{item.question}</label>
                                    </div>
                                    <div className="col-sm-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={item.placeholder}
                                            onChange={e => this.answers(e.target.value, index, null, null, 'text', item.id, item.parentid)}
                                        />
                                        <span className="error-shows" style={{color:'red'}} id={`${index}`}>{this.state.error[index]}</span>
                                    </div>
                                    <div className="col-sm-3">
                                    </div>
                                </div>
                            </div>
							 );
						 }
						if (item.type == 'textarea') {
                        await contentJson.push(
                            <div>
                                <div className="row form-group">
                                    <div className="col-sm-2" />
                                    <div className="col-sm-2">
                                        <label>{item.question}</label>
                                    </div>
                                    <div className="col-sm-5">
                                        <textarea type="text" className="form-control" placeholder={item.placeholder} onChange={e => this.answers(e.target.value, index, null, null, 'textarea', item.id, item.parentid)}></textarea>
										 <span className="error-shows" style={{color:'red'}} id={`${index}`}>{this.state.error[index]}</span>
                                    </div>
                                    <div className="col-sm-3">
                                       
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    if (item.type == 'radio') {
                        let arr1 = [];
                        await item.options.split(",").map((element, key) => {
                            arr1.push(
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input type="radio" name="element" value={`${element}`} id={`inlineCheckbox${key}`} onChange={e => this.answers(element, key, null, key, 'radio', item.id, item.parentid)} />
                                        <label className="form-check-label" for={`inlineCheckbox${key}`} style={{ marginLeft: "10px" }}>{`${element}`} </label>
                                    </div>
                                </div>
                            );
                        });
                        await contentJson.push(
                            <div>
                                <div className="row form-group">
                                    <div className="col-sm-2" />
                                    <div className="col-sm-2">
                                        <label>{item.question}</label>
                                    </div>
                                    <div className="col-sm-5">
                                        {arr1}
                                        <span className="error-shows" id={`${index}`}>{this.state.error[index]}</span>
                                    </div>
                                    <div className="col-sm-3">
                                    </div>
                                </div>
                            </div>
                        );
                    }
                     if (item.type == 'selectbox') {
                        let option = [];
                        item.options.split(",").map((ival, i) => {
                            option.push({ label: ival, value: i });
                        })
                        await contentJson.push(
                            <div>
                                <div className="row form-group">
                                    <div className="col-sm-2" />
                                    <div className="col-sm-2">
                                        <label>{item.question}</label>
                                    </div>
                                    <div className="col-sm-5" >
                                        <SingleSelect
                                            options={option}
                                            placeholder={item.placeholder}
                                            handleChange={e => { this.answers(e, index, null, null, 'selectbox', item.id, item.parentid) }}
                                            selectedService={this.state.selectbox}
                                        />
                                    </div>
                                    <span className="error-shows" id={`${index}`}>{this.state.error[index]}</span>
                                    <div className="col-sm-3">
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    if (item.type == 'checkbox') {
                        let arr1 = [];
                        await item.options.split(",").map((element, key) => {
                            arr1.push(
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id={`inlineCheckbox${index}${key}`} onChange={e => { this.answers(element, index, item.options.split(","), key, 'checkbox', item.id, item.parentid) }} value={element} />
                                    <label className="form-check-label" for={`inlineCheckbox${index}${key}`} style={{ marginLeft: "10px" }}>{`${element}`}</label>
                                </div>
                            );
                        });
                        await contentJson.push(
                            <div>
                                <div className="row form-group">
                                    <div className="col-sm-2" />
                                    <div className="col-sm-2">
                                        <label>{item.question}</label>
                                    </div>
                                    <div className="col-sm-5">
                                        {arr1}
                                    </div>
                                    <div className="col-sm-3">
                                        <span className="error-shows" id={`${index}`}>{this.state.error[index]}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }					
						 
					});
					await Promise.all(json);
                   await this.setState({ json: contentJson, answerJson });
					//console.log(contentJson);
			  }
		  }
	 }
 
 formSubmit = async () => {
	 let error = [...this.state.error];
	 let e = [];
	  this.state.data.map((item, i) => {
            this.state.answerJson.map((element, key) => {
                if (item.required == 1 && item.id == element.questionId && (element.answer == null || element.answer == "-")) {
                    error[i] = "Value must not be empty";
                    e.push(error[i]);
                } else if (item.required == 1 && item.id == element.questionId && (element.answer != null || element.answer != "-")) {
                    error[i] = null
                    e.push(error[i]);
                }
            })
        });
		this.setState({ error: error });
		this.process();
    for (var i = 0; i < e.length; i++) {
            if (e[i] != null) {
                return false;
            }
        }
	let answer = [];
        this.state.answerJson.map((item, i) => {
            let categoryArray = {};
            categoryArray.formid = item.formid;
            categoryArray.questionId = item.questionId;
            categoryArray.answer = item.answer;
            categoryArray.userid = this.state.userId;
            categoryArray.companyid = this.state.customerId;
            categoryArray.portid = this.state.pageId;
            answer.push(categoryArray)
        });
		
		if(this.state.Cap===true){
			if (!this.state.captchacapture) {
                this.setState({ errorcaptchacapture: 'Please enter captcha' })
            }else{
            if (this.state.captchacapturevalid != this.state.captchacapture) {
                 this.setState({ errorcaptchacapture: 'Please enter correct captcha' })
             }else {
                this.setState({ errorcaptchacapture: '' })
		        }
			}
		}
		//errorcaptchacapture
		//console.log(this.state.data) 
		//console.log(answer);
		let EmailBody=[];
		this.state.data.map((ival,i)=>{
			answer.map((jval,j)=>{
				if(ival.id==jval.questionId){
					let arr={};
					arr.question=ival.question;
					arr.answer=jval.answer;
					EmailBody.push(arr);
				}
			});
		});
		//console.log(EmailBody);
		try {
            let result = await CmsContent.chanAnswer('tbl_formanswer', answer,this.state.pageId,EmailBody);
            if (result) {
				console.log(result);
               // this.getAttendedForms();
                await this.setState({ 
                   answerJson:[],  arr: [], alertVisible: true, textalert: "Your Form Have Been Submitted",
                    color: "success"
                });
                setTimeout(() => this.setState({ alertVisible: false }), 3000);
				//window.location.href="/swtn/commonpg/247";
               // this.listform();
            }
        } catch (error) {
            console.log(error);
        }
    		
 } 
 
 Reset=()=>{
	 console.log(this.state.answerJson);
	  console.log(this.state.data);
	 let ArrayList=[];
	 this.state.data.map((ival, i) => {
		 let index=i;
           // ArrayList[ival.id] = { answer: '-', formid: ival.parentid, questionId: ival.id };
		  this.answers('-', index,null, null, ival.type, ival.id, ival.parentid); 
        }) 
		//this.answers(label, index, options = null, key = null, type, questionId, formid)
		//console.log(ArrayList);
	   //this.setState({answerJson:ArrayList});
      // console.log(this.state.answerJson);	 
 }
 
 onDismiss = () => {
        this.setState({ alertVisible: false });
    } 
  
 listform=async()=>{
	 console.log(1);
 }
 
 getCaptcha=async e =>{
	 //console.log(e);
	 this.setState({captchacapture:e.target.value});
 }
 captchareset = async () => {
    var captcha = await CmsContent.createcaptcha();
    console.log(captcha.data);
    this.setState({
      dataimage: captcha.data.data,
      captchacapturevalid: captcha.data.text,
      //Cap: true,
    });
  };
  resetvalues = async () => {
    document.getElementById("formreset").reset();
    var captcha = await CmsContent.createcaptcha();
    console.log(captcha.data);
    this.setState({
      dataimage: captcha.data.data,
      captchacapturevalid: captcha.data.text,
      Cap: true,
    });
    this.setState({ captchacapture: "", errorcaptchacapture: "" });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  
  render(){
	  let json = this.state.json;
       if(this.state.requireLogin==true){
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
}else  if (json && json.length) {
            return (
                <React.Fragment>
				<div class="breadcrumb-area" >
                 <div class="container" > 
                 <div class="row" >
                    <div class="col-10" style={{marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" style={{marginLeft:'0%'}}>
							<li class="breadcrumb-item"><a href={"/"}><i class="fa fa-home"></i>Home</a></li>
		                    <li class="breadcrumb-item active" aria-current="page">{this.state.contentTitle1}</li>	
						</ol>
                    </nav>
                </div>
				<br/> 
                 <br/>
			<div class="about-us-area section-padding-0-100"  style={{width:'100%',marginTop:'2%'}}>
				<div class="container-fluid container-margin-top"> 
					<div class="row"> 
						<div class="col-12">
				<div class="about-content" style={{marginTop:"17px",paddingTop:'50px', padding:'55px',boxShadow:'0 10px 30px 0 #000000'}}> 
						<div class="section-heading text-center">
							<h2 class="post-title" style={{color:"#191919"}}>
                                {this.state.contentTitle1} 
                             </h2>
						</div>
						<div className="row form-group">
                          <div className="col-sm-2" />
                           <div className="col-sm-8">
                         <Alert
                            className="badge-content"
                              color={this.state.color}
                             isOpen={this.state.alertVisible}
                              toggle={this.onDismiss}
                          >
                            {this.state.textalert}
                           </Alert>
                            </div>
                            <div className="col-sm-2" />
                          </div>
						{this.state.number == 0 ?
                             <div>
                             <form id="formreset">
                                 {json && json.length && json}
                                 </form>
						{this.state.dataimage && (
                        <div className="row form-group">
                         <div className="col-sm-2" />
                         <div className="col-sm-2">
				        <label htmlFor="exampleInputEmail1">
					     Enter Captcha
                        </label>
				      	</div>
						<div className="col-sm-4">
						 <input
						   type="text"
						   className="form-control"
						   id="captchacapture"
						   name="captchacapture"
						   placeholder="Enter captcha"
						   value={this.state.captchacapture}
						   onChange={e => this.getCaptcha(e)}
						 />
						 <span style={{color:'red'}}> {this.state.errorcaptchacapture} </span>
						 </div>
                         <div className="col-sm-4">		  
                        <svg style={{ width: 80, height: 40, marginLeft: -25 }} dangerouslySetInnerHTML={{ __html: this.state.dataimage }} />
                        </div>
                        </div>)}					
                          <div className="row form-group">
                           <div className="col-sm-2" />
                             <div className="col-sm-2" />
                             <div className="col-sm-4">
                             <button
                               type="button"
                                className="btn btn-primary"
                                 onClick={this.formSubmit}
                              >
                              Submit
                              </button>
							  <button
                               type="button"
                                className="btn btn-primary"
                                 onClick={this.resetvalues}
                                 style={{ marginLeft: "20px" }}
                              >
                              Reset
                              </button>
										   

                                           {this.state.Cap===false && ( <button
                                             type="button"
                                             className="btn btn-primary"
                                             onClick={this.listform}
                                             style={{ marginLeft: "10px" }}
                                               >
                                             List
										   </button>)}

                                            </div>
                                           </div>
                                            </div>
                                                :
                                           <div>

                                            {this.state.datatable}
                                             {/*(this.state.fullData && this.state.fullData.length) ? (<Datatable data={this.state.fullData} columnHeading={this.state.questionDataColumn} />) : null*/}
                                            </div>
                                            }
							
					</div>	
                         </div></div>							
						  </div></div>
					</div>
					</div>
					</div>
                </React.Fragment>
            );
        } else if (json === undefined) {
            return (
                <React.Fragment>
                    <main className="main my-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h1>{this.state.title}</h1>
                                    <div className="card" style={{ margin: "-20px", marginTop: "5px", boxShadow: "0px 0px 10px #b9b3b3", borderRadius: "8px" }}>
                                        <div className="card-body">
                                        <div className="row form-group">
                                            <div className="col-sm-2" />
                                            <div className="col-sm-8">
                                                <Alert
                                                    className="badge-content"
                                                    color={this.state.color}
                                                    isOpen={this.state.alertVisible}
                                                    toggle={this.onDismiss}
                                                >
                                                    {this.state.textalert}
                                                </Alert>
                                            </div>
                                                <div className="col-sm-2" />
                                        </div>
                                            {this.state.datatable}
                                            {/*(this.state.fullData && this.state.fullData.length) ? (<Datatable data={this.state.fullData} columnHeading={this.state.questionDataColumn} />) : null*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </React.Fragment>
            )
        } else {
            return (
                <PreLoader/>
            );
        }
  }
}
export default ThemeEight;
  