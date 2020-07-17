import React, { Component } from "react";
import $ from 'jquery';
import { Link } from 'react-router-dom';

import ScriptTag from 'react-script-tag';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import { ACCESS_POINT } from '../../config';
import CmsContent from '../../MiddleWare/CmsContent';
import redisMiddleware from '../../MiddleWare/redisMiddleware';
import Modal from "../modal" 

 
class Test extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryArrray: [],
      fullList: [],
      themeId: null,
      adminId: localStorage.getItem("swtnId"),
      screen: window.screen.height,
	  userlog:localStorage.getItem("userDetails"),
	  model:[],
      loading: false,
      error: null,
	  modal14: false,
	  mobileNumber:'',
	  errormobileNumber:'',
      loginstate: 0 ,
      logButton:'Login',
	  rot:0,
	  Adminlog:localStorage.getItem("Admin"),
	  nav: "navbarToggler",
      cm: "classy-menu",
	  
    };
  } 
  
  async componentDidMount() {
    console.log('')
    try {
		let adminId=this.props.match.params.customerid ? this.props.match.params.customerid : this.state.adminId ;
          this.setState({rot:adminId});	
         
		  let Userdata = JSON.parse(localStorage.getItem('Userdata'))
      console.log(Userdata); 
      console.log(Userdata.grade); 
      
	 this.setState({Userdata:Userdata})
  
    if(Userdata)
    {
		if(!Userdata){ 
			this.setState({logButton:'Login'});
		}else{
			this.setState({logButton:'Logout'});
		}
		//console.log(this.state.loginstate);
    //const result = await CmsContent.getHeader(adminId); 
     // let  result = await redisMiddleware.singleTable("tbl_category_master",Userdata.customerId,"customerId");
    //const result = await CmsContent.getFreedom('tbl_category_master.*','tbl_category_master','customerId =199','id','id'); 

    //tbl_mapping_page
    let  result =  await CmsContent.getFreedom('tbl_mapping_page.*','tbl_mapping_page',`customerid =${Userdata.customerId}`,'id','id'); 

  
    let  selectGrade = await CmsContent.getFreedom('tbl_grade_master.*','tbl_grade_master',`customerid =199 and id in (${Userdata.grade})`,'id','id'); 
 //Grade
   console.log(selectGrade.data)
      let  maptogroupuser = await CmsContent.getFreedom('tbl_maptogroup.*','tbl_maptogroup',`customerid =${Userdata.customerId} and userTypeId=10  and  groupid in (${Userdata.grade}) `,'1','1');  


//  console.log(maptogroupuser)

 
      this.setState({selectGradedata:selectGrade.data,selectGrade:selectGrade.data[0].Grade,maptogroupuser:maptogroupuser.data
      });

     
      console.log(result)
      console.log(this.state.selectGrade)
      if (result) {
  

    var categories = result.data; 
    var categoryData = [];
    var fullList = [];
    var content = [];
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
  var show = false;
  console.log(this.state.selectGrade)
    fullList.map(values => {
      if(values[0].subCategoryId ){
        let innerContent=[];
        let gradepush=[];
  //  values=values.sort(this.compareValues('listingsubcatagory','int','asc'));
        
    values.map(ival=>{

      if(ival.categoryName=="Assessments")

      {
        this.state.selectGradedata.map(gradeview=>{

          gradepush.push(<li>
            <Link  >
            {gradeview.Grade} 
              </Link>
            </li>)
        })
        
        innerContent.push(
          <li>
            <Link >
            {ival.subCategoryName} 
            </Link>
            
          </li> 
          
        );
         

      }else
      {


      

this.state.selectGradedata.map(gradeview=>{

  gradepush.push(<li>
    <Link  >
    {gradeview.Grade} 
      </Link>
    </li>)
})
        innerContent.push(
          <li>
            <Link >
            {ival.subCategoryName}
            </Link>
          </li> 
        );


       

      }

      



      content.push(
        <li className="cn-dropdown-item has-down">
         <Link>  {ival.categoryName} </Link>
          <ul className="dropdown">
            {innerContent}
            {gradepush}
            
          </ul>
        </li>);
   
     
        })
        
        


      } 
      else
      {
         
let innerContent=[];
let gradepush=[];

this.state.selectGradedata.map(gradeview=>{
  
   //console.log(gradeview)

  
  gradepush.push(<li>
    <Link  to={`/Etech/TeacherClasswork/${gradeview.id}`}>
    {gradeview.Grade} 
      </Link>
    </li>)
})

        values.map(ival=>{
       

          
          
          // innerContent.push(<li>
          //     <Link  >
          //     {this.state.selectGrade} 
          //       </Link>
          //     </li>)
            
        
        
    
            content.push(
              <li className="cn-dropdown-item has-down">
               <Link>  {ival.categoryName} </Link>
                <ul className="dropdown">
                  {gradepush}
                </ul>
              </li>);
        })

     
       
      }
   
      
   
    });
    
  }
    this.setState({ categories,content,show});
      }
	
	  
    } catch (error) {
      console.log(error);
    }
  }
 
 
  
