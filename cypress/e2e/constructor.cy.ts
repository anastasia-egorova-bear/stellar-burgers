const selectors = {
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

describe('тесты для Burger constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');
  });

  describe('тест добавления ингредиентов', () => {
    it('Добавление булки в конструктор', () => {
      cy.get(selectors.ingCategoryBuns)
        .next('ul') // или .next('ul') — оба варианта работают
        .find(selectors.ingItem)
        .contains('Добавить')
        .click({ force: true });

      cy.get(selectors.constructorBunTop).should('exist');
      cy.get(selectors.constructorBunBottom).should('exist');
    });

    it('Добавление ингредиента в конструктор', () => {
      cy.get(selectors.ingCategoryMains)
        .next('ul')
        .find(selectors.ingItem)
        .first()
        .find('button')
        .contains('Добавить')
        .click({ force: true });
      cy.get(selectors.constructorIngredient).should('exist');
    });

    it('Добавление соуса в конструктор', () => {
      cy.get(selectors.ingCategorySauces)
        .next('ul')
        .find(selectors.ingItem)
        .first()
        .find('button')
        .contains('Добавить')
        .click({ force: true });
      cy.get(selectors.constructorIngredient).should('exist');
    });
  });

  describe('тесты модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      cy.get(selectors.ingCategoryBuns).next('ul').find('a').first().click();
      cy.url().should('include', '/ingredients/');
      cy.contains('Краторная булка N-200i').should('be.visible');

      // Ожидаем модалку
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

      cy.visit('http://localhost:4000/');
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.clearLocalStorage();
    });

    it('Оформление и отображение номера заказа', () => {
      cy.get(selectors.ingCategoryBuns)
        .next()
        .find(selectors.ingItem)
        .contains('Добавить')
        .click({ force: true });

      cy.get(selectors.ingCategoryMains)
        .next('ul')
        .find(selectors.ingItem)
        .first()
        .find('button')
        .contains('Добавить')
        .click({ force: true });

      cy.get(selectors.orderButton).click({ force: true });

      cy.url().then((url) => {
        if (url.includes('/login')) {
          cy.get('input[type=email]').type('test-user@example.com');
          cy.get('input[type=password]').type('password');
          cy.get('button[type=submit]').click({ force: true });
          cy.wait('@login');
          cy.get(selectors.orderButton).click({ force: true });
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
