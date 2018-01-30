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

    calculateTotalNumberOfVotes() {
        return this.state.opinions.Huono
            + this.state.opinions.Neutraali
            + this.state.opinions.Hyvä;
    }

    calculateAverage() {

        let totalScore = (this.state.opinions.Huono * -1) 
            + (this.state.opinions.Neutraali * 0) 
            + (this.state.opinions.Hyvä * 1);

        return totalScore / this.calculateTotalNumberOfVotes();

    }

    calculatePositives() {
        return this.state.opinions.Hyvä / this.calculateTotalNumberOfVotes();
    }

    render() {
        return (
            <div>

                <FeedbackEntry 
                    opinions={this.state.opinions} 
                    handleClick={this.registerOpinion}
                />

                <Statistics 
                    opinions={this.state.opinions} 
                    average={this.calculateAverage()}
                    amountPositives={this.calculatePositives()}
                />

            </div>
        )
    }
}



const Statistics = ({opinions, average, amountPositives}) => {

    // jos ei vielä arvioida, näytetään placeholder
    if (isNaN(average)) {
        return (
            <div>Ei yhtään palautetta annettu.</div>              
        )
    }

    const statisticsRows = Object.entries(opinions).map(([key,value])=>
        <Statistic key={key} vote={key} amount={value} />
    )
    return (
        <div>
            <SectionHeader headerText="Statistiikka" />
            {statisticsRows}
            <div>Keskiarvo: {average.toFixed(2)}</div>
            <div>Positiivisia: {(amountPositives * 100).toFixed(2)} %</div>
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