import { func } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'alazar',
      username: 'alazar',
      password: 'alazar'
    }
    const user1 = {
      name: 'alazar1',
      username: 'alazar1',
      password: 'alazar1'
    }
    cy.request('POST','http://localhost:3003/api/users/', user)
    cy.request('POST','http://localhost:3003/api/users/', user1)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function(){
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('alazar')
      cy.get('#password').type('alazar')
      cy.get('#login-button').click()
      cy.contains('alazar logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('alazar')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('when logged in',function() {
    beforeEach(function() {
      cy.get('#username').type('alazar')
      cy.get('#password').type('alazar')
      cy.get('#login-button').click()
    })
    
    it('a blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('#author').type('alazar')
      cy.get('#title').type('cypress test')
      cy.get('#url').type('www.google.com')
      cy.get('#blogSubmit').click()
      cy.contains('cypress test')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('new Blog').click()
        cy.get('#author').type('alazar')
        cy.get('#title').type('another cypress test')
        cy.get('#url').type('www.google.com')
        cy.get('#blogSubmit').click()

        cy.contains('new Blog').click()
        cy.get('#author').type('alazar')
        cy.get('#title').type('blog to be deleted')
        cy.get('#url').type('www.google.com')
        cy.get('#blogSubmit').click()

      })

      it('a user can like a blog', function() {
        cy.contains('another cypress test alazar')
          .contains('show').click()
          .get('#increaseLike').click()

          cy.contains('likes 1')
      })

      it('a user who created a blog can delete it', function() {
        cy.contains('blog to be deleted alazar')
          .contains('show').click()
          .get('.removeBlog').click()

        cy.get('#blogList').should('not.contain', 'blog to be deleted')
      })

      //  This is bonus exercise
      it('a user who did not create can not delete the blog', function() {
        cy.get('#logout').click()
        cy.get('#username').type('alazar1')
        cy.get('#password').type('alazar1')
        cy.get('#login-button').click()

        cy.contains('another cypress test alazar')
          .contains('show').click()
          .get('.removeBlog').click()

        cy.get('#blogList').should('contain', 'another cypress test')

      })
    })
    describe('when logged checking the content', () => {
      it('returned Blogs are sorted by number of likes', function() {
        //  directly login using url 
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'alazar', password: 'alazar'
        }).then(response => {
          localStorage.setItem('loggedInUser', JSON.stringify(response.body));
          cy.visit('http://localhost:3000');
        });
        // create blogs with the current user 
        // Use by bypassing the UI because like property can not be send using the front end
        cy.createBlog ({
          title: 'blog1', author:'alazar', url:'www.google.com', likes:10
        })
        cy.createBlog ({
          title: 'blog3', author:'alazar', url:'www.google.com', likes:1
        })      
        cy.createBlog ({
          title: 'blog2', author:'alazar', url:'www.google.com', likes:13
        })
  
        cy.visit('http://localhost:3000/')

        // Get the blogs and check if the content is in order
        cy.get('.blog').then($blogHeader => {
          const blogsObject = Object.values($blogHeader).slice(0,3)
          const blogMap = blogsObject.map(bm => bm.innerHTML)
          expect(blogMap[0]).contain('blog3 alazar')
          expect(blogMap[1]).contain('blog1 alazar')
          expect(blogMap[2]).contain('blog2 alazar')
        })
      })
    })
  })
})