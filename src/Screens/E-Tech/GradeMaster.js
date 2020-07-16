import React, { Component } from "react";
import SingleSelect from "../Components/SingleSelect";
import CmsContent from "../../MiddleWare/CmsContent";

import { Alert } from "reactstrap";

import Theme7 from "./theme7";


//import Theme9 from './addPages/theme9';
 import Datatable from "../Components/Datatable/Datatable";

const options = [
  
  { label: "Theme7", value: "7" }

];


export default class GradeMaster   extends Component  {

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

   
        
        this.setState({customerid,userlog,userid})


         

        let data_view = await CmsContent.getFreedom(
          " tbl_pages.*",
          " tbl_pages",
          `themeId=7 and  subTitleId=${userid} and  customerId=${customerid}`,
          "id",
          "id DESC"
        )
console.log(data_view)
 
          

            this.setState({data:data_view.data})
          
         

         
    }


    pagenameError = async (s, v) => {
      this.setState({ [s]: v });
      console.log("v", v);
      if (this.state.alertVisible === true) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        setTimeout(() => this.setState({ alertVisible: false }), 3000);
      }
    };




    subjectvalueadd = (e) =>{
        console.log(e.target.value)
    this.setState({subjectvalue:e.target.value})
    console.log(this.state.subjectvalue)
    }

    selectedtype =(e) =>{
       
console.log(e)
this.setState({secondlanguageselected:e})


    }


    addnew = async () => {

        const {subjectvalue}=this.state;
        
        if (!subjectvalue) {
          this.setState({ error: "Please Fill The Cohorts" });
          return false;
        }
  
        let groupArray = {};
        groupArray.Grade = subjectvalue.trim();
        groupArray.language  =this.state.secondlanguageselected.value;
        groupArray.customerId = this.state.customerid;


 console.log(groupArray)
        try {


            this.setState({ disableValue: true });
            const result = await CmsContent.addMaster("tbl_grade_master", groupArray);

            if(result)
            {

                 
                 this.setState({ disableValue: false ,alertVisible:true});
            }

        }
        catch(error)
        {
            console.log(error);

        }



    }

    column = [
      {
        name: "name",
        selector: "name",
       
      },
      {
        name: "themeId",
        selector: "themeId"
      },
      {
        name: "Edit",
        selector: "themeId",
        cell: d =>
        this.Edit(d)
      }
     
    ];

    Edit = (d) =>
    {
      return(<button className="btn btn-info" onClick={() => this.onEdit(d)}>
      Edit
    </button>)
    }


    onEdit = (d) =>{
console.log(d.themeId)
if(d.themeId ==7)
 {
  

 
   this.handleTheme( { label: "Theme7", value: "7" })
 }
    }
   
    handleTheme = selectedOption => {
      this.setState({
        themeSelected: selectedOption,
        themeId: selectedOption.value,
        themeName: selectedOption.label
      });
    };
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

                    <div className="row form-group">
                    <div className="col-sm-2" />
                    <div className="col-sm-7">
                      <Alert
                        className="badge-content"
                        color={'success'}
                        isOpen={alertVisible}
                        toggle={this.onDismiss}
                      >
                       
                       New Grade Added  
                      </Alert>

                      </div>
                      </div> 
                   
                      <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="exampleInputEmail1">Select Theme</label>
                      </div>
                      <div className="col-sm-5">
                        <SingleSelect
                          options={options}
                          handleChange={this.handleTheme}
                          selectedService={this.state.themeSelected}
                        />
                      </div>
                      <div className="col-sm-3" />
                    </div>
                    {this.state.themeId == "7"  &&
                      <Theme7 that={this.state} these={this.pagenameError} />
                    
                              }


                                    
                  <div className="row form-group">
                    <div className="col-sm-2" />
                    <div className="col-sm-2" />
                    <div className="col-sm-5">
                      
                    </div>
                    <div className="col-sm-3" />
                  </div>
  {this.state.data.length  && (<Datatable data={this.state.data} columnHeading={this.column} />)} 
                  
                      

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