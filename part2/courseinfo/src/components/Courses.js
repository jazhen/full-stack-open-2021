import React from 'react';

const Courses = ({ courses }) => {
  return (
    <ul>
      {courses.map((course) =>
        <Course key={course.id} course={course} />
      )}
    </ul>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return(
    <p>Number of exercises {sum}</p>
  )
}

const Part = (props) => {
  return (
    <li>
      {props.part.name} {props.part.exercises}
    </li>
  )
}

const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </ul>
  )
}

export default Courses;
