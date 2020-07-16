import React, { Component } from "react";
import { Alert } from "reactstrap";
import http from "../../MiddleWare/httpMiddleWare";
//import Datatable from "../../../../components/Datatable/Datatable";
import { ACCESS_POINT } from "../../config";
import Progress from "../Components/Extra/Progress";
import cmsContent from "../../MiddleWare/CmsContent";
import { Editor } from "@tinymce/tinymce-react";
import renderHTML from "react-render-html";
import LoginModal from "../Components/Modal/Modal";
//import AddLibaryModel from "../AddLibaryModel";

class Theme7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      btnDisable: false,
      uploadPercentage: 0,
      content: "<p></p>",
      isEdit: false,
      uploadPercentage: 0,
      screen: window.screen.height,
      alertVisible: false,
      customerId: localStorage.getItem("userId")
    };
  }
  async componentWillMount() {
    try {
      console.log(this.props.that);
      if (this.props.that.data) {
        let pages = [];
        this.props.that.data.map((ival, i) => {
          if (ival.themeId === 7) {
            pages.push(ival);
          }

        });
        this.setState({
          data: pages,userid:this.props.that.userid,customerId:this.props.that.customerId,catagory_values_select:this.props.catagory_values_select,secionvalueselect:this.props.secionvalueselect
        });
      }
      if (this.props.that.isEdit) {
        // console.log("edit");
        let content = this.props.that.theme4
          .split("SDAS/Video/")
          .join(`${ACCESS_POINT}/superAdmin/file?fileurl=SDAS/Video/`);
        this.setState({ isEdit: this.props.that.isEdit, editId:this.props.that.id,content });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    // try {
    //   const { data: List } = await cmsContent.getFreedom(
    //     "*",
    //     "tbl_image",
    //     `customerId=${this.state.customerId}`,
    //     "id",
    //     "id DESC"
    //   );
    //   if (List) {
    //     this.setState({ List });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  column = [
    {
      Header: "Page",
      accessor: "name"
    },
    {
      Header: "Status",
      accessor: "status"
    },
    {
      Header: "Visibility",
      accessor: "edit",
      Cell: d => this.showVisibility(d)
    },
    {
      Header: "Require Login",
      accessor: "requireLogin"
    },
    {
      Header: "Change Login Status",
      accessor: "edit",
      Cell: d => this.changeLoginStatus(d)
    },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: d => this.Editpages(d)
    },
    
  ];

  Lib_column = [
    {
      Header: "Hint",
      accessor: "type"
    },
    {
      Header: "Link",
      accessor: "file",
      Cell: d => this.fullLink(d)
    },
    {
      Header: "Type",
      accessor: "file_extension",
      Cell: d => this.file_extension(d)
    },
    
  ];

  file_extension = d => {
    let validationImage = ["jpeg", "jpg", "png", "gif"];
    let validationVideo = [
      "ogg",
      "ogv",
      "mpg",
      "mpeg",
      "mp4",
      "mp3",
      "dat",
      "avi"
    ];
    let ImageExtension = d.original.file_extension.toLowerCase();
    if (validationImage.indexOf(ImageExtension) !== -1) {
      return "Image";
    } else if (validationVideo.indexOf(ImageExtension) !== -1) {
      return "Video";
    } else {
      return "NA";
    }
  };

   

  fullLink = d => {
    return `${ACCESS_POINT}/superAdmin/file?fileurl=${d.original.file}`;
  };

   

  
  showVisibility = id => {
    return (
      <button
        type="button"
        className="btn btn-info"
        onClick={() => this.updateVisibility(id)}
      >
        Hide/Show
      </button>
    );
  };
  updateVisibility = async value => {
    const index = value.index;
    const previousData = [...this.state.data];
    const newData = { ...previousData[index] };

    if (newData.status === "show") {
      newData.status = "hide";
    } else {
      newData.status = "show";
    }
    const id = newData.id;
    const data = previousData.filter(value => value.id !== id);
    data.splice(index, 0, newData);
    try {
      const result = await cmsContent.updatePage(newData);
      if (result) {
        this.setState({ data: data });
      }
    } catch (error) {
      this.setState({ data: previousData });
      console.log(error);
    }
  };
  changeLoginStatus = id => {
    return (
      <button
        type="button"
        className="btn btn-info"
        onClick={() => this.updateLogin(id)}
      >
        Change Login Status
      </button>
    );
  };

  updateLogin = async value => {
    const index = value.index;
    const previousData = [...this.state.data];
    const newData = { ...previousData[index] };
    if (newData.requireLogin === "yes") {
      newData.requireLogin = "no";
    } else {
      newData.requireLogin = "yes";
    }
    const id = newData.id;
    const data = previousData.filter(value => value.id !== id);
    data.splice(index, 0, newData);
    this.setState({ data });
    try {
      const result = await cmsContent.updateLoginStatus(newData);
      if (result) {
        this.setState({ data: data });
      }
    } catch (error) {
      this.setState({ data: previousData });
      console.log(error);
    }
  };
  Editpages = value => {
    return (
      <button className="btn btn-info" onClick={() => this.onEdit(value)}>
        Edit
      </button>
    );
  };
  onEdit = async d => {
    let org = d.original;
    let index = d.index;
    const options = [
      { label: "Theme1", value: "1" },
      { label: "Theme2", value: "2" },
      { label: "Theme3", value: "3" },
      { label: "Theme4", value: "4" },
      { label: "Theme5", value: "5" },
      { label: "Theme6", value: "6" },
      { label: "Theme7", value: "7" },
      { label: "Theme8", value: "8" },
      { label: "Theme9", value: "9" }
    ];
    if (typeof this.props.these === "function") {
      this.props.these("pageName", org.name);
      this.props.these(
        "autherSelected",
        this.props.that.authorlist.filter(
          ival => ival.value === org.authorid
        )[0]
      );
      this.props.these('themeSelected', options.filter(ival => ival.value == org.themeId)[0]);
      this.props.these("checked", org.show == 1 ? 1 : 0);
      this.props.these("errorPageName", "");
      this.props.these("errorAuthorName", "");
      this.setState({
        contentTitle1: org.contentTitle1,
        searchTags: org.searchTags
      });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    let content = org.sheetContent
      .split("SDAS/Video/")
      .join(`${ACCESS_POINT}/superAdmin/file?fileurl=SDAS/Video/`);
    this.setState({ content, isEdit: true, editId: org.id, Index: index });
  };
  handleModelChange = model => {
    this.setState({
      content: model
    });
  };

  submitCategory = async () => {
    const { checked, autherSelected, pageName, customerId } = this.props.that;
    let { content, Index } = this.state;
    let Images = [];
     
    content = content
      .split(`${ACCESS_POINT}/superAdmin/file?fileurl=`)
      .join("");
      //pageName
    const formData = new FormData();
    formData.append("name", 'check page');
    formData.append("themeId", "7");
    console.log(this.props.that.isEdit)
    if(this.props.that.isEdit==true)
    {
   
    }
    else
    {
     
    }
 
 //contentTitle1 => secionvalueselect 
 //content1 => catagory 

    formData.append("customerId", this.state.customerId);
    formData.append("sheetContent", content);
    formData.append("subTitleId", this.state.userid);
    formData.append("contentTitle1", this.props.that.secionvalueselect.value);
    formData.append("content1", this.props.that.catagory_values_select.value);


    
    try {
      if (this.state.isEdit) {
       
        formData.append("id", this.state.editId);
        console.log([...formData])
        let { data } = await http.put(
          ACCESS_POINT + `/cmsContent/tbl_pages`,
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
        if (data && data.length) {
          data = data[0];
          const previousData = [...this.state.data];

          if (this.props.that.isEdit) {
            let index = this.props.that.data.indexOf(this.props.that.data1);
            previousData[index] = data;
          

          }
          else {
            previousData[Index] = data;
          }
          setTimeout(
            () =>
              this.setState({
                data: previousData,
                content: "<p></p>",
                isEdit: false,
                btnDisable: false
              }),
            10000
          );
          this.props.these("pageName", "");
          this.props.these("checked", 0);
          this.props.these("errorPageName", "");
          this.props.these('autherSelected', '');
          this.props.these('themeSelected', '');
          this.props.these('isEdit',false)
          this.setState({searchTags:''})
          setTimeout(() => this.props.these("alertVisible", true), 10000);
        }
      } else {
        console.log([...formData])
      
        let { data } = await http.post(
          ACCESS_POINT + `/cmsContent/tbl_pages`,
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
        if (data && data.length) {
          data = data[0];
          const previousData = [data, ...this.state.data];
          
          setTimeout(
            () =>
              this.setState({
                data: previousData,
                content: "<p></p>",
                isEdit: false,
                btnDisable: false
              }),
            10000
          );
          
        this.props.these('themeSelected', '')
     
          setTimeout(() => this.props.these("alertVisible", true), 10000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  onDismiss = () => {
    this.setState({ alertVisible: false });
  };
  selectImage = e => {
    this.setState({ file: e.target.files[0] });
    this.setState({ fileName: e.target.files[0].name });
  };
  submit = async e => {
    e.preventDefault();
    const { file, hint } = this.state;
    if (!file) {
      this.setState({ errorFile: "Select File to Upload" });
      return false;
    } else if (!hint) {
      this.setState({ errorFile: "", errorHint: "Enter Searchable hint" });
      return false;
    } else {
      this.setState({ errorFile: "", btnDisable: true });
      let customerId = this.state.customerId;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", hint);
      formData.append("customerId", customerId);
      try {
        const Result = await cmsContent.insertImage(formData, "tbl_image");

        if (Result) {
          console.log(Result);
          let list = this.state.List;
          list.push(Result.data);
          this.setState({
            List: list,
            file: "",
            errorFile: "",
            btnDisable: false,
            alertVisible: true,
            fileName: "choose File",
            errorHint: null
          });
          //remove success msg after 3 sec
          setTimeout(() => this.setState({ alertVisible: false }), 3000);
        }
      } catch (error) {}
    }
  };
  handlechange = e => {
		this.setState({ [e.target.name]: e.target.value });
  };
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



  render() {
    const { uploadPercentage } = this.state;
    return (
      <React.Fragment>

         
        <div className="row form-group">
          <div className="col-sm-2" />
          <div className="col-sm-2" />
          <div className="col-sm-5">
            <h2 style={{ color: "#000" }}>Content</h2>
          </div>
          
        </div>
        <div className="row form-group">
          <div className="col-sm-1" />
          <div className="col-sm-10" style={{ zIndex: 0, minHeight: 150 }}>
            <Editor
              apiKey="sqrfu0ffkb8d8fdyjqgxuvtkcvru79noq34s32622j87etzv"
              initialValue={this.state.content}
              value={this.state.content}
              init={{
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
alignleft aligncenter alignright alignjustify | \
bullist numlist outdent indent | removeformat | code | preview | help"
              }}
              onEditorChange={this.handleModelChange}
            />
          </div>
          <div className="col-sm-1" />
        </div>

        <div className="row form-group">
          <div className="col-sm-2" />
          <div className="col-sm-2" />
          <div className="col-sm-5">
            <button
              type="button"
              className={`btn ${
                this.state.isEdit ? "btn-secondary" : "btn-primary"
              }`}
              disabled={this.state.btnDisable}
              onClick={this.submitCategory}
            >
              {this.state.isEdit ? "Update" : "Add Page"}
            </button>
          </div>
          <div className="col-sm-3" />
        </div>
        <div className="row form-group">
          <div className="col-sm-2" />
          <div className="col-sm-7">
            {uploadPercentage > 0 && <Progress percentage={uploadPercentage} />}
          </div>
          <div className="col-sm-3" />
        </div>

        <div className="row form-group">
          <h2>Check</h2>
        </div>
        <div className="row form-group">
          {/* <div className="col-sm-12">
            {this.state.data ? (
              <Datatable data={this.state.data} columnHeading={this.column} />
            ) : null}
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Theme7;
