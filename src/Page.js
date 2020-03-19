import React, { Component } from 'react';

class Page extends Component {

    constructor(props) {
        super(props);

        this.state ={ data: {}, isFetching: true, error: null };
    }


    componentDidMount(){
               console.log("componentDidMount()",this.props.location.state.detail);
    fetch(`http://localhost:8123/user/${this.props.location.state.detail}`)
        .then(res => res.json())
        .then(
                  (result) => {
                  console.log("RESULT OF FETCH!!!"+result.id + result.name)
                    this.setState({
                      isFetching: false,
                      data: result
                    });
                  },
                  (error) => {
                    this.setState({
                      isFetching: true,
                      error
                    });
                  }
                )
    }


    render() {
        const { data, isFetching, error } = this.state;
        return <div >
        <h1>Информация о пользователе</h1>
        <div style={{backgroundColor: "#33cccc", border: "10px solid black", borderRadius: 25, marginLeft: 200,marginRight: 200, padding: 100}}>
        <form align="left" >
                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label > <b>Имя:</b></label> <br />
                            <label> {`${data.name}`}</label>
                        </p>
                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label> <b>ИНН:</b></label><br />
                            <label> {`${data.inn}`}</label>
                        </p>

                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label> <b>КПП:</b></label><br />
                            <label> {`${data.kpp}`}</label>
                        </p>

                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label><b> Телефон:</b></label> <br />
                            <label> {`${data.phone}`}</label>
                        </p>
                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label><b>Компания:</b></label> <br />
                            <label> {`${data.company}`}</label>
                        </p >
                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label><b> Руководитель:</b></label> <br />
                            <label> {`${data.manager}`}</label>
                        </p>
        </form>
        </div>
        </div>

    }
}

export default Page;