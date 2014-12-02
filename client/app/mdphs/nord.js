'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('nord', {
        url: '/nord',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          mdph: function(Mdph) {
            return Mdph.get({id: 'nord'});
          }
        }
      });
  });