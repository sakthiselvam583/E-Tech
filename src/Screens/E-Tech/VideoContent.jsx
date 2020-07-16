import React, { Component } from "react";
import renderHTML from "react-render-html";
import CmsContent from "../../MiddleWare/CmsContent";

//import "./style.css";
import "./videoStyle.css";
import NewVideoPlayer from "../Components/Extra/NewVideoPlayer";
import http from "../../MiddleWare/httpMiddleWare";

class VideoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: "",
      themeid: "",
      date: ""
    };
    let userlog = localStorage.getItem("Userdata");
    userlog = JSON.parse(userlog);
    localStorage.setItem("userId", userlog.id);
    this.state.userId = userlog.id;
    localStorage.setItem("userName", userlog.userName);
    localStorage.setItem("userEmail", userlog.email);
    localStorage.setItem("userMobile", userlog.mobileNumber);
  }
  async componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0)
    await this.getContent(nextProps.match.params.id);
    this.componentWillUnmount();
  }

  async componentDidMount() {
    window.scrollTo(0, 0)

    const date = new Date();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var newdate = year + "-" + month + "-" + day;
    var timesDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + '';
    localStorage.setItem("startTime",timesDate);
    localStorage.setItem("themeId", this.props.match.params.id);
    await this.getContent(this.props.match.params.id);
  }
  async componentWillUnmount() {

    let ipaddressget = await http.get('https://ipapi.co/json/', function (data) {
      console.log(JSON.stringify(data, null, 2));
    })
    const date = new Date();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var newdate = year + "-" + month + "-" + day;
    var timesDate = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + '';
    var userId = JSON.parse(localStorage.getItem("userlog")).id;
    var max = localStorage.getItem("max");
    var startTime = localStorage.getItem("startTime");
    max = max ? max : 0;
    var themeid = localStorage.getItem("themeId");
    themeid = themeid ? themeid : this.props.match.params.id;
    const userlog = new FormData();
    userlog.append('userid', userId)
    userlog.append('ipaddress', ipaddressget.data.ip)
    userlog.append('datetime', timesDate)
    userlog.append('date', newdate)
    userlog.append('startTime', startTime)
    userlog.append('max_timeline', max)
    userlog.append('pageid', themeid)
    userlog.append('customerId', JSON.parse(localStorage.getItem("userlog")).customerId)
    console.log([...userlog])
    let datauser = await CmsContent.addMaster('tbl_CMSuserAccessLog', userlog);

    let data = [];
    let Innerdata = {};
    Innerdata.userid = userId;
    Innerdata.maxtime = max;
    Innerdata.pageid = themeid;
    data.push(JSON.stringify(Innerdata));
    const log = new FormData();
    log.append('fullList', data);
    await CmsContent.insertMaster('videos_view_count', data);

    localStorage.setItem("startTime",timesDate);
    localStorage.setItem("themeId", this.props.match.params.id);
    localStorage.setItem("max", 0);
  }
  async getContent(themeid) {

    const formData = new FormData();
    formData.append('userId', this.state.userId);
    formData.append('pageid', themeid);
    let countResult = await CmsContent.pageViewCount(formData);

    const result = await CmsContent.getVideoContentById(themeid);
    if (result) {
      if (result.data[0].Date != null && result.data[0].Date != undefined) {
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
  coverContent = con => {
    if (this.state.pageList.linkto) {
      return <a href={"https://" + `${this.state.pageList.linkto}`}>{con}</a>;
    }
    return con;
  };

  render() {
    const { pageList, date } = this.state;
    // if (!pageList) {
    //   return <PreLoader />;
    // } else
    {
      return (
        <React.Fragment>
          <div className="container-fluid container-margin-top">
            <div className="row">
              <div className="col-sm-8">
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
                    {/* {this.coverContent(
                      <p
                        style={{
                          color: "#828282",
                          fontSize: 14,
                          lineHeight: 0,
                          fontWeight: 400,
                          marginTop: 0,
                          paddingTop: 0
                        }}
                      >
                        {"Last Updated :"}
                        {date}
                      </p>
                    )}
                    <br /> */}
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
                    {/* <br />
                  <br />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
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
             
          </div>
        </React.Fragment>
      );
    }
  }
}

export default VideoContent;
