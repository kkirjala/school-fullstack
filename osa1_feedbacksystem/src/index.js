import React from 'react'
import ReactDOM from 'react-dom'

// const App = () => {
class App extends React.Component {
    constructor() {
        super()
        this.state = {

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
    }    

    // TODO:
    registerOpinion = (opinionId) => {
        const opinionsMatch = this.state.opinions.find(x => x.id === opinionId);

        this.setState((prevState) => ({
            // opinions: prevState.counter + 1
        }));
    }
  
    render() {
        return(
            <div>
                <FeedbackEntry feedbackOptions={this.state.opinions} />
                <FeedbackStatistics />
            </div>
        )
    }         
}

// Otsikko, Sisalto ja Yhteensa

const FeedbackEntry = ({feedbackOptions}) => {
    // header + napit
    
    return (
        <div>
            <SectionHeader headerText="Anna palautetta" />
            <FeedbackButtonPanel opinions={feedbackOptions} />            
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
        <button onClick={() => registerOpinion(props.buttonId)}>{props.label}</button>
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