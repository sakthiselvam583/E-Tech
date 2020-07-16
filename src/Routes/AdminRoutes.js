import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CommonPage from "../Screens/pages/commonPage";
import Test from '../Screens/Header/test';
import Welcomepg from '../Screens/pages/welcomepg';
import Footer from '../Screens/footer/footer';
import ThemeFive from '../Screens/pages/themeFive';
import ThemeSix from '../Screens/pages/themeSix';
import StaffPage from '../Screens/pages/staffPage';
import Dynamicth4 from '../Screens/pages/dynamicth4';
import PurelyTesting from '../Screens/PurelyTesting';
import SearchList from '../Screens/pages/searchList';
import PreLoader from "../Screens/preloader";
import ThemeSeven from '../Screens/pages/themeSeven';
import ThemeEight from '../Screens/pages/themeEight';
import ThemeNine from '../Screens/pages/themeNine';
import ThemeTen from '../Screens/pages/themeTen';
import Theme3 from '../Screens/pages/themeThree';




import GradeMaster from '../Screens/E-Tech/GradeMaster';
import AddPortlet from '../Screens/E-Tech/Portletadd';
import ViewStudent from '../Screens/E-Tech/ViewStudent';
import MapPortletToGroup from '../Screens/E-Tech/MapPortletToGroup';
import Assessments from '../Screens/E-Tech/AddQuiz';
import StudentHeader from '../Screens/Header/StudentHeder';
import StudentViewAssement from '../Screens/E-Tech/StudentViewAss';
import Resources from '../Screens/E-Tech/Resources';
import StudentClasswork from '../Screens/E-Tech/StudentClasswork';
import StudentHomework from '../Screens/E-Tech/StudentHomework';
import StudentTutorail from '../Screens/E-Tech/StudentTutorial';
 import WizardForm from "../Screens/E-Tech/WizardForm" 








export default class AdminRoutes extends Component {
  render() {
    return (
      <Router>
         
     
		  
  
<Route
          exact
          path={"/"}
          render={props => {
            return (
              <React.Fragment>
                <Test {...props} />
                <div className="app-body ">
                  <Welcomepg {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        /> 
 
		
		<Route
          exact
          path={"/samplesite/th9/:id/:customerid?"}
          render={props => (
            <React.Fragment>  
			{/*<Test {...props} />*/}
              <div className="app-body ">
                <ThemeNine {...props} />
              </div>
              <Footer {...props} />
            </React.Fragment>
          )}
        />
		
		<Route
          exact
          path={"/samplesite/th8/:id/:customerid?"}
          render={props => (
            <React.Fragment>
              <Test {...props} />
              <div className="app-body ">
                <ThemeEight {...props} />
              </div>
              <Footer {...props} />
            </React.Fragment>
          )}
        />
		
		
        <Route
          exact
          path={"/Etech/AddCatagory"}
          render={props => (
            <React.Fragment>
              <Test {...props} />
              <div className="app-body ">
                <GradeMaster {...props} />
              </div>
              <Footer {...props} />
            </React.Fragment>
          )}
        />



        
 
        <Route
          exact
          path={"/Etech/Addporlet"}
          render={props => {
            return (
              <React.Fragment>
                <Test {...props} />
                <div className="app-body ">
                  <AddPortlet {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />



<Route
          exact
          path={"/Etech/Viewstudent"}
          render={props => {
            return (
              <React.Fragment>
                <Test {...props} />
                <div className="app-body ">
                  <ViewStudent {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />




<Route
          exact
          path={"/Etech/MapTogrop"}
          render={props => {
            return (
              <React.Fragment>
                <Test {...props} />
                <div className="app-body ">
                  <MapPortletToGroup {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />


<Route
          exact
          path={"/Etech/assessmentsadd"}
          render={props => {
            return (
              <React.Fragment>
                <Test {...props} />
                <div className="app-body ">
                  <Assessments {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />



<Route
          exact
          path={"/Etech/Resources"}
          render={props => {
            return (
              <React.Fragment>
                <Test {...props} />
                <div className="app-body ">
                  <Resources {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />



<Route
          exact
          path={"/Etech/StudentViewLogin"}
          render={props => {
            return (
              <React.Fragment>
                <StudentHeader {...props} />
                <div className="app-body ">
                  <Welcomepg {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />
 

 <Route
          exact
          path={"/Etech/StuViewAssessments"}
          render={props => {
            return (
              <React.Fragment>
                <StudentHeader {...props} />
                <div className="app-body ">
                  <StudentViewAssement {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />

 
<Route
          exact
          path={"/Etech/StuViewClasswork"}
          render={props => {
            return (
              <React.Fragment>
                <StudentHeader {...props} />
                <div className="app-body ">
                  <StudentClasswork {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />


 
<Route
          exact
          path={"/Etech/StuViewHomework"}
          render={props => {
            return (
              <React.Fragment>
                <StudentHeader {...props} />
                <div className="app-body ">
                  <StudentHomework {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />

         
<Route
          exact
          path={"/Etech/StuViewTutorial"}
          render={props => {
            return (
              <React.Fragment>
                <StudentHeader {...props} />
                <div className="app-body ">
                  <StudentTutorail {...props} />
                </div>
                {/* <Footer {...props} /> */}
              </React.Fragment>
            )
          }
          }
        />
       
       

       <Route
          exact
          path={"/Etech/WizardForm/:userid/:quizid/:portid"}
          render={props => (
            <React.Fragment>
              <div className="app-body">
                <WizardForm {...props} />
              </div>
            </React.Fragment>
          )}
        />

      </Router>

    );
  }
}