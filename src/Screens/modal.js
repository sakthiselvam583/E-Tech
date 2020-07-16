import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import CmsContent from '../MiddleWare/CmsContent';
import { ACCESS_POINT } from '../config';

class Modal extends Component {
state = {
  modal14: false,
  mobileNumber:'',
  errormobileNumber:'',
  placehold:'',
  loginstate:'',
  maxLength:0
}

async componentDidMount() { 
    try{ 
        //console.log(this.props.loginstate);
	if(this.props.modal14){
		var check = this.props.loginstate ;
		var len=0;
		if(check===1){
			len=10;
		}else{
			len=50;
		}
		
        this.setState({
			 modal14:this.props.modal14,
		   customerid:this.props.customerid,
		   maxLength:len
              });
	 if(check===1){
		this.setState({loginstate:'Mobile',placehold:'Enter Mobile Number'})
	 }else if(check===2){
		this.setState({loginstate:'Email_ID',placehold:'Enter Email_ID'})
	 }
    }
	}catch(error){
		console.log(error);
	}
   
}

handlechange=d=>{
	this.setState({mobileNumber:d.target.value});
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber],
	mobileNumber:'',
	errormobileNumber:''
  });
  this.props.these('modal14',false);
}

_handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.Submit();
    }
  };
  
loginState=async(data)=>{
	 
    if(data=='Mobile'){
	  this.setState({placehold:'Enter Mobile Number',loginstate:data})
	}else if(data=='Email_ID'){
		this.setState({placehold:'Enter Email_ID',loginstate:data})
	}
 } 
 
Submit=async()=>{
	
	let mobileNumber = this.state.mobileNumber;
	
	if(this.state.loginstate=='Mobile'){
	
    if (mobileNumber === '') {
      this.setState({ errorMobileNumber: 'Enter Mobile Number' });
      return false;
    } else if (!/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobileNumber)) {
      this.setState({ errorMobileNumber: 'Invalid Mobile Number' });
      return false;
    } else {
      this.setState({
        errorMobileNumber: ''
      });
	}
	}else if(this.state.loginstate=='Email_ID'){
		
		 if(!mobileNumber ){
     this.setState({errorMobileNumber:'Please Enter Email'}) 
     }else{
		 
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
		if(!mobileNumber.match(mailformat)){
        this.setState({ errorMobileNumber:"Please Enter correct mail"})
         }else{
        this.setState({errorMobileNumber:""});
		 }
    } 
		
	}
  try{
	 
	if(this.state.loginstate==='OTP'){
		const result = await CmsContent.loginOTPCheckPost
		(this.state.phone,mobileNumber);
		if(result){
			
			if(result.data.length){
				console.log(result.data);
			localStorage.setItem("userDetails", JSON.stringify(result.data[0]));
			this.props.these('userlog',localStorage.getItem("userDetails"));
			this.props.these('modal14',false);
			this.setState({
				errorMobileNumber:''
			    });
			}else{
				this.setState({
				errorMobileNumber:'Wrong OTP'
			    });
			}
		  }
	}
	else{
	   const result = await CmsContent.getOtp(`${mobileNumber}`,`${this.state.customerid}`);
	 if(result.data.res){
		  console.log(result.data.res); 
		 this.setState({
			 placehold:'Enter OTP',
			 mobileNumber:'', 
			 oldState:this.state.loginstate,
			 loginstate:'OTP',
			 phone:mobileNumber,
			 errorMobileNumber:'',
			 maxLength:4
			 });
	           }
	}
}catch(error){console.log(error)}
}

resetButton=()=>{
	if(this.state.oldState==='Mobile'||this.state.loginstate==='Mobile'){
		this.setState({
		errorMobileNumber:'',
		mobileNumber:'',
		placehold:'Enter Mobile Number',
		loginstate:'Mobile',
		maxLength:10
	    });
	}else if(this.state.oldState==='Email_ID'||this.state.loginstate==='Email_ID'){
		this.setState({
		errorMobileNumber:'',
		mobileNumber:'',
		placehold:'Enter Email_ID',
		loginstate:'Email_ID' ,
		maxLength:50
	    });
	}
	
}

resendOtp=async()=>{
	let phone = this.state.phone;
	 const result = await CmsContent.getOtp(`${phone}`);
	 if(result){
		 console.log(result);
		 this.setState({
			 placehold:'Enter OTP',
			 mobileNumber:'',
			 loginstate:'OTP',
			 phone:phone,
			 errorMobileNumber:''});
	           } 
	}

render() {
	  return (
      <MDBContainer>
       {/* <MDBBtn color="primary" onClick={this.toggle(14)}>MDBModal</MDBBtn>*/}
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)} style={{color:'rgb(60, 93, 172)'}}>Social Watch - Tamilnadu</MDBModalHeader>
          <MDBModalBody> 
           <div className="row form-group">
                      <div className="col-sm-1" />
                      <div className="col-sm-4">
                        <label htmlFor="exampleInputEmail1"
						style={{fontSize:'initial',marginTop: '5px'}}>
						Enter {this.state.loginstate}</label>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          id="pageName"
                          name="pageName"
                          placeholder={this.state.placehold}
						  value={this.state.mobileNumber}
                          onChange={this.handlechange}
						  onKeyDown={this._handleKeyDown}
						  maxlength={this.state.maxLength}  
						  style={{textAlign:'center'}}
                        />
                      </div>
                      <div className="col-sm-1" />
                    </div>
					 <div className="row form-group">
                      <div className="col-sm-2" />
					  <div className="col-sm-3" />
					  <div className="col-sm-5" >
                      <span className="error-show " style={{color:'red'}}>
					  {this.state.errorMobileNumber}</span>
					  </div>
					  <div className="col-sm-2" />
                    </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={()=>this.resetButton()}>Reset</MDBBtn>
   {this.state.loginstate==='OTP'&&(<MDBBtn color="primary" onClick={()=>this.resendOtp()}>Resend</MDBBtn>)}
		     <MDBBtn color="primary" onClick={()=>this.Submit()}>Login</MDBBtn> 
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer> 
    );
  }
}

export default Modal;