compareValues(key,type,order = 'asc') {
	// console.log(1);
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = type === 'int' ? parseInt(a[key]) : a[key].toUpperCase();
    const varB = type === 'int' ? parseInt(b[key]) : b[key].toUpperCase();

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
	//console.log(comparison);
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
} 

  
  async componentWillReceiveProps(nextProps) {
    this.setState({ themeId: null });
    setTimeout(() => {
      this.setState({ themeId: this.props.themeId });
    }, 500);
  }
  
LoginCheck=(data)=>{
    
}
 call = (data) => {
 }
 
 

  _
handlechange=d=>{
	this.setState({mobileNumber:d.target.value});
 }


MobileSign = async (s,v) => {
   
  };
  
  loginbutton=async()=>{

  
  console.log(this.state.searchValue)

   if(this.state.Userdata)
   {
    localStorage.clear()
    this.setState({logButton:'Login'})
    window.location.href="/"
   }
   else{

    const result = await CmsContent.Freelogin(
      this.state.searchValue,
      ''
    );
  
    console.log(result.data[0].userType)
    if(result.data[0].userType==9 || result.data[0].userType==10  )
    {
    localStorage.clear()
  
      localStorage.setItem('Userdata', JSON.stringify(result.data[0]))
  
      console.log(JSON.parse(localStorage.getItem('Userdata')))
  
      if( localStorage.setItem('Userdata', JSON.stringify(result.data[0])))
      {
        this.setState({logButton:'Logout'});
 
      }
      
  
  
   if(result.data[0].userType==9)
   {
    window.location.href="Etech/Teacher"
   }
   else if(result.data[0].userType==10 )
   {
    window.location.href="Etech/StudentViewLogin"
   }
     
  
    }
    
   }

 
}


render() {
    const { categories ,content,open,userlog,rot} = this.state;
	let cl = window.innerWidth <= 991 ? "on light right" : "off";
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 991) {
        cl = "on light right"; 
        this.setState({ nav: "navbarToggler", cm: "classy-menu" });
      } else {
        cl = "off";
        this.setState({ nav: "navbarToggler", cm: "classy-menu" });
      }
 
      

    });
    var el = document.querySelectorAll(".navbarToggler");
    for (var i = 0; i < el.length; i++) {
      el[i].onclick = () => {
        if (this.state.nav === "navbarToggler") {
          this.setState({
            nav: "navbarToggler active",
            cm: "classy-menu menu-on"
          });
        } else {
          this.setState({ nav: "navbarToggler", cm: "classy-menu" });
        }
      };
    }
	var els = document.getElementsByClassName("cn-dropdown-item"); 
// loops els
//console.log(els)
for(var i = 0, x = els.length; i < x; i++) {
    els[i].onclick = function(){
        // do something
        //console.log('target name should be here');
        var element = document.getElementsByClassName('dropdown')[0];
          console.log(element.style);
          console.log(element.style.display);

          if(element.style.display=="")
          {
           
            element.style.display = "block";
          }else if(element.style.display =="block")
          {
            element.style.display = "none";
          }
          else if(element.style.display = "none")
          {
            element.style.display = "block";
          }
        

    }
}

 $(".navbarToggler").on('click', function(event){
 // console.log('classycloseIcon');
  $(".sticky-navbarToggler ").addClass("active");
  $(".classy-menu").addClass("menu-on");
  // alert(1) 
  event.stopPropagation();
  event.stopImmediatePropagation();
});

