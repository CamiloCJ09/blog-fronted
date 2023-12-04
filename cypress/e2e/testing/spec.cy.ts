/// <reference types="cypress" />
describe("e2e testing", () => {
  it("should visit sign_up and create account", () => {
    cy.visit("/sign_up")
    cy.get('input[name="username"]').type("user1")
    cy.get('input[name="email"]').type("user1@email.com")
    cy.get('input[name="password"]').type("123456")
    cy.get('input[name="confirmPassword"]').type("123456")
    cy.get('button[type="submit"]').click()

  })
  it("should visit login", () => {
    cy.visit("/")
    cy.get('input[name="email"]').type("user1@email.com")
    cy.get('input[name="password"]').type("123456")
    cy.get('button[type="submit"]').click()

    cy.contains('div', 'Post Layout')
    cy.get('button[name="createPost"]').click()
    cy.contains('div', 'Create Post')
  })

  it("should create a post", () => {
    cy.visit("/posts")

    cy.get('input[name="email"]').type("user1@email.com")
    cy.get('input[name="password"]').type("123456")
    cy.get('button[type="submit"]').click()

    cy.get('button[name="createPost"]').click()
    cy.contains('div', 'Create Post')

    cy.contains('div', 'Post Layout')

    cy.get('input[name="title"]').type("title")
    cy.get('textarea[name="content"]').type("content")
    cy.get('button[name="submit"]').click()

    
  })

  it("should visit posts", () => {
    cy.visit("/posts")
  })
})
