import React from 'react';

const CountryDetails = ({country}) => {

    return (   
        <div>
            <h2>{country.name} / {country.nativeName}</h2>
            <div>
                capital: {country.capital}
            </div>
            <div>
                population: {country.population}
            </div>
            <div>
                <img alt={country.name} width="300em" src={country.flag} />
            </div>
        </div>
    )
}

export default CountryDetails