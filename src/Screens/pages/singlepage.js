import React from 'react';
import { ACCESS_POINT } from '../../config';
import PortletVideoPlayer from'./theme3/portletVideoPlayer';
import Testdemo from './testdemo'

const SinglePage = ({data,type}) => {
	    // console.log(data);
		  if(type==6){
			  return(<div class="card">
		<div class="view overlay">
    <img class="card-img-top" src={`${ACCESS_POINT}/superAdmin/file?fileurl=${data.thumbnail}`}
      alt="Card image cap"/>
	  {/*<a href="#!">
      <div class="mask rgba-white-slight"></div>
	  </a>*/}
     </div>
	 <div class="card-body">
	 <h4 class="card-title">{data.name}</h4>
	 <p class="card-text">{data.programName}</p>
	 <p class="card-text">{data.batch}</p>
	 <p class="card-text">{data.fromdate}</p>
	 <p class="card-text">{data.location}</p>
	 <p class="card-text">{data.description}</p>
	 </div>
		 </div>)
		  }else if(type==2){
			  return(<PortletVideoPlayer data={data}/>)  
		  }else if(type==4){
			  console.log(data)
			  let Resource=[];
			  data.resource.map((ival,i)=>{
				  if(ival.extension=='pdf'){
				  Resource.push(
                     <div class="card">
					 <div class="card-body">
					 <a href={`${ACCESS_POINT}/superAdmin/file?fileurl=${ival.url}`} target="_blank">
					 <h4 class="card-title">{ival.title}</h4>
					 </a> 
					 </div>
					 </div>
 				  )
				  }else{
					  Resource.push(
					 <div class="card">
					 <div class="card-body">
					<h4 class="card-title">{ival.title}</h4>
					 </div>
					 <div class="view overlay">
                    <img class="card-img-top" 
					src={`${ACCESS_POINT}/superAdmin/file?fileurl=${ival.url}`}
                   alt="Card image cap"/>
	                 </div>
					 
					 </div> )
				  }
			  })
			  return(
			     <React.Fragment>
				 {Resource.length ? Resource :null}
		    </React.Fragment>
			  )
			  
		  }
		  else if(type==5){
			  return (
		<React.Fragment>
		<div class="card">
		<div class="view overlay">
    {/*<img class="card-img-top" src={`${ACCESS_POINT}/superAdmin/file?fileurl=${data.url}`}
      alt="Card image cap"/>
	  <a href="#!">
      <div class="mask rgba-white-slight"></div>
	  </a>*/}
     </div>
	 <div class="card-body">
	 <h4 class="card-title">{data.text}</h4>
	 <p class="card-text">DESCRIPTION:{data.description}</p>
	 </div>
		 </div>
		  </React.Fragment>)
		  }else{
		return (
		<React.Fragment>
		<div class="card">
		<div class="view overlay">
    <img class="card-img-top" src={`${ACCESS_POINT}/superAdmin/file?fileurl=${data.url}`}
      alt="Card image cap"/>
	  {/*<a href="#!">
      <div class="mask rgba-white-slight"></div>
	  </a>*/}
     </div>
	 <div class="card-body">
	 <h4 class="card-title">{data.text}</h4>
	 <p class="card-text">{data.description}</p>
	 </div>
		 </div>
		  </React.Fragment>)}
	
}

export default SinglePage;