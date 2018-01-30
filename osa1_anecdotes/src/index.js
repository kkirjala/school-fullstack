import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: {}
        }
    }

    randomizeAnecdote = () => {
        this.setState((prevState) => ({
            selected: Math.floor(Math.random()*this.props.anecdotes.length)
        }));
    }

    voteAnecdote = (anecdote) => {
        return () => {
            const copyVotes = {...this.state.votes}

            if (isNaN(copyVotes[anecdote])) {
                copyVotes[anecdote] = 1;
            } else {
                copyVotes[anecdote] += 1;
            }
    
            this.setState({
                votes: copyVotes
            });
    
        }

    }

    render() {
        console.log("render sel: ", this.state.selected);
        return (
            <div>
                <div>{this.props.anecdotes[this.state.selected]}</div>
                <div>Has {this.state.votes[this.state.selected]} votes</div>
                <div>
                    <RandomizeButton handleClick={this.randomizeAnecdote} />
                    <VotingButton handleClick={this.voteAnecdote(this.state.selected)} />                    
                </div>
                <div>
                    <VotingStatistics 
                        votes={this.state.votes}
                        anecdotes={this.props.anecdotes} 
                    />
                </div>
            </div>
        )
    }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const RandomizeButton = ({handleClick}) => {
    return (
        <button onClick={handleClick}>
            Next anecdote
        </button>
    )
}

const VotingButton = ({handleClick}) => {
    return (
        <button onClick={handleClick}>
            Vote
        </button>
    )
}

const VotingStatistics = ({votes, highestVoteIndex, anecdotes}) => {

    const getHighestVotesIndex = () => {
        let max = 0;

        Object.keys(votes).forEach((key) => {
            if (votes[key] > votes[max]) {
                max = key;
            }
        });

        return max;
    }

    // conditionally create the statistics depending on if there are any votes.
    const statisticsRows = () => {

        if (Object.keys(votes).length === 0) {
            return (
                <div>No votes yet.</div>
            )
        } else {
            return (
                <div>
                    <div>{anecdotes[getHighestVotesIndex()]}</div>
                    <div>Has {votes[getHighestVotesIndex()]} votes</div>
                </div>
            )
        }
    }

    return (
        <div>
            <SectionHeader headerText="Anecdotes with most votes" />
            {statisticsRows()}
        </div>
    )
}

const SectionHeader = ({headerText}) => {
    return (
        <h1>{headerText}</h1>
    )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)