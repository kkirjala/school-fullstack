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
            searchFilter: event.target.value.toLowerCase()
        })
    }

    handleCountryNameClick = (name) => {
        this.setState({
            searchFilter: name.toLowerCase()
        })
    }

    render() {
        const countryDisplay = () => {

            const countriesToShow =
            !this.state.searchFilter ?
                this.state.countries :
                this.state.countries
                    .filter(country => {
                        const lowerCaseName = country.name.toLowerCase()
                        return (                            
                            lowerCaseName.indexOf(this.state.searchFilter) !== -1
                        )
                    })

            // if more than 10 matches, don't show anything
            // more than 1 but less than 10, show a list
            // 1 -> detailed country info
        
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

                {countryDisplay()}
                
            </div>
        )
    }

}

export default App