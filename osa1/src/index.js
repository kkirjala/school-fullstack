import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  
  const courseName = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
        <PageHeader headerText={courseName} />
        <PageContent part1={osa1} tasks1={tehtavia1} part2={osa2} tasks2={tehtavia2}
            part3={osa3} tasks3={tehtavia3} />
        <TotalTasks totalAmountTasks={tehtavia1 + tehtavia2 + tehtavia3} />
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

    return (
        <div>
            <ExerciseSet partId={props.part1} amountTasks={props.tasks1} />
            <ExerciseSet partId={props.part2} amountTasks={props.tasks2} />
            <ExerciseSet partId={props.part3} amountTasks={props.tasks3} />
        </div>
    )
}

const ExerciseSet = (props) => {
    return (
        <p>{props.partId} {props.amountTasks}</p>
    )
}

const TotalTasks = (props) => {
    return (
        <p>yhteensä {props.totalAmountTasks} tehtävää</p> 
    )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
