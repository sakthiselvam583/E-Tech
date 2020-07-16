import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
//import CmsContent from '../MiddleWare/CmsContent';
import { ACCESS_POINT } from '../config';
//import Carousel from 'react-bootstrap/Carousel'
//import Carousel from 'react-elastic-carousel';

class GalleryPop extends Component {
	state = { 
  modal14: false,
  Numb:0,
  AllData:[]
  
  }

async componentDidMount() { 
  try{
	  if(this.props.modal14){
		  let AllData=[];
		  let sectionname="";
		/*let wait = await this.props.Alldata.map((ival,i)=>{
			  sectionname = ival.title; 
			  ival.files.map((jval,j)=>{
				   if(this.props.data==j){
				  AllData.push(
                 <img
		           style={{height:'347px'}} 
                 className="box-shadow-img"
                 src={`${ACCESS_POINT}/superAdmin/file?fileurl=${jval.Img}`} 
                 alt="something went wrong"
		         />
				 
				 )
				   }
			  });
		  });
		  
		  await Promise.all(wait);*/
		  //console.log(AllData);
		  this.setState({AllData,Img:this.props.data.Img,sectionname :this.props.data.name }); 
		  
		   this.setState({modal14:this.props.modal14});
	  } 
  }catch(error){
	  console.log(error);
  }
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber],
	});
  this.props.these('modal14',false);
}

/*
 <MDBModalFooter>
          <MDBBtn color="secondary">Previous</MDBBtn>
          <MDBBtn color="primary">Next</MDBBtn>
        </MDBModalFooter>
		{/* <MDBModalHeader toggle={this.toggle(14)}>{this.state.name}</MDBModalHeader>
        
     
*/



render(){
	const{AllData}=this.state;
	return(
	<MDBContainer>
	<MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} >
	<MDBModalHeader toggle={this.toggle(14)} style={{fontSize:'1px'}}>{this.state.sectionname}</MDBModalHeader>
		<MDBModalBody>
		<img
		 style={{width:'100%'}}
		 src={`${ACCESS_POINT}/superAdmin/file?fileurl=${this.state.Img}`} 
          alt="something went wrong"
		   />
		 
        </MDBModalBody>
        </MDBModal>
	  </MDBContainer>
	)
}

}

export default GalleryPop;