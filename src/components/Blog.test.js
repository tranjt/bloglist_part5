import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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
  const updateBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={updateBlog} />
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

  test('clicking like button calls updateBlog with new like count input', () => {
    const button = component.getByText('like')
    fireEvent.click(button)

    expect(updateBlog.mock.calls.length).toBe(1)
    //console.log(JSON.stringify(updateBlog.mock.calls[0][1].likes, null, 2))
    expect(updateBlog.mock.calls[0][1].likes).toBe(102)
  })

  test('clicking like button twice calls updateBlog two times', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateBlog.mock.calls.length).toBe(2)
  })




})