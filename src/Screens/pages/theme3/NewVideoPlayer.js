import React, { Component } from "react";
import ScriptTag from "react-script-tag";
import overlayImg from "./N333333-1.png";
import CmsContent from "../../../MiddleWare/CmsContent";
import socket from "../../../MiddleWare/socketMiddleWare";
import "./style.css";
import "./videoStyle.css";
import http from "../../../MiddleWare/httpMiddleWare";
import Iframe from 'react-iframe'

const videoScript = "/assets/js/video-player.js";

class NewVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: "",
      openModal: false,
      videoPause: true,
      video: null,
      videoUrl: null,
      currentTimeArray: null,
      overlayListArray: [],
      jsonQuizListArray: [],
      overlayContinue: false,
      correctAnswer: [],
      userAnswer: [],
      multipleAnswer: [],
      quizId: null,
      quizAttended: false,
      quizComplete: false,
      startindex: 0,
      resumeVideo: false,
      currentQuizId: 0,
      newCurrentTimeArray: [],
      viewBanner: false,
      pageName: null,
      prepost: 0,
      isPrePost: 0,
      preDuration: 0,
      postDuration: 0,
      showAnswers: true,
      insertcheckvalue:1,
      PageId:''
    };
  }
  async componentWillReceiveProps(nextProps) {
    //await this.getContent(nextProps);
    await this.getContent(nextProps.Video);
  }
  async componentDidMount() {
    let userlog = localStorage.getItem("userDetails");
	  userlog = JSON.parse(userlog);
	   if(userlog === null){
		   userlog = localStorage.getItem("Admin");
		   userlog = JSON.parse(userlog)
	   }
	  // console.log(userlog);
    localStorage.setItem("userId", userlog.id);
    localStorage.setItem("userName", userlog.userName);
    this.setState({
      userId: userlog.id,
      userName: userlog.userName
    });

    await this.getContent(this.props.Video);
  }
  async getContent(videoid) {
    const { correctAnswer } = this.state;
    //let themeid = this.props.Video;
    this.setState({PageId :videoid,insertcheckvalue:1})
    let themeid = videoid;

    let quizJson = [];
    let videoOverlay = null;
    let videoOverlayArray = [];
    let overlayTimeSetArray = null;

    const result = await CmsContent.getVideoContentById(themeid);
	console.log(result);
    let pageName = result.data[0].name;
    if (result) {
      this.setState({ pageName });
      overlayTimeSetArray = [];
      if (result.data[0].videoOverlay) {
        videoOverlay = JSON.parse(result.data[0].videoOverlay);
        if (!Array.isArray(videoOverlay)) {
          videoOverlayArray.push(videoOverlay);
          videoOverlay = videoOverlayArray;
        }
        videoOverlay.map(async (jsonContent, index) => {
          if (jsonContent) {
            if (jsonContent.quizId) {
              let isPrePost = this.state.isPrePost + 1;
              let preDuration =
                isPrePost === 1 ? jsonContent.duration : this.state.preDuration;
              let postDuration =
                isPrePost === 2
                  ? jsonContent.duration
                  : this.state.postDuration;
              this.setState({
                quizId: JSON.parse(jsonContent.quizId),
                isPrePost,
                preDuration,
                postDuration
              });
              let userId = this.state.userId;
              let quizId = JSON.parse(jsonContent.quizId);
              try {
                const result = await CmsContent.checkQuizAttended(
                  userId,
                  quizId
                );
                if (result) {
                  this.setState({ quizAttended: true });
                }
              } catch (error) {}
            }
            overlayTimeSetArray.push(parseInt(jsonContent.duration));
          }
        });
        if (result.data[0].quizList) {
          let quizList = result.data[0].quizList;
          quizList.map((list, index) => {
            quizJson.push(JSON.parse(list));
            let correctJson = {};
            // correctJson.index = index;
            // correctJson.answer = list.answer;
            // correctJson.type = list.type;
            correctAnswer.push(JSON.parse(list));
          });
        }
      } else {
        overlayTimeSetArray = [];
        videoOverlay = [];
        quizJson = [];
      }
      let checkResume = await localStorage.getItem(
        "videoId_" + result.data[0].id
      );
      this.setState({
        pageList: result.data[0],
        videoUrl: `${result.data[0].file}#t=${checkResume}`,
        previousUrl: result.data[0].file,
        currentTimeArray: overlayTimeSetArray,
        overlayListArray: videoOverlay,
        jsonQuizListArray: quizJson,
        correctAnswer
      });
    }

    setInterval(() => {
      const { currentTimeArray, pageList } = this.state;
      if (this.ref) {
        this.setState({ video: this.ref });
        {
          this.props.resume &&
            this.props.resume(
              this.state.video.duration,
              this.state.video.currentTime
            );
        }

        let currentVideoDuration = this.formatTime(this.state.video.duration);
        let currentVideoTime = this.formatTime(this.state.video.currentTime);
        this.setState({
          currentVideoTime,
          currentVideoDuration
        });
        let checkResume = localStorage.getItem(
          "videoId_" + this.state.pageList.id
        );
        if (
          !checkResume ||
          parseInt(checkResume) === 0 ||
          this.state.video.currentTime > 0
        ) {
          if (
            Math.floor(this.state.video.currentTime) ===
            Math.floor(this.state.video.duration)
          ) {
            localStorage.setItem("videoId_" + pageList.id, 0);
          } else {
            localStorage.setItem(
              "videoId_" + pageList.id,
              this.state.video.currentTime
            );
          }
        } else if (this.state.video.currentTime === 0) {
          localStorage.setItem("videoId_" + pageList.id, 0);
        }
        if (currentTimeArray.includes(parseInt(this.state.video.currentTime))) {
          this.pausePlay();
        }

        const { id: videoId } = this.state.pageList;
        let userId = this.state.userId;
        let userName = this.state.userName;

        this.state.video.onseeking = async () => {
          const formData = {};
          formData.videoId = videoId;
          formData.seekSec = Math.floor(this.state.video.currentTime);
          formData.userId = userId;
          await CmsContent.createMasterValue(`tbl_seek_log`, formData);
        };

        socket.emit("connection");
        socket.emit("timestamp", {
          timestamp: Math.floor(this.state.video.currentTime),
          userId,
          userName,
          videoId,
          pageName: this.state.pageName
        });
        socket.on("responseTimestamp", data => {});
      }
    }, 1000);
    this.setState({ currentQuizId: 0 });
  }
  xButton=()=>{
    const closeButton = document.querySelector("#closeButton");
    const banner = document.querySelector("#banner");
    closeButton.addEventListener("click", e => {
      banner.style = "display:none";
      const video = this.state.video;
      video.play();
      this.changeButtonState(video, "playpause");
    });
  }
  formatTime = time => {
    if (!time) {
      return "00:00:00";
    }
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  pausePlay = async () => {
    const video = this.state.video;
    const banner = document.querySelector("#banner");
    banner.style = "display:block";
    banner.style = "width:60%";
    banner.style = "height:80%";
    // banner.style = 'background:red';
    video.pause();
    this.changeButtonState(video, "playpause");
  };

  changeButtonState = (video, type) => {
    const playpause = document.querySelector("#playpause");
    if (type === "playpause") {
      if (video.paused || video.ended) {
        playpause.setAttribute("data-state", "play");
      } else {
        playpause.setAttribute("data-state", "pause");
      }
    }
  };

  toContinueOrNot = (value, quizId = 0) => {
    this.setState({ quizId });
    if (value === "yes") {
      this.setState({ overlayContinue: true });
    } else {
      const { video } = this.state;
      video.currentTime = Math.ceil(this.state.video.currentTime);
      const banner = document.querySelector("#banner");
      banner.style = "display:none";
      this.setState({ video });
      video.play();
      this.changeButtonState(video, "playpause");
    }
  };

  quizAnswered = async (e, type, index) => {
    const { userAnswer, multipleAnswer } = this.state;
    let value = e.target.value;
    if (type === "single") {
      if (typeof userAnswer[index] === "undefined") {
        console.log(value+'-->'+type);
        console.log(userAnswer[index]);
        let answerJson = {};
        answerJson.index = index;
        answerJson.answer = value;
        answerJson.type = type;
        userAnswer.push(answerJson);
        this.setState({ userAnswer });
      } else {
        let answerJson = userAnswer[index];
        answerJson.answer = value;
      }
    } else {
      let result = null;
      let answerJson = {};
      if (userAnswer[index]) {
        if (userAnswer[index]["answer"].includes(value)) {
          result = userAnswer[index]["answer"].filter(
            answer => answer !== value
          );
          answerJson.index = index;
          answerJson.answer = result;
          answerJson.type = type;
          const previousData = [...this.state.userAnswer];
          const newAnswer = previousData.filter(value => value.index !== index);
          newAnswer.splice(index, 0, answerJson);
          this.setState({ userAnswer: newAnswer });
        } else {
          userAnswer[index]["answer"].push(value);
        }
      } else {
        let answerJsonArray = [];
        answerJsonArray.push(value);
        answerJson.index = index;
        answerJson.answer = answerJsonArray;
        answerJson.type = type;
        userAnswer.push(answerJson);
        this.setState({ userAnswer });
      }
    }
  };
  changeQuizIndex = value => {
    // const { currentTimeArray, video } = this.state;
    // const newCurrentTimeArray = currentTimeArray.filter(videoIds => parseInt(videoIds) !== parseInt(Math.floor(video.currentTime)));

    // let newValue = this.state.currentQuizId + value;
    // this.setState({ currentQuizId: newValue, currentTimeArray: newCurrentTimeArray });
    this.toContinueOrNot("no");
  };

  submitQuizValue = async (value, duration) => {
    const {
      userAnswer,
      correctAnswer,
      quizId,
      currentQuizId,
      currentTimeArray,
      video,
      jsonQuizListArray
    } = this.state;
    let currentNewQuizId = currentQuizId + duration;
    let question = 0;
    let count = 0;

    correctAnswer.map((crctAnswerList, key) => {
      if (key === currentQuizId) {
        crctAnswerList.map((crctAns, index) => {
          userAnswer.map(userAns => {
            let total = 0;
            if (
              userAns.type === "single" &&
              parseInt(userAns.index) === index
            ) {
              if (
                index === parseInt(userAns.index) &&
                crctAns.answer.toLowerCase() === userAns.answer.toLowerCase()
              ) {
                count += 1;
                question += 1;
              }
            } else if (
              userAns.type === "multiple" &&
              parseInt(userAns.index) === index
            ) {

              if (
                crctAns.answer &&
                crctAns.answer.split(",").length === userAns.answer.length
              ) {
                crctAns.answer.split(",").map(orgAns => {
                  userAns.answer.map(ans => {
                    if (orgAns === ans) {
                      total += 1;
                    }
                  });
                });
                if (crctAns.answer.split(",").length === total) {
                  count += 1;
                }
              } else {
                console.log("gone else");
                count += 0;
              }
            }
          });
        });
      }
    });

    let prepost = this.state.prepost;
    try {
      let video = this.state.video;
      if (prepost) {
        let arr = {};
        arr.posttotal = count;
        arr.postanswer = JSON.stringify(userAnswer);
        arr.prepost = prepost;
        let postAnswerUpdate = await CmsContent.updateMaster(
          "tbl_quizAnswer",
          this.state.rowId,
          arr
        );

        if (postAnswerUpdate) {
          let newCurrentTimeArray = currentTimeArray.filter(
            videoIds =>
              parseInt(videoIds) !== parseInt(Math.floor(video.currentTime))
          );
          this.setState({
            startindex: 0,
            quizComplete: true,
            overlayContinue: false,
            currentQuizId: currentNewQuizId,
            newCurrentTimeArray,
            userAnswer: [],
            prepost: prepost + 1
          });
        }
      } else {
        let quizAnswerJson = {};
        quizAnswerJson.userId = this.state.userId;
        quizAnswerJson.userName = this.state.userName;
        quizAnswerJson.quizId = quizId;
        quizAnswerJson.total = count;
        quizAnswerJson.totalQue = userAnswer.length;
        quizAnswerJson.quizanswer = JSON.stringify(userAnswer);
        quizAnswerJson.prepost = prepost;
        quizAnswerJson.serviceid = 8;

        const answerUpdate = await CmsContent.updateQuizAnswer(
          quizAnswerJson,
          "tbl_quizAnswer"
        );
        if (answerUpdate) {
          let newCurrentTimeArray = currentTimeArray.filter(
            videoIds =>
              parseInt(videoIds) !== parseInt(Math.floor(video.currentTime))
          );

          this.setState({
            startindex: 0,
            quizComplete: true,
            overlayContinue: false,
            currentQuizId: currentNewQuizId,
            userAnswer: [],
            newCurrentTimeArray,
            prepost: 1,
            rowId: answerUpdate.data.insertId
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  videoContinueNext = () => {
    const { video, newCurrentTimeArray } = this.state;
    this.setState({
      quizComplete: false,
      currentTimeArray: newCurrentTimeArray
    });

    const banner = document.querySelector("#banner");
    banner.style = "display:none";
    video.currentTime = Math.ceil(this.state.video.currentTime);
    this.setState({ video });
    video.play();
    this.changeButtonState(video, "playpause");
  };

  moveForwardOrBackward = value => {
    const { video } = this.state;
    const banner = document.querySelector("#banner");
    banner.style = "display:none";
    if (value === "forward") {
      video.currentTime = Math.ceil(this.state.video.currentTime + 10);
      if (video.currentTime >= video.duration) {
        video.currentTime = video.duration;
        this.setState({ video });
        video.pause();
      } else {
        this.setState({ video,startindex:0,userAnswer:[],overlayContinue:false });
        video.play();
      }
    } else {
      if (video.currentTime > 10) {
        video.currentTime = Math.ceil(this.state.video.currentTime - 10);
      } else {
        video.currentTime = 0;
      }
      this.setState({ video,startindex:0,userAnswer:[],overlayContinue:false });
      video.play();
    }
  };

  changeIndexValue = index => {
    index += 1;
    this.setState({ startindex: index });
  };

  viewBanner = val => {
    if (val === "yes") {
      this.setState({ viewBanner: true });
    }
  };
  onDuration = duration => {

    this.setState({ duration });
  };
  onProgress = async state => {
    // if (this.state.duration === state.playedSeconds) {
    //   localStorage.setItem('videoId_' + this.state.videoId + '_' + this.state.videoName, 0);
    // } else {
    //   localStorage.setItem('videoId_' + this.state.videoId + '_' + this.state.videoName, state.playedSeconds);
    // }
    // if (!this.state.seeking) {
    //   this.setState(state);
    // }
    // const { videoId } = this.state;
    // let userId = localStorage.getItem('userId');
    // let userName = localStorage.getItem('userName');
    // socket.emit('connection');
    // socket.emit('timestamp', { timestamp: state.playedSeconds, userId, userName, videoId });
  };
  videoinsert = async(insertcheckvalue)=>{
   
    if(this.state.insertcheckvalue==1)
    {
      let ipaddressget= await http.get('https://ipapi.co/json/',function(data) {
      console.log(JSON.stringify(data, null, 2));
    })
     console.log(ipaddressget.data.ip)

     const date = new Date();
     var month = ("0" + (date.getMonth() + 1)).slice(-2); //months from 1-12
     var day = date.getUTCDate();
     var year = date.getUTCFullYear();
     var hour = date.getHours();
     var minutes = date.getMinutes();
     var seconds = date.getSeconds();
 
     var newdate = year + "-" + month + "-" + day;
 
     var timesDate =  year +"-" +month + "-" +day +" " + hour +":" + minutes +":" +seconds+'';

      const userlog=new FormData;
      // userlog.append('userid',JSON.parse(localStorage.getItem("userlog")).id)
      userlog.append('userid',185)
      userlog.append('ipaddress',ipaddressget.data.ip)
      userlog.append('datetime',timesDate)
      userlog.append('play',this.state.PageId)
      userlog.append('date',newdate)

      // userlog.append('customerId',JSON.parse(localStorage.getItem("userlog")).customerId)
      userlog.append('customerId',117)

      let datauser=await CmsContent.addMaster('tbl_CMSuserAccessLog',userlog);


      this.setState({insertcheckvalue :2})
      console.log(this.state.insertcheckvalue)
      
    }
 
     

    
  }
  render() {
    const {
      prepost,
      videoUrl,
      overlayListArray,
      video,
      currentTimeArray,
      jsonQuizListArray,
      overlayContinue,
      quizComplete,
      startindex,
      currentVideoDuration,
      currentVideoTime,
      currentQuizId,
      userAnswer,
      viewBanner,
      showAnswers
    } = this.state;
    let overlayAppend = null;
    let quizQuestionAppend = [];

    jsonQuizListArray.map((quizList, key) => {
      if (key === currentQuizId) {
        quizList.map((quizListNew, index) => {
          if (startindex === index) {
            if (quizList[index].type === "single") {
              quizQuestionAppend.push(
                <div className="card card-shadow">
                  <div className="card-header bg-set">
                    <div className="row">
                      <div className="col-sm-12">
                        <h1 className="question-align">{`${index + 1}) ${
                          quizList[index].question
                        }`}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div class="pretty p-icon p-round p-pulse">
                        <input
                          type="radio"
                          name="radio"
                          value="yes"
                          checked={(userAnswer[index] && userAnswer[index].answer==='yes') ? true :false}
                          onChange={e => this.quizAnswered(e, "single", index)}
                        />
                        <div class="state p-info">
                          <i class="icon mdi mdi-check" />
                          <label>Yes</label>
                        </div>
                      </div>
                      <div class="pretty p-icon p-round p-pulse">
                        <input
                          type="radio"
                          name="radio"
                          value="no"
                          checked={(userAnswer[index] && userAnswer[index].answer==='no') ? true :false}
                          onChange={e => this.quizAnswered(e, "single", index)}
                        />
                        <div class="state p-info">
                          <i class="icon mdi mdi-check" />
                          <label>No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              let checkedBoxValue = false;
              quizQuestionAppend.push(
                <div className="card card-shadow">
                  <div className="card-header bg-set">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="question-align">{`${index + 1}) ${
                          quizList[index].question
                        }`}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {quizList[index].options.map((values, key) => (
                      <div>
                        {userAnswer[index] &&
                          userAnswer[index].answer.map(optionList => {
                            if (
                              userAnswer[index].answer.includes(
                                `option${key + 1}`
                              )
                            ) {
                              checkedBoxValue = true;
                            } else {
                              checkedBoxValue = false;
                            }
                          })}
                        <div className="row my-2">
                          <div class="pretty p-default p-curve p-thick p-smooth">
                            <input
                              type="checkbox"
                              value={`option${key + 1}`}
                              onChange={e =>
                                this.quizAnswered(e, "multiple", index)
                              }
                              checked={checkedBoxValue}
                            />
                            <div class="state p-info-o">
                              <label>{values}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            if (quizList.length - 1 === index) {
              quizQuestionAppend.push(
                <button
                  type="button"
                  className="btn btn-success btn-sm btn-radius"
                  onClick={() => this.submitQuizValue("yes", 1)}
                >
                  Submit
                </button>
              );
            } else {
              quizQuestionAppend.push(
                <button
                  type="button"
                  className="btn btn-success btn-sm btn-radius btnwidth"
                  onClick={() => this.changeIndexValue(index)}
                >
                  Next
                </button>
              );
            }
          }
        });
      }
    });

    if (
      video &&
      currentTimeArray.includes(parseInt(this.state.video.currentTime))
    ) {
      overlayListArray.map((overlay, index) => {
        if (
          parseInt(this.state.video.currentTime) === parseInt(overlay.duration)
        ) {
          if (
            overlay.overlayType === "Quiz" &&
            !this.state.rowId &&
            this.state.prepost === 0 &&
            Math.floor(this.state.video.currentTime) ===
              Number(this.state.postDuration)
          ) {
            video.currentTime = this.state.preDuration;
            // this.setState({ video, overlayContinue: false, });
            // video.play();
          }
          overlayAppend = (
            <div class="containers">
              <img
                src={overlayImg}
                alt="Snow"
                style={{
                  opacity: "0.9",
                  height: "300px",
                  width: "100%",
                  borderRadius: "15px"
                }}
              />
              <div className="bottom-left" />
              <div className="top-left" />
              <div className="top-right" />
              <div className="bottom-right" />
              <div className="centered">
                <div className="row form-group">
                  <div className="col-sm-12 overlay-mt">
                    <h1 className="banner-start">{overlay.overlayPreamble}</h1>
                  </div>
                </div>
                <br />
				<div className="row form-group ">
                  <div className="col-sm-12 overlay-mt">
				  {overlay.overlayType === "Load Url"&&(
				     <Iframe url="{`${overlay.loadUrl}`}"   
                          width="450px"
                          height="250px" 
						  id="myId" 
                          className="myClassname"
                         display="initial"
                         position="relative"/>
				  
				  )}
                   </div></div>
                <div className="row form-group button-width">
                  <div className="col-sm-12">
                    {overlay.overlayType === "Survey" ? (
                        <a 
                           href={`https://${overlay.loadUrl}`} 
                        target="_blank"
                        class="btn btn-success btn-sm btn-radius btnwidthNew"
                      >
                        OK
                      </a>  
					 
                    ) : overlay.overlayType === "Ad Banner" ? (
                      <button
                        type="button"
                        className="btn btn-success btn-sm btn-radius btn-newWidth"
                        onClick={() => this.viewBanner("yes")} 
                      >
                        OK
                      </button>
                    ) : overlay.overlayType !=="Load Url" ? (
                      <button
                        type="button"
                        className="btn btn-success btn-sm btn-radius btn-newWidth"
                        onClick={() =>
                          this.toContinueOrNot("yes", overlay.quizId)
                        }
                      >
                        OK
                      </button>
                    ):null}
                  </div>
                  {/* <div className="col-sm-6">
                    {overlay.overlayType === "Survey" ||
                    overlay.overlayType === "Load Url" ? (
                      <button
                        type="button"
                        className="btn btn-success btn-sm btn-radius btn-newWidth"
                        onClick={() => this.toContinueOrNot("no")}
                      >
                        CANCEL
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success btn-sm btn-radius btn-newWidth"
                        onClick={() => this.changeQuizIndex(1)}
                      >
                        CANCEL
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
              <div id="closeButton">
                <i
                  class="fa fa-times-circle-o fa-2x banner-close"
                  aria-hidden="true"
                  onClick={() =>{this.xButton(); this.toContinueOrNot("no");}}
                />
                {/* onClick={() => this.videoContinueNext()} /> */}
              </div>
            </div>
          );

          if (viewBanner && overlay.overlayType === "Ad Banner") {
            overlayAppend = (
              <div
                className="card-body body-overflow"
                style={{ background: `${overlay.overlayColor.hex}` }}
              >
                <a href={`${overlay.bannerTargetUrl}`} target="_blank">
                  <img src={overlay.bannerImage} alt="Snow" />
                </a>
                <div id="closeButton">
                  <i
                    class="fa fa-times-circle-o fa-2x banner-close"
                    aria-hidden="true"
                    onClick={() =>{this.xButton(); this.toContinueOrNot("no");}}
                  />
                </div>
              </div>
            );
          }

          if (overlayContinue && overlay.overlayType === "Quiz") {
            overlayAppend = (
              <div className="card">
                <div className="card-header card-color">
                  <h1 className="text-view">{overlay.overlayName}</h1>
                </div>
                <div
                  className="card-body body-overflow"
                  style={{ background: `${overlay.overlayColor.hex}` }}
                >
                  {quizQuestionAppend}
                </div>
                <div id="closeButton">
                  <i
                    class="fa fa-times-circle-o fa-2x banner-close"
                    aria-hidden="true"
                    onClick={() =>{this.xButton(); this.toContinueOrNot("no");}}
                  />
                </div>
              </div>
            );
          }
          
          if (quizComplete) {
            overlayAppend =
              showAnswers && prepost === 2 ? (
                <div className="card">
                  <div className="card-header card-color">
                    <h1 className="text-view">Correct Quiz Answers</h1>
                  </div>

                  <div
                    className="card-body body-overflow"
                    style={{ background: `${overlay.overlayColor.hex}` }}
                  >
                    {jsonQuizListArray[0].map((values, key) => (
                      <div className="card card-shadow">
                        <div className="card-header bg-set">
                          <div className="row">
                            <div className="col-sm-12">
                              <h3 className="question-align">
                                {values.question}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row my-1">
                            {values.type === "single" ? (
                              <div className="ml-2">{values.answer}</div>
                            ) : (
                              <div>
                                {values.answer.split(",").map((lval, l) => {
                                  return (
                                    <div>
                                      {
                                        values.options[
                                          Number(lval.slice(-1)) - 1
                                        ]
                                      }
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-success btn-sm btn-radius btn-widthsuc"
                      onClick={() => this.setState({ showAnswers: false })}
                    >
                      Ok
                    </button>
                  </div>
                  <div id="closeButton">
                    <i
                      class="fa fa-times-circle-o fa-2x banner-close"
                      aria-hidden="true"
                      onClick={() =>{this.xButton(); this.toContinueOrNot("no");}}
                    />
                  </div>
                </div>
              ) : (
                <div class="containers">
                  <img
                    src={overlayImg}
                    alt="Snow"
                    style={{
                      opacity: "0.9",
                      height: "300px",
                      width: "100%",
                      borderRadius: "15px"
                    }}
                  />
                  <div className="bottom-left" />
                  <div className="top-left" />
                  <div className="top-right" />
                  <div className="bottom-right" />
                  <div className="centered">
                    <div className="suces-new-center">
                      <div className="row form-group">
                        <div className="col-sm-12">
                          <h1 className="banner-start">
                            Quiz Successfully Completed
                          </h1>
                        </div>
                      </div>
                      <br />
                      <div className="row form-group">
                        <div className="col-sm-12">
                          <button
                            type="button"
                            className="btn btn-success btn-sm btn-radius btn-widthsuc"
                            onClick={() => this.videoContinueNext()}
                          >
                            Ok
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="closeButton">
                    <i
                      class="fa fa-times-circle-o fa-2x banner-close"
                      aria-hidden="true"
                      onClick={() =>{this.xButton(); this.toContinueOrNot("no");}}
                    />
                  </div>
                </div>
              );
          }
        }
      });
    }
    
    return (
      <div>
        {videoUrl && (
          <figure id="videoContainer" data-fullscreen="false">
            <video
              id="video"
              controls
              style={{ width: "100%", margin: "0px -7px" }}
              crossOrigin="anonymous"
              preload="metadata"
              className="player-center"
              ref={ref => {
                this.ref = ref;
              }}
              onDuration={this.onDuration}
              onProgress={state => {
              }}
              src={this.state.videoUrl}
            >
              {this.props.playfrom && (
                <source src={this.props.playfrom} type="video/mp4" />
              )}
              {!this.props.playfrom && (
                <source src={this.state.videoUrl} type="video/mp4" />
              )}

              {this.state.pageList.subTitleId.map(value => {
                return (
                  <track
                    label={value.srcLang}
                    kind="subtitles"
                    srcLang={value.srcLang}
                    src={value.src}
                  />
                );
              })}
            </video>
            <div
              id="video-controls"
              className="controls full-vid-controls fullscreen-bg"
              data-state="hidden"
              style={{ width: "100%", margin: "0px -7px" }}
            >
              <div
                className="progress"
                style={{ /*height: '25px'*/ height: "6px" }}
              >
                <progress id="progress" value="0" min="0">
                  <span id="progress-bar" />
                </progress>
              </div>
              <br />
              <button
                id="playpause"
                className="vid-play-sub"
                type="button"
                data-state="play"
                onClick={() => this.videoinsert(this.state.insertcheckvalue) }
               
              >
                Play/Pause
              </button>
              <button
                id="stop"
                type="button"
                className="vid-play-sub"
                data-state="stop"
                onClick={() => this.setState({startindex:0,userAnswer:[],overlayContinue:false }) }
              >
                Stop
              </button>
              <button
                id="backward"
                type="button"
                data-state="backward"
                className="vid-play-sub"
                onClick={() => this.moveForwardOrBackward("backward")}
              >
                Backward
              </button>
              <button
                id="forward"
                type="button"
                className="vid-play-sub"
                data-state="forward"
                onClick={() => this.moveForwardOrBackward("forward")}
              >
                Forward
              </button>
              <button
                id="mute"
                className="vid-play-mute vid-play-common"
                type="button"
                data-state="mute"
              >
                Mute/Unmute
              </button>
              <button
                id="fs"
                type="button"
                style={{ height: "18px", width: "18px" }}
                data-state="go-fullscreen"
                className="vid-play-lastctrl vid-play-fullsc vid-play-full-fullsc"
              >
                Fullscreen
              </button>
              <button
                id="subtitles"
                type="button"
                className="vid-play-common vid-play-cc"
                data-state="subtitles"
              >
                CC
              </button>
              <div
                className="vid-play-duration vid-play-align"
                style={{ /*width: '120px',*/ width: "160px", height: "20px" }}
              >
                <span id="currentVideoTime" className="vid-duration-left">
                  {currentVideoTime}
                </span>
                <span>/</span>
                <span id="currentVideoDuration">{currentVideoDuration}</span>
              </div>
              {/* <div style={{ width: '5%', color: 'red' }}>sas</div>*/}
            </div>

            <div id="banner" style={{ display: "none", background: "red" }}>
              {overlayAppend}
            </div>
            <ScriptTag type="text/javascript" src={videoScript} />
          </figure>
        )}
      </div>
    );
  }
}

export default NewVideoPlayer;
