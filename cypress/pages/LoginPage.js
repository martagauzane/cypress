class LoginPage {
    elements = {
        username: () => cy.get('[data-test="username"]'),
        password: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        error: () => cy.get('[data-test="error"]')
    }

    open() {
        cy.visit('/')
    }

    login(username, passward = 'secret_sauce') {
        this.elements.username().type(username)
        this.elements.password().type(passward, {log: false})
        this.elements.loginButton().click()
    }

    shouldShowError(text){
        this.elements.error().should('be.visible').should('contain.text', text)
    }

}

export default new LoginPage()