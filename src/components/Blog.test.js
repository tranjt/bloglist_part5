import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Jumppapallo',
    author: 'Pekka pallo',
    url: 'http://cookies.com',
    user: {
      name: 'kalle Tunturi'
    },
    likes: 101
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('displayed title and author by default', () => {
    expect(component.container).toHaveTextContent('Jumppapallo')
    expect(component.container).toHaveTextContent('Pekka pallo')
  })

  test('not display (url, user and likes) enclosed in togglableContent div by default', () => {
    const div = component.container.querySelector('.togglableContent')
    
    expect(div).toHaveStyle('display: none')
  })

  test('(url, user and likes) enclosed in togglableContent div exist', () => {
    expect(component.container).toHaveTextContent('http://cookies.com')
    expect(component.container).toHaveTextContent('kalle Tunturi')
    expect(component.container).toHaveTextContent(101)
  })

  test('after clicking the button, children of togglableContent div are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })


})