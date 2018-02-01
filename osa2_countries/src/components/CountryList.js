import React from 'react';

const Countries = ({countries}) => {
   
    return (
        countries.map((country) => 
            <Country 
                key={country.name} 
                name={country.name} 
            />
        )
    )
}

const Country = ({name}) => {

    return (
        <div>{name}</div>
    )
}



export default Countries