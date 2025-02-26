/// <reference types="cypress" />

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  it('Ингредиенты можно добавлять в конструктор', () => {
    // cy.get('[data-ingredient="bun"]').first().click({ force: true });
    cy.get('[data-ingredient="bun"]').contains('Добавить').click();
    cy.get('[data-ingredient="main"]').contains('Добавить').click();
    cy.get('[data-ingredient="sauce"]').contains('Добавить').click();
    cy.get('[data-test="constructor"]').children().should('have.length', 4);
  });

  describe('Открытие и закрытие модального окна ингредиента', () => {
    it('Закрытие по клику на крестик', () => {
      cy.get('[data-ingredient="bun"]').first().click();
      cy.get('[data-test="modal"]').should('be.visible');
      cy.get('[data-test="modal-close"]').click();
      cy.get('[data-test="modal"]').should('not.exist');
    });

    it('Через нажатие на оверлей', () => {
      cy.get('[data-ingredient="bun"]').first().click();
      cy.get('[data-test="modal"]').should('be.visible');
      cy.get('[data-test="modal"]').click('topRight', { force: true });
      cy.wait(500);
      cy.get('#modals').children().should('have.length', 0);
    });
  });

  describe('Создание заказов', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'postOrder'
      );
      cy.wait('@getUser');
      cy.visit('/');
    });
    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });

    it('Собирается бургер и отправляется заказ', () => {
      //   //   // Добавление ингредиентов в конструктор
      cy.get('[data-ingredient="bun"]').contains('Добавить').click();
      cy.get('[data-ingredient="main"]').contains('Добавить').click();
      cy.get('[data-ingredient="sauce"]').contains('Добавить').click();
      // Клик по кнопке "Оформить заказ"
      cy.get('[data-test="orderButton"]').contains('Оформить заказ').click();
      // Проверка наличия модального окна
      cy.get("[data-test='modal']").should('be.visible');
      cy.get('[data-test="order-number"]').should('contain', '38321');
      // Закрытие модального окна по клику на крестик
      cy.get('[data-test="modal-close"]').click();
      cy.get('[data-test="modal"]').should('not.exist');
      // Проверка, что конструктор пуст
      cy.get('[data-test="constructor-bun"]').should('not.exist');
      cy.get('[data-test="constructor-ingredient"]').should('not.exist');
    });
  });
});
