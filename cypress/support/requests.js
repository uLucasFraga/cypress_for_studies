/// <reference types="cypress" />

// import dataCarts from './../fixtures/carrinhos.json'
import credentials from './credentials'

// COMMANDS - LOGIN //

Cypress.Commands.add('doLogin', (email, pass) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/login`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      email: email,
      password: pass
    }
  })
})

// COMMANDS - USUÁRIOS //

Cypress.Commands.add('consultUser', (name, email, _id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/usuarios`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    qs: {
      nome: name,
      email: email,
      _id: _id
    }
  })
})

Cypress.Commands.add('registerUser', (name, email, password, admin) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/usuarios`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      nome: name,
      email: email,
      password: password,
      administrador: admin
    }
  })
})

Cypress.Commands.add('modifyUser', (_id, newName, newEmail, newPass) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('API_URL')}/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      nome: newName,
      email: newEmail,
      password: newPass,
      administrador: 'true'
    }
  })
})

Cypress.Commands.add('deleteUser', (_id) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  })
})

// COMMANDS - PRODUTOS //

Cypress.Commands.add('consultProduct', (_id, name, description) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/produtos`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    qs: {
      _id: _id,
      nome: name,
      descricao: description
    }
  })
})

Cypress.Commands.add('consultProductById', (_id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('registerProduct', (name, price, description, qtd) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/produtos`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false,
    body: {
      nome: name,
      preco: price,
      descricao: description,
      quantidade: qtd
    }
  })
})

Cypress.Commands.add('modifyProduct', (_id, newName, newPrice, newDescription, newQtd) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('API_URL')}/produtos/${_id}`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false,
    body: {
      nome: newName,
      preco: newPrice,
      descricao: newDescription,
      quantidade: newQtd
    }
  })
})

Cypress.Commands.add('deleteProduct', (_id) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/produtos/${_id}`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false
  })
})

// COMMANDS - CARRINHOS //

Cypress.Commands.add('consultCartById', (_id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/carrinhos/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('consultCart', (totalPrice, totalQtd, idUser) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/carrinhos`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    qs: {
      precoTotal: totalPrice,
      quantidadeTotal: totalQtd,
      idUsuario: idUser
    }
  })
})

Cypress.Commands.add('registerCart', (
  idProductOne,
  qtd,
  idProductTwo = dataCarts.carrinhos[0].produtos[0].idProduto
) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/carrinhos`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false,
    body: {
      produtos: [
        {
          idProduto: idProductOne,
          quantidade: qtd
        },
        {
          idProduto: idProductTwo,
          quantidade: 1
        }
      ]
    }
  })
})

Cypress.Commands.add('deleteWhenPurchaseCompleteCart', () => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/carrinhos/concluir-compra`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteWhenCancelCart', () => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}/carrinhos/cancelar-compra`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false
  })
})

// COMMANDS - OTHERS METHODS //

Cypress.Commands.add('registerUserWithLogin', (name, email, pass, admin = 'true') => {
  cy.registerUser(name, email, pass, admin)
    .then((response) => {
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
    })

  cy.getToken(email, pass)
})
