import React from 'react';
import axios from 'axios'
import CountryList from './components/CountryList';

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

    handleCountryNameClick = (name) => {
        this.setState({
            searchFilter: name
        })
    }

    render() {
        const countryDisplay = () => {

            const countriesToShow =
                !this.state.searchFilter ?
                    this.state.countries :
                    this.state.countries
                        .filter(country => 
                            country.name
                                .toLowerCase()
                                .indexOf(this.state.searchFilter.toLowerCase()) !== -1
                        )


            if (countriesToShow.length > 10) {
                return (                    
                    <div>Too many matches. Please refine your search.</div>
                )
            } else if (countriesToShow.length >= 1) {
                return (
                    <CountryList 
                        countries={countriesToShow} 
                        handleClick={this.handleCountryNameClick}
                    />
                )
            }
        }

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
                <div>
                    {countryDisplay()}
                </div>
                
            </div>
        )
    }

}

export default App