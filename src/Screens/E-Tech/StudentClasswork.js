import React, { Component } from "react";
import SingleSelect from "../Components/SingleSelect";
import CmsContent from "../../MiddleWare/CmsContent";
import { Editor } from "@tinymce/tinymce-react";
import { Alert } from "reactstrap";
import renderHTML from "react-render-html";
import { ACCESS_POINT } from "../../config";
import LoginModal from "../Components/Modal/Modal";

//import VideoContent from "./VideoContent";


import NewVideoPlayer from "./../Components/Extra/NewVideoPlayer";
import PortletVideoPlayer from'./portletVideoPlayer';

//import Theme9 from './addPages/theme9';
 import Datatable from "../Components/Datatable/Datatable";
import { wait } from "@testing-library/react";



export default class StudentClasswork   extends Component  {

    constructor(props) {
        super(props);
        this.state = {
          
          alertVisible: false,
          authorlist: [],
          checked: 0,
          customerId: localStorage.getItem("userId"),
          userid:JSON.parse(localStorage.getItem('Userdata')).id,
          nextstate:true
        }

    }


   async componentDidMount()
    {
        let userlog =JSON.parse(localStorage.getItem('Userdata'));
      
         
        let customerid=userlog.customerId;
        let userid=userlog.id;
        let grade=userlog.grade;

   
        
      
        let  viewarray=[];
        let viewcontent=[];
      
       

        let tableData = await CmsContent.getFreedom(
            " tbl_map_grouptoportlet.boxtitle,tbl_boxcontent.*",
            " tbl_map_grouptoportlet,tbl_boxcontent",
            `tbl_boxcontent.catagory_id=119 and  tbl_map_grouptoportlet.customerId=${customerid} and tbl_boxcontent.grade=${grade} and  tbl_boxcontent.name=tbl_map_grouptoportlet.contentid `,
            "id",
            "id DESC"
          )
      
          tableData.data.map(async ival=>{
           
           // console.log(ival.type)
            if(ival.type==4)
            {
             

              let Resourcesvalues = await CmsContent.getFreedom(
                " tbl_resources.*",
                " tbl_resources",
                `companyid=${customerid} and id in (${ival.text}) `,
                "id",
                "id DESC"
              )
              //console.log(Resourcesvalues.data)
              ival.Resourcesvalues=Resourcesvalues.data;

            }
            else if(ival.type ==8)
            {

            
              

              let evaluationvalues = await CmsContent.getFreedom(
                " tbl_question.*",
                " tbl_question",
                `customerid=${customerid} and id in (${ival.evaluation}) `,
                "id",
                "id DESC"
              )
         
             // console.log(ival)
              ival.evaluationvalues=evaluationvalues.data;
             // console.log(evaluationvalues.data)
             
            }
            else if(ival.type==2){

              //console.log(ival.type)
              console.log(ival)
             // console.log(ival.overlay)
              JSON.parse(ival.overlay).map(async value=>{
               
                 
                if(value.overlayType =='Quiz')
                { 
                let quizList = await CmsContent.getFreedom(
                        " tbl_question.*",
                        " tbl_question",
                        ` id =${value.quizId} and customerid=${JSON.parse(localStorage.getItem("Userdata")).customerId} `,
                        "id",
                        "id DESC"
                      )
                     // console.log(quizList)
                     // ival.quizList=quizList.data;
                     ival.quiz=quizList.data[0].contentJson;

                    
                     ival.url=ival.media; 
                    }

              })

             // quizList
             
            }
            else
            {

            }
            
          })
console.log(tableData)
        let tbl_pages = await CmsContent.getFreedom(
          " tbl_map_grouptoportlet.boxtitle,tbl_pages.*",
          " tbl_map_grouptoportlet,tbl_pages",
          `tbl_pages.content1=119 and   tbl_pages.customerId=${customerid} and  tbl_map_grouptoportlet.groupid=${grade} and  tbl_pages.id=tbl_map_grouptoportlet.contentid `,
          "tbl_map_grouptoportlet.id",
          "tbl_map_grouptoportlet.id DESC"
        )
        console.log(tbl_pages.data)
        
        this.setState({tbl_pages:tbl_pages.data})

          tableData.data.map(async ival=>{ 
            
            if(ival.type==4 && ival.text!=null )
            {
              

        
              let Resourcesvalues = await CmsContent.getFreedom(
                " tbl_resources.*",
                " tbl_resources",
                `companyid=${customerid} and id in (${ival.text}) `,
                "id",
                "id DESC"
              )
 
            // console.log(Resourcesvalues.data)
          //this.viewfuncion(Resourcesvalues.data,tableData.data,this.state.tbl_pages)
           
            }
            else{

             
            }
          })
  

        
          this.viewfuncion(tableData.data,this.state.tbl_pages)

         
    }

 

