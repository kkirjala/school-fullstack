import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const feedbackOptions = {
        opinions: [
            {
                id: 0,
                description: 'Hyvä',
                votes: 0
            },
            {
                id: 1, 
                description: 'Neutraali',
                votes: 0
            },
            {
                id: 2,
                description: 'Huono',
                votes: 0
            }
        ]
    }
  
    return (
        <div>
            <FeedbackEntry feedbackOptions={feedbackOptions} />
            <FeedbackStatistics />
        </div>
    )
}

// Otsikko, Sisalto ja Yhteensa

const FeedbackEntry = ({feedbackOptions}) => {
    // header + napit
    return (
        <div>
            <SectionHeader headerText="Anna palautetta" />
            <FeedbackButtonPanel opinions={feedbackOptions.opinions} />            
        </div>
    )
}

const FeedbackStatistics = () => {
    // header + statsit per mielipide
    return (
        <div>
            <SectionHeader headerText="Statistiikka" />
        </div>
    )
}


const FeedbackButtonPanel = ({opinions}) => {

    const FeedbackButtons = [];

    opinions.forEach(element => {
        FeedbackButtons.push(<FeedbackButton key={element.id} buttonId={element.id} label={element.description} />)
    });

    return (
        <div>
            {FeedbackButtons}
        </div>
    )
}

const FeedbackButton = (props) => {
    return (
        <button onClick={() => console.log('click:', props.buttonId)}>{props.label}</button>
    )
}



const SectionHeader = (props) => {

    return (
        <h1>{props.headerText}</h1>
    )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)