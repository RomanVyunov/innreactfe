import React, { Component } from 'react';
import history from './history';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AddUserPage extends Component {

    constructor(props) {
        super(props);
    this.state = {name: "",
                  inn: "",
                  phone: "",
                  company: "",
                  manager: "",
                  modalIsOpen: false,
                  modalHeader: "",
                  modalMessage: "",
                  nameIsValid: true,
                  innIsValid: true,
                  phoneIsValid: true}

        this.handleNameChange  = this.handleNameChange.bind(this);
        this.handleInnChange = this.handleInnChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateInn = this.validateInn.bind(this);
        this.validatePhone = this.validatePhone.bind(this);

    }

    validateInn(inn){
        var valid = inn.match(/^([0-9]{12})$/);
        return valid !== null;
    }

    validateName(name){
        return name.length > 0;
    }

    validatePhone(phone){
        //const reg = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
        //const reg = new RegExp(/^[0-9]/);
        //const reg = new Regex(/^(\d){1,13}$/g);

        //var reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;
        console.log("PHONE =",phone);
        var valid = phone.match(/^([0-9]{3})[\-\/\.]([0-9]{3})[\-\/\.]([0-9]{4})$/);
        console.log("VALI=",valid);

        return valid !== null;
        //return true;
    }

    handleNameChange (e) {
        console.log("HANDLE NAME CHANGE "+e.target.value)
        var val = e.target.value;
        var valid = this.validateName(val);
        this.setState({name: val,
                        nameIsValid: valid});
    }

    handleInnChange (e) {
        console.log("HANDLE INN CHANGE "+e.target.value)
        var val = e.target.value;
        var valid = this.validateInn(val);

        this.setState({inn: val,
                        innIsValid: valid});
    }


    handlePhoneChange (e) {
        console.log("HANDLE PHONE CHANGE "+e.target.value)
        var val = e.target.value;
        var valid = this.validatePhone(val);
        this.setState({phone: val,
                        phoneIsValid: valid});
    }

    handleCompanyChange (e) {
        console.log("HANDLE COMPANY CHANGE "+e.target.value)
        var val = e.target.value;
        this.setState({company: val});
    }

    handleManagerChange (e){
        console.log("HANDLE MANAGER CHANGE "+e.target.value)
        var val = e.target.value;
        this.setState({manager: val});
    }


    handleSubmit(e){
    e.preventDefault(); //TO-DO:Зачем?
    var nameisVal = this.validateName(this.state.name);
    var innisVal = this.validateInn(this.state.inn);
    if (!(nameisVal && innisVal)){
            this.setState({nameIsValid: nameisVal,
            innIsValid: innisVal});

    }else{

    console.log("NAME="+this.state.name);
    console.log("INN="+this.state.inn);
    console.log("PHONE="+this.state.phone);
    console.log("COMPANY="+this.state.company);
    fetch(`http://localhost:8123/adduser`,{
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: this.state.name ,
                                inn: this.state.inn,
                                phone: this.state.phone,
                                company: this.state.company,
                                manager: this.state.manager}),
                                })
              .then(response =>{
              if (response.status === 200){
                  this.setState({modalHeader: "Action successfully performed",
                                 modalMessage: "User"+ this.state.name+" was created"});
              }
              if (response.status === 400){
                this.setState({modalHeader: "Action failed",
                               modalMessage: "User with inn ="+ this.state.inn+" already exists"});
              }

              this.setState({modalIsOpen: true});

         })
            //.then(res => res.json())
            /*.then(
                      (result) => {
                      console.log("RESULT OF FETCH!!!"+result)
                        this.setState({
                          isFetching: false,
                          data: result
                        });
                      },
                      // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                      // чтобы не перехватывать исключения из ошибок в самих компонентах.
                      (error) => {
                      console.log("ERROR OF FETCH!!!"+error.body)
                        this.setState({
                          isFetching: true,
                          error
                        });
                      }
                    )*/
        }
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
        console.log("MODAL OPEN!!!!!!!!!");
    }

    closeModal(){
        console.log("CLOSE MODAL!!!!!!!!");
        this.setState({modalIsOpen: false});
    }

    goHomePage(){
        history.push('/')
    }

    render() {

        console.log("RENDER!!!!!!!");
        var innColor = this.state.innIsValid===true ? "black" : "red";
        var innMessage = this.state.innIsValid===true ? " " : "INN should contains 12 symbols";

        var nameColor = this.state.nameIsValid===true ? "black" : "red";
        var nameMessage = this.state.nameIsValid===true ? " " : "Name can't be empty";

        var phoneColor = this.state.phoneIsValid===true ? "black" : "red";
        var phoneMessage = this.state.phoneIsValid===true ? " " : "Phone format should be like this: 954-312-1234";

        return <div>
            <h1 align="center"> Add user</h1>
            <div>
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <h2>{`${this.state.modalHeader}`}</h2>
                <div>{`${this.state.modalMessage}`}</div>
                <button onClick={this.closeModal}>Ok</button>
            </Modal>
            </div >

            <form  style={{backgroundColor: "#33cccc", padding: 100, border: "10px solid black", marginLeft: 100, marginRight: 100, padding: 100}}align="left" onSubmit={this.handleSubmit}>
                <p>
                    <label><b> Name:</b><span className="required">*</span></label> <br />
                    <input type="text" onChange={this.handleNameChange} style={{borderColor: nameColor}} />
                    <label> {`${nameMessage}`}</label>
                </p>
                <p>
                    <label><b> INN:</b></label><span className="required">*</span><br />
                    <input type="text" onChange={this.handleInnChange}  style={{borderColor: innColor}}/>
                    <label> {`${innMessage}`}</label>
                </p>
                <p>
                    <label ><b> Phone:</b></label><span className="required">*</span><br />
                    <input type="text" onChange={this.handlePhoneChange} style={{borderColor: phoneColor}} />
                    <label> {`${phoneMessage}`}</label>
                </p>
                <p>
                    <label ><b> Company:</b></label> <br />
                    <input type="text" onChange={this.handleCompanyChange}/>
                </p>
                <p>
                    <label ><b> Manager:</b></label> <br />
                    <input type="text" onChange={this.handleManagerChange}/>
                </p>



                <input type="submit" value="Create"/>
                <input type="button" name="cancel" value="Cancel" onClick={this.goHomePage}/>
                </form>
        </div>

    }

}

export default AddUserPage;