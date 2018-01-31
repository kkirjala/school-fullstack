import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'


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


ReactDOM.render(
  <App />,
  document.getElementById('root')
)