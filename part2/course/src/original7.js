import React from 'react'

const Header = (props) => {
 
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}
const Part = (props) => {

  
  return (
    <div>
      {props.name}{props.exercises}
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}
const Total = ({parts}) => {
  const total = parts.reduce((sum, currentNumber) => sum + currentNumber.exercises, 0)
  return (
    <div>
      <p>Total of {total} exercises</p>
    </div>
  )
  }

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development ',
    parts: [
      {
        name: 'Fundamentals of React ',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data ',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component ',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App