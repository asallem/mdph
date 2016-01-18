'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_au_travail.situation_professionnelle.emploi';

    $stateProvider
      .state(index, {
        url: '/emploi',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.nom_poste', {
        url: '/nom_poste',
        templateUrl: 'components/question/textarea.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'nomPoste', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.temps');
            };
          }
        }
      })
      .state(index + '.temps', {
        url: '',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'temps', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.adapte');
            };
          }
        }
      })
      .state(index + '.adapte', {
        url: '/adapte',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'adapte', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.difficultes');
            };
          }
        }
      })
      .state(index + '.difficultes', {
        url: '/difficultes',
        templateUrl: 'components/question/textarea.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'difficultes', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.conservation');
            };
          }
        }
      })
      .state(index + '.conservation', {
        url: '/conservation_emploi',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'conservation', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.amenagement');
            };
          }
        }
      })
      .state(index + '.amenagement', {
        url: '/amenagement',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'amenagement', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.arret_de_travail');
            };
          }
        }
      })
      .state(index + '.arret_de_travail', {
        url: '/arret_de_travail',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'arretDeTravail', sectionModel);
          },

          nextStep: function($state, sectionModel, question) {
            return function() {
              if (sectionModel[question.model]) {
                $state.go('^.raison_arret_de_travail');
              } else {
                $state.go('^.^.^.situation_professionnelle.prestations');
              }
            };
          }
        }
      })
      .state(index + '.raison_arret_de_travail', {
        url: '/raison_arret_de_travail',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'arretDeTravailRaison', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.professionnel_social');
            };
          }
        }
      })
      .state(index + '.professionnel_social', {
        url: '/professionnel_social',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'profesionnelSocial', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.medecin_travail');
            };
          }
        }
      })
      .state(index + '.medecin_travail', {
        url: '/medecin_travail',
        templateUrl: 'components/question/radio.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: function(QuestionService, section, sectionModel) {
            return QuestionService.get(section, 'medecinTravail', sectionModel);
          },

          nextStep: function($state) {
            return function() {
              $state.go('^.^.^.situation_professionnelle.prestations');
            };
          }
        }
      });
  });
