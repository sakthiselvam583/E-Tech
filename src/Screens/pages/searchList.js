import React ,{ Component } from "react";

import FilterResults from 'react-filter-search';

import renderHTML from "react-render-html";

import { Link } from 'react-router-dom';

import CmsContent from '../../MiddleWare/CmsContent';

import PreLoader from "../preloader"

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchValue:this.props.location.state.data,
          data:[],
		  userlog:localStorage.getItem("userDetails"), 
		  
        };
      }
    componentWillMount() {
		//console.log(this.state.searchValue);
        this.process();
	 		
    }
	 componentWillReceiveProps() {
      this.process();
    }
    process=async()=>{
      try {
	  let cusid =localStorage.getItem("swtnId");
	  let r = this.props.match.params.customerid;
      let adminId="";
	  if(r){
        adminId = r;
      }    
	 else if(cusid == r || cusid){
		 adminId=cusid;
     }
	  const {data} = await CmsContent.search(adminId); 
          //let pg=[];
		  console.log(data);
		  if (data) { 
		
			 this.setState({ data:data,searchValue: this.props.location.state.data });
			}
			//console.log('data',data);
			console.log('search',this.state.searchValue);

        } catch (error) { 
        console.log(error); 
      }
	} 
	
LoginCheck=(data1)=>{
	console.log('data1',data1);
	if(data1.themeId==='1'){
	     
		this.props.history.replace(`/samplesite/commonpg/${data1.id}`);
		
	}else if(data1.themeId==='4'){
		this.props.history.replace(`/samplesite/dynamicth4/${data1.pageId}`);	
		
	}else if(data1.themeId==='5'){
			
		this.props.history.replace(`/samplesite/th5/${data1.id}`);
		
    }else if(data1.themeId==='6'){
			
		this.props.history.replace(`/samplesite/th6/${data1.id}`); 
		
	}else if(data1.themeId==='7'){
			
		this.props.history.replace(`/samplesite/th7/${data1.id}`); 
		
	}else if(data1.themeId==='8'){
			
		this.props.history.replace(`/samplesite/th8/${data1.id}`); 
		
	}else if(data1.themeId==='9'){
			
		this.props.history.replace(`/samplesite/th9/${data1.id}`); 
		
	}else if(data1.themeId==='3'){
			
		this.props.history.replace(`/samplesite/th3/${data1.id}`); 
		
	}else if(data1.themeId==='4'){
			
		this.props.history.replace(`/samplesite/dynamicth4/${data1.id}`); 
		
	}
	
}  

	
call=(data)=>{
	 
	const{userlog}=this.state;
	// console.log('data',data); 
	this.LoginCheck(data);
	
}
	
    render() { 
		const max=100; 
		
	var last=0;
	
	if(this.state.data.length){
	 last = 1 + this.state.data.length;
	}
	
	
	if(!this.state.data.length){
		
		return <PreLoader/>
	}
	else{
	  // console.log(this.state.data);
        return (
        <React.Fragment>
          <div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}>
        <div class="container" style={{backgroundColor:"#3c5dac"}}> 
            <div class="row" style={{backgroundColor:"#3c5dac"}}>  
					 <div class="col-10" style={{marginLeft:"0%",marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                         <li class="breadcrumb-item"><a href={`/`}><i class="fa fa-home"></i>Home</a></li>
							<li class="breadcrumb-item active" aria-current="page">Search Results</li>
                        </ol>
                    </nav>
                </div>
                 <br/>
                 <br/>
		 <div class="about-us-area section-padding-0-100" style={{width:'100%'}}>
            <div class="container">
			     <div class="row">
				 {/* <div class="col-1"></div>*/}
				  <div class="col-12">
				  <div class="about-content" style={{marginTop:"17px",paddingTop:'50px',boxShadow:'0 10px 30px 0 #000000'}}>
					  {/*<div class="section-heading text-center">
							<h2 class="post-title" style={{color:"#191919"}}> 
								  Search Results 
                            </h2>
					  </div> */}
						<div className="row form-group">
					<div className="col-sm-1"/>
					      <div className="col-sm-10">
						  <span style={{fontSize:'xx-large'}}>Search Result for "{this.state.searchValue}"</span> 
						  </div>
						  </div>
						    <div className="row form-group">
					<div className="col-sm-1"/>
					      <div className="col-sm-10">
						  <span style={{fontSize:'large'}}>Did you mean {this.state.searchValue}&nbsp;?</span> 
						  </div>
						  </div>
						{this.state.data.length>0&&(
							<div>
							
							<FilterResults
                           value={this.state.searchValue}
                           data={this.state.data}
                           renderResults={results => (
						   <div>
						   <div className="row form-group">
						   <div className="col-sm-1"/>
								 <div className="col-sm-10">
								 <span style={{fontSize:'large'}}>  {results.length} results , searching all results.</span> 
								 </div>
								 </div> 
                {results.map( (el,i) =>{ 
				   let text=renderHTML(el.content1);
				   let para=""; 
				   console.log(el); 
				    if(el.themeId==5){
                       if(el.id==291||el.id==300){
						   para=`stfpg/${el.id}`;   
					   }else{						
						para=`th5/${el.id}`;
					   }						
					}else if(el.themeId==6){
						para=`th6/${el.id}`;
					}
					/*else if(el.themeId==291){
						para=`stfpg/${el.id}`;
					}*/
					else{
						para=`commonpg/${el.id}`;
					}
					
				    return(
                    <div>  
					<div className="row form-group">
					<div className="col-sm-1"/>
					      <div className="col-sm-10">
						  <div class="about-content" style={{marginTop:'-17px',padding:'12px',boxShadow:'none',borderLeft:'2px solid #f2f4f5',
						  borderRight:'2px solid #f2f4f5',borderBottom:'2px solid #f2f4f5',borderTop:'0px solid #f2f4f5'}}> 
						  <div className="row form-group"> 
                              <div className="col-sm-12"> 
							  <Link onClick={()=>this.call(el)}><p>{renderHTML(el.content1.slice(0,max))}</p></Link>
							  <div style={{whiteSpace:'nowrap',width:'100%',overflow:'hidden',
							  height:'31px',textOverflow:'ellipsis'}} >{text}</div>
							    <Link onClick={()=>this.call(el)}><span style={{color:'blue'}}>See more</span></Link>
                               </div>							  
						      
						  </div>
						  </div>
					      </div>
					<div className="col-sm-1"/> 
					</div>
                    </div>)
				
				     })
				}
				 </div>
				
				   )}
                        
							/>
							</div>
						)}
				</div>
				  </div>
				  {/*<div class="col-1"></div>*/} 
			     </div>
            </div>
        </div>		 
					</div>
	         </div>	  
		  </div>
		  
        </React.Fragment> );
	}
    }
}
 
export default SearchList;