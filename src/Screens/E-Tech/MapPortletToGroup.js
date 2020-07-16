import React, { Component } from "react";
import CmsContent from "../../MiddleWare/CmsContent";
import SingleSelect from "../Components/SingleSelect";
import Datatable from "../Components/Datatable/Datatable";
import FormMiddleWare from "../Components/FormMiddleware";
import { Alert } from "reactstrap";
import Switch from "react-switch";
//import LoginModal from "../../../components/Modal/Modal";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

class MapPortletToGroup extends FormMiddleWare {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tableData: [],
      // boxsize: [{ value: 'full', label: 'Full' }, { value: 'half', label: 'Half' }, { value: 'carousel', label: 'Carousel' }],
      boxsize: [
        { value: "full", label: "Full" },
        { value: "half", label: "Half" },
        { value: "double", label: "Double" }
      ],
      boxwidth: [],
      errorsize: null,
      errorcohort: null,
      errorboxtype: null,
      errorportlet: null,
      position: "",
      errorposition: null,
      categoryOptions: [],
      categorySelected: [],
      contentOptions: [],
      selectedContent: [],
      tray: false,
      button: "Submit",
      portletTitleError: null,
      editvalue: {},
      carousel: 0,
      showCarLength: false,
      alertVisible: false,
      alertVisible1: false,
      formAlertdelete: false,
      showinnermodal: false,
      subdata: [],
      subdatavalue: [],
      extraAnswer: [],
      CustomerId: localStorage.getItem("userId"),
      displayColor: { r: 0, g: 0, b: 0, a: 1 },
      hex: " #000",
      textalert: null,
      color: "success",
      fontSize : 14
    };
  }
  async componentWillMount() {
    try {
      let userlog = JSON.parse(localStorage.getItem('Userdata'));
      let companyid = userlog.customerId;
      let userid=userlog.id;
      this.setState({ companyid ,userid});
      let result = await CmsContent.getMasterValues("tbl_boxtype");
      if (result) {
        result.data.push({label:'Theme7',value:'11'})
        this.setState({ boxtype: result.data });
      }
      // //  result = await CmsContent.getMasterValues('tbl_group');
      
      result = await CmsContent.getFreedom(
        " tbl_grade_master.Grade as label ,tbl_grade_master.id as value",
        " tbl_grade_master",
        `customerId=${companyid} and id=${userlog.grade}`,
        "id",
        "id DESC"
      )
      console.log(result)
   
      if (result) {
        
        this.setState({ categoryOptions: result.data });
      }
     
      let boxcontent = await CmsContent.getFreedom(
        "tbl_boxcontent.*",
        "tbl_boxcontent",
        `customerId=${companyid} and teacher_id=${userid}`,
        "id",
        "id DESC"
      );
      if (boxcontent) {
       
       
        console.log( boxcontent.data)
        this.setState({ boxcontent: boxcontent.data });
      }
      let portletData = await CmsContent.getFreedom(
        "tbl_portletname.*",
        "tbl_portletname",
        `customerid=${companyid}`,
        "id",
        "id DESC"
      );
     // result = await CmsContent.getAllSubtitleList("tbl_portletname");
      if (result) {
        this.setState({ portletData: portletData.data });
      }
      result = await CmsContent.getAllSubtitleList("tbl_maptogroup");
      if (result) {
        
        this.setState({ mapgroup: result.data });
      }

      result = await CmsContent.getAllSubtitleList("tbl_user_web");
      if (result) {
     
        this.setState({ userweb: result.data });
      }

      
let table_page_data=  await CmsContent.getFreedom(
  " tbl_pages.name,tbl_pages.id ",
  " tbl_pages",
  ` customerId=${companyid} and subTitleId =${userid}`,
  "id",
  "id DESC"
)
console.log(table_page_data)
  
      let tableData = await CmsContent.getFreedom(
        " tbl_map_grouptoportlet.*",
        " tbl_map_grouptoportlet",
        ` customerId=${companyid} and position =${userid}`,
        "id",
        "id DESC"
      )


      this.setState({ tableData: tableData.data });
    
    } catch (error) {
      console.log(error);
    }
  }

  columns_view = [
    {
      Header: "Name",
      accessor: "boxtitle"
    },
    {
      id: "boxtypeid",
      name: "Type",
      //accessor: 'boxtypeid',
      selector : d => this.getValueFromArray(d.boxtypeid, this.state.boxtype),
      cell: d =>
        this.getValueFromArray(d.boxtypeid, this.state.boxtype)
    },
    {
      name: "type_portlet",
      selector: "width"
    },
    {
      name: "Add by ",
      selector: "position"
    },
  
    {
      id: "contentid",
      name: "content name",
      // accessor: 'contentid',
      selector: d =>
        this.getValueFromArrays(d.contentid, this.state.portletData),
      cell: d =>
        this.getValueFromArrays(d.contentid, this.state.portletData)
    },
    
  ];

  wait = d => {
    return null;
  };

  // check = async value =>{
  

  // const { mapgroup } = this.state;
  // let all = mapgroup
  //   .map((ival, i) => {
  //     if (ival.userid == value.original.groupid) {
  //       let returnArray = {};
  //       returnArray.userid = this.getValue(ival.userid, this.state.user);
  //       // returnArray.value = ival.groupid;
  //       // returnArray.getid = ival.id;
  //    
  //       return returnArray;
  //     }
  //   })
  //   .filter(function(element) {
  //     return element !== undefined;
  //   });
  // };

  getValue = (d, array) => {
    if (array.length > 0) {
      if (array.length !== 0) {
        let filtered = array.filter(function(item) {
         
          return item.userId == d;
        });
        let v = filtered[0];
        if (v != undefined) {
          
          return v;
        } else {
          return "---";
        }
      }
    } else {
      return "-";
    }
  };

 
  getCohortsData = async value => {};
  modalcohorts = (value, modalWindowId) => {
    return (
      <center>
        <button
          type="button"
          data-toggle="modal"
          data-target={`#${modalWindowId}`}
          className="btn btn-warning"
          onClick={() => this.buttonCohorts(value)}
        >
          {this.getValueFromArray(
            value.original.groupid,
            this.state.categoryOptions
          )}
        </button>
      </center>
    );
  };
  buttonCohorts = async value => {
    let values = value.original;
    let groupid = values.groupid;
   
    try {
      let result = await CmsContent.getValuebyColumn(
        "tbl_map_grouptoportlet",
        "customerid",
        this.state.CustomerId,
        "groupid",
        groupid
      );
      if (result) {
        
        this.setState({ buttonView: result.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  edit = (value, modalWindowId) => {
    console.log(value)
    return (
      <center>
        <button
          type="button"
          data-dismiss="modal"
          data-target={`#${modalWindowId}`}
          className="btn btn-warning"
          onClick={() => this.buttonEdit(value)}
        >
          Edit
        </button>
      </center>
    );
  };

  buttonDelete = async value => {
  
    let id = value.id;
  
    let previousData = [...this.state.tableData];
    //let getData = { ...previousData[value.index] };
    
    try {
      const result = await CmsContent.getSingleConditionedValue(
        "tbl_map_grouptoportlet",
        "id",
        id,
        "Delete"
      );
      if (result) {
       
        let datas = previousData.filter(delelteid => delelteid.id !== value.id);
        
        this.setState({
          tableData: datas,
          textalert: "Selected Map Portlet Deleted",
          color: "danger"
        });
      }
      setTimeout(() => this.setState({ alertVisible: false }), 3000);
    } catch (error) {
      console.log(error);
    }
  };
  // deletion = async value => {
  //   const { tableData } = this.state;
  //   const previousData = [...this.state.data];
  //   const getData = { ...previousData[value.index] };
  //   const id = getData.value;
  //   const data = previousData.filter(delelteid => delelteid.value !== value);
  //   try {
  //     const result = await CmsContent.getSingleConditionedValue(
  //       'tbl_map_grouptoportlet',
  //       'id',
  //       id,
  //       'Delete'
  //     );
  //     if (result) {
  //       this.setState({ tableData });
  //     }
  //     const { editvalue } = this.state;
  //     if (editvalue === '') {
  //       this.setState({ error: '' });
  //     }
  //   } catch (error) {
  //     this.setState({ data: previousData });
  //     console.log(error);
  //   }
  // };

  getValueFromArrays = (d, array) => {
    if (array.length > 0) {
      if (array.length !== 0) {
        let filtered = array.filter(function(item) {
          
          return item.id == d;
        });
        let v = filtered[0];
        if (v != undefined) {
         
          return v.name;
        } else {
          return "---";
        }
      }
    } else {
      return "-";
    }
  };
  getValueFromBoxtypeJson = (d, array) => {
    if (array.length > 0) {
      if (array.length !== 0) {
        let filtered = array.filter(function(item) {
          return item.value == d;
        });
        let v = filtered[0];
        if (v != undefined) {
          return v;
        } else {
          return "---";
        }
      }
    } else {
      return "-";
    }
  };
  getValueFromJson = (d, array) => {
    if (array.length > 0) {
      if (array.length !== 0) {
        let filtered = array.filter(function(item) {
          return item.id == d;
        });
        let v = filtered[0];
        if (v != undefined) {
          return v;
        } else {
          return "---";
        }
      }
    } else {
      return "-";
    }
  };
  buttonEdit = async value => {
    let values = value.original;

    let editid = values.id;

    let index = value.index;

    let portletTitle = values.boxtitle;

    let position = values.position;

    let tray = values.tray;
    let carousel = values.carouselLength;
    let boxwidth = {};
    boxwidth.value = values.width;

    let categorySelected = {};
    categorySelected.value = values.groupid;
    categorySelected.label = this.getValueFromArray(
      value.original.groupid,
      this.state.categoryOptions
    );
    let boxtypeSelected = {};
    boxtypeSelected.value = values.boxtypeid;
    boxtypeSelected.label = this.getValueFromArray(
      values.boxtypeid,
      this.state.boxtype
    );
    let selectedContent = {};
    selectedContent.value = values.contentid;
    selectedContent.label = this.getValueFromArrays(
      values.contentid,
      this.state.portletData
    );
    
    this.setState({
      position,
      carousel,
      selectedContent,
      boxtypeSelected,
      portletTitle,
      categorySelected,
      boxwidth,
      editid,
      tray,
      index,
      button: "Update"
    });
  };
  update = async () => {
    const {
      categorySelected,
      boxtypeSelected,
      selectedContent,
      portletTitle,
      boxwidth,
      position,
      editid: id,
      carousel
    } = this.state;
   

    try {
      let previousData = [this.state.tableData];
      let groupArray = {};
      //groupArray.id = id;
      groupArray.groupid = categorySelected.value;
      groupArray.boxtypeid = boxtypeSelected.value;
      groupArray.contentid = selectedContent.value;
      groupArray.boxtitle = portletTitle;
      groupArray.width = boxwidth.value;
      groupArray.position = position;
      groupArray.carouselLength = carousel;

      groupArray.tray = this.state.tray;
     
      let result = await CmsContent.updateMaster(
        "tbl_map_grouptoportlet",
        id,
        groupArray
      );
      if (result) {
        previousData.id = id;
        previousData.groupid = categorySelected.value;
        previousData.boxtypeid = boxtypeSelected.value;
        previousData.contentid = selectedContent.value;
        previousData.boxtitle = portletTitle.trim();
        previousData.carouselLength = carousel;
        previousData.width = boxwidth.value;
        previousData.position = position;
        previousData.tray = groupArray.tray;
        //let groupArray = [...this.state.tableData];
        var tableData = this.state.tableData;
        tableData = tableData.filter(function(obj) {
          
          return obj.id !== id;
        });

       

        let newData = [previousData, ...tableData];

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }); 
        this.setState({
          tableData: newData,
          textalert: "Map Portlet Updated",
          color: "success"
        });
      }
      setTimeout(() => this.setState({ alertVisible: false }), 3000);
    } catch (error) {
      console.log(error);
    }
  };
  boxwidth = e => {
    this.setState({
      boxwidth: e,
      showCarLength: e.value === "carousel" ? true : false,
      carousel: 0
    });
  };
  orderPosition = e => {
    this.setState({ position: e.target.value });
  };
  portletTitle = e => {
    this.setState({ portletTitle: e.target.value });
  };
  programSelect = e => {
    this.setState({ categorySelected: e, categoryId: e.value });
  };
  handleBox = async e => {
    this.setState({ boxtypeSelected: e, boxtypeid: e.value });
    console.log(e)
    // let result = await CmsContent.valueCustomerId(
    //   e.value,
    //   this.state.CustomerId
    // );
    // if (result) {
      
    //   this.setState({ contentOptions: result.data });
    // }
    let result ='';
if(e.label=="Theme7")
{

  result = await CmsContent.getFreedom(
    "tbl_pages.name as label ,tbl_pages.id as value",
    "tbl_pages",
    `customerId=${this.state.companyid} and subTitleId=${this.state.userid}`,
    "id",
    "id DESC"
  );
  this.setState({themeeditor:true})
}
else
{

  result = await CmsContent.getFreedom(
    "tbl_portletname.name as  label , tbl_portletname.id as value",
    "tbl_boxcontent,tbl_portletname",
    `tbl_boxcontent.customerId=${this.state.companyid} and tbl_portletname.id=tbl_boxcontent.name and tbl_boxcontent.type=${e.value} and tbl_boxcontent.teacher_id=${this.state.userid}`,
    "tbl_boxcontent.id",
    "tbl_boxcontent.id DESC"
  );

  this.setState({themeeditor:false})


  


}
  
this.setState({contentOptions :result.data })


  

  };
  addnew = async () => {
    let {
      tableData,
      boxwidth,
      position,
      categoryId,
      categorySelected,
      boxtypeSelected,
      boxtypeid,
      selectedContent,
      tray,
      portletTitle,
      carousel,
      displayColor,
      fontSize,
      hex
    } = this.state;
    if (categoryId !== "" && categoryId != undefined && categoryId != null) {
      this.setState({ errorcohort: "" });
    } else {
      this.setState({ errorcohort: "Please Select cohorts" });
      return true;
    }
    if (boxtypeid !== "" && boxtypeid != undefined && boxtypeid != null) {
      this.setState({ errorboxtype: "" });
    } else {
      this.setState({ errorboxtype: "Please Select boxtype" });
      return true;
    }
    if (
      selectedContent.value !== "" &&
      selectedContent.value != undefined &&
      selectedContent.value != null
    ) {
      this.setState({ errorportlet: "" });
    } else {
      this.setState({ errorportlet: "Please Select portlet" });
      return true;
    }
    if (
      portletTitle !== "" &&
      portletTitle != undefined &&
      portletTitle != null
    ) {
      this.setState({ portletTitleError: "" });
    } else {
      this.setState({ portletTitleError: "Please Select portlet title" });
      return true;
    }
   
   
    
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + "-" + month + "-" + day;
    fontSize = (fontSize && fontSize !=='') ? fontSize:14;

    const formDatas = new FormData();
    formDatas.append("groupid", categoryId);
    formDatas.append("boxtitle", portletTitle);
    
    formDatas.append("contentid", selectedContent.value);
    formDatas.append("tray", tray ? 1 : 0);
    formDatas.append("createdAt", newdate);
    formDatas.append("status", "active");
    formDatas.append("customerid", this.state.companyid);
    formDatas.append("position", this.state.userid);


//    formDatas.append("width", boxwidth.value);
//    

 if(this.state.themeeditor)
 {
  formDatas.append("boxtypeid", '11');
  formDatas.append("width", 'Theme')

 }
 else
 {
  formDatas.append("boxtypeid", boxtypeid);
  formDatas.append("width", 'portlet')

 }
    console.log([...formDatas])

    try {
      const result = await CmsContent.mapUserToResource(
        "tbl_map_grouptoportlet",
        formDatas
      );
      if (result) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
         }); 
        this.componentWillMount();
        this.setState({
          categoryId: "",
          boxtypeid: "",
          portletTitle: "",
          selectedContent: "",
          carousel: "",
          categorySelected: "",
          boxtypeSelected: "",
          alertVisible: true,
          boxname: "",
          boxwidth: [],
          position: [],
          fontSize: null,
          displayColor: { r: 0, g: 0, b: 0, a: 1 },
          hex: " #000",
          textalert: "New Map Portlet Added",
          color: "success"
        });
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => this.setState({ alertVisible: false }), 3000);
  };
  selectedTray = e => {
    const value = e;
   
    this.setState({ tray: value });
  };
  carousel = e => {
    this.setState({ carousel: e.target.value });
  };
  onDismiss = () => {
    this.setState({ alertVisible: false });
    this.setState({ alertVisible1: false });
    this.setState({ formAlertdelete: false });
  };
  textColour = async colour => {
    await this.setState({ displayColor: colour.rgb, hex: colour.hex });
  };
  fontSize = async size => {
    
      await this.setState({ fontSize: size.target.value });
  };
  render() {
    let rgb = this.state.displayColor;
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });
    const {
      boxsize,
      tableData,
      boxwidth,
      errorsize,
      errorcohort,
      errorboxtype,
      errorportlet,
      errorposition,
      position,
      errorlength,
      boxtypeSelected,
      categoryOptions,
      categorySelected,
      selectedContent,
      contentOptions,
      portletTitle,
      portletTitleError,
      disableValue,
      button,
      carousel,
      alertVisible,
      alertVisible1,
      formAlertdelete,
      showCarLength,
      textalert
    } = this.state;
    return (
      <React.Fragment>
        <main className="main my-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h1>Manage App Content</h1>
                  </div>
                  <div className="card-body">
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-7">
                        <Alert
                          className="badge-content"
                          color={this.state.color}
                          isOpen={alertVisible}
                          toggle={this.onDismiss}
                        >
                          {textalert}
                        </Alert>
                      </div>
                      <div className="col-sm-3" />
                    </div>

                    <div>
                      <div className="row form-group">
                        <div className="col-sm-2" />
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                          {/* <LoginModal
                            title="Cohorts"
                            atagLink={true}
                            id="group"
                            onClick={this.buttonView}
                            bodyText={
                              <div>
                                {this.state.buttonView && (
                                  <Datatable
                                    data={this.state.buttonView}
                                    columnHeading={this.columns}
                                  />
                                )}
                              </div>
                            }
                          /> */}
                        </div>
                        <div className="col-sm-3" />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="group">Grade</label>
                      </div>
                      <div className="col-sm-5">
                        <SingleSelect
                          options={categoryOptions}
                          handleChange={this.programSelect}
                          selectedService={categorySelected}
                        />
                        <span className="error-shows ">{errorcohort}</span>
                      </div>
                      <div className="col-sm-3" />
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="subgroup">BoxType</label>
                      </div>
                      <div className="col-sm-5">
                        <SingleSelect
                          options={this.state.boxtype}
                          handleChange={this.handleBox}
                          selectedService={this.state.boxtypeSelected}
                        />
                        <span className="error-shows ">{errorboxtype}</span>
                      </div>
                      <div className="col-sm-3 mt-3">
                        <label style={{ paddingTop: 5 }}>
                          Tray Notification:
                          <Switch
                            height={18}
                            width={41}
                            marginBottom={1}
                            paddingTop={5}
                            onChange={this.selectedTray}
                            checked={this.state.tray}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="position">Available Portlets</label>
                      </div>
                      <div className="col-sm-5">
                        <SingleSelect
                          className="hcross"
                          options={contentOptions}
                          handleChange={e => {
                            this.setState({ selectedContent: e });
                          }}
                          placeholder="Select Portlet"
                          value={selectedContent}
                        />
                        <span className="error-shows ">{errorportlet}</span>
                      </div>
                      <div className="col-sm-3" />
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="position">Portlet Alias</label>
                      </div>
                      <div className="col-sm-5">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="This name will be used for Portlet Title"
                          onChange={this.portletTitle}
                          value={portletTitle}
                        />
                        <span className="error-shows ">
                          {portletTitleError}
                        </span>
                      </div>
                      <div className="col-sm-1">
                        <div
                          style={styles.swatch}
                          onClick={async () => {
                            this.setState({ displayColorPicker: true });
                          }}
                        >
                          <div style={styles.color} />
                        </div>
                        {this.state.displayColorPicker ? (
                          <div style={styles.popover}>
                            <div
                              style={styles.cover}
                              onClick={() => {
                                this.setState({ displayColorPicker: false });
                              }}
                            />
                            <SketchPicker
                              color={this.state.displayColor}
                              onChange={e => {
                                this.textColour(e);
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className="col-sm-2">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="font Size"
                          onChange={e => {
                            this.fontSize(e);
                          }}
                          value={this.state.fontSize}
                        />
                      </div>
                    </div>
                    {/* <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="subgroup">Width</label>
                      </div>
                      <div className="col-sm-5">
                        <SingleSelect
                          className="hcross"
                          options={boxsize}
                          handleChange={this.boxwidth}
                          placeholder="Select Width"
                          value={boxwidth}
                        />
                        <span className="error-shows ">{errorsize}</span>
                      </div>
                      <div className="col-sm-3" />
                    </div> */}
                    {/* {showCarLength && ( */}
                    {/* <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="Carousel">Carousel Length</label>
                      </div>
                      <div className="col-sm-5">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Carousel Length"
                          onChange={this.carousel}
                          value={carousel}
                        />
                        <span className="error-shows ">{errorlength}</span>
                      </div>
                      <div className="col-sm-3" />
                    </div> */}
                    {/* )} */}

                    {/* <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="position">Ordering Position</label>
                      </div>
                      <div className="col-sm-5">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Portlet Order"
                          onChange={this.orderPosition}
                          value={position}
                        />
                        <span className="error-shows ">{errorposition}</span>
                      </div>
                      <div className="col-sm-3" />
                    </div> */}

                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2" />
                      <div className="col-sm-5">
                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={disableValue}
                          onClick={
                            button === "Update" ? this.update : this.addnew
                          }
                        >
                          {this.state.button}
                        </button>
                      </div>
                      <div className="col-sm-3" />
                    </div>
                    <span>
                      {Object.keys(this.state.tableData).length} records
                    </span>
                    {this.state.tableData && (
                      <Datatable
                        data={this.state.tableData}
                        columnHeading={this.columns_view}
                      />
                    )}
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

export default MapPortletToGroup;
