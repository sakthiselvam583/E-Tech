import React, { Component } from "react";
import CmsContent from "../../MiddleWare/CmsContent";
import Datatable from "../Components/Datatable/Datatable";
import { Alert } from "reactstrap";
import FormMiddleWare from "../Components/FormMiddleware";
import SingleSelect from "../Components/SingleSelect";
import { async } from "q";
import Progress from "../Components/Extra/Progress";
import http from "../../MiddleWare/httpMiddleWare";
import { ACCESS_POINT } from "../../config";
import Tooltip from "react-simple-tooltip";
//import { th } from "date-fns/locale";
import LoginModal from "../Components/Modal/Modal";
import { confirmAlert } from "react-confirm-alert";

class Resources extends FormMiddleWare {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Authorname: "",
      error: null,
      errorfile: null,
      errordomain: null,
      disableValue: false,
      uploadPercentage: 0,
      button: "Submit",
      alertVisible: false,
      alertVisible1: false,
      formAlertdelete: false,
      error1: null,
      textalert: null,
      color: "success",
      binaryFileType: false
    };
  }

  async componentWillMount() {
    try {
      let userlog = JSON.parse(localStorage.getItem("Userdata"));
      console.log(userlog)
      let companyid = userlog.customerId;
      this.setState({ companyid });
      console.log(this.state.userlog)
      const category = await CmsContent.getConditionedValuewithStatus(
        "tbl_domain",
        "companyid",
        companyid
      );
      if (category) {
        this.setState({ DomainList: category.data,  });
        console.log(category.data)
      }

      let result = await CmsContent.getFreedom(
        " tbl_resources.*",
        " tbl_resources",
        `companyid=${companyid} `,
        "id",
        "id DESC"
      )


 
      let excel = [];
      if (result) {
        result.data.map((item,i)=>{
          excel.push({
            index: i+1,
            domain : this.getValueFromArray(item.domainid, this.state.DomainList),
            resource : item.name})
        })
       // this.setState({ data: result.data });
        console.log(excel)
      }
      if (result.data.length > 0) {

        const header = [
          'SI.NO',
          'DOMAIN',
          'RESOURCES'
        ];
  const excelHead =  [
          { label: "SI.No", key: "index" },
          { label: "Domain", key: "domain" },
          { label: "Resources", key: "resource" }
        ];
          


        this.setState({
          header,
          excelHead,
          excel,
          data : result.data,
          title:"RESOURCES"
           
        });
      }


    } catch (error) {
      console.log(error);
    }
  }

  column = [
    {
      id: "domainid",
      Header:"Domain",
      accessor: d =>
        d !== undefined && d.domainid !== null && d.domainid !== undefined
          ? this.getValueFromArray(d.domainid, this.state.DomainList)
          : "-",
      cell: d =>
        this.getValueFromArray(d.domainid, this.state.DomainList),
        
    },
    {
      Header: "Resource",
      accessor: "name",
      
    },
    {
      Header:"Edit",
      accessor: "edit",
      Cell: d => this.edit(d)
    },
    {
      Header: "Delete",
      accessor: "delete",
      Cell: d =>
        this.dataTableButton("danger", "Delete", () => {
          this.buttonDeletes(d);
        })
    }
  ];
  wait = d => {
    return null;
  };

  buttonEdit = value => {
    let index = value.index;
    let values = value;
    let editvalue = values;
    let editid = values.id;
    let selectedDomain = {};
    selectedDomain.value = values.domainid;
    selectedDomain.label = this.getValueFromArray(
      values.domainid,
      this.state.DomainList
    );
    let Authorname = values.name;
    let filename = values.file;
    let extension = values.extension;
    this.setState({
      disableValue: true,
      extension,
      filename,
      selectedDomain,
      Authorname,
      editid,
      editvalue,
      index,
      button: "Update"
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
    const previousData = [...this.state.data];
    let id = value.id;
    try {
      const result = await CmsContent.getSingleConditionedValue(
        "tbl_resources",
        "id",
        id,
        "Delete"
      );
      if (result) {
        let datas = previousData.filter((delelteid, i) => {
          if (delelteid.id !== value.id) {
            return delelteid;
          }
        });
        this.setState({
          data: datas,
          alertVisible: true,
          textalert: "Selected Resource Deleted",
          color: "danger"
        });
        setTimeout(() => this.setState({ alertVisible: false }), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
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

  async fileCheck(userfile) {
    var that = this;
    var binaryFileType = false;
    const file = userfile;
    const filereader = new FileReader();
    filereader.onloadend = function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        const uint = new Uint8Array(evt.target.result);
        let bytes = [];
        uint.forEach(byte => {
          bytes.push(byte.toString(16));
        });
        const hex = bytes.join("").toUpperCase();
        alert(hex);
        if (that.getMimetype(hex) != "Unknown filetype") {
          that.setState({ binaryFileType: true });
        }
        // alert(binaryFileType);
      }
    };
    const blob = file.slice(0, 4);
    filereader.readAsArrayBuffer(blob);
  }

  addnew = async () => {
    const { Authorname, Authoremail } = this.state;
    let userfile = this.state.file;
    var selectOption = this.state.selectedDomain;
   
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
    if (this.state.filesize > 250000) {
      this.setState({
        errorfile: "Please Select a file size below 250kb"
      });
      return false;
    }
    

    var binaryFileType = this.state.binaryFileType;
    alert(binaryFileType);
    if (!binaryFileType) {
      this.setState({ errorfile: "Please Choose Valid Image File" });
     
      return false;
    } else {
      
      this.setState({ errorfile: "" });
    }

    //let validation = ['doc','xls','ods','odt','odp','pdf','jpeg','jpg','svg','ogg','ogv','MPG','MPEG','mp4','mkv','webm','avi','dat','ppt','xls','docx','bmp','tiff'];
    let username = this.state.Authorname;
    
    let useremail = this.state.selectedDomain;
    let companyid = this.state.companyid;
    let active = "active";
    
               
    const formData = new FormData();
    formData.append("name", username);
    formData.append("companyid", companyid) ;
    formData.append("file", userfile);
    formData.append("status", active);
    
   console.log([...formData])
    let categoryArray = {};
    categoryArray.name = username.trim();
    this.setState({ disableValue: true });
    try {
      this.setState({ disableValue: true });
      const authorinsert = await http.post(
        ACCESS_POINT + `/cmsContent/addauthor/tbl_resources`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            this.setState({
              uploadPercentage: parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            });
            setTimeout(() => this.setState({ uploadPercentage: 0 }), 10000);
          }
        }
      );
      if (authorinsert) {
       
        let response = authorinsert.data;

        if (response == "Invalid file Format") {
          this.setState({ errorfile: "Please Choose Valid Resource file" });
        } else {
          // this.setState({response});
          let valueArray = {};
          valueArray.id = authorinsert.data.insertId;
          valueArray.name = categoryArray.name;
         
          valueArray.domainid = categoryArray.domainid;
          const newData = [valueArray, ...this.state.data];
          this.setState({
            data: newData,
            disableValue: false,
            alertVisible: true,
            Authorname: "",
            filename: null,
            selectedDomain: "",
            button: "Submit",
            textalert: "New Resource Added",
            color: "success",
            binaryFileType: false
          });
          setTimeout(() => this.setState({ alertVisible: false }), 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  update = async () => {
    let id = this.state.editid;
    const {
      extension,
      file,
      editvalue: value,
      selectedDomain,
      Authorname
    } = this.state;

    let userfile = this.state.file;

    // let validation = [
    //   "doc",
    //   "xls",
    //   "ods",
    //   "odt",
    //   "odp",
    //   "pdf",
    //   "jpeg",
    //   "jpg",
    //   "svg",
    //   "ogg",
    //   "ogv",
    //   "mpg",
    //   "mpeg",
    //   "mp4",
    //   "mkv",
    //   "webm",
    //   "avi",
    //   "dat",
    //   "ppt",
    //   "xls",
    //   "docx",
    //   "bmp",
    //   "tiff",
    //   "png"
    // ];
    // let ext = userfile.name.split(".").pop();
    // let fileextension = ext.toLowerCase();
    // // var test = validationImage.filter((obj)=>{
    // //   return obj == ImageExtension;
    // // })
    // if (validation.indexOf(fileextension) == -1) {
    //   this.setState({ errorfile: "Please Choose Valid Image File" });
    
    //   return false;
    // } else {
    
    //   this.setState({ errorfile: "" });
    // }
    var binaryFileType = this.state.binaryFileType;
    //alert(binaryFileType);
    if (!binaryFileType) {
      this.setState({ errorfile: "Please Choose Valid Image File" });
      
      return false;
    } else {
      
      this.setState({ errorfile: "" });
    }

    let previousdata = [...this.state.data];
    let index = this.state.index;
    try {
      const formdata = new FormData();
      formdata.append("id", id);
      formdata.append("domainid", selectedDomain.value);
      formdata.append("name", Authorname);
      formdata.append("file", this.state.file);
      formdata.append("extension", extension);
      //formDatas.append('email', this.state.Authoremail);
      //formDatas.append('about', this.state.Authorabout);
      formdata.append("status", "active");

      const result = await CmsContent.updateMasters(formdata, "tbl_resources");

      if (result) {
     

        previousdata[index].id = id;
        previousdata[index].name = Authorname;
        previousdata[index].domainid = selectedDomain.value;
        this.setState({
          data: previousdata,
          alertVisible: true,
          disableValue: false,
          Authorname: "",
          selectedDomain: "",
          filename: "",
          editimage: "",
          button: "Submit",
          textalert: "Resource Updated",
          color: "success",
          binaryFileType: false
        });
        setTimeout(() => this.setState({ alertVisible: false }), 3000);
        // this.setState({ alertVisible: true, Authorname: '', Authoremail: '', authorimage: '', editimage: '', Authorabout: '', button: 'Submit', data: previousdata });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handlechange = e => {
    let value = e.target.value;
   
    this.setState({ editvalue: value });
  };
  submitdomain = async () => {
    const { editvalue: value, companyid } = this.state;
    if (value === null || value === "" || value === undefined) {
      this.setState({ error1: "Please insert a domain" });
      return false;
    }
    let groupArray = {};
    groupArray.name = value.trim();
    groupArray.companyid = companyid;
    groupArray.status = "active";

    
    try {
      this.setState({ disableValue: true });
      const result = await CmsContent.addMaster("tbl_domain", groupArray);
     
      if (result) {
        this.componentWillMount();

        
        this.setState({
          alertVisible: true,
          disableValue: false,
          textalert: "New Domain Added",
          button: "Submit"
        });
        setTimeout(() => this.setState({ alertVisible: false }), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  domain = e => {
    this.setState({ selectedDomain: e });
  };
  authorname = e => {
    let name = e.target.value;
    this.setState({ Authorname: name });
  };
  authorimage = e => {
    let filename = e.target.files[0];
    let filepath = e.target.files[0].name;
    var filesize = filepath.size;
    this.fileCheck(filename);
    this.setState({ file: filename, filename: filepath, filepath: filesize });
  };

  onDismiss = () => {
    this.setState({ alertVisible: false });
    this.setState({ alertVisible1: false });
    this.setState({ formAlertdelete: false });
  };

  getMimetype(signature) {
    switch (signature) {
      case "89504E47":
        return "image/png";
      case "47494638":
        return "image/gif";
      case "FFD8FFDB":
        return "image/jpg";
      case "FFD8FFE0":
        return "image/jpeg";
      case "25504446":
        return "application/pdf";
      case "52494646":
        return "video/dat/avi";
      case "001B3":
        return "video/mpg/mpeg";
      case "4F676753":
        return "video/ogv/ogg";
      case "00020":
        return "video/mp4";
      case "00018":
        return "video/mp4";
      case "4944333":
        return "video/mp3";
      // case "52494646":
      //   return "video/avi";
      // case "4D5A900":
      //   return "image/exe";
      default:
        return "Unknown filetype";
    }
  }

  render() {
    const {
      Authorname,
      button,
      error,
      errorfile,
      errordomain,
      alertVisible,
      alertVisible1,
      formAlertdelete,
      uploadPercentage,
      disableValue,
      editvalue,
      error1,
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
                    <h1>Resource Master</h1>
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
                          {/* NEW Resource Added */}
                          {textalert}
                        </Alert>
                        {/* <Alert
                          className="badge-content"
                          color="success"
                          isOpen={alertVisible1}
                          toggle={this.onDismiss}
                        >
                          New Resource Edited
                        </Alert>

                        <Alert
                          className="badge-content"
                          color="danger"
                          isOpen={formAlertdelete}
                          toggle={this.onDismiss}
                        >
                          New Resource Deleted
                        </Alert> */}
                      </div>
                      <div className="col-sm-3" />
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                      
                      </div>
                      <div className="col-sm-5">
                        
                        
                      </div>
                      <div className="col-sm-3">
                      
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="Authorname">Resource Name</label>
                      </div>
                      <div className="col-sm-5">
                        <input
                          type="text"
                          className="form-control"
                          id="Authorname"
                          name="Authorname"
                          placeholder="Resource Name"
                          value={Authorname}
                          onChange={this.authorname}
                        />
                        <span className="modal-error-show">{error}</span>
                      </div>
                      <div className="col-sm-3" />
                    </div>

                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2">
                        <label htmlFor="authorimage">Resource File</label>
                      </div>

                      <div className="col-sm-5 custom-file">
                        <Tooltip
                          style={{
                            fontSize: 10,
                            padding: 10
                          }}
                          content=" Image - Dimensions 120x120 - Max Size 250 KB

                Video  - Max Size 250 KB

                  Files - Max Size 250 KB"
                        >
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
                        </Tooltip>

                        <label
                          className="custom-file-label"
                          htmlFor="authorimage"
                        >
                          {this.state.filename}
                        </label>
                      </div>

                      {this.state.editimage && (
                        <img src={this.state.editimage} alt="image" />
                      )}

                      <div className="col-sm-3" />
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-5">
                        <span className="modal-error-show">{errorfile}</span>
                      </div>
                    </div>
                    <br />
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-7">
                        {uploadPercentage > 0 && (
                          <Progress percentage={uploadPercentage} />
                        )}
                      </div>
                      <div className="col-sm-3" />
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-2" />
                      <div className="col-sm-2" />

                      <div className="col-sm-5">
                        <button
                          type="button"
                          className="btn btn-primary"
                          // disabled={disableValue}
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
                      Total of {Object.keys(this.state.data).length} records
                    </span>
                    {this.state.data && (
                     <Datatable
                     data={this.state.data}
                     columnHeading={this.column}
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
export default Resources;
