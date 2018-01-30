import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        opinions: {
            "Hyvä": 0,
            "Neutraali": 0,
            "Huono": 0
        },

      }

    }
  
    registerOpinion = (counterValue) => {

        return () => {

            var newOpinions = this.state.opinions;
            newOpinions[counterValue] = newOpinions[counterValue] + 1;

            this.setState({ opinions: newOpinions })

        }

    }


    render() {
        return (
            <div>

                <FeedbackEntry 
                    opinions={this.state.opinions} 
                    handleClick={this.registerOpinion}
                />

                <Statistics opinions={this.state.opinions} />

            </div>
        )
    }
}



const Statistics = ({opinions}) => {

    const statisticsRows = Object.entries(opinions).map(([key,value])=>
        <Statistic key={key} vote={key} amount={value} />
    )
    return (
        <div>
            <SectionHeader headerText="Statistiikka" />
            {statisticsRows}
        </div>
    )
}

const Statistic = ({ vote, amount }) => {

    return (
        <div key={vote}>{vote} : {amount}</div>
    )
}

const FeedbackEntry = ({ opinions, handleClick }) => {

    const voteButtons = Object.keys(opinions).map((opinion) =>
        <FeedbackButton key={opinion} text={opinion} handleClick={handleClick(opinion)} />
    )
            
    return (
        <div>
            <SectionHeader headerText="Anna palautetta" />
            {voteButtons}
        </div>
    )

}


const FeedbackButton = ({ handleClick, text }) => {

    return (
        <button onClick={handleClick}>
            {text}
        </button>
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