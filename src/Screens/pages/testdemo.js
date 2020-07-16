import React, { Component } from "react";
import { ACCESS_POINT } from '../../config';
import ReactPlayer from 'react-player/lazy';
//import SurveyPop from "./surveyPop"
import CmsContent from "../../MiddleWare/CmsContent";
import overlayImg from "./theme3/N333333-1.png"; 
import ScriptTag from "react-script-tag";
const videoScript = "/assets/js/video-player.js";


class Testdemo extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      modal14: false,
	  data:false,
	  playing:true,
	  open:false,
	  duration:false,
	  NoQuiz:true,
	  overLayList:[],
      Display:true,
      overlayAppend:[],
	  correctAnswer:[],
	  currentQuizId:0,
	  startindex:0,
	  userAnswer:[],
	  jsonQuizListArray:[],
	  userId:localStorage.getItem("UserID"),
	  userName:localStorage.getItem("userName"),
	  contoler:true
	 
    };
  } 
  
  async componentDidMount() {
	 await this.setState({data:this.props.data});
	 console.log(this.props.data) 
	   this.process() 
  }
  
  CloseWIndow=()=>{
	 this.setState({open:false,playing:true,contoler:true,NoQuiz:false});
  }
  
  process=async()=>{
	  const {data,correctAnswer}=this.state;
	  //console.log(data); 
	  let overlay = JSON.parse(data.overlay);
	  let quizJson=[];
	    if(overlay.length){
			let duration = parseInt(overlay[0].duration); 
			if (data.quiz) {
			let arr=[];
			arr.push(data.quiz)
			let quizList = arr;
			//console.log(JSON.parse(quizList));
			quizList.map((list, index) => {
            quizJson.push(JSON.parse(list));
            let correctJson = {};
            // correctJson.index = index;
            // correctJson.answer = list.answer;
            // correctJson.type = list.type;
            correctAnswer.push(JSON.parse(list));
          });
		  //console.log(quizJson)
		}
	        this.setState({overlay:overlay[0],
			  duration,
			 overlayListArray: JSON.parse(data.overlay),
            jsonQuizListArray: quizJson,
			});
		}else{
	       this.setState({NoQuiz:false});
		}
	  //console.log(overlay[0]);
  }
  
  handleProgress = state => {
    //console.log('onProgress', Math.round(state.playedSeconds));
	   if(this.state.NoQuiz==true){
	    if(this.state.duration <= Math.round(state.playedSeconds) ){
			this.setState({playing:false,contoler:false,open:true});
		}
	   }
    // We only want to update time slider if we are not currently seeking
   }
  
   changeIndexValue = index => {
    index += 1;
    this.setState({ startindex: index });
  };

  
  MobileSign = async (s,v) => {
  this.setState({[s]:v});
}


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
		}else{
		  let quizAnswerJson = {};
        quizAnswerJson.userId = this.state.userId;
        quizAnswerJson.userName = this.state.userName;
        quizAnswerJson.quizId = this.state.overlay.quizId;
        quizAnswerJson.total = count;
        quizAnswerJson.totalQue = userAnswer.length;
        quizAnswerJson.quizanswer = JSON.stringify(userAnswer);
       // quizAnswerJson.prepost = prepost;
        quizAnswerJson.serviceid = 8;
		 console.log(quizAnswerJson); 
		 const answerUpdate = await CmsContent.updateQuizAnswer(
          quizAnswerJson,
          "tbl_quizAnswer"
        );
		  console.log(answerUpdate);
		if (answerUpdate) {
			/*let newCurrentTimeArray = currentTimeArray.filter(
            videoIds =>
              parseInt(videoIds) !== parseInt(Math.floor(video.currentTime))
          );*/

          this.setState({
            startindex:0,
            quizComplete: true,
            overlayContinue: false,
            currentQuizId: currentNewQuizId,
            userAnswer: [],
            rowId: answerUpdate.data.insertId
          });
		}
		}
		
	}catch(error){
		console.log(error);
	}
  };




 quizAnswered = async (e, type, index) => {
	  
	  const { userAnswer, multipleAnswer } = this.state;
	  let value = e.target.value;
	  if (type === "single") {
		  if (typeof userAnswer[index] === "undefined") {
        //console.log(value+'-->'+type);
        //console.log(userAnswer[index]);
        let answerJson = {};
        answerJson.index = index;
        answerJson.answer = value;
        answerJson.type = type;
		//console.log(answerJson);
        userAnswer.push(answerJson);
        this.setState({ userAnswer });
      } else {
        let answerJson = userAnswer[index];
        answerJson.answer = value;
      }
	  }else{
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
		}else {
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
  
  render() {
	  const{
		  data,
	  overLayList,
	  overlay,
	  startindex,
	  currentQuizId,
	  overlayListArray,
	  userAnswer,jsonQuizListArray ,Display,overlayAppend}=this.state;
	
	  // light={`${ACCESS_POINT}/superAdmin/file?fileurl=${data.thumbnail}`}
	  let quizQuestionAppend=[];
     let url = `${ACCESS_POINT}/superAdmin/file?fileurl=${data.url}`;
	 if(jsonQuizListArray.length){
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
	//console.log(quizQuestionAppend)
	 }
	 let FullListData=[];
	 if(overlayListArray){
	 if(overlayListArray[0].overlayType=='Quiz'){ 
		 FullListData.push(
		 <div className="Qzz Quix card">
                <div className="card-header card-color">
                  <h1 className="text-view">{this.state.overlay.overlayName}</h1>
                </div>
                <div
                  className="card-body body-overflow"
                  style={{ background: `${this.state.overlay.overlayColor.hex}`}}
                >
                  {quizQuestionAppend}
                </div>
                <div id="closeButton">
                  <i
                    class="fa fa-times-circle-o fa-2x banner-close"
                    aria-hidden="true"
					onClick={()=>this.CloseWIndow()} 
                  /> 
                </div>
              </div>
		 )
	 }else if(overlayListArray[0].overlayType=='Ad Banner'){
		 		 FullListData.push(
		 <div className="Qzz Quix card">
                <div className="card-header card-color">
                  <h1 className="text-view">{this.state.overlay.overlayName}</h1>
                </div>
                <div
                  className="card-body body-overflow"
                  style={{ background: `${this.state.overlay.overlayColor.hex}`}}
                >
                  <a href={`https://${overlay.bannerTargetUrl}`} target="_blank">
                  <img src={`${ACCESS_POINT}/superAdmin/file?fileurl=${overlay.bannerImage}`} alt="Snow" />
                </a>  
                </div>
                <div id="closeButton">
                  <i
                    class="fa fa-times-circle-o fa-2x banner-close"
                    aria-hidden="true"
					onClick={()=>this.CloseWIndow()} 
                  /> 
                </div>
              </div>
		 )
	 }else if(overlayListArray[0].overlayType=='Load Url'){
		 FullListData.push(
		 <div className="Qzz Quix card">
                <div className="card-header card-color">
                  <h1 className="text-view">{this.state.overlay.overlayName}</h1>
                </div>
                <div
                  className="card-body body-overflow"
                  style={{ background: `${this.state.overlay.overlayColor.hex}`}}
                > 
				 
                  <button
                  type="button"
                  className="btn btn-success btn-sm btn-radius"
                  onClick={() => window.open(`https://${overlay.loadUrl}`, '_blank')}
                >
                  Go
                </button> 
                </div>
                <div id="closeButton">
                  <i
                    class="fa fa-times-circle-o fa-2x banner-close"
                    aria-hidden="true"
					onClick={()=>this.CloseWIndow()} 
                  /> 
                </div>
              </div>
		 )
		 
	 }
	 }
	 
    return (
   <React.Fragment>
   <h1>{this.state.data.name}</h1>
   <div className="player-wrapper" > 
   <ReactPlayer  
   className='react-player'
     playing={this.state.playing}
    url={url}
     onProgress={this.handleProgress}
	 controls={this.state.contoler}
	 />
	 {/*this.state.open ? <SurveyPop open={this.state.open} these={this.MobileSign}/> : null*/ }
   </div>   
   {this.state.open ?
   <div id="banner">
	   {Display  ? ( <div class="Mob KKKcontainers">
              <img
			    class="Reszie" 
                src={overlayImg}
                alt="Snow"
                style={{
                  opacity: "0.9",
                  height: "510px",
                  width: "100%",
                 }}
              />
			   <div className="bottom-left" />
              <div className="top-left" />
              <div className="top-right" />
              <div className="bottom-right" />
              <div className="centered">
                <div className="row form-group">
                  <div className="col-sm-12 overlay-mt">
                    <h1 className="banner-start" style={{fontSize:'27px'}}>{overlay.overlayPreamble}</h1>
                  </div>
				  <button
                   type="button"
                   className="btn btn-success btn-sm btn-radius btn-newWidth"
				   onClick={()=>this.setState({Display:false})}
                >
                OK
                </button>
                </div>
				</div>
				<br />
			</div>) : FullListData } 
   </div>  : null}
   
   </React.Fragment>)  
  }
}
export default Testdemo;   