$(".classycloseIcon").on('click', function(event){

  $(".classy-menu").removeClass("menu-on");
  $(".navbarToggler").removeClass("active");
  // alert(1)
  event.stopPropagation();
  event.stopImmediatePropagation();
}); 
	return <React.Fragment>
      <header className="header-area" >
	   <div className="nikki-main-menu">
	   {this.state.modal14===true&&(
	   <Modal 
	   modal14={this.state.modal14}
	   these={this.MobileSign}
	   loginstate={this.state.loginstate}
	    customerid={rot} 
	   />
	   )}
	   <div className={`classy-nav-container breakpoint-${cl}`}>
            <div className="container-fluid">
			
              <nav className="classy-navbar justify-content-between" id="nikkiNav" style={{ padding: '0px' }}>
				
			 <a   >
					 <div style={{ width: '74%' }}>
                    
 
					</div>
					
     <div><p style={{ fontSize: '11px', fontWeight: 'bolder' ,marginLeft:'-7px'}}>Teach-{this.state.selectGrade}</p>
                  </div> 
			 </a>
			  
                <div className="classy-navbar-toggler">
                  <span className={`${this.state.nav}`} style={{marginTop:25}}><span /><span /><span /></span>
                </div>
                <div className="classy-menu">
                  <div className="classycloseIcon">
                    <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                  </div>
                  <div className="classynav">
                    <ul>
					{content && content.length ? content :null}


                     
                     
					


                     <li className="cn-dropdown-item has-down">
         <Link>  Master</Link>
          <ul className="dropdown">
                      <li>
                      <Link to={'/Etech/Addporlet'} >
                        {'Add Porlet Master'}
                        </Link>
                      </li>
                      <li>
                      <Link   to={'/Etech/AddCatagory'}>
                        {'Catagory'}
                        </Link>
                      </li>
                      <li>
                      <Link to={'/Etech/Viewstudent'} >
                        {'View Student'}
                        </Link>
                      </li>
                      <li>
                      <Link to={'/Etech/MapTogrop'} >
                        {'MapTogrop'}
                        </Link>
                      </li>

                      <li>
                      <Link to={'/Etech/Resources'} >
                        {'Add Resources'}
                        </Link>
                      </li>
                      
               
                     
         </ul>
                        </li>



                    </ul>
					 <div className="search-form">
                      <div className="searchRES" 
					  style={{
                        position: 'relative',
                        zIndex: '2',
                        borderRight: '1px solid #ebebeb',
                        margin: '0 30px 0 100px',
                      }}>
                        <input type="text" className="search-con" placeholder="Enter Number..."
                          onChange={e => this.setState({ searchValue: e.target.value })} value={this.state.searchValue} />
                      
					  </div>
                    </div>
         {/* Social Button */}
		 
			  <div className="top-social-info"> 
			  
      <MDBBtn color="primary" onClick={()=>this.loginbutton()}>
		  {this.state.logButton}
	   </MDBBtn>  
			  
			  {/*<MDBBtn color="primary" onClick={()=>this.login()}>MDBModal</MDBBtn>	  */}
		{/*<a href="/" onClick={()=>this.logout()} data-toggle="tooltip" data-placement="bottom" title="Facebook"><i className="fa fa-facebook" aria-hidden="true" /></a>*/}
		{/* <a href="#" data-toggle="tooltip" data-placement="bottom" title="Twitter"><i className="fa fa-twitter" aria-hidden="true" /></a>
         <a href="#" data-toggle="tooltip" data-placement="bottom" title="Instagram"><i className="fa fa-instagram" aria-hidden="true" /></a>
          <a href="#" data-toggle="tooltip" data-placement="bottom" title="Pinterest"><i className="fa fa-pinterest" aria-hidden="true" /></a>
		<a href="#" data-toggle="tooltip" data-placement="bottom" title="RSS Feed"><i className="fa fa-rss" aria-hidden="true" /></a>*/}
            </div>
						 
                  </div>
                  {/* Nav End */}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <ScriptTag type="text/javascript" src="js/plugins.js" />
      <ScriptTag type="text/javascript" src="js/active.js" />
    </React.Fragment>;
  }
}

export default Test; 