describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong_user');
      cy.get('#password').type('wrong_pass');
      cy.get('#login-button').click();
      cy.contains('wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('Birds flying high');
      cy.get('#author').type('Windweil Lundon');
      cy.get('#url').type('www.birdsofprey.com');
      cy.get('#create-blog').click();

      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('Birds flying high Windweil Lundon');
    });

    describe('When blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Birds flying high',
          author: 'Windweil Lundon',
          url: 'www.birdsofprey.com',
          likes: 1,
        });

        cy.createBlog({
          title: 'Best movies 2021',
          author: 'Roger Ebert',
          url: 'www.rogerebert.com',
          likes: 10,
        });

        cy.createBlog({
          title: 'Parkour for Beginners',
          author: 'David Belle',
          url: 'https://www.youtube.com/user/davbelle',
          likes: 100,
        });
      });

      it('a blog can be liked', function () {
        cy.contains('Best movies 2021').parent().find('.view').click();
        cy.contains('Best movies 2021').parent().find('.like').click();
        cy.contains('Best movies 2021').parent().contains('likes 11');
      });

      it('the owner of a blog post can delete it', function () {
        cy.contains('Best movies 2021').parent().find('.view').click();
        cy.contains('Best movies 2021')
          .parent()
          .find('.remove')
          .as('removeButton');
        cy.get('@removeButton').click();
        cy.contains('Best movies 2021').should('not.exist');
      });

      it('blogs are sorted by likes ascending', function () {
        cy.get('body')
          .find('.view')
          .then((el) => {
            el.click();
          });
      });
    });
  });
});
