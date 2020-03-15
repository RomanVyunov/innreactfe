import React, { Component } from 'react';

class Page extends Component {

    constructor(props) {
        super(props);

        this.state ={ data: {}, isFetching: true, error: null };
    }


    componentDidMount(){
               console.log("componentDidMount()",this.props.location.state.detail);
    //fetch(`http://localhost:8123/users?id=${this.props.location.state.detail}`)
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
                  // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                  // чтобы не перехватывать исключения из ошибок в самих компонентах.
                  (error) => {
                  console.log("ERROR OF FETCH!!!"+error)
                    this.setState({
                      isFetching: true,
                      error
                    });
                  }
                )
    }


    render() {
    console.log("RENDER MY PAGE!!!!!!!!!")
    console.log("X=",this.props.location.state.detail);
        /*return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>MY PAGE !!!!!!!{this.props.location.state.detail} </h2>
                </div>
            </div>
        );*/
        const { data, isFetching, error } = this.state;
        return <div >
        <h1>Inforamtion about user</h1>
        <div style={{backgroundColor: "#33cccc", border: "10px solid black", marginLeft: 100,marginRight: 100, padding: 100}}>
        <form align="left" >
                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label > <b>Name:</b></label> <br />
                            <label> {`${data.name}`}</label>
                        </p>
                        <p style={{backgroundColor: "#33cccc", border: "5px solid black", padding: 10}}>
                            <label> <b>INN:</b></label><br />
                            <label> {`${data.inn}`}</label>
                        </p>
                        <p>
                            <label><b> Phone:</b></label> <br />
                            <label> {`${data.phone}`}</label>
                        </p>
                        <p>
                            <label><b>Company:</b></label> <br />
                            <label> {`${data.company}`}</label>
                        </p>
                        <p>
                            <label><b> Manager:</b></label> <br />
                            <label> {`${data.manager}`}</label>
                        </p>
        </form>
        </div>
        </div>

    }
}

export default Page;