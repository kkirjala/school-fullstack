import React from 'react';
import PhoneNumbers from './PhoneNumbers';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', phoneNumber: '040-123456' },
        { name: 'Martti Tienari', phoneNumber: '040-123456' },
        { name: 'Arto Järvinen', phoneNumber: '040-123456' },
        { name: 'Lea Kutvonen', phoneNumber: '040-123456' }
      ],

      newName: '',
      newNumber: '',

      searchFilter: '',
    }
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

    const newPersons = this.state.persons.concat(additionalPerson)

    this.setState({
        persons: newPersons,
        newName: '',
        newNumber: '',
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