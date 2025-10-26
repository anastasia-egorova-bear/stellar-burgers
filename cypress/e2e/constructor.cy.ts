import { selectors } from 'cypress/support/commands';
import '../support/commands';

describe('тесты для Burger constructor', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');
  });

  describe('тест добавления ингредиентов', () => {
    it('Добавление булки в конструктор', () => {
      cy.addBun();
    });

    it('Добавление ингредиента в конструктор', () => {
      cy.addMainIngredient();
    });

    it('Добавление соуса в конструктор', () => {
      cy.addSauce();
    });
  });

  describe('тесты модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      cy.get(selectors.ingCategoryBuns).next('ul').find('a').first().click();
      cy.url().should('include', '/ingredients/');
      cy.contains('Краторная булка N-200i').should('be.visible');

      cy.get(selectors.modal).should('exist');
      cy.get(selectors.modal).contains('Краторная булка N-200i');
      cy.get(selectors.modalClose).click();
      cy.get(selectors.modal).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );
      cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' }).as(
        'login'
      );
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );

      window.localStorage.setItem('accessToken', 'Bearer test-token');
      window.localStorage.setItem('refreshToken', 'test-refreshToken');

      cy.visit('/');
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.clearLocalStorage();
    });

    it('Оформление и отображение номера заказа', () => {
      cy.addBun();
      cy.addMainIngredient();
      cy.placeOrder();

      cy.url().then((url) => {
        if (url.includes('/login')) {
          cy.get('input[type=email]').type('test-user@example.com');
          cy.get('input[type=password]').type('password');
          cy.get('button[type=submit]').click({ force: true });
          cy.wait('@login');
          cy.placeOrder();
        }
      });

      cy.wait('@createOrder');

      cy.get(selectors.modal).should('exist');
      cy.get(selectors.modal).contains('12345');

      cy.get(selectors.modalClose).click();
      cy.get(selectors.modal).should('not.exist');

      cy.get(selectors.constructorBunTop).should('not.exist');
      cy.get(selectors.constructorIngredient).should('have.length', 0);
    });
  });
});
