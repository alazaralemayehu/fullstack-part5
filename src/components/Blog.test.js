import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test(`tests blog's title and author but not url and number of likes`, () => {
    const blog = {
        title: 'title one',
        author: 'alazar',
        likes: 4,
        url: 'www.medium.com',
        user: {
            name: 'test user'
        }
    }

    const component = render (
        <Blog blog= {blog} />
    )
    expect(component.container).toHaveTextContent(
        'title one'
    )
    
    expect(component.container).not.toHaveTextContent(
        'www.medium.com'
    )
})

test('clicking show buttons show url and blogs', () => {
    const blog = {
        title: 'title one',
        author: 'alazar',
        likes: 10,
        url: 'www.medium.com',
        user: {
            name: 'test user'
        }
    }


    const component = render(
        <Blog blog={blog} />
    )

    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    expect(component.container).toHaveTextContent(10)
    expect(component.container).toHaveTextContent('www.medium.com')
})


test('clicking Like button twice calls increaseLiks twice', () => {
    const blog = {
        title: 'title one',
        author: 'alazar',
        likes: 10,
        url: 'www.medium.com',
       
    }
    const mockHanldler = jest.fn()
    const component = render(
        <Blog blog={blog} increaseLike={mockHanldler} />
    )

    const showButton = component.getByText('show')
    fireEvent.click(showButton)
    
    let likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    
    expect(mockHanldler.mock.calls).toHaveLength(2)
})

test ( '<BlogForm /> updateds parent states and calls onSubmit' , async() => {
    const createBlog = jest.fn()
    const errorFunction = jest.fn()
    const notificationTypeFunction = jest.fn()
    const component = render(
        <BlogForm 
            addBlog = {createBlog}
            setErrorMessage={errorFunction}
            setNotificationType ={ notificationTypeFunction}
        />
    )

    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const title = component.container.querySelector('#title')
    const form = component.container.querySelector('form')


    fireEvent.change( author, {
        target: { value: 'alazar'}
    })

    fireEvent.change( url, {
        target: { value: 'www.medium.com'}
    })

    fireEvent.change(title, {
        target: { value: 'title one'}
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].author).toBe('alazar')
    expect(createBlog.mock.calls[0][0].url).toBe('www.medium.com')
    expect(createBlog.mock.calls[0][0].title).toBe('title one')
})