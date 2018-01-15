'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_quotidienne';
    $stateProvider
      .state(index, {
        url: '/vie_quotidienne',
        templateUrl: 'app/profil/section.html',
        controller: 'SectionCtrl',
        redirectTo: index + '.situation',
        resolve: {
          sectionId: function() {
            return 'vie_quotidienne';
          },

          section: function(sections, sectionId) {
            return _.find(sections, {id: sectionId});
          },

          sectionModel: function() {
            return {};
          },

          previousModel: function(profile, sectionId) {
            return _.cloneDeep(profile[sectionId]);
          },

          saveSection: function($state, currentUser, profile, sectionId, sectionModel) {
            return function() {
              profile.saveSection(sectionId, sectionModel, currentUser, function() {
                $state.go('profil.documents');
              });
            };
          }
        },
        data: {
          history: []
        }
      });
  });
