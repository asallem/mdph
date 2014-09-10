'use strict';

angular.module('impactApp')
  .controller('EmployeurCtrl', function($scope, $state, FormService) {
    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ? 'Qui est son employeur ?' : 'Qui est votre employeur ?';

    if (angular.isUndefined($scope.sectionModel.employeur)) {
      $scope.sectionModel.employeur = {
        nom: {label: 'Nom', value: ''},
        adresse: {label: 'Adresse', value: ''},
        medecin: {label: 'Service/Médecin', value: ''}
      };
    }

    $scope.model = $scope.sectionModel.employeur;

    $scope.isNextStepDisabled = function() {
      return $scope.model.nom.value === '' || $scope.model.adresse.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.emploi.nom_poste');
    };
  });