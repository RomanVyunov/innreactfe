import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

/*export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }
  return makeDataLevel()
}*/

export default function makeData(...lens) {

          /*    accessor: 'firstName',
              accessor: 'lastName',
              accessor: 'age',
              accessor: 'visits',
              accessor: 'status',
              accessor: 'progress',*/
var itemsOld = [{"firstName":"Name",
              "lastName":"LastName",
              "age": 29,
              "visits":100,
              "status":"OK",
              "progress":"PROGR"}];
var itemsNew;

var items = [{"id":1,
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
                "progress":"PROGR"}];


return items;
}

/*export default function makeDataRest() {
    var data;
    fetch(`http://localhost:8123/users`)
        .then(res => res.json())
        .then(
                  (result) => {
                  console.log("RESULT OF FETCH!!!"+result)
                    data = result;
                  },
                  // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                  // чтобы не перехватывать исключения из ошибок в самих компонентах.
                  (error) => {
                  console.log("ERROR OF FETCH!!!"+error)
                  }
                )
    return data;
}*/