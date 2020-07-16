import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import CmsContent from "../../MiddleWare/CmsContent";
import FormMiddleWare from '../Components/FormMiddleware';
//import Datatable from '../../../components/Datatable/Datatable';
//import "./cssStyle.css";

class WizardForm extends FormMiddleWare {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.location.pathname.split("/")[3],
      quizId: this.props.location.pathname.split("/")[4],
      portid: this.props.location.pathname.split("/")[5],
      steps: [],
      datas: [],
      userAnswer: [],
      quizList: [],
      user: null,
      location: this.props.location,
      name: null,
      showRender: false,
      isCompleted: false,
      showOption: false
    };
  }
  async componentDidMount() {
    // alert(this.state.userId + '->' + this.state.quizId + '->' + this.state.portid);

    let quizList = await CmsContent.getFreedom(
      " tbl_question.id,tbl_question.quizName,contentJson",
      " tbl_question",
      `id=${this.state.quizId} `,
      "id",
      "id DESC"
    )

    let userValue = await CmsContent.getFreedom(
      " tbl_user_web.userName",
      " tbl_user_web",
      `id=${this.state.userId} `,
      "id",
      "id DESC"
    )

    // const quizList = await CmsContent.getTwoConditionedValueFree(
    //   "tbl_question",
    //   "id",
    //   this.state.quizId,
    //   1,
    //   1,
    //   "id,quizName,contentJson"
    // );
    // const userValue = await CmsContent.getTwoConditionedValueFree(
    //   "tbl_user_web",
    //   "id",
    //   this.state.userId,
    //   1,
    //   1,
    //   "userName"
    // );

  


    if (userValue) {
      this.setState({ name: userValue.data[0]["userName"] });
    }
    // const checkList = await CmsContent.getThreeConditionedValueFree(
    //   "tbl_quizAnswer",
    //   "quizId",
    //   this.state.quizId,
    //   'userId',
    //   this.state.userId,
    //   'portid',
    //   this.state.portid,
    //   "total,totalQue"
    // );
    let checkList = await CmsContent.getFreedom(
      " tbl_quizAnswer.total,tbl_quizAnswer.totalQue",
      " tbl_quizAnswer",
      `userId=${this.state.userId} and quizId=${this.state.userId} and  portid=${this.state.portid}`,
      "id",
      "id DESC"
    )

    
    // if (quizList && checkList.data.length === 0) {
    if (quizList) {
      this.quiz(quizList.data);
    } else {
      this.setState({
        isCompleted: true,
        score: checkList.data[0].total,
        total: checkList.data[0].totalQue
      });
    }
    let singleUser = await CmsContent.getFreedom(
      'userName as label,userId as value,total as score,totalQue as total,createdAt as time,quizanswer as answerJson,prepost',
      'tbl_quizAnswer',
      `prepost is null and userId=${this.state.userId}`);
    this.setState({ datas: singleUser.data });
  }

  submitQuiz = async step => {
    let lengths = this.state.length;
    if (step == lengths) {
      let quizList = JSON.parse(this.state.quizList[0].contentJson);
      let userAnswer = this.state.userAnswer;
      let count = 0;
      let question = 0;
      quizList.map(async (ival, i) => {
        await userAnswer.map(async (jval, j) => {
          if (i === j) {
            let total = 0;
            if (jval.type === "single") {
              if (ival.answer.toLowerCase() === jval.answer.toLowerCase()) {
                count += 1;
                question += 1;
              }
            } else if (jval.type === "multiple") {
              if (
                ival.answer &&
                ival.answer.split(",").length === jval.answer.length
              ) {
                ival.answer.split(",").map(orgAns => {
                  jval.answer.map(ans => {
                    if (orgAns === ans) {
                      total += 1;
                    }
                  });
                });
                if (ival.answer.split(",").length === total) {
                  count += 1;
                }
              } else {
                
                count += 0;
              }
            }
          }
        });
      });
      let quizAnswerJson = {};
      quizAnswerJson.userId = this.state.userId;
      quizAnswerJson.userName = this.state.name;
      quizAnswerJson.quizId = this.state.quizId;
      quizAnswerJson.portid = this.state.portid;
      quizAnswerJson.total = count;
      quizAnswerJson.totalQue = lengths;
      quizAnswerJson.serviceid = 9;
      quizAnswerJson.quizanswer = JSON.stringify(userAnswer);
      try {
        const answerUpdate = await CmsContent.updateQuizAnswer(
          quizAnswerJson,
          "tbl_quizAnswer"
        );
        if (answerUpdate) {
          this.setState({ userAnswer: [], score: count, total: lengths });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  quiz = async quizData => {
    let questions = JSON.parse(quizData[0].contentJson);
    let quizName = quizData[0].quizName;
    let userAnswer = this.state.userAnswer;
    let steps = [];
    let ii = 0;
    if (questions.length > 0 && questions.length !== undefined) {
      questions.map(async (ival, i) => {
        let checkedBoxtrue =
          userAnswer[i] && userAnswer[i]["answer"] == "yes" ? true : false;
        let checkedBoxfalse =
          userAnswer[i] && userAnswer[i]["answer"] == "no" ? true : false;
        ii = i + 1;
        if (ival.type === "single") {
          await steps.push({
            name: `Step ${i}+1`,
            component: (
              <div className="card card-shadow">
                <div className="card-header lightGrey">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="question-align">{`${i + 1}/${questions.length}  ${
                        ival.question
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
                        onChange={e => this.quizAnswered(e, "single", i)}
                        checked={checkedBoxtrue}
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
                        onChange={e => this.quizAnswered(e, "single", i)}
                        checked={checkedBoxfalse}
                      />
                      <div class="state p-info">
                        <i class="icon mdi mdi-check" />
                        <label>No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          });
        } else if (ival.type === "multiple") {
          let checkedBoxValue = false;
          await steps.push({
            name: `Step ${i}+1`,
            component: (
              <div className="card card-shadow">
                <div className="card-header bg-set">
                  <div className="row">
                    <div className="col-sm-12">
                      <h3 className="question-align">{`${i + 1}/${questions.length}  ${
                        ival.question
                        }`}</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {ival.options.map((values, key) => (
                    <div>
                      {userAnswer[i] &&
                        (checkedBoxValue = userAnswer[i]["answer"].includes(
                          `option${key + 1}`
                        ))}
                      <div className="row my-2">
                        <div class="pretty p-default p-curve p-thick p-smooth">
                          <input
                            type="checkbox"
                            value={`option${key + 1}`}
                            onChange={e => this.quizAnswered(e, "multiple", i)}
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
            )
          });
        }
      });
      await steps.push({
        name: `Step ${ii}+1`,
        component: <div>Evaluation has been completed.</div>
      });
      this.setState({
        quizList: quizData,
        showRender: true,
        quizName,
        steps,
        length: ii
      });
    }
  };

  quizAnswered = async (e, type, index = 0) => {
    const { userAnswer } = this.state;
    let value = e.target.value;
    if (type === "single") {
      if (typeof userAnswer[index] === "undefined") {
        let answerJson = {};
        answerJson.index = index;
        answerJson.answer = value;
        answerJson.type = type;
        userAnswer[index] = answerJson;
        this.setState({ userAnswer });
      } else {
        let answerJson = userAnswer[index];
        answerJson.answer = value;
      }
    } else if (type === "multiple") {
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
          await this.setState({ userAnswer: newAnswer });
        } else {
          userAnswer[index]["answer"].push(value);
        }
      } else {
        let answerJsonArray = [];
        answerJsonArray.push(value);
        answerJson.index = index;
        answerJson.answer = answerJsonArray;
        answerJson.type = type;
        userAnswer[index] = answerJson;
        this.setState({ userAnswer });
      }
    }
    this.quiz(this.state.quizList);
  };
  render() {
    const scores = this.state.score;
    const totals = this.state.total;
    const percentage = Math.round((scores / totals) * 100);
    const { quizName, steps, showRender, isCompleted, showOption, datas } = this.state;
    return (
      <main className="main my-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{ boxShadow: "0px 0px 10px #b9b3b3", borderRadius: "25px" }}>
                <div className="card-body">
                  {/* <h1>{quizName}</h1> */}
                  {!showOption && (
                    <div className="col-12 p-0">
                      <div className="row form-group">
                        <div className="col-2" >
                          {this.dataTableButton('primary', 'Past Results', () => {
                            this.setState({ showOption });
                          })}
                        </div>
                        <div className="col-4 p-0" />
                        <div className="col-6 pl-0" >
                          {this.dataTableButton('primary', `Proceed to ${quizName}`, () => {
                            this.setState({ showOption: true });
                          })}
                        </div>
                      </div>
                    </div>)}
                  {showOption && showRender && !isCompleted && (
                    <div className="step-progress">
                      <StepZilla
                        steps={steps}
                        stepsNavigation={true}
                        prevBtnOnLastStep={false}
                        startAtStep={0}
                        showSteps={false}
                        preventEnterSubmission={false}
                        nextTextOnFinalActionStep="Submit"
                        onStepChange={step => this.submitQuiz(step)}
                      />
                    </div>
                  )}
                  {showOption && isCompleted && (
                    <div>
                      Evaluation has been completed.You Scored {percentage}%
                    </div>
                  )}
                  {/* {showOption && <Datatable data={datas} columnHeading={this.column} />} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default WizardForm;
