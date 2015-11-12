'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail.history', {
        url: '/vie_de_la_demande',
        templateUrl: 'app/dashboard/requests/detail/history/history.html',
        controller: 'RequestHistoryCtrl',
        authenticate: true
      });
  });
