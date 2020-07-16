import React from "react";
import SingleSelect from "../Components/SingleSelect";
import CmsContent from "../../MiddleWare/CmsContent";
import MultiSelect from "../Components/MultiSelect";
import Datatable from "../Components/Datatable/Datatable";
import  FormMiddleWare  from "../Components/FormMiddleware";
//import "../CMS/style.css";
import LoginModal from "../Components/Modal/Modal";
import { ACCESS_POINT } from "../../config";
import { Alert } from "reactstrap";
import Switch from "react-switch";
import Progress from "../Components/Extra/Progress";
import http from "../../MiddleWare/httpMiddleWare";
import { confirmAlert } from "react-confirm-alert";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import QRCode from "qrcode.react";
import Theme7 from "./theme7";

//import { Document, PDFViewer, Page, Image, PDFDownloadLink } from '@react-pdf/renderer';

class AddPortlet extends FormMiddleWare {
  constructor(props) {
    super(props);
    this.state = {
      boxtype: [],
      boxsize: [
        { value: "full", label: "Full" },
        { value: "half", label: "Half" }
      ],
      notification: null,
      boxvalue: null,
      boxlabel: null,
      box: [],
      boxname: null,
      boxwidth: [],
      boxfilename: "Choose file",
      boxfile: [],
      selectedresource: [],
      boxtext: null,
      boxurljson: null,
      errorurljson: null,
      errorresource: null,
      data: [],
      dataTableData: [],
      boxNameList: [],
      customerId: JSON.parse(localStorage.getItem('Userdata')).customerId,
      dataTableReload: true,
      thumbnail: [],
      thumbnailname: null,
      disableGroup: false,
      errorthumbnail: null,
      traytext: null,
      button: "Submit",
      descriptionText: null,
      portletHeading: null,
      tray: false,
      alertVisible: false,
      alertVisible1: false,
      formAlertdelete: false,
      domainOptions: [],
      selecteddomain: [],
      Authorname: "",
      uploadPercentage: 0,
      calculatedateerror: "",
      endateerror: "",
      startdateerror: "",
      locationerror: "",
      binaryFileType: false,
      errorImage: false,
      overlayOption: [
        { label: "Quiz", value: "Quiz" },
        { label: "Survey", value: "Survey" },
        { label: "Ad Banner", value: "Ad Banner" },
        { label: "Load Url", value: "Load Url" }
      ],
      overlayColor: [
        {
          rgb: {
            r: "241",
            g: "112",
            b: "19",
            a: "1"
          },
          hex: `#f17013`
        }
      ],
      getQuizQuestion: [],
      appendOverlayList: [],
      appendOverlayData: [],
      displayColorPicker: [],
      timelineCheckSS: [],
      resourceAlert: false,
      attendance:false,
      quizName:"",
      optionJson: [],
      send_json: [],
      optionJsonArray:[],
      optionListArray: [],
      SectionData:[],
      catagory_values:[],
      catagory_values_select:'',
      userid:JSON.parse(localStorage.getItem('Userdata')).id,
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
      data_view:[],
      userData:JSON.parse(localStorage.getItem('Userdata')),
      SelectGradeoption:[],
      Selectoptionselected:''
    };
  }

  async componentWillMount() {
    try {
      this.setState({
        boxtypedisable: false,
        boxtype: [],
        notification: null,
        boxvalue: null,
        boxlabel: null,
        box: [],
        boxname: "",
        boxwidth: [],
        boxfilename: "Choose file",
        boxfile: [],
        selectedresource: [],
        boxtext: null,
        boxurljson: null,
        errorurljson: null,
        errorresource: null,
        data: [],
        dataTableData: [],
        boxNameList: [],
        customerId: JSON.parse(localStorage.getItem('Userdata')).customerId,
        dataTableReload: true,
        thumbnail: [],
        thumbnailname: null,
        disableGroup: false,
        errorthumbnail: null,
        button: "Submit",
        labelid: "",
        traytext: null,
        descriptionText: null,
        portletHeading: null,
        tray: false,
        link: "",
        eventType: [
          { value: "new", label: "Customised" },
          { value: "lob", label: "From LOB" }
        ],
        selectedEvents: [],
        locationOptions: [],
        selectedLocation: [],
        events: null,
        programOptions: [],
        batchOptions: [],
        batchSelect: [],
        lobs: [],
        batchName: null,
        toDateSelect: null,
        disablebutton: false,
        timelineCheck: [],
        timelineCheckMM: [],
        timelineCheckSS: [],
        attendance: false,
      SectionData:[]

      });


      console.log(JSON.parse(localStorage.getItem('Userdata')).customerId)


      const boxtype = await CmsContent.getMasterValues(
        "tbl_boxtype",
        "status",
        "asc"
      );

       
      let data_view = await CmsContent.getFreedom(
        " tbl_pages.*",
        " tbl_pages",
        `themeId=7 and  subTitleId=${this.state.userid} and  customerId=${this.state.customerId}`,
        "id",
        "id DESC"
      )

      console.log(data_view)

      let  catagory_values = await CmsContent.getFreedom(
        "name as label , id as value",
        "tbl_category_master",
        `customerid=${this.state.customerId}`,
        "id",
        "id DESC"
      );
      
     


    
      let SectionData = await CmsContent.getFreedom(
        "name as label , id as value",
        "tbl_section_master",
        `customerid=${this.state.customerId}`,
        "id",
        "id DESC"
      );
      if(SectionData)
      {
        boxtype.data.push({ label: "Content", value: "11" })
      }
     
      let  SelectGradeoption = await CmsContent.getFreedom('tbl_grade_master.Grade as label , tbl_grade_master.id as value','tbl_grade_master',`customerId =${this.state.customerId} and id= ${this.state.userData.grade}`,'id','id'); 
      console.log(SelectGradeoption.data)
       this.setState({ SectionData: SectionData.data,catagory_values:catagory_values.data,data_view:data_view.data, SelectGradeoption:SelectGradeoption.data });
      if (boxtype) {
        this.setState({ boxtype: boxtype.data });
      }
      const result = await CmsContent.getSelectvalue(
        "tbl_resources",
        "companyid",
        this.state.customerId
      );
  
      if (result) {
        this.setState({ resourceOptions: result.data });
      }
      const category = await CmsContent.getConditionedValuewithStatus(
        "tbl_domain",
        "companyid",
        this.state.customerId
      );
      if (category) {
        this.setState({ domainOptions: category.data });
      }

  

          
      let boxcontentvalue = await CmsContent.getFreedom(
        "tbl_boxcontent.*",
        "tbl_boxcontent",
        `customerId=${this.state.customerId} and teacher_id=${JSON.parse(localStorage.getItem('Userdata')).id}`,
        "id",
        "id DESC"
      );

 
     

      if (boxcontentvalue) {
        this.setState({ dataTableData: boxcontentvalue.data });
      }
      const boxNameList = await CmsContent.getSelectvalue(
        "tbl_portletname",
        "customerid",
        this.state.customerId
      );
      if (boxNameList) {
        this.setState({ boxNameList: boxNameList.data });
      }
      const locationList = await CmsContent.getConditionedValuewithStatus(
        "tbl_location",
        "customerId",
        this.state.customerId,
        "id",
        "name"
      );
      if (locationList) {
        this.setState({ locationOptions: locationList.data });
      }
      const programList = await CmsContent.getConditionedValuewithStatus(
        "tbl_program",
        "customerId",
        this.state.customerId,
        "id",
        "name"
      );
      if (programList) {
        this.setState({ programOptions: programList.data });
      }
      const quizList = await CmsContent.getTwoConditionedValue(
        "tbl_question",
        "type",
        "active",
        "customerid",
        this.state.customerId,
        "id as value ,quizName as label"
      );
      if (quizList) {
        this.setState({ quizOptions: quizList.data });
      }
      const formList = await CmsContent.getTwoConditionedValue(
        "tbl_form",
        "status",
        "active",
        "companyid",
        this.state.customerId,
        "id as value ,name as label"
      );
      if (formList) {
        this.setState({ formOptions: formList.data });
      }
    } catch (error) {
      console.log(error);
    }
    let SurveyList = await CmsContent.getTwoConditionedValue(
      "tbl_survey",
      "customerid",
      this.state.customerId,
      1,
      1,
      "id as value ,surveyname as label"
    );
    if (SurveyList) {
      this.setState({ SurveyList: SurveyList.data });
    }

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + "-" + month + "-" + day;
    this.setState({ newdate });
  }

  column = [
    {
      id: "type",
      name: "Portlet Type",
      selector: d => this.getValueFromArray(d.type, this.state.boxtype),
      Cell: d => this.getValueFromArray(d.original.type, this.state.boxtype)
    },
    {
      id: "name",
      Header: "Portlet Name",
      selector: d => this.getValueFromArray(d.name, this.state.boxNameList),
      Cell: d => this.getValueFromArray(d.original.name, this.state.boxNameList)
    },
    {
      name: "Add Content",
      selector: "addnew",
      cell: d => this.addnew(d)
    },
    {
      name: "Text",
      selector: "text",
      Cell: d => this.check1(d)
    },
    {
      name: "Images/Videos",
      selector: "media",
      Cell: d => this.viewMedia(d)
    },
    {
      name: "Thumbnail",
      selector: "thumbnail",
      Cell: d => this.viewThumbnail(d)
    },
    {
      name: "Link",
      selector: "url",
      Cell: d => this.viewLink(d)
    },
    {
      name: "Visibility",
      selector: "edit",
      Cell: d => this.showVisibility(d)
    },
    {
      name: "Delete",
      selector: "delete",
      cell: d =>
        this.dataTableButton("danger", "Delete", () => {
          this.buttonDeletes(d.original);
        })
    }
  ];
  columns = [
    {
      Header: "Portlet Name",
      accessor: "name",
      cell: d =>
        this.getValueFromArrays(d.original.name, this.state.boxNameList)
    },
    {
      Header: "Thumbnail",
      accessor: "thumbnail"
    },
    {
      Header: "Extension",
      accessor: "extension"
    }
  ];

  check1 = d => {
    console.log(d.original.attendance);
    if (d.original.type === 4) {
      var value = d.original.text;
      var result = "";
      if (value != "" && value != null && value != undefined) {
        let res = value.split(",");
        for (var i = 0; i < res.length; i++) {
          result +=
            this.getValueFromArray(res[i], this.state.resourceOptions) + ",";
        }
        result = result.replace(/,\s*$/, "");
        return result;
      }
      return result;
    } else if (d.original.type === 6 && d.original.attendance) {
      return <LoginModal
        buttonTitle="QR-code"
        title={`QR-code For ${d.original.programname}`}
        id={`code${d.original.id}`}
        extraClass="btn btn-primary"
        bodyText={
          <div className="row form-group">
            <div className="col-sm-2" />
            <div className="col-sm-5">
                <QRCode id={`qrcode${d.original.id}`} value={d.original.attendance} bgColor="#FFFFFF"	/>
            </div>
            {/* <div className="col-sm-2" >
                {this.state.qr ? (
                  <PDFDownloadLink
                    style={{ color: 'white' }}
                    document={<Document>
                      <Page>
                        <Image src={this.state.qr} />
                      </Page>
                    </Document>}
                    fileName="QR-code.pdf"
                  >
                    <button type="button" className="btn btn-primary" onClick={() => {
                      setTimeout(this.setState({ qr: '' }), 500);
                    }}>
                      Download Pdf
                  </button>
                  </PDFDownloadLink>
                ) : (
                    <a href="javascript:void(0)" onClick={() => this.downloadQR(`qrcode${d.original.id}`)}>Download QR</a>
                  )}
            </div> */}
          </div>
        }
        onClick={()=>this.downloadQR(`qrcode${d.original.id}`)}
        />;
    } else {
      return d.original.text;
    }
  };

  viewMedia = d => {
    let link = ACCESS_POINT + "/superAdmin/file?fileurl=" + d.original.media;
    return (
      <a target="_blank" href={link}>
        {d.original.media}
      </a>
    );
  };
  viewThumbnail = d => {
    let link =
      ACCESS_POINT + "/superAdmin/file?fileurl=" + d.original.thumbnail;
    return (
      <a target="_blank" href={link}>
        {d.original.thumbnail}
      </a>
    );
  };
  viewLink = d => {
    let link = ACCESS_POINT + "/superAdmin/file?fileurl=" + d.original.url;
    return (
      <a target="_blank" href={link}>
        {d.original.url}
      </a>
    );
  };
  wait = d => {
    return null;
  };

  getValueFromArrays = (d, array) => {
    if (array.length > 0) {
      if (array.length !== 0) {
        let filtered = array.filter(function(item) {
          return item.value == d;
        });
        let v = filtered[0];
        if (v != undefined) {
          return v.label;
        } else {
          return "-";
        }
      }
    } else {
      return "-";
    }
  };
  getValueid = (d, array) => {
    if (array.length > 0) {
      if (array.length !== 0) {
        let filtered = array.filter(function(item) {
          return item.value == d;
        });
        let v = filtered[0];
        if (v != undefined) {
          return v.value;
        } else {
          return "-";
        }
      }
    } else {
      return "-";
    }
  };
  // view = (value, modalWindowId) => {
  //   return (
  //     <center>
  //       <button type="button" data-toggle="modal" data-target={`#${modalWindowId}`} className="btn btn-warning" onClick={() => this.buttonView(value)}>
  //         <a href={'BoxTypes/table/' + value.original.customerId + '/' + value.original.type} target="_blank" onClick={() => this.buttonViewes(value.original)}>
  //           View
  //         </a>
  //       </button>
  //     </center>
  //   );
  // };

  buttonViewes = value => {};
  buttonView = value => {
    const { dataTableData } = this.state;
    let all = dataTableData
      .map((ival, i) => {
        if (ival.id == value.original.name) {
          let returnArray = {};
          returnArray.label = this.getValueFromArray(
            ival.id,
            this.state.boxtype
          );
          returnArray.value = ival.name;
          returnArray.getid = ival.id;
          return returnArray;
        }
      })
      .filter(function(element) {
        return element !== undefined;
      });
    this.setState({ buttonView: all });
  };

