import React from 'react';
import PhoneNumbers from './PhoneNumbers';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { 
            name: 'Arto Hellas' 
        }
      ],

      newName: '',
    }
  }

  addPhoneNumber = (event) => {
    event.preventDefault()


    let additionalPerson = {
        name: this.state.newName,
    }

    // duplicate check
    const duplicateEntryIndex = this.state.persons
        .map((person) => person.name)
        .indexOf(this.state.newName)

    if (duplicateEntryIndex !== -1 ) {
        this.setState({
            newName: ''
        })
        return;      
    }

    const newPersons = this.state.persons.concat(additionalPerson)

    this.setState({
        persons: newPersons,
        newName: ''
    })

  }

  handleInputChange = (event) => {
      this.setState({
          newName: event.target.value
      })
  }


  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPhoneNumber}>
          <div>
            nimi:           
            <input
                value={this.state.newName}
                onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
            <PhoneNumbers persons={this.state.persons} />
        
      </div>
    )
  }
}

export default App