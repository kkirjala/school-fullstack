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
        console.log('renderöidään', this.state)
        return (
            <div>

                <FeedbackEntry opinions={this.state.opinions} />

                <div>
                    <Button 
                        handleClick={this.registerOpinion("Huono")}
                        text="Huono"
                    />
                    <Button 
                        handleClick={this.registerOpinion("Neutraali")}
                        text="Neutraali"
                    />
                    <Button 
                        handleClick={this.registerOpinion("Hyvä")}
                        text="Hyvä"
                    />
                </div>

                <FeedbackStatistics opinions={this.state.opinions} />

            </div>
        )
    }
}


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

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
// Otsikko, Sisalto ja Yhteensa




const FeedbackEntry = ({opinions}) => {
    // header + napit
    
    return (
        <div>
            <SectionHeader headerText="Anna palautetta" />
         
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