import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {


    const course = {
        courseName: 'Half Stack -sovellauskehitys',
        courseParts: [
            {
              name: 'Reactin perusteet',
              tasks: 10
            },
            {
              name: 'Tiedonvälitys propseilla',
              tasks: 7
            },
            {
              name: 'Komponenttien tila',
              tasks: 14
            }
        ]
    }
  
    return (
        <div>
          <PageHeader headerText={course.courseName} />
          <PageContent courseParts={course.courseParts} />
          <TotalTasks courseParts={course.courseParts} />
        </div>
    )
}

// Otsikko, Sisalto ja Yhteensa

const PageHeader = (props) => {

    return (
        <h1>{props.headerText}</h1>
    )
}

const PageContent = (props) => {
    
    const exerciseSets = props.courseParts.map((exSet) =>
        <ExerciseSet partId={exSet.name} amountTasks={exSet.tasks} />
    );

    return (
        <div>
            {exerciseSets}
        </div>
    )
}

const ExerciseSet = (props) => {
    return (
        <p>{props.partId} {props.amountTasks}</p>
    )
}

const TotalTasks = (props) => {

    var totalAmountTasks = 0;

    props.courseParts.forEach(element => {
        totalAmountTasks += element.tasks;
    });

    return (
        <p>yhteensä {totalAmountTasks} tehtävää</p> 
    )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
