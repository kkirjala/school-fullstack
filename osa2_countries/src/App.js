import React from 'react';
import Countries from './Countries';
import axios from 'axios'


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            countries: [],
            searchFilter: '',
        }

    }

    componentWillMount() {
        
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            this.setState({ countries: response.data })
        })
    }


    handleSearchFilterChange = (event) => {
        this.setState({
            searchFilter: event.target.value
        })
    }

    render() {
        console.log(this.state.countries)


        const countriesToShow =
            !this.state.searchFilter ?
                this.state.countries :
                this.state.countries
                    .filter(country => country.name.indexOf(this.state.searchFilter) !== -1)

        return (
        <div>
            <h2>Country list</h2>

            <div>
                
                <form>
                Find countries:
                    <input
                            value={this.state.searchFilter}
                            onChange={this.handleSearchFilterChange}
                        />
                </form>

            </div>

            </form>
            <h2>Countries</h2>
                <Countries persons={countriesToShow} />
            
        </div>
        )
    }

}

export default App