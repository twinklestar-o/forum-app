/* eslint-disable no-undef */
// Skenario: Menguji alur login aplikasi
// 1. User membuka halaman login.
// 2. User mengisi email & password.
// 3. User klik tombol submit.
// 4. Aplikasi redirect ke halaman utama & tombol logout muncul.
// 5. User klik tombol logout.

describe('Login flow', () => {
  it('allows user to login and logout successfully', () => {
    // 1️⃣ Buka halaman login
    cy.visit('/login')

    // 2️⃣ Isi form login (gunakan selector yang stabil)
    cy.get('input#Email', { timeout: 10000 }).should('be.visible').type('admin12345@gmail.com')
    cy.get('input#Password').should('be.visible').type('admin12345')

    // 3️⃣ Klik tombol submit
    cy.get('button[type="submit"]').should('be.enabled').click()

    // 4️⃣ Tunggu redirect ke halaman utama
    cy.location('pathname', { timeout: 15000 }).should('eq', '/')

    // 5️⃣ Pastikan tombol logout muncul
    cy.get('button.logout-button', { timeout: 10000 }).should('be.visible')

    // 6️⃣ Klik tombol logout
    cy.get('button.logout-button').click()

    // 7️⃣ (Opsional) Verifikasi redirect balik ke halaman login
    cy.location('pathname', { timeout: 10000 }).should('eq', '/login')
  })
})
