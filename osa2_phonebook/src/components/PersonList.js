import React from 'react';

const PersonList = ({persons, handleClick}) => {
   
    return (
        persons.map((person) => 
            <PersonDetails 
                key={person.name}
                id={person.id} 
                name={person.name} 
                phoneNumber={person.phoneNumber}
                handleClick={handleClick}
            />
        )
    )
}

const PersonDetails = ({id, name, phoneNumber, handleClick}) => {

    return (
        <div>
            {name} ({phoneNumber})
            <button onClick={() => handleClick(id)}>poista</button>
        </div>
    )
}

export default PersonList