  showVisibility = id => {
    let status = id.original.status == "active" ? "Active" : "Inactive";
    let colour = id.original.status == "active" ? "warning" : "danger";
    return this.dataTableButton(colour, status, () =>
      this.updateVisibility(id)
    );
  };

  updateVisibility = async value => {
    let values = value.original;
    // let id = values.id;
    const index = value.index;
    const previousData = [...this.state.dataTableData];
    const newData = { ...previousData[index] };
    let subCategoryArray = {};
    if (newData.status === "active") {
      newData.status = "Inactive";
      subCategoryArray.status = "Inactive";
      this.setState({ button: "Hide" });
    } else {
      newData.status = "active";
      subCategoryArray.status = "active";
      this.setState({ button: "Show" });
    }
    const id = newData.id;

    const data = previousData.filter(value => value.id !== id);
    data.splice(index, 0, newData);
    this.setState({ data });
    // let datas = {};
    // datas.id = values.id;
    // datas.name = values.userName;
    // datas.email = values.email;
    // datas.mobileNumber = values.mobileNumber;
    // datas.status = newData.status;
    // datas.customerId = values.customerId;

    try {
      const result = await CmsContent.updateMaster(
        "tbl_boxcontent",
        newData.name,
        subCategoryArray,
        "name"
      );

      // const result = await CmsContent.updateCategorys(newData);
      if (result) {
        this.setState({ dataTableData: data, alertVisible1: true });
      }
      setTimeout(() => this.setState({ alertVisible: false }), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  addnew = (value, modalWindowId) => {
    return (
      <button
        type="button"
        data-toggle="modal"
        data-target={`#${modalWindowId}`}
        className="btn btn-warning"
        onClick={() => this.buttonAdd(value)}
      >
        Add New
      </button>
    );
  };

  buttonAdd =async value => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    console.log(value)
    let id = value.id;
    let portletids = this.getValueFromArrays(
      value.name,
      this.state.boxNameList
    );
    let box = {};
    box.value = value.type;
    box.label = this.getValueFromArrays(
      value.type,
      this.state.boxtype
    );

    let boxname = this.getValueFromArrays(
      value.name,
      this.state.boxNameList
    );
    let media = value.media;

    let extension = value.extension;

    let boxvalue = value.type;

   await this.setState({
      disableGroup: true,
      boxtypedisable: true,
      boxvalue,
      box,
      portletids,
      boxname,
      media,
      extension,
      id,
      editvalue: value,
      button: "Add",
      boxlabel:''
    });
  };

  buttonDeletes = value => {
    this.setState({});
    confirmAlert({
      title: "Confirmation to Delete",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.buttonDelete(value)
          //onClick: () => alert("Group removed from")
        },
        {
          label: "No"
        }
      ]
    });
  };

