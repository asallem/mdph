'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('forgotten_password', {
        url: '/mot_de_passe_oublie',
        templateUrl: 'app/account/forgotten_password/forgotten_password.html',
        controller: 'ForgottenPasswordCtrl'
      });
  });
