'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsProjetProCtrl
 * @description
 * # AutresRenseignementsProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsProjetProCtrl', function ($scope, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Autres renseignements que vous souhaiteriez nous communiquer concernant son projet professionnel' : 'Autres renseignements que vous souhaiteriez nous communiquer concernant votre projet professionnel';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });