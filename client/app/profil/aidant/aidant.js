'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.aidant';
    $stateProvider
      .state(index, {
        url: '/aidant',
        templateUrl: 'app/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation.nom_aidant',
        resolve: {
          sectionId: function() {
            return 'aidant';
          },

          section: function(sections, sectionId) {
            return _.find(sections, {id: sectionId});
          },

          sectionModel: function(profile, sectionId) {
            if (!profile[sectionId]) {
              profile[sectionId] = {};
            }

            return profile[sectionId];
          },

          saveSection: function($state, currentUser, profile, sectionId, sectionModel) {
            return function() {
              profile.saveSection(sectionId, sectionModel, currentUser, function() {
                $state.go('profil', {}, {reload: true});
              });
            };
          }
        }
      });
  });