  buttonDelete = async value => {
    let id = value.id;
    let previousData = [...this.state.dataTableData];
    try {
      const result = await CmsContent.getSingleConditionedValue(
        "tbl_boxcontent",
        "id",
        id,
        "Delete"
      );
      if (result) {
        let data = previousData.filter(delelteid => delelteid.id !== value.id);
        this.setState({ dataTableData: data, formAlertdelete: true });
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => this.setState({ formAlertdelete: false }), 3000);
  };

  addtext = async () => {
    let {
      boxvalue,
      boxlabel,
      boxtext,
      portletids,
      boxname,
      boxwidth,
      boxfile,
      boxfilename,
      boxurljson,
      selectedresource,
      thumbnail,
      thumbnailname,
      traytext,
      descriptionText,
      portletHeading,
      link,
      newdate,
      programName,
      fromDateSelect,
      toDateSelect,
      locationSelect,
      batchSelect,
      batchName,
      quizSelect,
      formSelect,
      appendOverlayList,
      attendance,
      bannerImage,
      selectSurvey
    } = this.state;

    if (!portletHeading) {
      this.setState({ errorheading: "Please Enter Box Name" });
      return false;
    }
    // if (!thumbnailname) {
    //   this.setState({ errorheading: '', errorthumbnail: 'Please Select Thumbnail' });
    //   return false;
    // }
    if (thumbnailname != null) {
      let validationImage = ["jpeg", "jpg", "png", "gif"];
      var extension = thumbnailname.split(".").pop();
      let thumbnailExtension = extension.toLowerCase();

      // var test = validationImage.filter((obj)=>{
      //   return obj == thumbnailExtension;
      // })

      if (validationImage.indexOf(thumbnailExtension) == -1) {
        this.setState({ errorthumbnail: "Please Choose Valid Thumbnail File" });
        return false;
      }
    }
    // else{

    //   this.setState({ errorthumbnail : '' });
    // }

    this.setState({ errorheading: "" });

    let portletnametable = {};
    portletnametable.label = null;
    portletnametable.value = null;

    let boxcontenttable = {};
    boxcontenttable.name = null;
    boxcontenttable.text = null;
    boxcontenttable.media = null;
    boxcontenttable.extension = null;
    boxcontenttable.url = null;
    boxcontenttable.size = null;
    boxcontenttable.type = null;
    boxcontenttable.status = "active";
    boxcontenttable.customerId = this.state.customerId;

    descriptionText = descriptionText == null ? "  " : descriptionText;

    switch (boxvalue) {
      case 1:
        {
          if (!boxfile.name) {
            this.setState({
              errorfile: "Please Select boxfile",
              errorname: ""
            });
            return false;
          } else if (!boxtext) {
            this.setState({ errortext: "Please enter content", errorfile: "" });
            return false;
          }
          this.setState({ errortext: "" });

          let validationImage = ["jpeg", "jpg", "png", "gif"];

          var extension = boxfile.name.split(".").pop();
          // let ext1 = extension[1];
          let ImageExtension = extension.toLowerCase();
          // var test = validationImage.filter((obj)=>{
          //   return obj == ImageExtension;
          // })
          if (validationImage.indexOf(ImageExtension) == -1) {
            this.setState({ errorfile: "Please Choose Valid Image File" });
            return false;
          } else {
            this.setState({ errorfile: "" });
          }

          let filename = boxfilename.split(".");
          const formDatas = new FormData();
          formDatas.append("name", portletids);
          formDatas.append("text", boxtext);
          formDatas.append("media", boxfile);
          formDatas.append("extension", filename[1]);
          formDatas.append("type", boxvalue);
          formDatas.append("status", "active");
          formDatas.append("customerId", this.state.customerId);
          formDatas.append("thumbnail", thumbnail);
          formDatas.append("notificationtext", traytext);
          formDatas.append("heading", portletHeading);
          formDatas.append("createdAt", newdate);
          formDatas.append("description", descriptionText);
          let value = boxvalue;

          try {
            const result = await CmsContent.authorinsert(
              formDatas,
              "tbl_boxcontent"
            );
            if (result) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              this.setState({ alertVisible: true });
              setTimeout(() => this.setState({ alertVisible: false }), 3000);
              this.componentWillMount();
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 2:
        {
          if (!boxfile.name) {
            this.setState({
              errorfile: "Please Select boxfile",
              errorname: ""
            });
            return false;
          }
          this.setState({ errorfile: "" });

          // let validationVideo = [
          //   "ogg",
          //   "ogv",
          //   "mpg",
          //   "mpeg",
          //   "mp4",
          //   "mp3",
          //   "dat",
          //   "avi"
          // ];
          // var extension = boxfile.name.split(".").pop();
          //let ext1 = extension[1];
          // let VideoExtension = extension.toLowerCase();
          // var test = validationVideo.filter((obj)=>{
          //   return obj == ImageExtension;
          // })

          let filename = boxfilename.split(".");

          const formDatas = new FormData();
          formDatas.append("name", portletids);
          formDatas.append("media", boxfile);
          formDatas.append("extension", filename[1]);
          formDatas.append("type", boxvalue);
          if (bannerImage) {
            formDatas.append("status", bannerImage);
          } else {
            formDatas.append("status", "active");
          }
          formDatas.append("customerId", this.state.customerId);
          formDatas.append("thumbnail", thumbnail);
          formDatas.append("notificationtext", traytext);
          formDatas.append("description", descriptionText);
          formDatas.append("heading", portletHeading);
          formDatas.append("createdAt", newdate);
          formDatas.append("overlay", JSON.stringify(appendOverlayList));

          try {
            // const result = await CmsContent.authorinsert(
            //   formDatas,
            //   "tbl_boxcontent"
            // );
            const authorinsert = await http.post(
              ACCESS_POINT + `/cmsContent/addauthor/tbl_boxcontent`,
              formDatas,
              {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                  this.setState({
                    uploadPercentage: parseInt(
                      Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                      )
                    )
                  });
                  setTimeout(
                    () => this.setState({ uploadPercentage: 0 }),
                    10000
                  );
                }
              }
            );
            if (authorinsert) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              this.setState({ alertVisible: true });
              setTimeout(() => this.setState({ alertVisible: false }), 3000);
              // alert('Video Display Successfully Added');
              this.componentWillMount();
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 3:
        {
          if (!boxfile.name) {
            this.setState({
              errorfile: "Please Select boxfile",
              errorname: ""
            });
            return false;
          }

          let validationImage = ["jpeg", "jpg", "png", "gif"];
          var extension = boxfile.name.split(".").pop();
          // let ext1 = extension[1];
          let ImageExtension = extension.toLowerCase();
          // var test = validationImage.filter((obj)=>{
          //   return obj == ImageExtension;
          // })
          if (validationImage.indexOf(ImageExtension) == -1) {
            this.setState({ errorfile: "Please Choose Valid Image File" });
            return false;
          } else {
            this.setState({ errorfile: "" });
          }

          // else if (!boxtext) {
          //   this.setState({ errortext: 'Please enter content', errorfile: '' });
          //   return false;
          // }
          this.setState({ errortext: "" });
          let filename = boxfilename.split(".");

          const formDatas = new FormData();
          formDatas.append("name", portletids);
          formDatas.append("url", link);
          formDatas.append("media", boxfile);
          formDatas.append("extension", filename[1]);
          formDatas.append("type", boxvalue);
          formDatas.append("status", "active");
          formDatas.append("customerId", this.state.customerId);
          formDatas.append("thumbnail", thumbnail);
          formDatas.append("notificationtext", traytext);
          formDatas.append("heading", portletHeading);
          formDatas.append("createdAt", newdate);
          formDatas.append("description", descriptionText);

          try {
            const result = await CmsContent.authorinsert(
              formDatas,
              "tbl_boxcontent"
            );
            if (result) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              this.setState({ alertVisible: true });
              setTimeout(() => this.setState({ alertVisible: false }), 3000);
              // alert('Links/Image Successfully Added');
              this.componentWillMount();
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 4:
        {
          // const {} = this.state;
          let selectedValue = "";
          const value = selectedresource.map(
            values => (selectedValue += `${values.value},`)
          );
          selectedValue = selectedValue.replace(/,\s*$/, "");

          try {
            const formDatas = new FormData();
            formDatas.append("name", portletids);
            formDatas.append(
              "text",
              this.getMultiSelectValue(selectedresource, "1")
            );
            formDatas.append("type", boxvalue);
            formDatas.append("status", "active");
            formDatas.append("customerId", this.state.customerId);
            formDatas.append("thumbnail", thumbnail);
            formDatas.append("notificationtext", traytext);
            formDatas.append("heading", portletHeading);
            formDatas.append("description", descriptionText);
            formDatas.append("createdAt", newdate);

            const result = await CmsContent.mappingportlet(
              formDatas,
              "tbl_boxcontent"
            );
            if (result) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              this.setState({ alertVisible: true });
              setTimeout(() => this.setState({ alertVisible: false }), 3000);
              //  alert(' Successfully Added');
              this.componentWillMount();
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 5:
        {
          if (!boxtext) {
            this.setState({
              errortext: "Please Enter Notification",
              errorname: ""
            });
            return false;
          }
          const formData = new FormData();
          formData.append("name", portletids);
          formData.append("type", boxvalue);
          formData.append("text", boxtext);
          formData.append("status", "active");
          formData.append("customerId", this.state.customerId);
          formData.append("thumbnail", thumbnail);
          formData.append("notificationtext", traytext);
          formData.append("heading", portletHeading);
          formData.append("createdAt", newdate);
          formData.append("description", descriptionText);

          try {
            const result = await CmsContent.mappingportlet(
              formData,
              "tbl_boxcontent"
            );
            if (result) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              this.setState({ alertVisible: true });
              setTimeout(() => this.setState({ alertVisible: false }), 3000);
              //  alert('Notification Successfully Added');
              this.componentWillMount();
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;

      case 6:
        {
          if (!boxname) {
            this.setState({
              errortext: "Please Enter Notification",
              errorname: ""
            });
            return false;
          }
          const formData1 = new FormData();
          formData1.append("name", boxname);
          formData1.append("type", boxvalue);
          formData1.append("status", "active");
          formData1.append("customerId", this.state.customerId);
          formData1.append("thumbnail", thumbnail);
          formData1.append("attendance", attendance ? 1 : 0 );
          formData1.append("notificationtext", traytext);
          formData1.append("heading", portletHeading);
          formData1.append("description", descriptionText);
          formData1.append("createdAt", newdate);
          formData1.append("programname", programName);
          formData1.append("fromdate", fromDateSelect);
          formData1.append("todate", toDateSelect);
          formData1.append("batchname", batchName);
          formData1.append("location", locationSelect.label);
          try {
            const result = await CmsContent.mappingportlet(
              formData1,
              "tbl_boxcontent"
            );
            if (result) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              this.setState({ alertVisible: true });
              setTimeout(() => this.setState({ alertVisible: false }), 3000);
              this.componentWillMount();
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;

      case 7:
        {
          if (!boxurljson) {
            this.setState({ errorurljson: "Please Enter URL", errorname: "" });
            return false;
          } else if (!boxtext) {
            this.setState({ errortext: "Please Enter JSon", errorurljson: "" });
            return false;
          }
          let mappingArray = {};
          mappingArray.name = boxname;
          mappingArray.type = boxvalue;
          mappingArray.url = boxurljson;
          mappingArray.text = boxtext;
          mappingArray.size = boxwidth.value;
          mappingArray.status = "active";
          mappingArray.customerId = this.state.customerId;
          try {
            const result = await CmsContent.addMaster(
              "tbl_boxcontent",
              mappingArray
            );
            if (result) {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
              this.setState({ alertVisible: true });
              setTimeout(() => this.setState({ alertVisible: false }), 3000);
              this.componentWillMount();
            }
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 8:
        {
          const formData = new FormData();
          formData.append("name", portletids);
          formData.append("type", boxvalue);
          formData.append("thumbnail", thumbnail);
          formData.append("notificationtext", traytext);
          formData.append("heading", portletHeading);
          formData.append("description", descriptionText);
          formData.append("evaluation", quizSelect.value);
          formData.append("customerId", this.state.customerId);
          formData.append("status", "active");
          formData.append("createdAt", newdate);
          this.submittingCommon(formData, "tbl_boxcontent");
        }
        break;
      case 9:
        {
          try {
            const formData = new FormData();
            formData.append("name", portletids);
            formData.append("type", boxvalue);
            formData.append("thumbnail", thumbnail);
            formData.append("notificationtext", traytext);
            formData.append("heading", portletHeading);
            formData.append("description", descriptionText);
            formData.append("form", formSelect.value);
            formData.append("customerId", this.state.customerId);
            formData.append("status", "active");
            formData.append("createdAt", newdate);
            // this.submittingSameContent(formData, 'tbl_boxcontent');

            this.submittingCommon(formData, "tbl_boxcontent");
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 10:
        {
          const formData = new FormData();
          formData.append("name", boxname);
          formData.append("type", boxvalue);
          formData.append("thumbnail", thumbnail);
          formData.append("heading", portletHeading);
          formData.append("description", descriptionText);
          formData.append("survey", selectSurvey.value);
          formData.append("notificationtext", traytext);
          formData.append("customerId", this.state.customerId);
          formData.append("status", "active");
          formData.append("createdAt", newdate);
          this.submittingCommon(formData, "tbl_boxcontent");
        }
        break;
      default:
        console.log("Out Of Range");
    }
  };

  handleBox = e => {
    console.log( e )
    this.setState({ boxvalue: e.value, box: e });

    if(e.label=='Content')
    {
     this.setState({ boxlabel: e.label})
    }
    else{
      this.setState({ boxlabel:''})
    }
  };

  sectionnameselected = e => {
    this.setState({ secionvalue: e.value, secionvalueselect: e });
  };
  portletname = e => {
    this.setState({ boxname: e.target.value });
  };
  boxwidth = e => {
    this.setState({ boxwidth: e });
  };
  image = e => {
    var filesData = e.target.files[0];
    var filesDataLength = filesData.size;
    var filesDataName = filesData.name;

    var that = this;
    var binaryFileType = false;
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onloadend = function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(evt.target.result);
        let bytes = [];
        uint.forEach(byte => {
          bytes.push(byte.toString(16));
        });
        const hex = bytes.join("").toUpperCase();
        //alert(hex);
        if (that.getMimetype(hex) != "Unknown filetype") {
          binaryFileType = true;
          that.setState({ errorImage: true });
        }
      }

      if (!binaryFileType) {
        that.setState({ errorImage: false });
        that.setState({
          boxfilename: "",
          errorfile: "Please Select a Valid Image",
          errorfile1: "Please Select a Valid video",
          boxfileSize: 0
        });
        // return false;
        return false;
      } else {
        that.setState({
          appLogosize: filesData.size,
          errorfile: "",
          errorfile1: ""
        });

        that.setState({
          // appLogosize: e.target.files[0].size,
          boxfile: filesData,
          boxfilename: filesDataName,
          boxfileSize: filesDataLength,
          errorfile: "",
          binaryFileType: false
          //logosize: e.target.files[0].size,
          // beforeviewapplogo: ""
        });
        // if (!filesDataLength.length) return;
        // that.createImage(filesDataLength[0]);
      }
    };
    const blob = file.slice(0, 4);
    filereader.readAsArrayBuffer(blob);
  };
  thumbnail = e => {
    // this.setState({
    //   thumbnailSize: e.target.files[0].size,
    //   thumbnail: e.target.files[0],
    //   thumbnailname: e.target.files[0].name
    // });

    var filesData = e.target.files[0];
    var filesDataLength = filesData.size;
    var filesDataName = filesData.name;

    var that = this;
    var binaryFileType = false;
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onloadend = function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(evt.target.result);
        let bytes = [];
        uint.forEach(byte => {
          bytes.push(byte.toString(16));
        });
        const hex = bytes.join("").toUpperCase();
        //alert(hex);
        if (that.getMimetype(hex) != "Unknown filetype") {
          binaryFileType = true;
        }
      }

      if (!binaryFileType) {
        that.setState({
          filesDataName: "",
          errorthumbnail: "Please Select a Valid Image",
          thumbnailSize: 0
        });
        // return false;
        return false;
      } else {
        that.setState({ appLogosize: filesData.size, errorthumbnail: "" });

        that.setState({
          // appLogosize: e.target.files[0].size,
          thumbnail: filesData,
          thumbnailname: filesDataName,
          thumbnailSize: filesDataLength,
          errorlogo: "",
          binaryFileType: false
          //logosize: e.target.files[0].size,
          // beforeviewapplogo: ""
        });
        // if (!filesDataLength.length) return;
        // that.createImage(filesDataLength[0]);
      }
    };
    const blob = file.slice(0, 4);
    filereader.readAsArrayBuffer(blob);
  };
  boxtext = e => {
    this.setState({ boxtext: e.target.value });
  };

  link = e => {
    this.setState({ link: e.target.value });
  };
  resourceSelect = async e => {
    if (e) {
      this.setState({ selectedresource: e });
    }
  };
  jsonUrl = e => {
    this.setState({ boxurljson: e.target.value });
  };
  eventsChange = e => {
    this.setState({ events: e.value, selectedEvents: e });
  };
  programName = e => {
    this.setState({ programName: e.target.value });
  };
  fromDateSelect = e => {
    this.setState({ fromDateSelect: e.target.value });
    let today = new Date();
    var dateformat = today.getDate();
    if (today.getDate() < 10) {
      dateformat = "0" + today.getDate();
    }
    var monthformate = today.getMonth() + 1;
    if (monthformate < 10) {
      monthformate = "0" + (today.getMonth() + 1);
    }
    let todaydate = today.getFullYear() + "-" + monthformate + "-" + dateformat;

    if (todaydate > e.target.value) {
      this.setState({ startdateerror: "Please check start date" });
    } else {
      this.setState({ startdateerror: "" });
    }
  };
  toDateSelect = e => {
    this.setState({ toDateSelect: e.target.value });
    if (this.state.selectedstartdate > e.target.value) {
      this.setState({ endateerror: "Please check end date" });
      return false;
    } else {
      this.setState({ endateerror: "" });
    }

    let firstdate = new Date(this.state.fromDateSelect);
    let secondate = new Date(e.target.value);
    let diffTime = Math.abs(secondate - firstdate);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let today = new Date();

    var dateformat = today.getDate();
    if (today.getDate() < 10) {
      dateformat = "0" + today.getDate();
    }
    var monthformate = today.getMonth() + 1;
    if (monthformate < 10) {
      monthformate = "0" + (today.getMonth() + 1);
    }

    let todaydate = today.getFullYear() + "-" + monthformate + "-" + dateformat;

    if (todaydate > this.state.toDateSelect) {
      this.setState({ calculatedateerror: "Please check start date" });
    }

    if (diffDays >= 7) {
      this.setState({
        calculatedateerror:
          "Please choose the date between 7 days from the start date"
      });
    } else {
      this.setState({ calculatedateerror: "" });
    }
    if (todaydate > e.target.value) {
      this.setState({ endateerror: "Please Change End Date " });
      return false;
    } else {
      this.setState({ endateerror: "" });
    }
  };
  locationSelect = e => {
    this.setState({ locationSelect: e });
  };
  selectedprogram = async e => {
    this.setState({ selectedprogram: e });
    let val = e.value;
    try {
      let getBatch = await CmsContent.getConditionedValuewithStatus(
        "tbl_batch",
        "programid",
        val
      );
      if (getBatch) {
        this.setState({ batchOptions: getBatch.data, programName: e.label });
      }
    } catch (error) {
      console.log(error);
    }
  };
  batchSelect = async e => {
    this.setState({ batchSelect: e });
    let val = e.value;
    try {
      let getBatch = await CmsContent.getConditionedValuewithStatus(
        "tbl_learningobject",
        "batchid",
        val,
        "id",
        "programId"
      );
      if (getBatch) {
        let data = getBatch.data;
        let listingDate = [];
        let listingDates = await data.map(async (ival, i) => {
          let value = {};
          value.label = ival.fromdate + " to " + ival.enddate;
          value.value = ival.id;
          value.location = ival.location;
          await listingDate.push(value);
        });
        this.setState({ lobs: listingDate, batchName: e.label });
      }
    } catch (error) {
      console.log(error);
    }
  };
  lobSelect = async e => {
    let label = e.label;
    let arr = label.split(" to ");
    let getLocation = await CmsContent.getConditionedValuewithStatus(
      "tbl_location",
      "id",
      e.location
    );
    this.setState({
      lobSelect: e,
      fromDateSelect: arr[0],
      toDateSelect: arr[1],
      locationSelect: getLocation.data[0]
    });
  };
  async componentDidMount() {
    let today = new Date();
    var dateformat = today.getDate();

    if (today.getDate() < 10) {
      dateformat = "0" + today.getDate();
    }
    var monthformate = today.getMonth() + 1;
    if (monthformate < 10) {
      monthformate = "0" + (today.getMonth() + 1);
    }
    let date = today.getFullYear() + "-" + monthformate + "-" + dateformat;

    await this.setState({ fromDateSelect: date });
  }

  onSubmit = async () => {
    let {
      boxvalue,
      portletids,
      boxtext,
      boxname,
      boxwidth,
      boxfile,
      boxfilename,
      boxurljson,
      selectedresource,
      thumbnail,
      thumbnailname,
      button,
      traytext,
      descriptionText,
      portletHeading,
      link,
      alertVisible,
      alertVisible1,
      formAlertdelete,
      locationOptions,
      newdate,
      programName,
      fromDateSelect,
      toDateSelect,
      locationSelect,
      batchSelect,
      batchName,
      selecteddomain,
      quizSelect,
      formSelect,
      appendOverlayList,
      attendance,
      bannerImage,
      selectSurvey
    } = this.state;
    if (!boxname) {
      this.setState({ errorname: "Please Enter Box Name" });
      return false;
    } else if (!portletHeading) {
      this.setState({
        errorheading: "Please Enter Portlet Heading",
        errorname: ""
      });
      return false;
    }
    // if (!thumbnailname) {
    //   this.setState({ errorname: '', errorthumbnail: 'Please Select Thumbnail' });
    //   return false;
    // }
    if (thumbnailname != null) {
      let validationImage = ["jpeg", "jpg", "png", "gif"];
      var extension = thumbnailname.split(".").pop();
      let thumbnailExtension = extension.toLowerCase();
      // var test = validationImage.filter((obj)=>{
      //   return obj == thumbnailExtension;
      // })

      if (validationImage.indexOf(thumbnailExtension) == -1) {
        this.setState({ errorthumbnail: "Please Choose Valid Thumbnail File" });
        return false;
      }
    }

    this.setState({ errorheading: "" });

    // let resultCheck = await CmsContent.getSingleConditionedValue('tbl_portletname', 'name', boxname);

    // if (resultCheck && resultCheck.data.length > 0) {
    //   this.setState({ errorname: 'Name Already In Use' });
    //   return false;
    // }

    let portletnametable = {};
    portletnametable.label = null;
    let boxcontenttable = {};
    boxcontenttable.name = null;
    boxcontenttable.text = null;
    boxcontenttable.media = null;
    boxcontenttable.extension = null;
    boxcontenttable.url = null;
    boxcontenttable.size = null;
    boxcontenttable.type = null;
    boxcontenttable.status = "active";
    boxcontenttable.customerId = this.state.customerId;

    descriptionText = descriptionText == null ? "  " : descriptionText;

    switch (boxvalue) {
      case 1:
        {
          // alert(this.state.thumbnailSize + " <- thumbnailSize " + " boxfileSize -> " + this.state.boxfileSize)
          if (!thumbnail.name) {
            this.setState({
              errorthumbnail: "Please Select a thumbnail",
              errorname: ""
            });
            return false;
          } else {
            if (this.state.thumbnailSize > 250000) {
              this.setState({
                errorthumbnail: "Please Select a file size below 250kb",
                errorname: ""
              });
              return false;
            }
          }

          if (!boxfile.name) {
            this.setState({
              errorfile: "Please Select a image",
              errorname: ""
            });
            return false;
          } else {
            if (this.state.boxfileSize > 250000) {
              this.setState({
                errorfile: "",
                errorfile: "Please Select a file size below 250kb"
              });
              return false;
            }
          }

          if (!boxtext) {
            this.setState({ errortext: "Please enter content", errorfile: "" });
            return false;
          }

          let validationImage = ["jpeg", "jpg", "png", "gif"];
          var extension = boxfile.name.split(".").pop();
          // var fileSize = boxfile.size;
          // alert(boxfile)

          // let ext1 = extension[1];
          let ImageExtension = extension.toLowerCase();
          // var test = validationImage.filter((obj)=>{
          //   return obj == ImageExtension;
          // })
          if (validationImage.indexOf(ImageExtension) == -1) {
            this.setState({ errorfile: "Please Choose Valid Image File" });
            return false;
          } else {
            this.setState({ errorfile: "" });
          }

          this.setState({ errortext: "" });
          let filename = boxfilename.split(".");
          const formDatas = new FormData();
          formDatas.append("name", boxname);
          formDatas.append("text", boxtext);
          formDatas.append("media", boxfile);
          formDatas.append("extension", filename[1]);
          formDatas.append("type", boxvalue);
          formDatas.append("status", "active");
          formDatas.append("customerId", this.state.customerId);
          formDatas.append("thumbnail", thumbnail);
          formDatas.append("notificationtext", traytext);
          formDatas.append("heading", portletHeading);
          formDatas.append("description", descriptionText);
          formDatas.append("createdAt", newdate);
          formDatas.append("section_value", this.state.secionvalue);
          formDatas.append("catagory_id", this.state.catagory_values_select.value);
          formDatas.append("teacher_id", this.state.userid);
          formDatas.append("grade", this.state.Selectoptionselected.value);

          try {
            const result = await CmsContent.authorinsert(
              formDatas,
              "tbl_boxcontent"
            );
            if (result) {
              this.componentWillMount();

              this.setState({ alertVisible: true });
            }
            setTimeout(() => this.setState({ alertVisible: false }), 3000);
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 2:
        {
          if (!thumbnail.name) {
            this.setState({
              errorthumbnail: "Please Select a thumbnail",
              errorname: ""
            });
            return false;
          } else {
            if (this.state.thumbnailSize > 250000) {
              this.setState({
                errorthumbnail: "",
                errorthumbnail: "Please Select a file size below 250kb"
              });
              return false;
            }
          }
          if (!boxfile.name) {
            this.setState({
              errorfile1: "Please Select a video",
              errorname: ""
            });
            return false;
          } else {
            if (!this.state.errorImage) {
              this.setState({
                errorfile1: "Please Select a Valid Video ",
                errorname: ""
              });
              return false;
            }
            if (this.state.boxfileSize > 1.5e8) {
              this.setState({
                errorfile1: "Please Select a file size below 150mb",
                errorname: ""
              });
              return false;
            }
          }
          this.setState({ errorfile: "" });

          // let validationVideo = [
          //   "ogg",
          //   "ogv",
          //   "mpg",
          //   "mpeg",
          //   "mp4",
          //   "mp3",
          //   "dat",
          //   "avi"
          // ];
          // var extension = boxfile.name.split(".").pop();
          // //let ext1 = extension[1];
          // let VideoExtension = extension.toLowerCase();
          // // var test = validationVideo.filter((obj)=>{
          // //   return obj == ImageExtension;
          // // })

          let filename = boxfilename.split(".");

          const formDatas = new FormData();
          formDatas.append("name", boxname);
          formDatas.append("media", boxfile);
          formDatas.append("text", boxtext);
          formDatas.append("extension", filename[1]);
          formDatas.append("type", boxvalue);
          if (bannerImage) {
            formDatas.append("status", bannerImage);
          } else {
            formDatas.append("status", "active");
          }
          formDatas.append("customerId", this.state.customerId);
          formDatas.append("thumbnail", thumbnail);
          formDatas.append("notificationtext", traytext);
          formDatas.append("description", descriptionText);
          formDatas.append("heading", portletHeading);
          formDatas.append("createdAt", newdate);
          formDatas.append("overlay", JSON.stringify(appendOverlayList));
          formDatas.append("section_value", this.state.secionvalue);
          formDatas.append("catagory_id", this.state.catagory_values_select.value);
          formDatas.append("teacher_id", this.state.userid);
          formDatas.append("grade", this.state.Selectoptionselected.value);
          try {
            const authorinsert = await http.post(
              ACCESS_POINT + `/cmsContent/addauthor/tbl_boxcontent`,
              formDatas,
              {
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                  this.setState({
                    uploadPercentage: parseInt(
                      Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                      )
                    )
                  });
                  setTimeout(
                    () => this.setState({ uploadPercentage: 0 }),
                    10000
                  );
                }
              }
            );

            if (authorinsert) {
              this.componentWillMount();
              this.setState({ alertVisible: true, errorImage: false });
            }
            setTimeout(() => this.setState({ alertVisible: false }), 3000);
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 3:
        {
          if (!thumbnail.name) {
            this.setState({
              errorthumbnail: "Please Select a thumbnail",
              errorname: ""
            });
            return false;
          } else {
            if (this.state.thumbnailSize > 250000) {
              this.setState({
                errorthumbnail: "Please Select a file size below 250kb",
                errorname: ""
              });
              return false;
            }
          }

          if (!boxfile.name) {
            this.setState({
              errorfile: "Please Select a boxfile",
              errorname: ""
            });
            return false;
          } else {
            if (this.state.boxfileSize > 250000) {
              this.setState({
                errorfile: "Please Select a file size below 250kb",
                errorname: ""
              });
              return false;
            }
          }

          if (!this.is_url(link)) {
            this.setState({ errortext: "Please enter a valid Link" });
            return false;
          }

          let validationImage = ["jpeg", "jpg", "png", "gif"];
          var extension = boxfile.name.split(".").pop();
          // let ext1 = extension[1];
          let ImageExtension = extension.toLowerCase();
          // var test = validationImage.filter((obj)=>{
          //   return obj == ImageExtension;
          // })
          if (validationImage.indexOf(ImageExtension) == -1) {
            this.setState({ errorfile: "Please Choose Valid Image File" });
            return false;
          } else {
            this.setState({ errorfile: "" });
          }

          // else if (!boxtext) {
          //   this.setState({ errortext: 'Please enter content', errorfile: '' });
          //   return false;
          // }
          this.setState({ errortext: "" });
          let filename = boxfilename.split(".");

          const formDatas = new FormData();
          formDatas.append("name", boxname);
          formDatas.append("url", link);
          formDatas.append("text", boxtext);
          formDatas.append("media", boxfile);
          formDatas.append("extension", filename[1]);
          formDatas.append("type", boxvalue);
          formDatas.append("status", "active");
          formDatas.append("customerId", this.state.customerId);
          formDatas.append("thumbnail", thumbnail);
          formDatas.append("notificationtext", traytext);
          formDatas.append("heading", portletHeading);
          formDatas.append("description", descriptionText);
          formDatas.append("createdAt", newdate);
          formDatas.append("section_value", this.state.secionvalue);
          formDatas.append("catagory_id", this.state.catagory_values_select.value);
          formDatas.append("teacher_id", this.state.userid);
          formDatas.append("grade", this.state.Selectoptionselected.value);

          try {
            const result = await CmsContent.authorinsert(
              formDatas,
              "tbl_boxcontent"
            );
            if (result) {
              this.setState({ alertVisible: true });
              this.componentWillMount();
            }
            setTimeout(() => this.setState({ alertVisible: false }), 3000);
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 4:
        {
          // const {} = this.state;
          let selectedValue = "";
          const value = selectedresource.map(
            values => (selectedValue += `${values.value},`)
          );
          selectedValue = selectedValue.replace(/,\s*$/, "");
          // if (selecteddomain == null || selecteddomain == '' || selecteddomain == undefined) {
          //   this.setState({ error5: 'Please Select Domain', error4: '' });
          //   return false;
          // }
          try {
            const formDatas = new FormData();
            formDatas.append("name", boxname);
            formDatas.append(
              "text",
              this.getMultiSelectValue(selectedresource, "1")
            );
            formDatas.append("type", boxvalue);
            formDatas.append("status", "active");
            formDatas.append("customerId", this.state.customerId);
            formDatas.append("thumbnail", thumbnail);
            formDatas.append("notificationtext", traytext);
            formDatas.append("heading", portletHeading);
            formDatas.append("description", descriptionText);
            formDatas.append("createdAt", newdate);
            formDatas.append("section_value", this.state.secionvalue);
            formDatas.append("catagory_id", this.state.catagory_values_select.value);
            formDatas.append("teacher_id", this.state.userid);
            formDatas.append("grade", this.state.Selectoptionselected.value);
            // formDatas.append('domainid', this.getMultiSelectValue(selecteddomain, '1'));

            const result = await CmsContent.mappingportlet(
              formDatas,
              "tbl_boxcontent"
            );
            if (result) {
              this.setState({ alertVisible: true });
              this.componentWillMount();
            }
            setTimeout(() => this.setState({ alertVisible: false }), 3000);
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 5:
        {
          if (!boxtext) {
            this.setState({
              errortext: "Please Enter Notification",
              errorname: ""
            });
            return false;
          }
          const formData = new FormData();
          formData.append("name", boxname);
          formData.append("type", boxvalue);
          formData.append("text", boxtext);
          formData.append("status", "active");
          formData.append("customerId", this.state.customerId);
          formData.append("thumbnail", thumbnail);
          formData.append("notificationtext", traytext);
          formData.append("heading", portletHeading);
          formData.append("description", descriptionText);
          formData.append("createdAt", newdate);
          formData.append("section_value", this.state.secionvalue);
          formData.append("catagory_id", this.state.catagory_values_select.value);
          formData.append("teacher_id", this.state.userid);
          formData.append("grade", this.state.Selectoptionselected.value);

          try {
            const result = await CmsContent.mappingportlet(
              formData,
              "tbl_boxcontent"
            );
            if (result) {
              this.setState({ alertVisible: true });
              this.componentWillMount();
            }
            setTimeout(() => this.setState({ alertVisible: false }), 3000);
          } catch (error) {
            console.log(error);
          }
        }
        break;

      case 6:
        {

          if (!boxname) {
            this.setState({
              errortext: "Please Enter Notification",
              errorname: ""
            });
            return false;
          }
        if(this.state.events==='new'){
          if (this.state.toDateSelect <= this.state.fromDateSelect) {
            await this.setState({ endateerror: "Please Check End Date " });
            return false;
          } else {
            await this.setState({ endateerror: "" });
          }

          if (this.state.locationSelect == undefined) {
            await this.setState({ locationerror: " Please  select Location" });
            return false;
          } else {
            await this.setState({ locationerror: "" });
          }

          if (this.state.toDateSelect == undefined) {
            await this.setState({ endateerror: " Please Select Enddate" });
            return false;
          } else {
            await this.setState({ endateerror: "" });
          }

          let firstdate = new Date(this.state.fromDateSelect);
          let secondate = new Date(this.state.toDateSelect);
          let diffTime = Math.abs(secondate - firstdate);
          let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          let today = new Date();
          var dateformat = today.getDate();
          if (today.getDate() < 10) {
            dateformat = "0" + today.getDate();
          }
          var monthformate = today.getMonth() + 1;
          if (monthformate < 10) {
            monthformate = "0" + (today.getMonth() + 1);
          }
          let todaydate =
            today.getFullYear() + "-" + monthformate + "-" + dateformat;

          if (todaydate > this.state.fromDateSelect) {
            console.log("case5")
            await this.setState({ startdateerror: "Please change start date" });
            return false;
          }
          if (diffDays >= 7) {
            console.log("case6")
            await this.setState({
              calculatedateerror:
                "Please choose the date between 7 days from the start date"
            });
            return false;
          } else {
            await this.setState({ calculatedateerror: "" });
          }
          if (this.state.fromDateSelect > this.state.toDateSelect) {
            console.log("case7")
            await this.setState({ endateerror: "Please Change End Date " });
            return false;
          } else {
            await this.setState({ endateerror: "" });
          }
        }
          const formData1 = new FormData();
          formData1.append("name", boxname);
          formData1.append("type", boxvalue);
          formData1.append("status", "active");
          formData1.append("customerId", this.state.customerId);
          formData1.append("thumbnail", thumbnail);
          formData1.append("attendance", attendance ? 1 : 0);
          formData1.append("notificationtext", traytext);
          formData1.append("heading", portletHeading);
          formData1.append("description", descriptionText);
          formData1.append("createdAt", newdate);
          formData1.append("programname", programName);
          formData1.append("fromdate", fromDateSelect);
          formData1.append("todate", toDateSelect);
          formData1.append("batchname", batchName);
          formData1.append("location", locationSelect.label);
          formData1.append("section_value", this.state.secionvalue);
          formData1.append("catagory_id", this.state.catagory_values_select.value);
          formData1.append("teacher_id", this.state.userid);
          formData1.append("grade", this.state.Selectoptionselected.value);
          try {
            const result = await CmsContent.mappingportlet(
              formData1,
              "tbl_boxcontent"
            );
            if (result) {
              this.setState({ alertVisible: true });
              this.componentWillMount();
            }
            setTimeout(() => {
              this.onDismiss();
            }, 3000);
          } catch (error) {
            console.log(error);
          }
        }
        break;

      case 7:
        {
          if (!boxurljson) {
            this.setState({ errorurljson: "Please Enter URL", errorname: "" });
            return false;
          } else if (!boxtext) {
            this.setState({ errortext: "Please Enter JSon", errorurljson: "" });
            return false;
          } else if (!this.is_url(boxurljson)) {
            this.setState({ errorurljson: "Please enter a valid URL" });
            return false;
          }

          let mappingArray = {};
          mappingArray.name = boxname;
          mappingArray.type = boxvalue;
          mappingArray.url = boxurljson;
          mappingArray.text = boxtext;
          mappingArray.size = boxwidth.value;
          mappingArray.status = "active";
          mappingArray.customerId = this.state.customerId;
          try {
            const result = await CmsContent.addMaster(
              "tbl_boxcontent",
              mappingArray
            );
            if (result) {
              this.setState({ alertVisible: true });
              this.componentWillMount();
            }
            setTimeout(() => this.setState({ alertVisible: false }), 3000);
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 8:
        {
          const formData = new FormData();
          formData.append("name", boxname);
          formData.append("type", boxvalue);
          formData.append("thumbnail", thumbnail);
          formData.append("notificationtext", traytext);
          formData.append("heading", portletHeading);
          formData.append("description", descriptionText);
          formData.append("evaluation", quizSelect.value);
          formData.append("customerId", this.state.customerId);
          formData.append("status", "active");
          formData.append("createdAt", newdate);
          formData.append("section_value", this.state.secionvalue);
          formData.append("catagory_id", this.state.catagory_values_select.value);
          formData.append("teacher_id", this.state.userid);
          formData.append("grade", this.state.Selectoptionselected.value);
          this.submittingCommon(formData, "tbl_boxcontent");
        }
        break;
      case 9:
        {
          const formData = new FormData();
          formData.append("name", boxname);
          formData.append("type", boxvalue);
          formData.append("thumbnail", thumbnail);
          formData.append("notificationtext", traytext);
          formData.append("heading", portletHeading);
          formData.append("description", descriptionText);
          formData.append("form", formSelect.value);
          formData.append("customerId", this.state.customerId);
          formData.append("status", "active");
          formData.append("createdAt", newdate);
          formData.append("section_value", this.state.secionvalue);
          formData.append("catagory_id", this.state.catagory_values_select.value);
          formData.append("teacher_id", this.state.userid);
          formData.append("grade", this.state.Selectoptionselected.value);
          this.submittingCommon(formData, "tbl_boxcontent");

          

        }
        break;
      case 10:
        {
          const formData = new FormData();
          formData.append("name", boxname);
          formData.append("type", boxvalue);
          formData.append("thumbnail", thumbnail);
          formData.append("heading", portletHeading);
          formData.append("description", descriptionText);
          formData.append("notificationtext", traytext);
          formData.append("survey", selectSurvey.value);
          formData.append("customerId", this.state.customerId);
          formData.append("status", "active");
          formData.append("createdAt", newdate);
          formData.append("section_value", this.state.secionvalue);
          formData.append("catagory_id", this.state.catagory_values_select.value);
          formData.append("teacher_id", this.state.userid);
          formData.append("grade", this.state.Selectoptionselected.value);
          this.submittingCommon(formData, "tbl_boxcontent");
        }
        break;
      default:
        console.log("Out Of Range");
    }
  };

  submittingCommon = async (formData, tableName) => {
    try {
      const result = await CmsContent.mappingportlet(formData, tableName);
      if (result) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        this.setState({ alertVisible: true });
        this.componentWillMount();
        setTimeout(() => this.setState({ alertVisible: false }), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getMultiSelectValue = (data, type) => {
    let selectedValue = "0";
    if (data.length !== 0) {
      selectedValue = "";

      if (type === "0") {
        const value = data.map(
          values => (selectedValue += `'${values.value}',`)
        );
        selectedValue = selectedValue.replace(/,\s*$/, "");
        var lastChar = selectedValue.slice(-1);
        if (lastChar === ",") {
          selectedValue = selectedValue.slice(0, -1);
        }
      } else if (type === "1") {
        const value = data.map(values => (selectedValue += `${values.value},`));
        selectedValue = selectedValue.replace(/,\s*$/, "");
      }
    }
    return selectedValue;
  };

  tray = () => {
    this.setState({ tray: !this.state.tray, traytext: null });
  };
  attendance = () => {
    this.setState({ attendance: !this.state.attendance });
  };
  traytext = e => {
    this.setState({ traytext: e.target.value });
  };

  descriptionText = e => {
    this.setState({ descriptionText: e.target.value });
  };

  portletHeading = e => {
    this.setState({ portletHeading: e.target.value });
  };

  submitresource = async () => {
    const { Authorname, Authoremail } = this.state;
    let userfile = this.state.file;

    var selectOption = this.state.domainOptions;
    if (
      selectOption != undefined &&
      selectOption != "" &&
      selectOption != null
    ) {
      this.setState({ errordomain: "" });
    } else {
      this.setState({ errordomain: "Please Select " });
      return true;
    }
    if (Authorname != undefined && Authorname != "" && Authorname != null) {
      this.setState({ error: "" });
    } else {
      this.setState({ error: "Please Fill Resource Name" });
      return true;
    }
    if (userfile != undefined && userfile != "" && userfile != null) {
      this.setState({ errorfile: "" });
    } else {
      this.setState({ errorfile: "Please Fill Resource file" });
      return true;
    }

    let username = this.state.Authorname;
    let useremail = this.state.selectedDomain;
    let companyid = this.state.companyid;
    let active = "active";

    const formData = new FormData();
    formData.append("name", username);
    formData.append("domainid", useremail.value);
    formData.append("companyid", this.state.customerId);
    formData.append("file", userfile);
    formData.append("status", active);

    let categoryArray = {};
    categoryArray.name = username.trim();
    categoryArray.domainid = useremail.value;
    this.setState({ disableValue: true });

    try {
      this.setState({ disableValue: true });

      const authorinsert = await CmsContent.authorinsert(
        formData,
        "tbl_resources"
      );

      // onUploadProgress: progressEvent => {
      //   this.setState({
      //     uploadPercentage: parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
      //   });
      //   setTimeout(() => this.setState({ uploadPercentage: 0 }), 10000);
      // }

      if (authorinsert) {
        // this.componentWillMount();

        let valueArray = {};
        valueArray.value = authorinsert.data.insertId;
        valueArray.label = categoryArray.name;

        const newData = [valueArray, ...this.state.resourceOptions];
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        this.setState({
          resourceOptions: newData,
          disableValue: false,
          resourceAlert: true,
          Authorname: "",
          filename: null,
          selectedDomain: ""
        });
      }
      setTimeout(() => this.setState({ resourceAlert: false }), 3000);
    } catch (error) {
      console.log(error);
    }
  };
  authorimage = e => {
    let filename = e.target.files[0];
    let filepath = e.target.files[0].name;
    this.setState({ file: filename, filename: filepath });
  };
  authorname = e => {
    let name = e.target.value;
    this.setState({ Authorname: name });
  };
  domain = e => {
    this.setState({ selectedDomain: e });
  };
  onDismiss = () => {
    this.setState({ alertVisible: false });
    this.setState({ alertVisible1: false });
    this.setState({ formAlertdelete: false });
    this.setState({ resourceAlert: false });
  };
  is_url(str) {
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }
  quizSelect = e => {
    this.setState({ quizSelect: e });
  };
  formSelect = e => {
    this.setState({ formSelect: e });
  };

  getMimetype(signature) {
    switch (signature) {
      case "89504E47":
        return "image/png";
      case "47494638":
        return "image/gif";
      // case "25504446":
      //   return "application/pdf";
      case "FFD8FFDB":
        return "image/jpg";
      case "FFD8FFE0":
        return "image/jpeg";
      case "52494646":
        return "video/dat/avi";
      case "001B3":
        return "video/mpg/mpeg";
      case "4F676753":
        return "video/ogv/ogg";
      case "00018":
        return "video/mp4";
      case "00020":
        return "video/mp4";
      case "4944333":
        return "video/mp3";
      // case "504B0304":
      //   return "application/zip";
      // case "4D5A900":
      //   return "image/exe";
      default:
        return "Unknown filetype";
    }
  }
  appendOverlayList = () => {
    this.getQuiz();
    const { appendOverlayList } = this.state;
    appendOverlayList.push({
      overlayName: null,
      overlayType: null,
      duration: null,
      overlayColor: [
        {
          rgb: {
            r: "241",
            g: "112",
            b: "19",
            a: "1"
          },
          hex: `#f17013`
        }
      ],
      quizId: null,
      bannerImage: null,
      bannerTargetUrl: null,
      loadUrl: null,
      width: null,
      height: null
    });
    this.setState(appendOverlayList);
  };
  showOverLay = appendData => {
    let appendOverlayList = this.state.appendOverlayList;
    return appendOverlayList.map((appendOverlayList, index) => {
      return (
        <div className="quiz-align my-3">
          <div className="row form-group mt-3">
            <div className="col-sm-2" />
            <div className="col-sm-2">
              <label htmlFor="exampleInputEmail1">Overlay Name</label>
            </div>
            <div className="col-sm-5">
              <input
                type="text"
                name={`overlayName${index}`}
                placeholder="Enter overlay Name"
                className="form-control"
                onChange={e => this.json_refill(e, `overlayName`, index)}
              />
            </div>
            <div className="col-sm-3">
              <i
                class="fa fa-times-circle"
                style={{ fontSize: "25px" }}
                onClick={() => this.removeAppend(index)}
              ></i>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-2" />
            <div className="col-sm-2">
              <label htmlFor="exampleInputEmail1">Overlay Type</label>
            </div>
            <div className="col-sm-5">
              <SingleSelect
                name={`overlayType${index}`}
                options={this.state.overlayOption}
                handleChange={e => this.appendOverlayData(e, index)}
              />
            </div>
            <div className="col-sm-3" />
          </div>
          {appendData && appendData[index]}
        </div>
      );
    });
  };
  appendOverlayQuiz = (appendValue, name, index) => {
    const { appendOverlayList } = this.state;
    appendOverlayList[index][name] = appendValue.value;
    this.setState({ appendOverlayList });
  };
  json_refill = (e, type, index, l = true) => {
    const { appendOverlayList } = this.state;
    appendOverlayList[index][type] = l ? e.target.value : e;
    this.setState({ appendOverlayList });
  };
  appendOverlayData = (appendValue, index) => {
    const { appendOverlayData, appendOverlayList } = this.state;
    const appendJson = {
      index,
      appendValue: appendValue.label
    };
    let indexValue = appendOverlayData[index];
    if (indexValue) {
      if (appendOverlayData.length > index) {
        if (parseInt(indexValue.index) !== parseInt(index)) {
          appendOverlayData.splice(indexValue.index, 1);
        }
      }
      if (parseInt(indexValue.index) === parseInt(index)) {
        appendOverlayData.splice(index, 1);
      }
    }
    appendOverlayData.splice(index, 0, appendJson);
    let appendOverlayListIndex = appendOverlayList[index];
    appendOverlayListIndex.overlayType = appendOverlayData[index].appendValue;
    appendOverlayListIndex.surveyUrl = null;
    appendOverlayListIndex.loadUrl = null;
    appendOverlayListIndex.bannerTargetUrl = null;
    appendOverlayListIndex.quizId = null;
    appendOverlayListIndex.width = null;
    appendOverlayListIndex.height = null;
    appendOverlayListIndex.bannerImage = null;
    this.setState({ appendOverlayData, appendOverlayList });
  };
  addBanner = (e, index) => {
    // appendOverlayList[index].bannerImage = e.target.files[0];
    this.setState({
      bannerImage: e.target.files[0],
      addBannerName: e.target.files[0].name
    });
  };
  handleClick = index => {
    const { displayColorPicker } = this.state;
    displayColorPicker[index] = true;
    this.setState({ displayColorPicker });
  };
  handleClose = index => {
    const { displayColorPicker } = this.state;
    displayColorPicker[index] = false;
    this.setState({ displayColorPicker });
  };
  addOverlayColor = (color, index) => {
    const { overlayColor, appendOverlayList } = this.state;
    overlayColor[index] = color;
    appendOverlayList[index]["overlayColor"] = color;
    this.setState({ overlayColor, appendOverlayList });
  };
  timelineJson = (e, type, index) => {
    const {
      appendOverlayList,
      timelineCheck,
      timelineCheckMM,
      timelineCheckSS
    } = this.state;
    let newValue = null;
    let oldValue = null;
    if (type === "hh") {
      if (timelineCheck.length > 0 && timelineCheck[index]) {
        timelineCheck.map(val => {
          if (val.index === index) {
            let previousHour = parseInt(timelineCheck[index].hh);
            let newHour = parseInt(e.target.value);
            timelineCheck[index].hh = e.target.value;
            if (newHour > previousHour) {
              newHour = newHour - previousHour;
              newValue = newHour * 60 * 60;
              if (parseInt(appendOverlayList[index]["duration"]) > 0) {
                oldValue = appendOverlayList[index]["duration"];
                newValue = newValue + parseInt(oldValue);
              }
            } else {
              newHour = previousHour - newHour;
              newValue = newHour * 60 * 60;
              if (parseInt(appendOverlayList[index]["duration"]) > 0) {
                oldValue = appendOverlayList[index]["duration"];
                newValue = parseInt(oldValue) - newValue;
              }
            }
            appendOverlayList[index]["duration"] = newValue;
          }
        });
      } else {
        let timeLineJson = {};
        timeLineJson.index = index;
        timeLineJson.hh = e.target.value;
        timelineCheck.push(timeLineJson);
        this.setState({ timelineCheck });
        newValue = e.target.value * 60 * 60;
        if (parseInt(appendOverlayList[index]["duration"]) > 0) {
          oldValue = appendOverlayList[index]["duration"];
          newValue = parseInt(newValue) + parseInt(oldValue);
        }
        appendOverlayList[index]["duration"] = newValue;
      }
    } else if (type === "mm") {
      if (timelineCheckMM.length > 0 && timelineCheckMM[index]) {
        timelineCheckMM.map(val => {
          if (val.index === index) {
            let previousHour = parseInt(timelineCheckMM[index].mm);
            let newHour = parseInt(e.target.value);
            timelineCheckMM[index].mm = e.target.value;
            if (newHour > previousHour) {
              newHour = newHour - previousHour;
              newValue = newHour * 60;
              if (parseInt(appendOverlayList[index]["duration"]) > 0) {
                oldValue = appendOverlayList[index]["duration"];
                newValue = newValue + parseInt(oldValue);
              }
            } else {
              newHour = previousHour - newHour;
              newValue = newHour * 60;
              if (parseInt(appendOverlayList[index]["duration"]) > 0) {
                oldValue = appendOverlayList[index]["duration"];
                newValue = parseInt(oldValue) - newValue;
              }
            }
            appendOverlayList[index]["duration"] = newValue;
          }
        });
      } else {
        let timeLineJson = {};
        timeLineJson.index = index;
        timeLineJson.mm = e.target.value;
        timelineCheckMM.push(timeLineJson);
        this.setState({ timelineCheckMM });
        newValue = e.target.value * 60;
        if (parseInt(appendOverlayList[index]["duration"]) > 0) {
          oldValue = appendOverlayList[index]["duration"];
          newValue = parseInt(newValue) + parseInt(oldValue);
        }
        appendOverlayList[index]["duration"] = newValue;
      }
    } else {
      if (timelineCheckSS.length > 0 && timelineCheckSS[index]) {
        timelineCheckSS.map(val => {
          if (val.index === index) {
            let previousHour = parseInt(timelineCheckSS[index].mm);
            let newHour = parseInt(e.target.value);
            timelineCheckSS[index].mm = e.target.value;
            if (newHour > previousHour) {
              newHour = newHour - previousHour;
              newValue = newHour;
              if (parseInt(appendOverlayList[index]["duration"]) > 0) {
                oldValue = appendOverlayList[index]["duration"];
                newValue = newValue + parseInt(oldValue);
              }
            } else {
              newHour = previousHour - newHour;
              newValue = newHour;
              if (parseInt(appendOverlayList[index]["duration"]) > 0) {
                oldValue = appendOverlayList[index]["duration"];
                newValue = parseInt(oldValue) - newValue;
              }
            }
            appendOverlayList[index]["duration"] = newValue;
          }
        });
      } else {
        let timeLineJson = {};
        timeLineJson.index = index;
        timeLineJson.mm = e.target.value;
        timelineCheckSS.push(timeLineJson);
        this.setState({ timelineCheckSS });
        newValue = e.target.value;
        if (parseInt(appendOverlayList[index]["duration"]) > 0) {
          oldValue = appendOverlayList[index]["duration"];
          newValue = parseInt(newValue) + parseInt(oldValue);
        }
        appendOverlayList[index]["duration"] = newValue;
      }
    }
    this.setState({ appendOverlayList });
  };
  getQuiz = async () => {
    try {
      let getQuizQuestion = await CmsContent.getFreedom(
        "quizName as label,id as value",
        "tbl_question",
        `customerid=${this.state.customerId} and teacher_id=${this.state.userid}`
      );
      this.setState({ getQuizQuestion: getQuizQuestion.data });
    } catch (error) {
      console.error(error);
    }
  };
  refresh = async type => {
    if (type == 8) {
      const quizList = await CmsContent.getTwoConditionedValue(
        "tbl_question",
        "type",
        "active",
        "customerid",
        this.state.customerId,
        "id as value ,quizName as label"
      );
      if (quizList) {
        this.setState({ quizOptions: quizList.data });
      }
    } else if (type == 9) {
      const formList = await CmsContent.getTwoConditionedValue(
        "tbl_form",
        "status",
        "active",
        "companyid",
        this.state.customerId,
        "id as value ,name as label"
      );
      if (formList) {
        this.setState({ formOptions: formList.data });
      }
    } else if (type == 10) {
      let SurveyList = await CmsContent.getTwoConditionedValue(
        "tbl_survey",
        "customerid",
        this.state.customerId,
        1,
        1,
        "id as value ,surveyname as label"
      );
      if (SurveyList) {
        this.setState({ SurveyList: SurveyList.data });
      }
    }
  };

  removeAppend = index => {
    const { appendOverlayList } = this.state;
    appendOverlayList.splice(index, 1);
    this.setState({ appendOverlayList });
  };

  downloadQR=id=>{
    const canvas = document.getElementById(id);
    const pngUrl = canvas.toDataURL("image/png");
    const value=this.dataURLtoFile(pngUrl,'qrcode.pdf');
    console.log(value);
    this.setState({ qr: pngUrl});
  }

  dataURLtoFile=(dataurl, filename) =>{
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  handlechange = e => {
    if (e.target.name === "optionCount") {
      this.setState({ optionJson: [] });
    }
    this.setState({ [e.target.name]: e.target.value });
  };


  addSingleChoice = type => {
    const { send_json } = this.state;
    send_json.push({
      question: null,
      answer: null,
      type,
      options: [],
      count: null
    });
    this.setState({ send_json });
    console.log(this.state.send_json)
  };
  removeQuiz = index => {
    const { send_json, optionJsonArray } = this.state;
    send_json.splice(index, 1);
    optionJsonArray.splice(index, 1);
    this.setState({ send_json: [], optionJsonArray: [] });
    this.setState({ send_json, optionJsonArray });
  };
  JSON_refill = (quiz_value, quiz_name, index) => {
    
    let send_json = this.state.send_json;
    if (index + 1) {
      var JSON_data = send_json[index];
      JSON_data[quiz_name] = quiz_value;
      send_json[index] = JSON_data;
    }
    this.setState({ send_json: send_json });
   
  };
  optionAnswer = (value, key, index) => {
   
    let send_json = this.state.send_json;
    if (index + 1) {
      var JSON_data = send_json[index];

      if (JSON_data["answer"]) {
        let oldAnswer = JSON_data["answer"];
        let newValue = `${oldAnswer},${value}`;
        JSON_data["answer"] = newValue;
      } else {
        JSON_data["answer"] = value;
      }
      
    }
    // this.setState({ send_json: send_json });
  };

  appendOption = (value, key, index) => {
    
    let send_json = this.state.send_json;
    if (index + 1) {
      var JSON_data = send_json[index];
      JSON_data["options"][key] = value;
      send_json[index] = JSON_data;
    }
    send_json[index].count = send_json[index].options.length;
    this.setState({ send_json: send_json });
  };

  handlePhoneCount = (value, index) => {
    

    const { optionListArray } = this.state;
    for (let i = 0; i <= index; i++) {
      if (i === index) {
        optionListArray.splice(index, 1);
        let optionObject = {};
        optionObject.index = index;
        optionObject.value = value;
        optionListArray.splice(index, 0, optionObject);
      } else {
        

        let optionObject = {};
        optionObject.index = null;
        optionObject.value = null;
        optionListArray.splice(index, 0, optionObject);

        // if (!optionListArray[index].value) {

        // }
      }
    }
    this.setState({ optionListArray });
  };

  printOptions = index => {
    
    const { optionJson, optionListArray, optionJsonArray } = this.state;
    this.setState({ optionJson: [] });
    let total = optionListArray[index].value;
    for (let i = 0; i < total; i++) {
      optionJson.push({ option: null });
    }
    optionJsonArray.splice(index, 0, optionJson);
    this.setState({ optionJsonArray });
    
  };



  submitQuiz = async () => {
    const { send_json, quizName, customerId } = this.state;

    if (quizName == null || quizName == undefined || quizName == "") {
      this.setState({ error: "Please fill Quiz Name" });
      return false;
    } else {
      this.setState({ error: " " });
    }

    let today = new Date();
    let createdAt =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let jsonContent = {};
    jsonContent.quizName = quizName;
    jsonContent.contentJson = send_json;
    jsonContent.customerid = customerId;
    jsonContent.createdAt = createdAt;
    jsonContent.type = "active";
    try {
      const result = await CmsContent.addQuizContent(jsonContent);
      if (result) {
        this.setState({ quizName: "", send_json: [], alertVisible: true });
        this.getQuiz();
        setTimeout(() => this.setState({ alertVisible: false }), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };


  catagory_select =(e) =>{

    this.setState({catagory_values_select:e})
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

  column_data = [
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



 this.handleTheme( { label: "Content", value: "7" })
}
  }
  


  gradeselcted =(e) =>{
this.setState({Selectoptionselected :e })
  }

  render() {
    const {
      boxname,
      resourceOptions,
      boxfilename,
      boxtext,
      errorname,
      errortext,
      errorfile,
      errorfile1,
      selectedresource,
      errorsize,
      errorresources,
      errorurljson,
      thumbnail,
      thumbnailname,
      errorthumbnail,
      disableGroup,
      button,
      traytext,
      descriptionText,
      portletHeading,
      errordescription,
      link,
      alertVisible,
      alertVisible1,
      formAlertdelete,
      locationOptions,
      locationSelect,
      programOptions,
      selectedprogram,
      batchOptions,
      batchSelect,
      lobs,
      lobSelect,
      errorheading,
      domainOptions,
      selecteddomain,
      errordomain,
      Authorname,
      error,
      uploadPercentage,
      disableValue,
      quizSelect,
      quizOptions,
      formSelect,
      formOptions,
      appendOverlayList,
      appendOverlayData,
      selectSurvey,
      SurveyList,
      resourceAlert,
      disablebutton,
      send_json
    } = this.state;
    let quizViewlist = [];

    send_json.map( (quizList, index) =>{
      console.log(quizList.type)
      console.log(index)

      if (quizList.type === "single") {
        quizViewlist.push( 
          <div className="row form-group question-margin">
                 <div className="col-sm-2">Question {index + 1}</div>
                 <div className="col-sm-7">
              <textarea
                type="text"
                class="form-control"
                name={`question${index}`}
                placeholder="Enter Question"
                onChange={e => {
                  this.JSON_refill(e.target.value, "question", index);
                }}
                value={quizList.question}
              />
            </div>
              <div className="col-sm-2">

              <div className="row form-group">
                <div className="col-sm-12">Answer {index + 1}</div>
              </div>
              <div className="row form-group">
                <div className="col-sm-6 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`answer${index}`}
                    value="yes"
                    onChange={e => {
                      this.JSON_refill(e.target.value, "answer", index);
                    }}
                  />
                  <label className="form-check-label" for="answer">
                    Yes
                  </label>
                </div>
                <div className="col-sm-6 form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`answer${index}`}
                    value="No"
                    onChange={e => {
                      this.JSON_refill(e.target.value, "answer", index);
                    }}
                  />
                  <label className="form-check-label" for="answer">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-sm-1">
              <i
                className="fa fa-window-close fa-3x"
                aria-hidden="true"
                onClick={() => this.removeQuiz(index)}
              />
             
              </div>
          </div>

        )


      }else
      {

        let optionsAppend = [];
        this.state.optionJsonArray.map((totalOption, index1) =>{

          if (index1 === index) {

            totalOption.map(  (val, key) =>{

              optionsAppend.push(<div className="col-sm-3">
              <div className="row form-group">
                <div className="col-sm-12">Option {key + 1}</div>
              </div>
              <div className="row form-group">
                <div className="col-sm-12">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value={`option${key + 1}`}
                      onChange={e =>
                        this.optionAnswer(e.target.value, key, index1)
                      }
                    />
                    <label
                      className="form-check-label"
                      for="inlineCheckbox1"
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={`option ${key + 1}`}
                        onChange={e =>
                          this.appendOption(e.target.value, key, index1)
                        }
                        value={quizList.options[key]}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>)

            })

            
          }

        })

        quizViewlist.push(
          <div>
            <div className="row form-group question-margin">
              <div className="col-sm-2">Question {index + 1}</div>
              <div className="col-sm-7">
                <textarea
                  type="text"
                  class="form-control"
                  name="question"
                  placeholder="Enter Question"
                  onChange={e => {
                    this.JSON_refill(e.target.value, "question", index);
                  }}
                  value={quizList.question}
                />
              </div>
              <div className="col-sm-2">
                <div className="row form-group">
                  <div className="col-sm-8">
                    <div className="row form-group">
                      <input
                        type="number"
                        class="form-control"
                        name="optionCount"
                        placeholder="number"
                        onChange={e =>
                          this.handlePhoneCount(e.target.value, index)
                        }
                        value={quizList.count}
                      />
                    </div>
                    <div className="row form-group">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={e => this.printOptions(index)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-4" />
                </div>
              </div>
              <div className="col-sm-1">
                <i
                  className="fa fa-window-close fa-3x"
                  aria-hidden="true"
                  onClick={() => this.removeQuiz(index)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-2"> </div>
              <div className="col-sm-7">
                <div className="row form-group">{optionsAppend}</div>
              </div>
              <div className="col-sm-2"> </div>
            </div>
          </div>
        );

      }



    })



    let appendData = [];
    appendOverlayData.map((appendOverlayData, index) => {
      let rgb = {
        r: "241",
        g: "112",
        b: "19",
        a: "1"
      };
      if (this.state.overlayColor[index]) {
        rgb = this.state.overlayColor[index].rgb;
      }
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
      let hoursSlect = [];
      for (let i = 0; i <= 12; i++) {
        hoursSlect.push(<option>{i <= 9 ? `0${i}` : i}</option>);
      }
      let minuteSlect = [];
      for (let i = 0; i <= 60; i++) {
        minuteSlect.push(<option>{i <= 9 ? `0${i}` : i}</option>);
      }
      let secondsSlect = [];
      for (let i = 0; i <= 60; i++) {
        secondsSlect.push(<option>{i <= 9 ? `0${i}` : i}</option>);
      }
      appendData.push(
        <div>
          {appendOverlayData.appendValue === "Load Url" && (
            <div className="row form-group">
              <div className="col-sm-2" />
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1">Destination URL</label>
              </div>
              <div className="col-sm-5">
                <input
                  type="text"
                  name={`overlayName${appendOverlayData.index}`}
                  placeholder="Enter Url"
                  className="form-control"
                  onChange={e => this.json_refill(e, `loadUrl`, index)}
                />
              </div>
              <div className="col-sm-3" />
            </div>
          )}
          {appendOverlayData.appendValue === "Survey" && (
            <div className="row form-group">
              <div className="col-sm-2" />
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1">Select Survey</label>
              </div>
              <div className="col-sm-5">
                <SingleSelect
                  name="survey"
                  options={this.state.SurveyList}
                  handleChange={e => {
                    this.setState({ selectSurvey: e });
                    this.json_refill(e.value, `surveyUrl`, index, false);
                  }}
                  selected={selectSurvey}
                />
              </div>
              <div className="col-sm-3" />
            </div>
          )}
          {appendOverlayData.appendValue === "Ad Banner" && (
            <div>
              <div className="row form-group">
                <div className="col-sm-2" />
                <div className="col-sm-2">
                  <label htmlFor="exampleInputEmail1">Upload Image</label>
                </div>
                <div className="col-sm-5 custom-file">
                  <input
                    type="file"
                    className="custom-file-input "
                    id="customFile"
                    onChange={e => this.addBanner(e, index)}
                    accept="image/*"
                  />
                  <label
                    className="custom-file-label lblcross"
                    htmlFor="customFile"
                  >
                    {this.state.addBannerName}
                  </label>
                </div>
                <div className="col-sm-3" />
              </div>
              <div className="row form-group">
                <div className="col-sm-2" />
                <div className="col-sm-2">
                  <label htmlFor="exampleInputEmail1">Target Url</label>
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name={`overlayImageTargetUrl${appendOverlayData.index}`}
                    placeholder="Enter Target Url"
                    className="form-control"
                    onChange={e =>
                      this.json_refill(e, `bannerTargetUrl`, index)
                    }
                  />
                </div>
                <div className="col-sm-3" />
              </div>
            </div>
          )}
          {appendOverlayData.appendValue === "Quiz" && (
            <div>
              <div className="row form-group">
                <div className="col-sm-2" />
                <div className="col-sm-2">
                  <label htmlFor="exampleInputEmail1">Select Evaluation</label>
                </div>
                <div className="col-sm-5">
                  <SingleSelect
                    name="quiz"
                    options={this.state.getQuizQuestion}
                    handleChange={e =>
                      this.appendOverlayQuiz(e, "quizId", index)
                    }
                  />
                </div>
                <div className="col-sm-3" >

                  {/* add evalution*/}
                  <LoginModal
                              title="Evalutions"
                              id="Evalutions"
                              buttonTitle="Add Evalutions"
                              maxwidth='modal-lg'
                              bodyText ={
                              <React.Fragment> 
                                <div className="row form-group">
                <div className="col-sm-2" />
                <div className="col-sm-7">
                  <Alert
                    className="badge-content"
                    color="success"
                    isOpen={alertVisible}
                    toggle={this.onDismiss}
                  >
                    Question Added Successfully
                  </Alert>
                </div>
                <div className="col-sm-3" />
              </div>
              
              <div className="row form-group">
                          <div className="col-sm-2" />
                          <div className="col-sm-2">
                            <label for="exampleInputEmail1">
                              <b>Quiz Name</b>
                            </label>
                          </div>
                          <div className="col-sm-5">
                            <input
                              type="text"
                              class="form-control"
                              name="quizName"
                              placeholder="Enter Quiz Name"
                              onChange={this.handlechange}
                              value={this.state.quizName}
                            />
                            <span className="error-shows">{error}</span>
                          </div>
                          <div className="col-sm-3" />
              </div>

              <div className="row">
              <div className="col-sm-2" />
              <div className="col-sm-4" > 
              <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block btn-radius"
                    onClick={() => this.addSingleChoice("multiple")}
                  >
                    Add Multi Choice
                  </button>
              </div>
              <div className="col-sm-4" > 
              
              <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block btn-radius"
                    onClick={() => this.addSingleChoice("single")}
                  >
                    Add Single Choice
                  </button></div>
              <div className="col-sm-2" />
              </div>

              {quizViewlist.length > 0 && (
              <div className="row form-group">
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      {quizViewlist}
                      <div className="row form-group">
                        <div className="col-sm-2" />
                        <div className="col-sm-3">
                        
                          
                          <button
                            type="button"
                            className="btn btn-success btn-lg btn-radius"
                            onClick={this.submitQuiz}
                          >
                            Submit Quiz
                          </button>
                        </div>
                        <div className="col-sm-7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
                              
                              </React.Fragment>
                              }
                              
                              />
              
                  {/* add evalution*/}
                
                  </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-2" />
                <div className="col-sm-1 px-0">
                  <label htmlFor="exampleInputEmail1">Width %</label>
                </div>
                <div className="col-sm-2">
                  <input
                    type="number"
                    name={`width${appendOverlayData.index}`}
                    placeholder="width"
                    className="form-control"
                    onChange={e => this.json_refill(e, `width`, index)}
                  />
                </div>
                <div className="col-sm-1" />
                <div className="col-sm-1 px-0">
                  <label htmlFor="exampleInputEmail1">Height %</label>
                </div>
                <div className="col-sm-2">
                  <input
                    type="number"
                    name={`height${appendOverlayData.index}`}
                    placeholder="width"
                    className="form-control"
                    onChange={e => this.json_refill(e, `height`, index)}
                  />
                </div>
                <div className="col-sm-3" />
              </div>
            </div>
          )}
          <div className="row form-group">
            <div className="col-sm-2" />
            <div className="col-sm-2">
              <label htmlFor="exampleInputEmail1">OverLay Preamble</label>
            </div>
            <div className="col-sm-5">
              <input
                type="test"
                name={`overlayPreamble${appendOverlayData.index}`}
                placeholder="Overlay Preamble"
                className="form-control"
                onChange={e => this.json_refill(e, `overlayPreamble`, index)}
              />
            </div>
            <div className="col-sm-3" />
          </div>
          <div className="row form-group">
            <div className="col-sm-2" />
            <div className="col-sm-2">
              <label htmlFor="exampleInputEmail1">OverLay Color</label>
            </div>
            <div className="col-sm-5">
              <div style={styles.swatch} onClick={e => this.handleClick(index)}>
                <div style={styles.color} />
              </div>
              {this.state.displayColorPicker[index] ? (
                <div style={styles.popover}>
                  <div
                    style={styles.cover}
                    onClick={e => this.handleClose(index)}
                  />
                  <SketchPicker
                    color={rgb}
                    onChange={e => this.addOverlayColor(e, index)}
                  />
                </div>
              ) : null}
            </div>
            <div className="col-sm-3" />
          </div>
          <div className="row form-group">
            <div className="col-sm-2" />
            <div className="col-sm-1">
              <label className="duration-float" htmlFor="exampleInputEmail1">
                hh
              </label>
            </div>
            <div class="col-sm-2">
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={e => this.timelineJson(e, `hh`, index)}
              >
                {hoursSlect}
              </select>
            </div>
            <div className="col-sm-1">
              <label className="duration-float" htmlFor="exampleInputEmail1">
                mm
              </label>
            </div>
            <div class="col-sm-2">
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={e => this.timelineJson(e, `mm`, index)}
              >
                {minuteSlect}
              </select>
            </div>
            <div className="col-sm-1">
              <label className="duration-float" htmlFor="exampleInputEmail1">
                ss
              </label>
            </div>
            <div class="col-sm-2">
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                onChange={e => this.timelineJson(e, `ss`, index)}
              >
                {secondsSlect}
              </select>
            </div>
            {/* <div className="col-sm-5">
              <input type="text" name={`overlayName${appendOverlayData.index}`} placeholder="Enter Duration" className="form-control" onChange={e => this.json_refill(e, `duration`, index)} />
            </div> */}
            <div className="col-sm-3" />
          </div>
        </div>
      );
    });
    return (
      <React.Fragment>
        <main className="main my-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h1>Portlet Master</h1>
                  </div>
                  <div className="card-body">
                    <div className="card-body">
                      <div className="row form-group">
                        <div className="col-sm-2" />
                        <div className="col-sm-7">
                          <Alert
                            className="badge-content"
                            color="success"
                            isOpen={alertVisible}
                            toggle={this.onDismiss}
                          >
                            New Portlet Added
                          </Alert>
                          <Alert
                            className="badge-content"
                            color="success"
                            isOpen={alertVisible1}
                            toggle={this.onDismiss}
                          >
                            New Portlet Updated
                          </Alert>
                          <Alert
                            className="badge-content"
                            color="danger"
                            isOpen={formAlertdelete}
                            toggle={this.onDismiss}
                          >
                            Selected Portlet Delete
                          </Alert>
                        </div>
                        <div className="col-sm-3" />
                      </div>

               
                      <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                          <label htmlFor="exampleInputEmail1">
                            Section Name
                          </label>
                        </div>


                        <div className="col-sm-5">
                          <SingleSelect
                           
                            options={this.state.SectionData }
                            handleChange={this.sectionnameselected}
                            value={this.state.secionvalueselect}
                            placeholder="Select Section"
                          />
                        </div>
                          
                       </div>   
                
 
                      <div className="row form-group">
                        <div className="col-sm-2" />
                        <div className="col-sm-2">
                          <label htmlFor="exampleInputEmail1">
                           category
                          </label>
                        </div>
                        <div className="col-sm-5">
                          <SingleSelect
                          
                            options={this.state.catagory_values}
                            handleChange={this.catagory_select}
                            value={this.state.catagory_values_select}
                            placeholder="Select BoxType"
                          />
                        </div>
                        
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2" />
                        <div className="col-sm-2">
                          <label htmlFor="exampleInputEmail1">
                            Content-Type
                          </label>
                        </div>
                        <div className="col-sm-5">
                          <SingleSelect
                            disabled={this.state.boxtypedisable}
                            options={this.state.boxtype}
                            handleChange={this.handleBox}
                            value={this.state.box}
                            placeholder="Select BoxType"
                          />
                        </div>
                        
                      </div>

                      <div className="row form-group">
                        <div className="col-sm-2" />
                        <div className="col-sm-2">
                          <label htmlFor="exampleInputEmail1">
                            Select Grade
                          </label>
                        </div>
                        <div className="col-sm-5">
                          <SingleSelect
                            disabled={this.state.boxtypedisable}
                            options={this.state.SelectGradeoption}
                            handleChange={this.gradeselcted}
                            value={this.state.Selectoptionselected}
                            placeholder="Select BoxType"
                          />
                        </div>
                        
                      </div>
                     

                     { this.state.boxlabel && 
                     (
                       <div> 
                         
                         <Theme7 that={this.state} these={this.pagenameError} />
                          </div>
                     )
                     }


                      {(this.state.boxvalue === 1 ||
                        this.state.boxvalue === 2 ||
                        this.state.boxvalue === 3 ||
                        this.state.boxvalue === 4 ||
                        this.state.boxvalue === 5 ||
                        this.state.boxvalue === 6 ||
                        this.state.boxvalue === 7 ||
                        this.state.boxvalue === 8 ||
                        this.state.boxvalue === 9 ||
                        this.state.boxvalue === 10) && (
                        <div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">
                                Portlet Name
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="text"
                                disabled={this.state.disableGroup}
                                className="form-control"
                                id="Authoremail"
                                name="Authoremail"
                                placeholder="Enter Portlet Name"
                                onChange={this.portletname}
                                value={boxname}
                              />
                              <span className="error-shows ">{errorname}</span>
                            </div>
                            <div className="col-sm-3" />
                          </div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">
                                Portlet Heading
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="text"
                                className="form-control"
                                id="Authoremail"
                                name="Authoremail"
                                placeholder="Enter Portlet Heading"
                                onChange={this.portletHeading}
                                value={portletHeading}
                              />
                              <span className="error-shows ">
                                {errorheading}
                              </span>
                            </div>
                            <div className="col-sm-3" />
                          </div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">
                                Upload Thumbnail
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <input  
                                type="file"
                                id="images"
                                accept="image/*"
                                onChange={this.thumbnail}
                              />
                              <label
                                className="custom-file-label lblcross"
                                htmlFor="images"
                                style={{ fontSize: "15px", overflow: "hidden",zIndex:'auto' }}
                              >
                                <span style={{ fontSize: "12px" }}>
                                  {thumbnailname}
                                </span>
                              </label>
                              <br />
                              <br />
                              <span className="error-shows ">
                                {errorthumbnail}
                              </span>
                            </div>
                            <div
                              className="col-sm-3 "
                              style={{
                                fontSize: 12,
                                marginTop: 12,
                                color: "#007bff"
                              }}
                            >
                              Prescribed Size : 120x120 px
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">
                                Descripition
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter Description Text"
                                onChange={this.descriptionText}
                                value={descriptionText}
                              />
                              <span className="error-shows ">
                                {errordescription}
                              </span>
                            </div>
                            <div className="col-sm-3">
                              {/* {this.state.boxvalue !== 9 && ( */}
                              <div>
                                <br />
                                <label>Add Tray: </label>&nbsp;&nbsp;
                                <Switch
                                  height={18}
                                  width={41}
                                  marginTop={20}
                                  paddingTop={0}
                                  onChange={this.tray}
                                  checked={this.state.tray}
                                />
                              </div>
                              {/* )} */}
                            </div>
                          </div>
                          {this.state.tray && (
                            <div className="row form-group">
                              <div className="col-sm-2" />
                              <div className="col-sm-2">
                                <label htmlFor="exampleInputEmail1">
                                  Tray Text
                                </label>
                              </div>
                              <div className="col-sm-5">
                                <textarea
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Notification Text "
                                  onChange={this.traytext}
                                  value={traytext}
                                />
                                <span className="error-shows ">
                                  {errortext}
                                </span>
                              </div>
                              <div className="col-sm-3" />
                            </div>
                          )}
                        </div>
                      )}
                      {/* text & image  */}
                      {(this.state.boxvalue === 1 ||
                        this.state.boxvalue === 3) && (
                        <div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">
                                Upload Image
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={this.image}
                              />
                              <label
                                className="custom-file-label lblcross"
                                htmlFor="image"
                                style={{ fontSize: "15px", overflow: "hidden" }}
                              >
                                {" "}
                                <span style={{ fontSize: "12px" }}>
                                  {boxfilename}
                                </span>
                              </label>
                              <span className="error-shows ">
                                <br />
                                <br />
                                {errorfile}
                              </span>
                            </div>
                            <div
                              className="col-sm-3"
                              style={{
                                fontSize: 12,
                                marginTop: 12,
                                color: "#007bff"
                              }}
                            >
                              {" "}
                              Prescribed Size : 120x120 px
                            </div>
                          </div>
                          {this.state.boxvalue === 1 && (
                            <div className="row form-group">
                              <div className="col-sm-2" />
                              <div className="col-sm-2">
                                <label htmlFor="exampleInputEmail1">
                                  Text Content
                                </label>
                              </div>
                              <div className="col-sm-5">
                                <textarea
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Text Content"
                                  onChange={this.boxtext}
                                  value={boxtext}
                                />
                                <span className="error-shows ">
                                  {errortext}
                                </span>
                              </div>
                              <div className="col-sm-3" />
                            </div>
                          )}
                          {this.state.boxvalue === 3 && (
                            <div className="row form-group">
                              <div className="col-sm-2" />
                              <div className="col-sm-2">
                                <label htmlFor="exampleInputEmail1">
                                  link{" "}
                                </label>
                              </div>
                              <div className="col-sm-5">
                                <textarea
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Link Here"
                                  onChange={this.link}
                                  value={link}
                                />
                                <span className="error-shows ">
                                  {errortext}
                                </span>
                              </div>
                              <div className="col-sm-3" />
                            </div>
                          )}
                        </div>
                      )}
                      {/* Video */}
                      {this.state.boxvalue === 2 && (
                        <div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">
                                Upload Video
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="file"
                                id="image"
                                accept="video/*"
                                onChange={this.image}
                              />
                              <label
                                className="custom-file-label lblcross"
                                htmlFor="image"
                              >
                                {boxfilename}
                              </label>
                              <br />
                              <br />
                              <span className="error-shows ">{errorfile1}</span>
                            </div>
                            {/* <div className="col-sm-3">
                              <button type="button" className="btn btn-danger btn-radius" onClick={() => this.appendOverlayList()}>
                                Add Overlay
                              </button>
                            </div> */}
                          </div>
                          {this.showOverLay(appendData)}
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-7">
                              {uploadPercentage > 0 && (
                                <Progress percentage={uploadPercentage} />
                              )}
                            </div>
                            <div className="col-sm-3" />
                          </div>
                        </div>
                      )}

                      {/* Resource */}
                      {this.state.boxvalue === 4 && (
                        <div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="authorimage">Resource File</label>
                            </div>
                            <div className="col-sm-5 custom-file">
                              <MultiSelect
                                options={resourceOptions}
                                handleChange={this.resourceSelect}
                                selectedService={selectedresource}
                              />
                              <span className="error-shows">{errorfile}</span>
                            </div>
                            <div className="col-sm-3">
                              <div>
                                <div className="row form-group">
                                  <div className="col-sm-2" />
                                  <div className="col-sm-2">
                                    <LoginModal
                                      buttonTitle="Add Resource"
                                      title="Add Resource"
                                      id="Resource"
                                      extraClass="btn btn-primary"
                                      bodyText={
                                        <div>
                                          <div className="row form-group">
                                            <div className="col-sm-1" />
                                            <div className="col-sm-10">
                                              <Alert
                                                className="badge-content"
                                                color="success"
                                                isOpen={resourceAlert}
                                                toggle={this.onDismiss}
                                              >
                                                Resource Added Successfully
                                              </Alert>
                                            </div>
                                            <div className="col-sm-1" />
                                          </div>
                                          <div className="row form-group">
                                            <div className="col-sm-2">
                                              <label for="exampleInputEmail1">
                                                Select Domain
                                              </label>
                                            </div>
                                            <div className="col-sm-10">
                                              <SingleSelect
                                                options={
                                                  this.state.domainOptions
                                                }
                                                handleChange={this.domain}
                                                selectedService={
                                                  this.state.selectedDomain
                                                }
                                              />
                                              <span className="modal-error-show">
                                                {errordomain}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="row form-group">
                                            <div className="col-sm-2">
                                              <label htmlFor="Authorname">
                                                Resource Name
                                              </label>
                                            </div>
                                            <div className="col-sm-10">
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="Authorname"
                                                name="Authorname"
                                                placeholder="Resource Name"
                                                value={Authorname}
                                                onChange={this.authorname}
                                              />
                                              <span className="modal-error-show">
                                                {error}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="row form-group">
                                            <div className="col-sm-2">
                                              <label htmlFor="authorimage">
                                                Resource File
                                              </label>
                                            </div>
                                            <div className="col-sm-10 custom-file">
                                              <input
                                                type="file"
                                                accept="
                          image/*,
                          video/*,
                          application/pdf,application/msword,
                          applicationvnd.openxmlformats-officedocument.wordprocessingml.document,
                          .zip"
                                                className="custom-file-input"
                                                id="authorimage"
                                                onChange={this.authorimage}
                                              />
                                              <label
                                                className="custom-file-label"
                                                htmlFor="authorimage"
                                              >
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {this.state.filename}
                                                </span>
                                              </label>
                                              <span className="modal-error-show">
                                                {errorfile}
                                              </span>
                                            </div>
                                          </div>

                                          <div className="row form-group">
                                            <div className="col-sm-2" />
                                            <div className="col-sm-2" />
                                            <div className="col-sm-5">
                                              <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={this.submitresource}
                                              >
                                                submit
                                              </button>
                                            </div>
                                            <div className="col-sm-3" />
                                          </div>
                                        </div>
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Notification */}
                      {this.state.boxvalue === 5 && (
                        <div className="row form-group">
                          <div className="col-sm-2" />
                          <div className="col-sm-2">
                            <label htmlFor="exampleInputEmail1">
                              Notifcation Text
                            </label>
                          </div>
                          <div className="col-sm-5">
                            <textarea
                              type="text"
                              className="form-control"
                              placeholder="Enter Notificatin Text"
                              onChange={this.boxtext}
                              value={boxtext}
                            />
                            <span className="error-shows ">{errortext}</span>
                          </div>
                          <div className="col-sm-3" />
                        </div>
                      )}
                      {/* Events */}
                      {this.state.boxvalue === 6 && (
                        <div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">
                                Event Type
                              </label>
                            </div>
                            <div className="col-sm-5">
                              <SingleSelect
                                options={this.state.eventType}
                                handleChange={this.eventsChange}
                                placeholder="Select Event Type"
                                value={this.state.selectedEvents}
                              />
                              <span className="error-shows ">{errortext}</span>
                            </div>
                            <div className="col-sm-3">
                              <label>Attendance&nbsp;:</label>&nbsp;&nbsp;
                              <Switch
                                height={18}
                                width={41}
                                marginTop={20}
                                paddingTop={0}
                                onChange={this.attendance}
                                checked={this.state.attendance}
                              />
                            </div>
                          </div>
                          {this.state.events === "new" && (
                            <div>
                              <div className="row form-group">
                                <div className="col-sm-2" />
                                <div className="col-sm-2">
                                  <label htmlFor="exampleInputEmail8">
                                    Program Name
                                  </label>
                                </div>
                                <div className="col-sm-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Program Name"
                                    onChange={this.programName}
                                    value={this.state.programName}
                                  />
                                </div>
                                <div className="col-sm-3" >
                                  {/* {this.state.attendance  ?(
                                    <div>
                                      <QRCode id="123456" value="http://facebook.github.io/react/" />
                                      <a href="#" onClick={this.downloadQR}> Download QR </a>
                                    </div>
                                  ):null} */}
                                </div>
                              </div>
                              <div className="row form-group">
                                <div className="col-sm-2" />
                                <div className="col-sm-2">Date</div>
                                <div className="col-sm-3">
                                  From Date
                                  <input
                                    type="date"
                                    id="myDate"
                                    className="form-control"
                                    onChange={this.fromDateSelect}
                                    value={this.state.fromDateSelect}
                                  />
                                  <span className="error-shows">
                                    {this.state.startdateerror}
                                  </span>
                                </div>
                                <div className="col-sm-3">
                                  To Date
                                  <input
                                    type="date"
                                    className="form-control"
                                    onChange={this.toDateSelect}
                                    value={this.state.toDateSelect}
                                  />
                                  <span className="error-shows">
                                    {this.state.endateerror}
                                  </span>
                                </div>
                                <div className="col-sm-2 error-shows"> </div>
                              </div>
                              <div className="row form-group">
                                <div className="col-sm-2" />
                                <div className="col-sm-2"></div>
                                <div className="col-sm-6 error-shows">
                                  {" "}
                                  {this.state.calculatedateerror}{" "}
                                </div>
                                <div className="col-sm-2 "> </div>
                              </div>

                              <div className="row form-group">
                                <div className="col-sm-2" />
                                <div className="col-sm-2">
                                  <label htmlFor="exampleInputEmail8">
                                    Location
                                  </label>
                                </div>
                                <div className="col-sm-5">
                                  <SingleSelect
                                    options={locationOptions}
                                    handleChange={this.locationSelect}
                                    selectedService={locationSelect}
                                  />
                                  <span className="error-shows">
                                    {this.state.locationerror}
                                  </span>
                                </div>
                                <div className="col-sm-3" />
                              </div>
                            </div>
                          )}
                          {this.state.events === "lob" && (
                            <div>
                              <div className="row form-group">
                                <div className="col-sm-2" />
                                <div className="col-sm-2">
                                  <label htmlFor="exampleInputEmail8">
                                    Program Name
                                  </label>
                                </div>
                                <div className="col-sm-5">
                                  <SingleSelect
                                    handleChange={this.selectedprogram}
                                    options={programOptions}
                                    selectedService={selectedprogram}
                                  />
                                </div>
                                <div className="col-sm-3" />
                              </div>
                              <div className="row form-group">
                                <div className="col-sm-2" />
                                <div className="col-sm-2">Select Batch</div>
                                <div className="col-sm-5">
                                  <SingleSelect
                                    handleChange={this.batchSelect}
                                    options={batchOptions}
                                    selectedService={batchSelect}
                                  />
                                </div>
                                <div className="col-sm-3" />
                              </div>
                              <div className="row form-group">
                                <div className="col-sm-2" />
                                <div className="col-sm-2">
                                  <label htmlFor="exampleInputEmail8">
                                    Dates
                                  </label>
                                </div>
                                <div className="col-sm-5">
                                  <SingleSelect
                                    options={lobs}
                                    handleChange={this.lobSelect}
                                    selectedService={lobSelect}
                                  />
                                </div>
                                <div className="col-sm-3" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {/* URL & Json */}
                      {this.state.boxvalue === 7 && (
                        <div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">Url</label>
                            </div>
                            <div className="col-sm-5">
                              <input
                                type="text"
                                className="form-control"
                                id="Authoremail"
                                name="Authoremail"
                                placeholder="Enter Url"
                                onChange={this.jsonUrl}
                              />
                              <span className="error-shows ">
                                {errorurljson}
                              </span>
                            </div>
                            <div className="col-sm-3" />
                          </div>
                          <div className="row form-group">
                            <div className="col-sm-2" />
                            <div className="col-sm-2">
                              <label htmlFor="exampleInputEmail1">Json</label>
                            </div>
                            <div className="col-sm-5">
                              <textarea
                                type="text"
                                className="form-control"
                                placeholder="Paste Json Here"
                                onChange={this.boxtext}
                                value={boxtext}
                              />
                              <span className="error-shows ">{errortext}</span>
                            </div>
                            <div className="col-sm-3" />
                          </div>
                        </div>
                      )}
                      {/* Evaluation */}
                      {this.state.boxvalue === 8 && (
                        <div className="row form-group">
                          <div className="col-sm-2" />
                          <div className="col-sm-2">
                            <label htmlFor="exampleInputEmail1">
                              Evaluation Name
                            </label>
                          </div>
                          <div className="col-sm-5">
                            <SingleSelect
                              options={quizOptions}
                              handleChange={this.quizSelect}
                              selectedService={quizSelect}
                            />
                          </div>
                          <div className="col-sm-3">
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => this.refresh(this.state.boxvalue)}
                            >
                              Refresh
                            </button>
                          </div>
                        </div>
                      )}
                      {/* Forms */}
                      {this.state.boxvalue === 9 && (
                        <div className="row form-group">
                          <div className="col-sm-2" />
                          <div className="col-sm-2">
                            <label htmlFor="exampleInputEmail1">
                              Select Form
                            </label>
                          </div>
                          <div className="col-sm-5">
                            <SingleSelect
                              options={formOptions}
                              handleChange={this.formSelect}
                              selectedService={formSelect}
                            />
                          </div>
                          <div className="col-sm-3">
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => this.refresh(this.state.boxvalue)}
                            >
                              Refresh
                            </button>
                          </div>
                        </div>
                      )}
                      {/* Survey */}
                      {this.state.boxvalue === 10 && (
                        <div className="row form-group">
                          <div className="col-sm-2" />
                          <div className="col-sm-2">
                            <label htmlFor="exampleInputEmail1">
                              Select Survey
                            </label>
                          </div>
                          <div className="col-sm-5">
                            <SingleSelect
                              options={SurveyList}
                              handleChange={e =>
                                this.setState({ selectSurvey: e })
                              }
                              selectedService={selectSurvey}
                            />
                          </div>
                          <div className="col-sm-3">
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => this.refresh(this.state.boxvalue)}
                            >
                              Refresh
                            </button>
                          </div>
                        </div>
                      )}
                      {   this.state.boxvalue == 2 && (
                        <div className="row form-group">
                          <div className="col-sm-4" />
                          <div className="col-sm-3">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={
                                button === "Add" ? this.addtext : this.onSubmit
                              }
                            >
                              {this.state.button}
                            </button>
                          </div>
                          <div className="col-sm-3">
                            <button
                              type="button"
                              className="btn btn-danger btn-radius"
                              onClick={() => this.appendOverlayList()}
                            >
                              Add Overlay
                            </button>
                          </div>
                          <div className="col-sm-2" />
                        </div>
                      )}
                        
                       
                      {this.state.boxvalue != 2  &&  !this.state.boxlabel &&  (
                        <div className="row form-group">
                          <div className="col-sm-4" />
                          <div className="col-sm-5">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={
                                button === "Add" ? this.addtext : this.onSubmit
                              }
                            >
                              {this.state.button}
                            </button>
                          </div>
                          <div className="col-sm-3" />
                        </div>
                      )}


{!this.state.boxlabel &&
                       <span>
                        Total of {Object.keys(this.state.dataTableData).length}{" "}
                        records
                      </span>
                     
  }

                       {!this.state.boxlabel && 
                         (
                        <Datatable
                          data={this.state.dataTableData}
                          columnHeading={this.column}
                        />
                      )
                        }

{this.state.boxlabel &&
                       <span>
                        Total of {this.state.data_view.length}{" "}
                        records
                      </span>
                     
  }


                  {this.state.boxlabel && 
                         (
                        <Datatable
                          data={this.state.data_view}
                          columnHeading={this.column_data}
                        />
                      )
                        }
                      
                      {/* {this.state.dataTableData &&
                        this.state.dataTableReload && (
                          <Datatable
                            data={this.state.dataTableData}
                            columnHeading={this.column}
                          />
                        )} */}
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
}
function download(){
  var canvas = document.getElementsByTagName("canvas");
  var url = canvas.toDataURL("image/png");
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.getElementById('canvas').toDataURL();
  link.click();
}
export default AddPortlet;
