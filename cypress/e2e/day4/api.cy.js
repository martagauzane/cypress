/// <reference types="cypress" />

// DAY 4 - API testing with cy.request()
// No browser UI needed - Cypress talks to the server directly.

describe('API testing with cy.request', () => {
  const API = 'https://jsonplaceholder.typicode.com'

  it('GET a single post', () => {
    cy.request(`${API}/posts/1`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
      expect(response.body).to.have.all.keys('userId', 'id', 'title', 'body')
    })
  })

  it('GET a list and check its size', () => {
    cy.request(`${API}/posts`).its('body').should('have.length', 100)
  })

  // status 200, 404, 400 ,401 ,500
  it('GET with query params', () => {
    cy.request({ url: `${API}/comments`, qs: { postId: 1 } }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.length(5)
      body.forEach((comment) => expect(comment.postId).to.eq(1))
    })
  })

  it('POST creates a new resource', () => {
    const newPost = { title: 'Cypress Junior 2026', body: 'Hello from TDL School', userId: 7 }

    cy.request('POST', `${API}/posts`, newPost).then((response) => {
      expect(response.status).to.eq(201) // 201 = created
      expect(response.body).to.include(newPost)
      expect(response.body.id).to.be.a('number')
    })
  })

  it('negative: 404 for a resource that does not exist', () => {
    cy.request({ url: `${API}/posts/99999`, failOnStatusCode: false })
      .its('status')
      .should('eq', 404)
  })

  it('chaining requests: login -> use the token', () => {
    cy.request('POST', 'https://dummyjson.com/auth/login', {
      username: 'emilys',
      password: 'emilyspass',
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200)
      const token = loginResponse.body.accessToken

      cy.request({
        url: 'https://dummyjson.com/auth/me',
        headers: { Authorization: `Bearer ${token}` },
      }).then((meResponse) => {
        expect(meResponse.status).to.eq(200)
        expect(meResponse.body.username).to.eq('emilys')
      })
    })
  })
})