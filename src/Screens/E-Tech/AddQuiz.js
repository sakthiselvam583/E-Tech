import React, { Component } from "react";
import CmsContent from "../../MiddleWare/CmsContent";
import { Alert } from "reactstrap";
import Datatable from "../Components/Datatable/Datatable";
import LoginModal from "../Components/Modal/Modal";


class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: "",
      send_json: [],
      alertVisible: false,
      optionCount: "",
      optionJson: [],
      optionListArray: [],
      optionJsonArray: [],
      data: [],
      dataListArray: [],
      customerId: JSON.parse(localStorage.getItem('Userdata')).customerId,
      data_1:[]
    };
  }
  async componentDidMount() {
    console.log()
    try {
      let customerId = this.state.customerId;
      let userid=JSON.parse(localStorage.getItem('Userdata')).id;
    //  const result = await CmsContent.displayQuizQuestion("active", customerId);
    const result = await CmsContent.getFreedom(
      "tbl_question.quizName,tbl_question.id",
      "tbl_question",
      `customerid=${this.state.customerId} and  teacher_id=${userid}  and type ='active'`,'id','id desc'
    );
    console.log(result.data)
      if (result) {
        //this.setState({ data: result.data });
        //console.log(result.data)
      }
      if (result.data.length > 0) {
        
        const header = [
          'SI.No',
          'quizname',
          'type',
          'answer',
          'option'
        ];
        const excelHead =  [
          { label: "Quizname", key: "quizName" },
          {label:"Quiztype",key:"type"},
          {label:"Question",key:"question"},
          {label:"Answer",key:"answer"},
          {label:"options",key:"options"}
        ];  

        this.setState({
          header,
          excelHead,
          data : result.data
        });
      }


      
    } catch (error) {
      console.log(error);
    }
  }
  column = [
    {
      name: "Quiz Name",
      selector: "quizName",
      
    },
    {
      name: "View",
    cell:(d)=>this.viewlist(d)  
    }
   
  ];
  column_1 = [
    {
      name: "Quiz Name",
      selector: "quizName",
      
    },

    {
      Header: "Quiz Type",
      accessor: "type"
    },
    {
      Header: "Question",
      accessor: "question"
    },
    {
      Header: "Answer",
      accessor: "answer"
    },
    {
      Header: "Options",
      accessor: "options"
    }
    
   
  ];
  /*
  {
    Header: "Quiz Type",
    accessor: "type"
  },
  {
    Header: "Question",
    accessor: "question"
  },
  {
    Header: "Answer",
    accessor: "answer"
  },
  {
    Header: "Options",
    accessor: "options"
  }
  */
 viewlist = (d) =>{
  /// console.log(d.original)
 
return(

<center>
<button type="button" class="btn btn-primary" onClick={()=>{this.viewdata(d)}} data-toggle="modal" data-target="#myModal">
    view
  </button>
      </center>
    );
}
viewdata = async (data)=>{
  console.log(data)
  let view={};
  view.id=data.id;
  view.type='active';
  let result = await CmsContent.displayQuizQuestion(view, this.state.customerId);
  console.log(result.data)
  if(result.data)
  {
this.setState({data_1 :result.data})
  }
   
}
  question = ad => {
    let value = JSON.parse(ad.original.contentJson);
    return value[0].question;
  };

  answer = ad => {
    let value = JSON.parse(ad.original.contentJson);
    return value[0].answer;
  };

  option = ad => {
    let value = JSON.parse(ad.original.contentJson);
    return value[0].answer;
  };

  handlechange = e => {
    if (e.target.name === "optionCount") {
      this.setState({ optionJson: [] });
    }
    this.setState({ [e.target.name]: e.target.value });
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

  optionAnswer = (value, key, index) => {
    
    console.log( `option${key + 1}index${index+1}`)

    
    if(document.getElementById(`option${key + 1}index${index+1}`).checked)
    {
      let checkedstate=`option${key + 1}index${index+1}`;
      console.log(checkedstate)
      document.getElementById(`options${key + 1}indexs${index+1}`).innerHTML='Checked';
      //console.log(document.getElementById(`option${key + 1}index${index+1}`).checked )

    }
    else{
      document.getElementById(`options${key + 1}indexs${index+1}`).innerHTML='';
    }
    
   
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
    
    const formDatas = new FormData();
    formDatas.append("quizName", quizName);
     formDatas.append("contentJson", JSON.stringify(send_json));
    formDatas.append("type",'active');
    formDatas.append("customerid", customerId);
  
    formDatas.append("teacher_id", JSON.parse(localStorage.getItem('Userdata')).id);

console.log([...formDatas])

    try {
      const result = await CmsContent.addMaster('tbl_question',formDatas);
      console.log(result.data)

      let valueArray={};
      
      valueArray.quizName=quizName;
      valueArray.id=result.data.insertId;     
      const newdata=[valueArray,...this.state.data]
       
      if (result) {
        this.setState({data:newdata,quizName: "", send_json: [], alertVisible: true });
        setTimeout(() => this.setState({ alertVisible: false }), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  removeQuiz = index => {
    const { send_json, optionJsonArray } = this.state;
    send_json.splice(index, 1);
    optionJsonArray.splice(index, 1);
    this.setState({ send_json: [], optionJsonArray: [] });
    this.setState({ send_json, optionJsonArray });
  };
  render() {
    const {
      send_json,
      quizName,
      alertVisible,
      optionCount,
      optionJson,
      optionListArray,
      optionJsonArray,
      data,
      dataListArray,
      error
    } = this.state;
    let quizViewlist = [];

    send_json.map((quizList, index) => {
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
        );
      } else {
        let optionsAppend = [];
        optionJsonArray.map((totalOption, index1) => {
          if (index1 === index) {
            totalOption.map((val, key) =>
              optionsAppend.push(
                <div className="col-sm-6">
                  <div className="row form-group">
                    <div className="col-sm-12">Option {key + 1}</div>
                  </div>
                  <div className="row form-group">
                    <div className="col-sm-12">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                         // id="inlineCheckbox1"
                         id={`option${key + 1}index${index1+1}`}
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
                      <span id={`options${key + 1}indexs${index1+1}`} style={{fontSize:15,marginLeft:20}}></span>
                    </div>
                  </div>
                </div>
              )
            );
          }
        });

        quizViewlist.push(
          <div>
            <div className="row form-group question-margin" style={{marginBottom:-10}}>
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
    });

    return (
      <React.Fragment>
        <main className="main my-4">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body" />
              {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    Open modal
  </button> */}

  
  <div class="modal" id="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
      
    
        <div class="modal-header">
          <h4 class="modal-title">Evaluation</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        
        <div class="modal-body">
        <Datatable
                        data={this.state.data_1}
                        columnHeading={this.column_1}
                      />
        </div>
        
        
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
              <div className="row form-group" style={{marginTop:'4pc'}}>
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
                    value={quizName}
                  />
                  <span className="error-shows">{error}</span>
                </div>
                <div className="col-sm-3" />
              </div>
              <div className="row form-group">
                <div className="col-sm-2"  style={{marginLeft:'-75px'}}/>
                 
                 
                   
               
              

                <div className="col-sm-4">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block btn-radius"
                    onClick={() => this.addSingleChoice("multiple")}
                  >
                    Add Multi Choice
                  </button>
                </div>
                <div className="col-sm-4">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block btn-radius"
                    onClick={() => this.addSingleChoice("single")}
                  >
                    Add Single Choice
                  </button>
                </div>
                <div className="col-sm-2" />
              </div>
            </div>

            {/* multi choice */}

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
            <div className="row form-group">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="col-sm-12">
                      {data && (
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
      
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Evaluation;
