'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RaisonNonScolaireCtrl
 * @description
 * # RaisonNonScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RaisonNonScolaireCtrl', function($scope, $state) {
    $scope.subtitle = $scope.estRepresentant() ?
      'Pourquoi n\'est-' + $scope.getPronoun() + ' pas scolarisé' + ($scope.estMasculin() ? '' : 'e') + ' ?' :
      'Pourquoi n\'êtes vous pas scolarisé ?';

    if (angular.isUndefined($scope.sectionModel.raison)) {
      $scope.sectionModel.raison = {};
    }

    $scope.question = {
      model: 'raison',
      answers: [
        {
          label: 'Vous êtes trop jeune',
          labelRep: $scope.getPronoun(true) + ' est trop jeune',
          value: 'tropJeune',

          detail: $scope.sectionModel.raison.value === 'tropJeune' ? $scope.sectionModel.raison.detail : '',
          placeholder: ($scope.estRepresentant()) ?
            'A partir de quand sera-t-' + $scope.getPronoun() + ' scolarisé' + ($scope.estMasculin() ? '' : 'e') + ' ?' :
            'A partir de quand serez vous scolarisé ?',
          detailUrl: 'views/partials/form_precisez.html'
        },
        {
          label: 'Votre handicap vous en empêche',
          labelRep: 'Son handicap l\'en empêche',
          value: 'handicap',

          detail: $scope.sectionModel.raison.value === 'handicap' ? $scope.sectionModel.raison.detail : '',
          placeholder: ($scope.estRepresentant()) ? 'Quelles sont ses difficultées ?' : 'Quelles sont vos difficultées ?',
          detailUrl: 'views/partials/form_precisez.html'
        },
        {
          label: 'Vous ne trouvez pas solution d\'accueil en établissement',
          labelRep: $scope.getPronoun(true) + ' ne trouve pas solution d\'accueil en établissement',
          value: 'etablissement'
        },
        {
          label: 'Autre',
          value: 'autre',

          detail: $scope.sectionModel.raison.value === 'autre' ? $scope.sectionModel.raison.detail : '',
          detailUrl: 'views/partials/form_precisez.html'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      if (angular.isUndefined($scope.sectionModel.raison.value)) {
        return true;
      }
      if ($scope.sectionModel.raison.value !== 'etablissement' && !$scope.sectionModel.raison.detail) {
        return true;
      }
      return false;
    };

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.vos_attentes.structure');
    };
  });