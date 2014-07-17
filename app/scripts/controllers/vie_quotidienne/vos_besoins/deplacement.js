'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DeplacementCtrl
 * @description
 * # DeplacementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DeplacementCtrl', function($scope, $state) {

    $scope.subtitle = 'Besoin d\'aide pour vous déplacer';
    
    if (angular.isUndefined($scope.subSectionModel.deplacement)) {
      $scope.subSectionModel.deplacement = {
        'besoins': {
          'intra_domicile': false,
          'acces_domicile': false,
          'public': false,
          'transports': false,
          'vacances': false,
          'conduite': false,
          'autre': false
        },
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.deplacement;
    $scope.question = {
      'model': 'besoins',
      'answers':[
        {'label': 'Pour se déplacer au sein du domicile', 'model': 'intra_domicile'},
        {'label': 'Pour sortir du domicile et y accéder', 'model': 'acces_domicile'},
        {'label': 'Pour se déplacer dans les espaces publics', 'model': 'public'},
        {'label': 'Pour utiliser les transports en commun', 'model': 'transports'},
        {'label': 'Pour partir en vacances', 'model': 'vacances'},
        {'label': 'Adapter le véhicule pour pouvoir conduire', 'model': 'conduite', 'onlyAdult': true},
        {'label': 'Autre besoin', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.social');
    };
  });
