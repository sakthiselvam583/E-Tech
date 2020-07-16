import React, { Component } from "react";
import SingleSelect from "../Components/SingleSelect";
import CmsContent from "../../MiddleWare/CmsContent";

import { Alert } from "reactstrap";



//import Theme9 from './addPages/theme9';
 import Datatable from "../Components/Datatable/Datatable";
import { wait } from "@testing-library/react";



export default class StudentHomework  extends Component  {

    constructor(props) {
        super(props);
        this.state = {
          
          alertVisible: false,
          authorlist: [],
          checked: 0,
          customerId: localStorage.getItem("userId"),
          
          userid:''
        }

    }


   async componentDidMount()
    {
        let userlog =JSON.parse(localStorage.getItem('Userdata'));
      
         
        let customerid=userlog.customerId;
        let userid=userlog.id;
        let grade=userlog.grade;

   
        
      


        let tableData = await CmsContent.getFreedom(
            " tbl_map_grouptoportlet.boxtitle,tbl_boxcontent.*",
            " tbl_map_grouptoportlet,tbl_boxcontent",
            `tbl_boxcontent.catagory_id=120 and  tbl_map_grouptoportlet.customerId=${customerid} and tbl_boxcontent.grade=${grade} and  tbl_boxcontent.name=tbl_map_grouptoportlet.contentid `,
            "id",
            "id DESC"
          )
          //console.log(tableData)
    

        let  viewarray=[];
        let viewcontent=[];
      
         
     tableData.data.map(async ival=>{
             

              if(ival.type==4 && ival.text!=null )
              {
                console.log(ival.text) 

                viewarray.push( 
              
                           
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          
                <p class="card-text">{ival.boxtitle}</p>
              
                         
                        </div>
                      </div>
                   
                  </div>)  

                  
              }
              else
              {
           
              
                viewarray.push( 
              
                           
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          
                <p class="card-text">{ival.boxtitle}</p>
                         
                        </div>
                      </div>
                   
                  </div>)  
              }

             
          })
          
         
      console.log(viewarray)


          this.setState({customerid,userlog,userid,tableData: tableData.data,viewarray,viewcontent})
        


 
         
    }

 



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
       
      }
     
    ];



    
   
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
                      
                    </div>
                    <div className="card-body" style={{marginTop:35}}>
                    <h3>Homework</h3>
                    
          {this.state.viewarray}

        
                  <div className="row form-group">
                    <div className="col-sm-2" />
                    <div className="col-sm-2" />
                    <div className="col-sm-5">
                      
                    </div>
                    <div className="col-sm-3" />
                  </div>
  {/* {this.state.data.length  && (<Datatable data={this.state.data} columnHeading={this.column} />)}  */}
                  
                      

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