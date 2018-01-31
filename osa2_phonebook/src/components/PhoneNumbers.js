import React from 'react';

const PhoneNumbers = ({persons}) => {
   
    return (
        persons.map((person) => <PhoneNumber key={person.name} name={person.name} />)
    )
}

const PhoneNumber = ({name}) => {


    return (
        <div>{name}</div>
    )
}

export default PhoneNumbers