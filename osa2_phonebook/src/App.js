import React from 'react';
import PersonList from './components/PersonList';
import persons from './services/persons';


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
        
        persons
            .getAll()
            .then(persons => {
                this.setState({
                    persons
                })
            })

    }

    addPerson = (event) => {
        event.preventDefault()

        const additionalPerson = {
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
                newNumber: '',
            })
            return;      
        }

        persons
            .createPerson(additionalPerson)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: '',
                    newNumber: '',
                })
            })
    }

    deletePerson = (id) => {

        const deleteName = this.state.persons
            .find(person => person.id === id)
            .name

        if (window.confirm('Poistetaanko ' + deleteName + ' ?')) {
            persons
            .deletePerson(id)
            .then(deletedPerson => {
                this.setState({
                    persons: this.state.persons.filter(person => person.id !== id)
                })
            })
        }

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
                    .filter(person => person.name
                            .toLowerCase()
                            .indexOf(this.state.searchFilter.toLowerCase()) !== -1)

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

            <form onSubmit={this.addPerson}>
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
                <PersonList 
                    persons={personsToShow} 
                    handleClick={this.deletePerson}
                />
            
        </div>
        )
    }
}

export default App