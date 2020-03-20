import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import history from './history'

import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    background-color: green;
    width: 100%;
    border: 10px solid black;
    border-radius: 25;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :hover {
          background-color: green !important;
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
                                    background: "#33cccc"
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
    history.push({
    pathname: '/page',
    state: {detail: rowobject.values.id}})
}


function  HomeTableRest() {
    const[data, setData] = useState([]);
    const[keyword, setKeyword] = useState('');

    const [myState, setMyState] = useState({
          loading: true,
          loadingX: true,
          dataTable: {}
});

/* Обработчик для поиска */
    const fetchData = () => {
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
        Header: 'Клиенты',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Имя',
            accessor: 'name',
          },
          {
            Header: 'ИНН',
            accessor: 'inn',
          },
          {
            Header: 'КПП',
            accessor: 'kpp',
          },
          {
            Header: 'Телефон',
            accessor: 'phone',
          },
          {
            Header: 'Компания',
            accessor: 'company',
          },
          {
            Header: 'Руководитель',
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
                            setData(result);
                          },
                          (error) => {

                          }
                        )

        }, []);


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