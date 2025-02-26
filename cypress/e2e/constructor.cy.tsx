/// <reference types="cypress" />

import { SELECTORS } from '../support/constants';

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.get(SELECTORS.INGREDIENT_BUN).should('have.length.at.least', 1);
    cy.get(SELECTORS.INGREDIENT_MAIN).should('have.length.at.least', 1);
    cy.get(SELECTORS.INGREDIENT_SAUCE).should('have.length.at.least', 1);
  });

  it('Ингредиенты можно добавлять в конструктор', () => {
    cy.get(SELECTORS.INGREDIENT_BUN).contains('Добавить').click();
    cy.get(SELECTORS.INGREDIENT_MAIN).contains('Добавить').click();
    cy.get(SELECTORS.INGREDIENT_SAUCE).contains('Добавить').click();
    cy.get(SELECTORS.CONSTRUCTOR).children().should('have.length', 4);
  });

  describe('Открытие и закрытие модального окна ингредиента', () => {
    it('Закрытие по клику на крестик', () => {
      cy.get(SELECTORS.INGREDIENT_BUN).first().click();
      cy.get(SELECTORS.MODAL).should('be.visible');
      cy.get(SELECTORS.MODAL_CLOSE).click();
      cy.get(SELECTORS.MODAL).should('not.exist');
    });

    it('Через нажатие на оверлей', () => {
      cy.get(SELECTORS.INGREDIENT_BUN).first().click();
      cy.get(SELECTORS.MODAL).should('be.visible');
      cy.get(SELECTORS.MODAL).click('topRight', { force: true });
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
      cy.get(SELECTORS.INGREDIENT_BUN).contains('Добавить').click();
      cy.get(SELECTORS.INGREDIENT_MAIN).contains('Добавить').click();
      cy.get(SELECTORS.INGREDIENT_SAUCE).contains('Добавить').click();
      // Клик по кнопке "Оформить заказ"
      cy.get(SELECTORS.ORDER_BUTTON).contains('Оформить заказ').click();
      // Проверка наличия модального окна
      cy.get(SELECTORS.MODAL).should('be.visible');
      cy.get(SELECTORS.ORDER_NUMBER).should('contain', '38321');
      // Закрытие модального окна по клику на крестик
      cy.get(SELECTORS.MODAL_CLOSE).click();
      cy.get(SELECTORS.MODAL).should('not.exist');
      // Проверка, что конструктор пуст
      cy.get(SELECTORS.CONSTRUCTOR_BUN).should('not.exist');
      cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('not.exist');
    });
  });
});
