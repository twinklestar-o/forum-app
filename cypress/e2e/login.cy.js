// Skenario: Menguji alur login aplikasi
// 1. User membuka halaman login.
// 2. User mengisi email & password.
// 3. User klik tombol submit.
// 4. Aplikasi redirect ke halaman utama & tombol logout muncul.
// 5. User klik tombol logout.

describe('Login flow', () => {
  it('allows user to login', () => {
    // langsung buka halaman login
    cy.visit('/login')

    // isi form sesuai placeholder
    cy.get('input[id="Email"]').type('test12345@example.com')
    cy.get('input[id="Password"]').type('test12345')

    // klik tombol submit
    cy.get('button[type=submit]').click()

     // tunggu redirect dan navbar update
    cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/')

    // tunggu Logout button muncul
    cy.get('button.logout-button', { timeout: 10000 }).should('be.visible')
    cy.get('button.logout-button').click()

  })
})
