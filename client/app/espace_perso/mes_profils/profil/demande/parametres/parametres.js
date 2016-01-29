'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('espace_perso.mes_profils.profil.demande.parametres', {
    url: '/parametres',
    authenticate: true,
    data: {
      title: 'Paramètres de la demande'
    },

    resolve: {
      prestations: function($http) {
        return $http.get('api/prestations').then(function(result) {
          return result.data;
        });
      }
    },

    views: {
      '': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/parametres/parametres.html',
        controller: function($scope, $state, $filter, toastr, RequestResource, ProfileService, RequestService, currentUser, request, profile, prestations) {
          $scope.request = request;
          $scope.currentUser = currentUser;

          if (request.prestations && request.prestations.length > 0) {
            _.map(request.prestations, function(prestation) {
              _.find(prestations, {id: prestation}).isSelected = true;
            });
          }

          function getSelectedPrestationIdList() {
            return _.chain(prestations)
             .filter({isSelected: true})
             .pluck('id')
             .value();
          }

          $scope.submit = function(form) {
            if (!form.$valid) {
              toastr.error('Vous n\'avez pas spécifié de MDPH destinataire de votre demande.', 'Erreur lors de la tentative d\'envoi');
            } else {
              request.prestations = getSelectedPrestationIdList();
              if (!ProfileService.getCompletion(profile)) {
                toastr.error('Vous n\'avez pas fini de remplir les parties obligatoires de ce profil.', 'Erreur lors de la tentative d\'envoi');
              } else if (!RequestService.getCompletion(request)) {
                toastr.error('Vous n\'avez pas fourni l\'ensemble des documents obligatoires pour la complétude de votre demande.', 'Erreur lors de la tentative d\'envoi');
              } else {
                request.status = 'emise';
                request.$update({isSendingRequest: true}, function() {
                  $state.go('^', {}, {reload: true});
                });
              }
            }
          };
        }
      },
      'choix_mdph@espace_perso.mes_profils.profil.demande.parametres': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/parametres/choix_mdph/choix_mdph.html',
        controller: function($scope, enabledMdphs, mdphs, request) {
          $scope.enabledMdphs = enabledMdphs;
          $scope.request = request;
          $scope.selectedMdph = _.find(mdphs, {code_departement: request.mdph});
        },

        resolve: {
          mdphs: function($http) {
            return $http.get('/api/mdphs/list').then(function(result) {
              return result.data;
            });
          },

          enabledMdphs: function(mdphs) {
            return _.filter(mdphs, {enabled: true});
          }
        }
      },
      'obligatoires@espace_perso.mes_profils.profil.demande.parametres': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/parametres/documents/obligatoires.html',
        controller: 'DocumentsObligatoiresCtrl',
        resolve: {
          documentTypes: function(DocumentResource) {
            return DocumentResource.query({type: 'obligatoires'}).$promise;
          }
        }
      },
      'complementaires@espace_perso.mes_profils.profil.demande.parametres': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/parametres/documents/complementaires.html',
        controller: 'DocumentsComplementairesCtrl',
        resolve: {
          documentTypes: function(DocumentResource) {
            return DocumentResource.query({type: 'complementaires'}).$promise;
          }
        }
      },
      'suggestions@espace_perso.mes_profils.profil.demande.parametres': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/parametres/documents/suggestions.html',
        controller: function($scope, PreparationEvaluationService, request) {
          $scope.docsList = PreparationEvaluationService.getSuggestedDocsList(request.formAnswers);
        }
      },
      'prestations@espace_perso.mes_profils.profil.demande.parametres': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/parametres/prestations/prestations.html',
        controller: function($scope, prestations) {
          $scope.types = _.groupBy(prestations, 'type');
        }
      },
      'validation@espace_perso.mes_profils.profil.demande.parametres': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/parametres/validation/validation.html',
        controller: function($scope, RequestService, ProfileService, request, profile, currentUser) {
          $scope.isReadyToSend = function() {
            return ProfileService.getCompletion(profile) && RequestService.getCompletion(request) && !currentUser.unconfirmed;
          };

          $scope.getProfileCompletion = function() {
            return ProfileService.getCompletion(profile);
          };

          $scope.getDocumentsCompletion = function() {
            return RequestService.getCompletion(request);
          };
        }
      }
    }
  });
});