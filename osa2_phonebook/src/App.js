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
        this.refreshPersonsList()
    }

    refreshPersonsList() {
        persons
            .getAll()
            .then(persons => {
                this.setState({
                    persons
                })
            })
    }

    handleAddPerson = (event) => {
        event.preventDefault()
        this.addPerson()
    }

    addPerson() {

        const newPerson = {
            name: this.state.newName,
            phoneNumber: this.state.newNumber,
        }

        // duplicate check
        const duplicatePersonIndex = this.state.persons
            .map((person) => person.name)
            .indexOf(this.state.newName)

        if (duplicatePersonIndex !== -1 ) {

            const duplicatePerson = this.state.persons[duplicatePersonIndex]

            // replace/update info?
            if (window.confirm(duplicatePerson.name 
                + ' on jo luettelossa. Korvataanko vanha numero uudella?')) {
                persons
                    .updatePerson(duplicatePerson.id, newPerson)
                    .then(updatedPerson => {
                        this.setState({
                            persons: this.state.persons
                                .map(person => 
                                    person.id !== duplicatePerson.id ? person : updatedPerson),
                            newName: '',
                            newNumber: '',
                        })
                        return;
                    })
                    .catch(error => {
                        // exception: person was removed before/during update,
                        // remove from list and add a new entry
                        this.setState({ 
                            persons: this.state.persons
                                .filter(person => person.id !== duplicatePerson.id) 
                            })
                        this.addPerson()
                    })
            }

    
        } else {
            persons
                .createPerson(newPerson)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: '',
                    })
                })
        }


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

            <form onSubmit={this.handleAddPerson}>
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