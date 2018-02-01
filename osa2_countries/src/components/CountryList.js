import React from 'react';
import CountryDetails from './CountryDetails';

const Countries = ({countries, handleClick}) => {
   
    // detailed view with full info if just 1 country to display
    if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]} />
        )
    } else {
        return (
            countries.map((country) => 
                <CountryListEntry 
                    key={country.name} 
                    name={country.name} 
                    handleClick={handleClick}
                />
            )
        )
    }

}

const CountryListEntry = ({name, handleClick}) => {
    return (
        <div onClick={() => handleClick(name)}>{name}</div>
    )
}


export default Countries