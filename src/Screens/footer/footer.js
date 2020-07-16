import React, { Component } from "react";
import CmsContent from '../../MiddleWare/CmsContent';
import { ACCESS_POINT } from '../../config';
import { Link } from 'react-router-dom';

class Footer extends Component {
	
	 constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryArrray: [],
      fullList: [],
      themeId: null,
      adminId: localStorage.getItem("swtnId"),
      exemption: [41, 43, 44, 45, 46, 47, 49, 58],
      screen: window.screen.height,
	  Currentyear:"",
	  userlog:localStorage.getItem("userDetails")
    };
  }
	
    async componentDidMount() {
        try {
			let adminId=this.props.match.params.customerid ? this.props.match.params.customerid : this.state.adminId
			//console.log(adminId);
         const result = await CmsContent.getHeader(adminId); 
            if (result) { 
			//  console.log(result.data);  
			  let date = new Date().getFullYear();
			  //console.log(date);
              this.setState({ categories: result.data, Currentyear:date});
			  
			}
		
          } catch (error) { 
            console.log(error); 
          }
		  ///<Link className="nav-link" to={`/CMS/Dynamic/218`} onClick={this.call}>
    }
async componentWillReceiveProps() {
	
	
    this.setState({ themeId: null });
    setTimeout(() => {
      this.setState({ themeId: this.props.match.params.id });
    }, 500);
  
  }
  
LoginCheck=(data)=>{
	
	if(data.themeName==='singleContent'){
	     
		        this.props.history.replace(`/samplesite/commonpg/${data.pageId}`);
		
		}
		else if(data.themeName==='Dynamic'){
	     
		        this.props.history.replace(`/samplesite/dynamicth4/${data.pageId}`);
		
		}
	else if(data.themeName==='ThemeFive'){
			
			this.props.history.replace(`/samplesite/th5/${data.pageId}`);
			
			
	}else if(data.themeName==='ThemeSix'){
			
			this.props.history.replace(`/samplesite/th6/${data.pageId}`);
		}
		else if(data.themeName==='ThemeSeven'){
			
			
			this.props.history.replace(`/samplesite/th7/${data.pageId}`);
		}
	
}  
  
call=(data)=>{
	const{userlog}=this.state;
	  this.LoginCheck(data);  
			 window.scroll({
               top: 0,
               left: 0,
              behavior: 'smooth'
               });			
}
    render() { 
	const { categories, themeId, exemption,Currentyear } = this.state;
	//console.log(categories);
	var categoryData = []; 
    var reference = [];
    var fullList = [];
	if (categories.length > 0) {
      const map = new Map();
      for (const item of categories) {
        if (!map.has(item.categoryId)) {
          map.set(item.categoryId, true); // set any value to Map
          categoryData.push({ categoryId: item.categoryId });
        }
      }

      fullList = categoryData.map(values => {
        return categories.filter(list => list.categoryId === values.categoryId);
      });
    }
	var chunk_size = 5;
    var groups = '';
    var fullData = [];
	var home=[];
    var exceptionData = [];
	if (fullList.length > 0) {
		fullList = fullList.filter((ival, i) => {
        if (exemption.indexOf(ival[0].categoryId) === -1) {
          //console.log(ival); 
		  return ival;
        } else {
          exceptionData.push(ival);
        }
        return null;
      });
	  fullList.map(values => {
		   
		  if(values[0].subCategoryId==null||values[0].subCategoryId=='-'){
			// console.log(values);  
			  if(values[0].themeName==='singleContent'){
				home.push(<li>
                      <Link to={`/samplesite/commonpg/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}else if(values[0].themeName==='ThemeFive'){
				home.push(<li>
                      <Link to={`/samplesite/th5/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}else if(values[0].themeName==='Dynamic'){
				home.push(<li>
                      <Link to={`/samplesite/dynamicth4/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}else if(values[0].themeName==='ThemeSix'){
				home.push(<li>
                      <Link to={`/samplesite/th6/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}else if(values[0].themeName==='ThemeSeven'){
				home.push(<li>
                      <Link to={`/samplesite/th7/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}else if(values[0].themeName==='VideoContent'){
				home.push(<li>
                      <Link to={`/samplesite/th3/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}else if(values[0].themeName==='ThemeEight'){
				home.push(<li>
                      <Link to={`/samplesite/th8/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}else if(values[0].themeName==='ThemeNine'){
				home.push(<li>
                      <Link to={`/samplesite/th9/${values[0].pageId}`}>
                       {values[0].categoryName} 
                        </Link>
                      </li>
		            )
			}
		  }
		
	  });

	  
	}
	

		
    return( 
	<React.Fragment>
      <footer class="footer-area">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="reshide footer-social-info d-flex align-items-center justify-content-between">
                            	{home} 
                     </div>
                     <div class=" footer-social-info d-flex align-items-center justify-content-between" style={{padding:'0px'}}>
                            <div className="col-12 resshow">	{home} </div>
                     </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="copywrite-text">
                        <p>
Copyright &copy;{Currentyear} All rights reserved | Powered  by <a href={`https://www.difuza.com`} target="_blank">difuza</a>
</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>  
    </React.Fragment>)
    }
}
 
export default Footer; 