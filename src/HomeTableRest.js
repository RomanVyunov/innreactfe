import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import history from './history'

//https://github.com/tannerlinsley/react-table/blob/master/examples/basic/src/App.js
import styled from 'styled-components'
import { useTable } from 'react-table'

//import makeData from './makeData'
import makeDataRest from './makeData'

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    background-color: #33cccc;
    width: 100%;
    border: 10px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

    console.log("getTableProps=",getTableProps)
    console.log("getTableBodyProps=",getTableBodyProps)
    console.log("headerGroups=",headerGroups)
    console.log("rows=",rows)
    console.log("prepareRow=",prepareRow)

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps({onClick: () => {rowInfo(row)},
                                style: {
                                    background: "green"
                                }})}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const rowInfo = (rowobject) => {
    console.log("ROW PRESSED!!!!!!!");
    console.log("OBJECT ID =",rowobject.values.id)
    let x = 101;
    history.push({
    pathname: '/page',
    state: {detail: rowobject.values.id}})
    console.log("PUSHED!!!!!!!");
}


function  HomeTableRest() {
    const[data, setData] = useState([]);
    const[keyword, setKeyword] = useState('');

    const [myState, setMyState] = useState({
          loading: true,
          loadingX: true,
          dataTable: {}
});

    const fetchData = () => {
        console.log("FETCH WITH NAME="+keyword)
        fetch(`http://localhost:8123/usersfiltered?name=${encodeURIComponent(keyword)}`)
        .then(response => response.json())
        .then(responseData => {
        setData(responseData);
        });
    }

    const addUser = () => {
        history.push('/adduser')
    }

    const handleChange = (e) => {
        setKeyword(e.target.value);
    }

    const columns = React.useMemo(
    () => [
      {
        Header: 'Our clients',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Inn',
            accessor: 'inn',
          },
          {
            Header: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'Company',
            accessor: 'company',
          },
          {
            Header: 'Manager',
            accessor: 'manager',
          },
        ],
      },
    ],
    []
  )

    useEffect(() => {

            fetch(`http://localhost:8123/users`)
                .then(res => res.json())
                .then(
                          (result) => {
                          console.log("RESULT OF FETCH!!!"+result)
                          //setDataTable(result);
                          /*var resultX = [{"id":1,
                                        "inn":"INN",
                                        "age": 29,
                                        "visits":100,
                                        "status":"OK",
                                        "progress":"PROGR"},
                                        {"id":2,
                                          "inn":"INN_2",
                                          "age": 29,
                                          "visits":100,
                                          "status":"OK",
                                          "progress":"PROGR"}];*/
                        setData(result);

                          },
                          (error) => {
                            console.log("ERROR OF FETCH!!!"+error)
                          }
                        )

        }, []);


    /*useEffect(() => {
        console.log("USE EFFECT IS CALLED!!!");
    }, []);*/

    console.log("RENDER!!!");
    return (
        <div className="HomeTableRest">
            <input type="text" onChange={handleChange} />
            <button onClick={fetchData} value = {keyword}>Поиск</button>
            <button onClick={addUser} >Добавить пользователя</button>
            <Styles>
                <Table columns={columns} data={data}/>
            </Styles>
        </div>
    )
}


export default HomeTableRest;