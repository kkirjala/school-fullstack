import React from 'react';
import PhoneNumbers from './components/PhoneNumbers';
import axios from 'axios'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        persons: [],

        newName: '',
        newNumber: '',

        searchFilter: '',
        }
    }

    componentWillMount() {
        
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            this.setState({ persons: response.data })
        })
    }

    addPhoneNumber = (event) => {
        event.preventDefault()

        let additionalPerson = {
            name: this.state.newName,
            phoneNumber: this.state.newNumber,
        }

        // duplicate check
        const duplicateEntryIndex = this.state.persons
            .map((person) => person.name)
            .indexOf(this.state.newName)

        if (duplicateEntryIndex !== -1 ) {
            this.setState({
                newName: '',
                newNumber: ''
            })
            return;      
        }

        axios
            .post('http://localhost:3001/persons', additionalPerson)
            .then(response => {
                this.setState({
                    persons: this.state.persons.concat(response.data),
                    newName: '',
                    newNumber: '',
                })
            })

    }

        handleNameInputChange = (event) => {
            this.setState({
                newName: event.target.value
            })
        }

        handleNumberInputChange = (event) => {
            this.setState({
                newNumber: event.target.value
            })
        }

        handleSearchFilterChange = (event) => {
            this.setState({
                searchFilter: event.target.value
            })
        }

        render() {

            const personsToShow =
                !this.state.searchFilter ?
                    this.state.persons :
                    this.state.persons
                        .filter(person => person.name.indexOf(this.state.searchFilter) !== -1)

            return (
            <div>
                <h2>Puhelinluettelo</h2>


                <div>
                    
                    <form>
                    rajaa näytettäviä:
                        <input
                                value={this.state.searchFilter}
                                onChange={this.handleSearchFilterChange}
                            />
                    </form>

                </div>

                <h3>Lisää uusi numero</h3>

                <form onSubmit={this.addPhoneNumber}>
                    <div>
                        <div>
                            nimi:           
                            <input
                                value={this.state.newName}
                                onChange={this.handleNameInputChange}
                            />
                        </div>
                        <div>
                            numero:
                            <input
                                value={this.state.newNumber}
                                onChange={this.handleNumberInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                    <PhoneNumbers persons={personsToShow} />
                
            </div>
            )
        }
}

export default App