import React from 'react'

const Course = ({course}) => {

    return (
        <div>
            <CourseHeader course={course} />
            <CourseContent course={course} />
            <CourseTotalAssignments course={course} />
        </div>
    )

}

const CourseContent = ({course}) => {

    const courseParts = course.courseParts.map((part) => {

        // remove spaces + partid = unique element key
        const partKey = part.partName.replace(/\s/g, '') + part.id

        return (
            <CoursePart 
                key={partKey}
                partName={part.partName} 
                assignments={part.assignments} 
            />
        )

    });

    return(
      <div>
        {courseParts}
      </div>
    )
}

const CourseTotalAssignments = ({course}) => {
    
    const amountAssignments = course.courseParts
        .map((part) => part.assignments)
        .reduce((acc, curr) => acc + curr)
    
    return(
      <p>yhteensä {amountAssignments} tehtävää</p>
    )
}



const CourseHeader = ({course}) => <h1>{course.courseName}</h1>
const CoursePart = ({partName, assignments}) => <p>{partName} {assignments}</p>

export default Course