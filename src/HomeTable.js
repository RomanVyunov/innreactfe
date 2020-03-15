import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
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
    border: 1px solid black;
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
            <tr {...row.getRowProps({onClick: () => rowInfo(row)})}>
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
    console.log(rowobject)
    let x = 101;
    history.push({
    pathname: '/page',
    state: {detail: x}})
}


/*function HomeTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )*/

function  HomeTable() {
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
            Header: 'Inn',
            accessor: 'inn',
          }/*,
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Company',
            accessor: 'company',
          },*/
        ],
      },
    ],
    []
  )



  const onRowClick = (state, rowInfo, column, instance) => {
      return {
          onClick: e => {
              console.log('A Td Element was clicked!')
              console.log('it produced this event:', e)
              console.log('It was in this column:', column)
              console.log('It was in this row:', rowInfo)
              console.log('It was in this table instance:', instance)
          }
      }
  }

// const data = React.useMemo(() => makeData(20), [])
const data = React.useMemo(() => makeDataRest(), [])
    console.log("DATA FOR TABLE ="+data)

  return (
    /*<Styles>
        <div class="container-fluid align-items-center">
                   <h1 class="display-1">Таймер</h1>
                   <div>
                    <button class="display-4">Удалить</button>
                   </div>
        </div>
      <Table columns={columns} data={data} getTrProps={onRowClick}/>
    </Styles>*/
    <Styles>
        <Table columns={columns} data={data}/>
    </Styles>
  )

}




/*class HomeTable extends React.Component {
  render() {
  console.log("TRY!!!!!!!!!!!")
    //return <h1 class="display-1">Привет, {this.props.name}!</h1>;
    return <div class="container-fluid align-items-center">
             <h1 class="display-1">Таймер</h1>
             <div>
               <button class="display-4" onClick={this.myMethod}>Добавить</button>
               <button class="display-4">Удалить</button>
             </div>
           </div>
  }

  myMethod(){
    history.push('/page')

  }
}*/

export default HomeTable;