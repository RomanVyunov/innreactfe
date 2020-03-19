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
    transform             : 'translate(-50%, -50%)',
    border                : "5px solid black",
    borderRadius          : 25
  }
};

class AddUserPage extends Component {

    constructor(props) {
        super(props);
    this.state = {name: "",
                  inn: "",
                  kpp: "",
                  phone: "",
                  company: "",
                  manager: "",
                  modalIsOpen: false,
                  modalHeader: "",
                  modalMessage: "",
                  nameIsValid: true,
                  innIsValid: true,
                  kppIsValid: true,
                  phoneIsValid: true}

        this.handleNameChange  = this.handleNameChange.bind(this);
        this.handleInnChange = this.handleInnChange.bind(this);
        this.handleKppChange = this.handleKppChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateInn = this.validateInn.bind(this);
        this.validateKpp = this.validateKpp.bind(this);
        this.validatePhone = this.validatePhone.bind(this);

    }

    validateInn(inn){
        var valid = inn.match(/^([0-9]{12})$/);
        return valid !== null;
    }

    validateKpp(inn){
        var valid = inn.match(/^([0-9]{9})$/);
        return valid !== null;
    }

    validateName(name){
        return name.length > 0;
    }

    validatePhone(phone){
        var valid = phone.match(/^([0-9]{3})[\-\/\.]([0-9]{3})[\-\/\.]([0-9]{4})$/);
        return valid !== null;
    }

    handleNameChange (e) {
        var val = e.target.value;
        var valid = this.validateName(val);
        this.setState({name: val,
                        nameIsValid: valid});
    }

    handleInnChange (e) {
        var val = e.target.value;
        var valid = this.validateInn(val);

        this.setState({inn: val,
                        innIsValid: valid});
    }

    handleKppChange (e) {
        var val = e.target.value;
        var valid = this.validateKpp(val);

        this.setState({kpp: val,
            kppIsValid: valid});
    }

    /* Обработчики изменений в полях с данными*/
    handlePhoneChange (e) {
        var val = e.target.value;
        var valid = this.validatePhone(val);
        this.setState({phone: val,
                        phoneIsValid: valid});
    }

    handleCompanyChange (e) {
        var val = e.target.value;
        this.setState({company: val});
    }

    handleManagerChange (e){
        var val = e.target.value;
        this.setState({manager: val});
    }

    /*Обработчик нажатия кнопки на форме. */
    handleSubmit(e){
    e.preventDefault(); //TO-DO:Why?
    var nameisVal = this.validateName(this.state.name);
    var innisVal = this.validateInn(this.state.inn);
    var kppisVal = this.validateKpp(this.state.kpp);
    var phoneisVal = this.validatePhone(this.state.phone);
    /*Проверяем все ли данные корректно введены. нужно на случай если нажмем кнопку с пустой формой */
    if (!(nameisVal && innisVal && kppisVal && phoneisVal)){
            this.setState({nameIsValid: nameisVal,
                            innIsValid: innisVal,
                            kppIsValid: kppisVal,
                            phoneIsValid: phoneisVal});

    }else{
    fetch(`http://localhost:8123/adduser`,{
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: this.state.name ,
                                inn: this.state.inn,
                                kpp: this.state.kpp,
                                phone: this.state.phone,
                                company: this.state.company,
                                manager: this.state.manager}),
                                })
              .then(response =>{
              if (response.status === 200){
                  this.setState({modalHeader: "Действие успешно выполнено",
                                 modalMessage: "Пользователь  " + this.state.name+" был добавлен"});
              }
              if (response.status === 400){
                this.setState({modalHeader: "Произошла ошибка",
                               modalMessage: "Пользователь  "+ this.state.name+" не был добавлен. Пара значений ИНН и КПП должна быть уникальна"});
              }

              this.setState({modalIsOpen: true});

         })
        }
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
    }

    closeModal(){
        this.setState({modalIsOpen: false});
    }

    goHomePage(){
        history.push('/')
    }

    render() {

        var innColor = this.state.innIsValid===true ? "black" : "red";
        var innMessage = this.state.innIsValid===true ? " " : "ИНН должен содержать 12 цифр";

        var kppColor = this.state.kppIsValid===true ? "black" : "red";
        var kppMessage = this.state.kppIsValid===true ? " " : "КПП должен содержать 9 цифр";


        var nameColor = this.state.nameIsValid===true ? "black" : "red";
        var nameMessage = this.state.nameIsValid===true ? " " : "Имя не может быть пустым";

        var phoneColor = this.state.phoneIsValid===true ? "black" : "red";
        var phoneMessage = this.state.phoneIsValid===true ? " " : "Введите телефон в формате: 954-312-1234";

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

            <form  style={{backgroundColor: "#33cccc",  padding: 100, border: "10px solid black",  borderRadius: 25, marginLeft: 100, marginRight: 100, padding: 100}}align="left" onSubmit={this.handleSubmit}>
                <p>
                    <label><b> Имя:</b><span className="required">*</span></label> <br />
                    <input type="text" onChange={this.handleNameChange} style={{borderColor: nameColor}} />
                    <label> {`${nameMessage}`}</label>
                </p>
                <p>
                    <label><b> ИНН:</b></label><span className="required">*</span><br />
                    <input type="text" onChange={this.handleInnChange}  style={{borderColor: innColor}}/>
                    <label> {`${innMessage}`}</label>
                </p>
                <p>
                    <label><b> КПП:</b></label><span className="required">*</span><br />
                    <input type="text" onChange={this.handleKppChange}  style={{borderColor: kppColor}}/>
                    <label> {`${kppMessage}`}</label>
                </p>
                <p>
                    <label ><b> Телефон:</b></label><span className="required">*</span><br />
                    <input type="text" onChange={this.handlePhoneChange} style={{borderColor: phoneColor}} />
                    <label> {`${phoneMessage}`}</label>
                </p>
                <p>
                    <label ><b> Компания:</b></label> <br />
                    <input type="text" onChange={this.handleCompanyChange}/>
                </p>
                <p>
                    <label ><b> Руководитель:</b></label> <br />
                    <input type="text" onChange={this.handleManagerChange}/>
                </p>

                <label >Обязательные для заполнения поля помечены * </label> <br />


                <input type="submit" value="Создать"/>
                <input type="button" name="cancel" value="Отмена" onClick={this.goHomePage}/>
                </form>
        </div>

    }

}

export default AddUserPage;