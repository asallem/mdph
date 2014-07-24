'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsProjetProCtrl
 * @description
 * # AutresRenseignementsProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsProjetProCtrl', function ($scope) {

    $scope.placeholder = 'Autres renseignements que vous souhaiteriez nous communiquer concernant votre projet professionnel';
    
    if (angular.isUndefined($scope.subSectionModel.autresRenseignements)) {
      $scope.subSectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };
  });