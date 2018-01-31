import React from 'react'
import ReactDOM from 'react-dom'





const App = () => {
    const courses = [
        {
        courseName: 'Half Stack -sovelluskehitys',
        id: 1,
        courseParts: [
                {
                    partName: 'Reactin perusteet',
                    assignments: 10,
                    id: 1
                },
                {
                    partName: 'Tiedonvälitys propseilla',
                    assignments: 7,
                    id: 2
                },
                {
                    partName: 'Komponenttien tila',
                    assignments: 14,
                    id: 3
                }
            ]
        },
        {
        courseName: 'Node.js',
        id: 2,
        courseParts: [
                {
                    partName: 'Routing',
                    assignments: 3,
                    id: 1
                },
                {
                    partName: 'Middlewaret',
                    assignments: 7,
                    id: 2
                }
            ]
        }
    ]
  

    const courseList = courses.map((course) => {

        // remove spaces + partid = unique element key
        const courseKey = course.courseName.replace(/\s/g, '') + course.id

        return (
            <Course key={courseKey} course={course} />
        )
    })


    return (
      <div>
        {courseList}
      </div>
    )
}


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


ReactDOM.render(
  <App />,
  document.getElementById('root')
)