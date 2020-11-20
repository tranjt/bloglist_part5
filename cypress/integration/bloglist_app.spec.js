describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'admin',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'admin')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('a cypress test')
      cy.get('#author').type('newbie tester')
      cy.get('#url').type('www.test.fi')
      cy.contains('create').click()

      cy.contains('a cypress test')
      cy.contains('newbie tester')
      cy.contains('www.test.fi')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'newbie yksi', url: 'www.firstblog.fi' })
        cy.createBlog({ title: 'second blog', author: 'newbie kaksi', url: 'www.secondblog.fi' })
        cy.createBlog({ title: 'third blog', author: 'newbie kolme', url: 'www.thirdblog.fi' })
      })

      it('user can like a blog', function () {
        cy.contains('second blog').find('#viewButton').click()
        cy.contains('second blog').should('contain', '0 like')
        cy.contains('second blog').find('#likeButton').click()
        cy.contains('second blog').should('contain', '1 like')
      })

      it('user can delete a blog', function () {
        cy.contains('third blog').contains('view').click()
        cy.contains('third blog').contains('delete').click()
      })
    })
  })

})


