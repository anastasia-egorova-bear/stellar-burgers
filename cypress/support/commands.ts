/// <reference types="cypress" />

export const selectors = {
  ingCategoryBuns: '[data-cy=ingredient-category-buns]',
  ingCategoryMains: '[data-cy=ingredient-category-mains]',
  ingCategorySauces: '[data-cy=ingredient-category-sauces]',
  ingItem: '[data-cy=ingredient-item]',
  ingAddButton: '[data-cy=ingredient-add-button]',
  constructorBunTop: '[data-cy=constructor-bun-top]',
  constructorBunBottom: '[data-cy=constructor-bun-bottom]',
  constructorIngredient: '[data-cy=constructor-ingredient]',
  modal: '[data-cy=modal]',
  modalClose: '[data-cy=modal-close]',
  modalOverlay: '[data-cy=modal-overlay]',
  orderButton: '[data-cy=order-button]',
  orderNumber: '[data-cy=order-number]'
};

// Команда: добавить булку
Cypress.Commands.add('addBun', () => {
  cy.get(selectors.ingCategoryBuns)
    .next('ul')
    .find(selectors.ingItem)
    .contains('Добавить')
    .click({ force: true });

  cy.get(selectors.constructorBunTop).should('exist');
  cy.get(selectors.constructorBunBottom).should('exist');
});

// Команда: добавить первый ингредиент из категории "Начинки"
Cypress.Commands.add('addMainIngredient', () => {
  cy.get(selectors.ingCategoryMains)
    .next('ul')
    .find(selectors.ingItem)
    .first()
    .find('button')
    .contains('Добавить')
    .click({ force: true });

  cy.get(selectors.constructorIngredient).should('exist');
});

// Команда: добавить первый соус
Cypress.Commands.add('addSauce', () => {
  cy.get(selectors.ingCategorySauces)
    .next('ul')
    .find(selectors.ingItem)
    .first()
    .find('button')
    .contains('Добавить')
    .click({ force: true });

  cy.get(selectors.constructorIngredient).should('exist');
});

// Команда: оформить заказ
Cypress.Commands.add('placeOrder', () => {
  cy.get(selectors.orderButton).click({ force: true });
});


declare global {
  namespace Cypress {
    interface Chainable {
      addBun(): Chainable<void>;
      addMainIngredient(): Chainable<void>;
      addSauce(): Chainable<void>;
      placeOrder(): Chainable<void>;
    }
  }
}

export {};

