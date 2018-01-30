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

                <FeedbackStatistics opinions={this.state.opinions} />

            </div>
        )
    }
}


const FeedbackButton = ({ handleClick, text }) => {



    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}



const FeedbackStatistics = ({opinions}) => {
    // header + statsit per mielipide
    return (
        <div>
            <SectionHeader headerText="Statistiikka" />
            <Display opinions={opinions} />
        </div>
    )
}

const Display = ({ opinions }) => {
    return (
        <div>
            Huono: {opinions["Huono"]} <br/>
            Neutraali: {opinions["Neutraali"]} <br/>
            Hyvä: {opinions["Hyvä"]} <br/>
        </div>
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






const SectionHeader = (props) => {

    return (
        <h1>{props.headerText}</h1>
    )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)