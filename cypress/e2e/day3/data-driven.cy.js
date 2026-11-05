/// <reference types="cypress" />
import users from '../../fixtures/users.json'
import LoginPage from '../../pages/LoginPage'
import InventoryPage from '../../pages/InventoryPage'

// DAY 3 - one test, many users (data-driven testing)

describe('SauceDemo - every valid user can log in', () => {
  users.valid.forEach((username) => {
    it(`logs in as ${username}`, () => {
      LoginPage.open()
      LoginPage.login(username, users.password)
      InventoryPage.shouldBeOpen()
    }) 
  })

  it('locked out user cannot log in', () => {
    LoginPage.open()
    LoginPage.login(users.locked, users.password)
    LoginPage.shouldShowError('locked out')
  })
})