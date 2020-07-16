import React, { Component } from 'react';
import  FormMiddleWare  from "../Components/FormMiddleware";
 import Datatable from "../Components//Datatable/Datatable";

import CmsContent from "../../MiddleWare/CmsContent";
 import SingleSelect from "../Components/SingleSelect";

import { Alert } from "reactstrap";




export default class ViewStudent extends FormMiddleWare {

    constructor(props) {
        super(props);
        this.state = {
          
            alertVisible: false,
            updateData: false,
            subjectvalue:'',
            button: "Submit",
            disableValue: false,
            data:[],
            second_language:[],
            secondlanguageselected:'',
            maptogroupuser:[]
        }

    }


   async componentDidMount()
    {
        let serviceid=localStorage.getItem("currentService");
        let customerid=localStorage.getItem("userId");

        let Userdata = JSON.parse(localStorage.getItem('Userdata'))
   
        console.log(Userdata)
       
        
        let  maptogroupuser = await CmsContent.getFreedom('tbl_maptogroup.*,tbl_user_web.userName, tbl_grade_master.Grade','tbl_maptogroup,tbl_user_web,tbl_grade_master',`tbl_maptogroup.customerId =${Userdata.customerId} and  tbl_maptogroup.userid=tbl_user_web.id and tbl_maptogroup.userTypeId=10  and  tbl_maptogroup.groupid= ${Userdata.grade} and tbl_grade_master.id=${Userdata.grade}` ,'tbl_maptogroup.id','tbl_maptogroup.id');  

        console.log(maptogroupuser);

        this.setState({customerid,Userdata,serviceid,maptogroupuser:maptogroupuser.data})
         

         
    }


 

     
    column = [
      {
        name: "Grade",
        selector: "Grade",
       
      },
      {
        name: "userName",
        selector: "userName",
        
       
      }
     
    ];

   
    render() {
    const {adduseroptions,alertVisible,disableValue,button} =this.state;

    let userType = localStorage.getItem("userType");

     


      return (
        <React.Fragment>
          <main className="main my-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h3>Grade Master</h3>
                    </div>
                    <div className="card-body">

                     


                                    
                
  {this.state.maptogroupuser.length  && (<Datatable data={this.state.maptogroupuser} columnHeading={this.column} />)} 
                  
                      

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      );
     
 
 
       
      }

}