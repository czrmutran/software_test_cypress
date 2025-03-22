describe('Formulário de Cadastro', () => {
    beforeEach(() => {
      // Ajuste o caminho se necessário, dependendo de como você serve o index.html
      cy.visit('index.html'); 
    });
  
    it('Deve exibir erros ao tentar enviar o formulário com campos inválidos', () => {
      // Clica no botão enviar sem preencher nada
      cy.get('button[type="submit"]').click();
      
      // Verifica se o formulário ainda está na tela e não foi enviado
      // Você pode checar se algum elemento com erro aparece ou se o form exibe mensagem
      // Exemplo genérico:
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Por favor, corrija os campos inválidos');
      });
    });
  
    it('Deve validar o campo Nome (mínimo 3 caracteres, apenas letras e espaços)', () => {
      // Preenche com valor inválido (ex: 2 caracteres)
      cy.get('#nome').type('Jo');
      cy.get('button[type="submit"]').click();
      
      // Espera que o form não seja enviado (alert)
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Por favor, corrija os campos inválidos');
      });
  
      // Limpa e preenche com valor válido
      cy.get('#nome').clear().type('João da Silva');
      // Verifica se o valor foi inserido corretamente
      cy.get('#nome').should('have.value', 'João da Silva');
    });
  
    it('Deve validar o campo Endereço (mínimo 10 caracteres)', () => {
      cy.get('#endereco').type('Rua 1');
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Por favor, corrija os campos inválidos');
      });
  
      cy.get('#endereco').clear().type('Rua das Flores, 123');
      cy.get('#endereco').should('have.value', 'Rua das Flores, 123');
    });
  
    it('Deve validar o campo E-mail (formato correto)', () => {
      cy.get('#email').type('email-invalido');
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Por favor, corrija os campos inválidos');
      });
  
      cy.get('#email').clear().type('teste@teste.com');
      cy.get('#email').should('have.value', 'teste@teste.com');
    });
  
    it('Deve validar o campo Senha (mínimo 8 caracteres)', () => {
      cy.get('#senha').type('1234567');
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Por favor, corrija os campos inválidos');
      });
  
      // Exemplo de senha válida
      cy.get('#senha').clear().type('Abc123!!');
      cy.get('#senha').should('have.value', 'Abc123!!');
    });
  
    it('Deve validar o campo Telefone (entre 10 e 15 dígitos)', () => {
      cy.get('#telefone').type('123456789'); // 9 dígitos, inválido
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Por favor, corrija os campos inválidos');
      });
  
      cy.get('#telefone').clear().type('11999999999'); // 11 dígitos, válido
      cy.get('#telefone').should('have.value', '11999999999');
    });
  
    it('Deve permitir o envio do formulário quando todos os campos são válidos', () => {
      // Preenche tudo corretamente
      cy.get('#nome').type('João da Silva');
      cy.get('#endereco').type('Rua das Flores, 123');
      cy.get('#email').type('teste@teste.com');
      cy.get('#senha').type('Abc123!!');
      cy.get('#telefone').type('11999999999');
  
      // Clica em enviar
      cy.get('button[type="submit"]').click();
  
    });
  });
  