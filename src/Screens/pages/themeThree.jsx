import React, { Component } from "react";
import renderHTML from "react-render-html";
import CmsContent from "../../MiddleWare/CmsContent";
import "./theme3/style.css";
import "./theme3/videoStyle.css";
import PreLoader from '../preloader'
import NewVideoPlayer from "./theme3/NewVideoPlayer";
import http from "../../MiddleWare/httpMiddleWare";


class themeThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: "",
      themeid: "",
      date: "",
      customerId: 159
    };
	 
    let userlog = localStorage.getItem("userDetails");
	  userlog = JSON.parse(userlog);
	   if(userlog === null){
		   userlog = localStorage.getItem("Admin");
		   userlog = JSON.parse(userlog)
	   }
	   console.log(userlog);
    //userlog = JSON.parse(userlog);
     // console.log(localStorage.getItem("userDetails"));
   //userlog = { id: 118, userName: "asdasdasd", email: "ram@dotcue.net", mobileNumber: '8940756775', customerId:117 };
    //console.log(localStorage.getItem("Admin"));
    localStorage.setItem("userId", userlog.id);
    this.state.userId = userlog.id;
	 if(userlog.userType=="6"){
	this.state.customerId=userlog.customerId;
	 }else if(userlog.userType=="3"){
		 this.state.customerId=userlog.id;
	 }
    localStorage.setItem("userName", userlog.userName);
    localStorage.setItem("userEmail", userlog.email);
    localStorage.setItem("userMobile", userlog.mobileNumber);
  }
  async componentWillReceiveProps(nextProps) {
    await this.getContent(nextProps.match.params.id);
  }

  async componentDidMount() {
//console.log(this.props.match.params.id); 
    await this.getContent(this.props.match.params.id);
  }

  async getContent(themeid) {
	  //console.log(themeid);
    let ipaddressget = await http.get('https://ipapi.co/json/', function (data) {
      console.log(JSON.stringify(data, null, 2));
    })
    //console.log(ipaddressget.data.ip)

    const date = new Date();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var newdate = year + "-" + month + "-" + day;

    var timesDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + '';

    const userlog = new FormData;
    userlog.append('userid', this.state.userId)
    userlog.append('ipaddress', ipaddressget.data.ip)
    userlog.append('datetime', timesDate)
    userlog.append('date', newdate)
    userlog.append('pageid', themeid)


    userlog.append('customerId',this.state.customerId)


    //console.log([...userlog])
     //let datauser=await CmsContent.addMaster('tbl_CMSuserAccessLog',userlog);
     //console.log(datauser)
    const formData = new FormData;
    formData.append('userId', this.state.userId);
    formData.append('pageid', themeid);
    let countResult = await CmsContent.pageViewCount(formData);
     //console.log(countResult);
    const result = await CmsContent.samplesitepage(this.state.customerId,themeid);
   //console.log(this.state.customerId)
   //console.log(themeid);    
   if (result) {
      //console.log(result);
      if (result.data[0].Date) {
        var dataformate = result.data[0].Date.split("-");
        this.setState({
          date: dataformate[2] + "-" + dataformate[1] + "-" + dataformate[0]
        });
      }


      this.setState({
        pageList: result.data[0],
        themeid: themeid,
        countViews: countResult.data.resultcount
      });
    }
  }
  /*coverContent = con => {
    if (this.state.pageList.linkto) {
      return <a href={"https://" + `${this.state.pageList.linkto}`} target="_blank">{con}</a>;
    }
    return con;
  };*/

  render() {
    const { pageList, date } = this.state;
	//console.log(this.state.themeid);
    if (!pageList) {
      return <PreLoader/>;
    } else {
      return (
        <React.Fragment>
		<div class="breadcrumb-area" style={{backgroundColor:"#3c5dac"}}>
        <div class="container" style={{backgroundColor:"#3c5dac"}}> 
            <div class="row" style={{backgroundColor:"#3c5dac"}}> 
			 <div class="col-10" style={{marginTop:'7%'}}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb" style={{marginLeft:'0%'}}>
							<li class="breadcrumb-item"><a href={"/"}><i class="fa fa-home"></i>Home</a></li>
		                    <li class="breadcrumb-item active" aria-current="page">{pageList.contentTitle1}</li>	
						</ol>
                    </nav>
                </div>
				 <br/> 
                 <br/>
	 <div class="about-us-area section-padding-0-100"  style={{width:'100%',marginTop:'2%'}}>
		<div class="container">			 
	      <div class="row">
			<div class="col-12">
		<div class="about-content" style={{marginTop:"17px",paddingTop:'50px',boxShadow:'0 10px 30px 0 #000000'}}>	
		 <div class="section-heading text-center">
		 {pageList.contentTitle1 &&(
			<h2 class="post-title" style={{color:"#191919"}}>
                {pageList.contentTitle1}
		 </h2>)}
			</div>
		<div class="post-share">
		{pageList.content1 && (  
            <p>
            {renderHTML(pageList.content1)}
            </p>
           )}
        </div>
		<div className="row  card-row-height-video">
           <div className="col-sm-12">
            <div>
           {this.state.themeid && (
              <NewVideoPlayer Video={this.state.themeid} />
           )}
             </div>
             </div>
            </div>
		<div  className="row video-view-eye"
            style={{ paddingLeft: "0", marginLeft: "-28px" }}
          >
          <span className="view-section">
            <i class="fa fa-eye icon-left" aria-hidden="true">
           <span className="video-count-spacing">{`${this.state.countViews} views`}</span>
           </i>
          </span>
           </div>	
		
		
		</div>
		</div>
		</div>
		
		</div>
		</div>
				   </div>
			</div>
			</div>
        {/*  <div className="container-fluid container-margin-top">
            <div className="row">
              <div className="col-sm-10" style={{marginTop:'7%'}}>
                <div className="card ">
                  <div className="card-body ">
                    <div className="row">
                      {pageList.contentTitle1 &&
                        this.coverContent(
                          <h2 className="theme-tiile text-capitalize">
                            {pageList.contentTitle1}
                          </h2>
                        )}
                    </div>
                    <br />
                    
                    <div className="row">
                      <div className="col-sm-12">
                        {pageList.content1 &&
                          this.coverContent( 
                            <p className="content-para">
                              {renderHTML(pageList.content1)}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="row  card-row-height-video">
                      <div className="col-sm-12">
                        <div>
                          {this.state.themeid && (
                            <NewVideoPlayer Video={this.state.themeid} />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className="row video-view-eye"
                      style={{ paddingLeft: "0", marginLeft: "-28px" }}
                    >
                      <span className="view-section">
                        <i class="fa fa-eye icon-left" aria-hidden="true">
                          <span className="video-count-spacing">{`${this.state.countViews} views`}</span>
                        </i>
                      </span>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="blog-post-author d-flex">
                      {pageList.show === "1" && (
                        <div>
                          <div className="author-thumbnail">
                            <img src={pageList.authorimage} alt="" />
                          </div>
                          <div className="author-info">
                            <a className="author-name">
                              {pageList.authorname}, <span>The Author</span>
                            </a>
                            <p>{pageList.authorabout}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
		</div>*/}
        </React.Fragment>
      );
    }
  }
}

export default themeThree;
