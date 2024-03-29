/// <reference types="cypress" />

import { faker } from '@faker-js/faker'
const httpStatus = require('http-status-codes')

const userFaker = {
  BODY: {
    nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    pass: faker.internet.password(),
    admin: faker.datatype.boolean().toString()
  }
}

describe('[LOGIN] :: TESTS API', () => {
  before(() => {
    cy.registerUser(
      userFaker.BODY.nome,
      userFaker.BODY.email,
      userFaker.BODY.pass,
      userFaker.BODY.admin
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      })
  })

  it('/POST - Realizar login com sucesso', () => {
    cy.doLogin(
      userFaker.BODY.email,
      userFaker.BODY.pass
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Login realizado com sucesso')
      })
  })

  it('/POST - Realizar login com tipo de email inválido', () => {
    cy.doLogin(
      'email_invalido',
      Cypress.config('password')
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email deve ser um email válido')
      })
  })

  it('/POST - Realizar login com email inexistente', () => {
    cy.doLogin(
      'email_nao@existe.com',
      Cypress.config('password')
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Email e/ou senha inválidos')
      })
  })

  it('/POST - Realizar login sem preencher o email do usuário', () => {
    cy.doLogin(
      '',
      Cypress.config('password')
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email não pode ficar em branco')
      })
  })

  it('/POST - Realizar login com senha inválida', () => {
    cy.doLogin(
      Cypress.config('email'),
      'senha_invalida'
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Email e/ou senha inválidos')
      })
  })

  it('/POST - Realizar login sem preencher a senha', () => {
    cy.doLogin(
      Cypress.config('email'),
      ''
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
  })

  it('/POST - Realizar login sem preencher o email e a senha', () => {
    cy.doLogin('', '')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email não pode ficar em branco')
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
  })
})
