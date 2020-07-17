import React, { Component } from "react";
import SingleSelect from "../Components/SingleSelect";
import CmsContent from "../../MiddleWare/CmsContent";

import { Alert } from "reactstrap";

import Theme7 from "./theme7";


//import Theme9 from './addPages/theme9';
 import Datatable from "../Components/Datatable/Datatable";

 


export default class CommentView   extends Component  {

    constructor(props) {
        super(props);
        this.state = {
          
          alertVisible: false,
          authorlist: [],
          checked: 0,
          customerId: localStorage.getItem("userId"),
          errorPageName: null,
          data: [],
          themeId: 0,
          authorname: "",
          authoremail: "",
          authorabout: "",
          authorlogo: "",
          file1: "",
          errorauthorname: "",
          errorauthoremail: "",
          errorauthorabout: "",
          alertVisible1: false,
          btnDisable: false,
          formAlert: false,
          formBtn: false,
          themeSelected:'',
          screen: window.screen.height,
          userid:''
        }

    }


   async componentDidMount()
    {
        let userlog =JSON.parse(localStorage.getItem('Userdata'));
      
         
        let customerid=userlog.customerId;
        let userid=userlog.id;

   console.log(this.props.datavalue)


   let Resourcesvalues = await CmsContent.getFreedom(
    " tbl_comment.*,tbl_user_web.userName",
    " tbl_comment,tbl_user_web",
    `tbl_comment.mapid=${!this.props.datavalue.mapid ? this.props.datavalue.id :this.props.datavalue.mapid} and tbl_comment.userid=tbl_user_web.id`,
    "id",
    "id DESC"
  )
        console.log(Resourcesvalues.data)

let commentpush=[]
        if(Resourcesvalues.data.length)
        {


            Resourcesvalues.data.map(mappingvalue=>{

                commentpush.push( <div class="panel-body">
<ul class="media-list">
    <li class="media">
        <div class="media-left">
            <img src="http://placehold.it/60x60" class="img-circle"/>
        </div>
        <div class="media-body">
            <h4 class="media-heading">
            {mappingvalue.userName}
                <br/>
                <small>
                    commented on <a href="#">Post Title</a>
                </small>
            </h4>
            <p>
            {mappingvalue.comment}
            </p>
        </div>
    </li>
 
</ul>
{/* <a href="#" class="btn btn-default btn-block">More Events »</a> */}
</div>)

            })
        }
         
        this.setState({customerid,userlog,userid,commentpush,datalength:Resourcesvalues.data.length})

 
    }
  
    render() {
    const {adduseroptions,alertVisible,disableValue,button} =this.state;

    let userType = localStorage.getItem("userType");

     
if(this.state.datalength)
{
    return (
        <React.Fragment>
          <main className="main my-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                
                     
                    <div className="card-body">
                    <div class="container">
    <div class="row">
        {/*col-sm-offset-3 col-xs-8 col-xs-offset-2 col-md-4  col-md-offset-4*/}
		<div class="col-sm-6 ">
        
    	    <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <span class="glyphicon glyphicon-comment"></span> 
                        Recent Comments--{this.state.datalength}
                    </h3>
                </div>  
                {/* <div class="panel-body">
                    <ul class="media-list">
                        <li class="media">
                            <div class="media-left">
                                <img src="http://placehold.it/60x60" class="img-circle"/>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">
                                    Mauris Eu
                                    <br/>
                                    <small>
                                        commented on <a href="#">Post Title</a>
                                    </small>
                                </h4>
                                <p>
                                    Vivamus pulvinar mauris eu placerat blandit. In euismod tellus vel ex vestibulum congue...
                                </p>
                            </div>
                        </li>
                     
                    </ul>
                   
                </div> */}
                 {/* <a href="#" class="btn btn-default btn-block">More Events »</a> */}

                {this.state.commentpush}
            </div>
            
            
		</div>
	</div>
</div>
                   

                
                  </div>
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      );
     
    
}
else{
   return( <React.Fragment>
    <div> </div>
</React.Fragment>)
        
}
     
 
 
       
      }

}