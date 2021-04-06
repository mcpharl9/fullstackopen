import React from 'react'

const Header = (props) => {
 
  return (
    <div>
      <h1>{props.course.name}</h1>
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
const Total = () => {
  const parts = [
    {
      name: 'Fundamentals of React ',
      exercises: 10
    },
    {
      name: 'Using props to pass data ',
      exercises: 7
    },
    {
      name: 'State of a component ',
      exercises: 14
    }
  ]
 
  return (
    <div>
      <p>Number of exercises {parts[0]["exercises"] + parts[1]["exercises"] + parts[2]["exercises"]}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development ',
    parts: [
      {
        name: 'Fundamentals of React ',
        exercises: 10
      },
      {
        name: 'Using props to pass data ',
        exercises: 7
      },
      {
        name: 'State of a component ',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total course={course.parts} />
    </div>
  )
}

export default App