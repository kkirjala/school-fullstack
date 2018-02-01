import React from 'react';

const PhoneNumbers = ({persons}) => {
   
    return (
        persons.map((person) => 
            <PhoneNumber 
                key={person.name} 
                name={person.name} 
                phoneNumber={person.phoneNumber}
            />
        )
    )
}

const PhoneNumber = ({name, phoneNumber}) => {


    return (
        <div>{name} ({phoneNumber})</div>
    )
}

export default PhoneNumbers