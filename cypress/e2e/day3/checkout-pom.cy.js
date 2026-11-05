/// <reference types="cypress" />
import LoginPage from "../../pages/LoginPage"
import InventoryPage from "../../pages/InventoryPage"
import CartPage from "../../pages/CartPage"
import CheckoutPage from "../../pages/CheckoutPage"

describe('saucedemo - Checkout (Page Object Model)', () => {
  beforeEach(() => {
     LoginPage.open()
     LoginPage.login('standard_user')
     InventoryPage.shouldBeOpen()
})

  it('buys to products end-to-end', () => {
    InventoryPage.addToCart('Sauce Labs Fleece Jacket')
    InventoryPage.addToCart('Sauce Labs Onesie')
    InventoryPage.shouldHaveCartCount(2)
    
    InventoryPage.openCart()
    CartPage.shouldContain(['Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'])
    CartPage.checkout()

    cy.fixture('customer').then((user) => {
        CheckoutPage.fillInformation(user)
    })

    CheckoutPage.shouldHaveItemTotal('57.980000000000004')
    CheckoutPage.finish()
    CheckoutPage.shouldBeComplete()
  })

    
})