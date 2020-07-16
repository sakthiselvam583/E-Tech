import React, { Component } from "react";
import CmsContent from "../../MiddleWare/CmsContent";
import renderHTML from "react-render-html";
import PreLoader from "../preloader"

class StaffPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
		pageList:"",
		date:"" ,
		Content:[], 
		contentTitle:"",
		InnerData:[],
		result:[]
    };
  }
  
  async componentDidMount() {
    let themeid = this.props.match.params.id;
    const result = await CmsContent.getThemebyid(themeid);
     // console.log(result.data)
    if (result) {
		   this.setState({Content:result.data[0]});
		  this.state.Content.sheetContent = JSON.parse(this.state.Content.sheetContent);
           this.setState({InnerData:this.state.Content.sheetContent})
      }
      
  }
  async componentWillReceiveProps(nextProps) {
    let themeid = nextProps.match.params.id;

    const result = await CmsContent.getThemebyid(themeid);
    if (result) {
       this.setState({Content:result.data[0]});
		  this.state.Content.sheetContent = JSON.parse(this.state.Content.sheetContent);
           this.setState({InnerData:this.state.Content.sheetContent})
    }
  } 
  
 render() {
       let content=[];	 
	 const { InnerData,Content } = this.state;
	 InnerData.map((ival,i)=>{
		//  console.log(Content.id);
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
   // console.log(content); 
if(!Content.contentTitle1){
	return <PreLoader/>
}else{
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
								   {/*<div class="col-1"></div>*/}
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
export default StaffPage;