    viewfuncion = async (tableData,tbl_pages) =>{
  
let viewarray=[];


tbl_pages.map(ival =>{
 // console.log(ival)

 viewarray.push(

  <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            
  <p class="card-text">{ival.boxtitle}</p>

   {  renderHTML(ival.sheetContent)}
           
          </div>
        </div>
        <br/>
    </div>
 )
  
})
console.log(tableData)


tableData.map(async ival =>{
  if(ival.type==4 && ival.text!=null)
  {
//console.log(ival)
 let secondarray=[]
viewarray.push( 
              
                           
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        
<p class="card-text">{ival.boxtitle}</p>

{ival.Resourcesvalues.map(resource=>{
  
  //console.log(resource)
  if(resource.extension=="pdf")
      {
        secondarray.push(<div><a href={ACCESS_POINT+'/superAdmin/file?fileurl='+resource.file}>View PDF</a>


        </div>)
      }
      else if(resource.extension=="mp4")
      {
        secondarray.push(<div> <br/>
          <video width="400" controls  >
  <source src={ACCESS_POINT+'/superAdmin/file?fileurl='+resource.file} type="video/mp4"/>
  <source src={ACCESS_POINT+'/superAdmin/file?fileurl='+resource.file} type="video/ogg"/>
 
          </video>
        </div>)
      }
      else if(resource.extension=="jpeg")
      {
 

        secondarray.push(<div><img alt="Responsive image" src={ACCESS_POINT+'/superAdmin/file?fileurl='+resource.file} /></div>)
      }
      
})}
{secondarray}
       
      </div>
    </div>
 <br/>
</div>)

  }
  else if(ival.type ==8)
  {
 console.log(ival)
console.log(this.state.userid)
viewarray.push( 
              
                           
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        
<p class="card-text">{ival.boxtitle}</p>

{/* <p class="card-text" onClick={()=>window.open(`WizardForm/${this.state.userid}/${ival.evaluation}/${ival.name}`)}>{ival.evaluationvalues[0].quizName+'(view assement)'}</p> */}

<button class="btn btn-link"onClick={()=>window.open(`WizardForm/${this.state.userid}/${ival.evaluation}/${ival.name}`)}>{ival.evaluationvalues[0].quizName+'(view assement)'} </button>


      </div>
    </div>
    <br/>
</div>)

  }
  else if(ival.type==2)
  {
  console.log(ival)
  console.log(ival.overlay)
    viewarray.push( 
 
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            
  <p class="card-text">{ival.boxtitle}</p>

  <span>View video</span> <br/>

  {/* <PortletVideoPlayer data={ival} /> */}
  {/* <NewVideoPlayer Video={ival} />  */}

         <img class="img-rounded" src={ACCESS_POINT+'/superAdmin/file?fileurl='+ival.thumbnail} onClick={()=>this.imageclick(ival,ACCESS_POINT+'/superAdmin/file?fileurl='+ival.media)}  style={{width:100,height:100}}/> 


      

          </div>
        </div>
        <br/>
    </div>)

  }
  else if(ival.type==3)
  {
    //console.log(ival)
    viewarray.push( 
 
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            
  <p class="card-text">{ival.boxtitle}</p>

 
  
  
          </div>
        </div>
        <br/>
    </div>)
  }
  else if(ival.type==1)
  {


   // console.log(ival)
    viewarray.push( 
 
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            
  <p class="card-text">{ival.boxtitle}</p>

  
  <img style={{width:50,height:50}} alt="Responsive image" src={ACCESS_POINT+'/superAdmin/file?fileurl='+ival.media} />
 
  
  
          </div>
        </div>
     <br/>
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
this.setState({viewarray})
      }

    
    
    viewassesments = (e)=>
    {

      console.log(e)
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


    imageclick= (ival,srccode)=>{
this.setState({nextstate:false,srccode:srccode,videodata:ival})
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
console.log(this.state.nextstate)
     if(!this.state.nextstate)
     {

    
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
                    <h3>Classwork</h3>

                    {/* <span>{this.state.srccode}</span> */}
                    <br/>
      
      <button type="button" class="btn btn-link" onClick={() =>{this.setState({nextstate:true})}} >back</button>

        <NewVideoPlayer Video={this.state.videodata} />  
        {/* <PortletVideoPlayer data={this.state.videodata} /> */}
                  
                      

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
                    <h3>Classwork</h3>

 
                    <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <div class="modal-header">
          <h4 class="modal-title">Modal Heading</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div class="modal-body">
          Modal body..{this.state.srccode}

       
          {/* {this.state.srccode &&( <NewVideoPlayer Video={this.state.srccode} />)}   */}
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>


                    <div className="row">
                    
          {this.state.viewarray}
          
           
    

          </div>
        
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

}