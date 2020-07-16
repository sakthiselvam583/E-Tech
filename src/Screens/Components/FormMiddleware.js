import React, { Component } from 'react';
import User from '../../MiddleWare/User';
import moment from 'moment';

class FormMiddleWare extends Component {
  handleUserInput = e => {
    if (e.target.name === 'email') {
      this.setState({ updateEmail: true });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = selectedOption => {
    let selectedValue = '';
    selectedOption.map(values => (selectedValue += `${values.value},`));
    selectedValue = selectedValue.replace(/,\s*$/, '');
    this.setState({
      selectedService: selectedOption,
      servicesValue: selectedValue
    });
  };

  checkEmail = async () => {
    if (!this.state.updateEmail) return true;
    let email = this.state.email;
    if (email === '') {
      this.setState({ errorEmail: 'Enter Email' });
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      this.setState({ errorEmail: 'Invalid Email' });
      return false;
    } else {
      this.setState({ errorEmail: '' });

      try {
        const result = await User.userEmailCheck(email);
        if (result) {
          this.setState({ errorEmail: 'Email already exists' });
          return false;
        }
      } catch (error) {
        this.setState({ errorEmail: '' });
        console.log(error);
        return true;
      }
    }
  };

  showVisibility = d => {

    let status = d.original.status;
    let colour = d.original.status == 'active' ? 'warning' : 'danger';
    return this.dataTableButton(colour, status, () => this.updateVisibility(d));
  };

  updateVisibility = async value => {
    let values = value.original;
    const index = value.index;
    const previousData = [...this.state.data];
    const newData = { ...previousData[index] };
    if (newData.status === 'active') {
      newData.status = 'Inactive';
      this.setState({ button: 'Inactive' });
    } else {
      newData.status = 'active';
      this.setState({ button: 'active' });
    }

    const id = newData.id;
    const data = previousData.filter(value => value.id !== id);
    try {
      const result = await User.editSelectedUsers(id, newData);
      if (result) {
        data.splice(index, 0, newData);
        this.setState({ data: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  uploadimg = e => {


    //this.setState({ FileName: e.target.files[0] });
    this.setState({ logoname: e.target.files[0].name });
    this.setState({ imgupload: e.target.files[0] });


  };
  checkMobileNumber = async () => {
    if (this.state.updateData) return true;
    let mobileNumber = this.state.mobileNumber;
    if (mobileNumber === '') {
      this.setState({
        errorUserName: '',
        errorMobileNumber: 'Enter Mobile Number'
      });
      return false;
    } else if (!/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobileNumber)) {
      this.setState({ errorMobileNumber: 'Invalid Mobile Number' });
      return false;
    } else {
      this.setState({ errorMobileNumber: '' });
      try {
        const result = await User.userMobileCheck(mobileNumber);
        if (result) {
          this.setState({ errorMobileNumber: 'Mobile number already exists' });
          return false;
        }
      } catch (error) {
        this.setState({ errorMobileNumber: '' });
        console.log(error);
        return true;
      }
    }
  };

  handleSubmit = async () => {
    let userName = this.state.userName;

    if (userName === '') {
      this.setState({ errorUserName: 'Enter Username' });
      return false;
    } else {
      this.setState({ errorUserName: '' });
    }
    if ((await this.checkMobileNumber()) && (await this.checkEmail())) {
      this.state.updateData === false ? this.onSubmit() : this.onUpdate();
    }
  };

  onDismiss = () => {
    this.setState({ alertVisible: false });
  };

  // Table
  edit = (value, modalWindowId) => {
    return (
      <center>
        <button type="button" data-toggle="modal" data-target={`#${modalWindowId}`} className="btn btn-warning" onClick={() => this.buttonEdit(value)}>
          Edit
        </button>
      </center>
    );
  };

  delete = value => {
    return (
      <center>
        <button type="button" className="btn btn-danger" onClick={() => this.buttonDelete(value)}>
          Delete
        </button>
      </center>
    );
  };

  // Table

  // DatePicker
  changeDate = date => {

    this.setState({
      startDate: date
    });
    let changeDate = moment(date).format('MM-DD-YYYY HH:mm:ss');

  };
  //Date picker

  getValueFromArray = (d, array) => {
    if (array.length > 0) {
      if (array.length !== 0) {
        let filtered = array.filter(function (item) {
          return item.value == d;
        });
        let v = filtered[0];
        if (v != undefined) {
          return v.label;
        } else {
          return '-';
        }
      }
    } else {
      return '-';
    }
  };

  dataTableButton = (info, con, func) => {
    let classes = 'btn btn-';
    classes += info;
    return (
      <center>
        <button type="button" className={classes} onClick={func}>
          {con}
        </button>
      </center>
    );
  };
  getDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
  }

  dataTableModalButton = (modalWindowId, info, con, func) => {
    let classes = 'btn btn-';
    classes += info;
    return (
      <center>
        <button type="button" data-toggle="modal" data-target={`#${modalWindowId}`} className={classes} onClick={func}>
          {con}
        </button>
      </center>
    );
  };

  filterBy(list, criteria) {
    return list.filter(candidate => Object.keys(criteria).every(key => candidate[key] == criteria[key]));
  }
}

export default FormMiddleWare;
