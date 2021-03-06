'use strict';

angular.module('impactApp')
  .controller('RequestDocumentsCtrl', function($scope, $modal, Auth, request, documentTypes, currentUser) {
    $scope.documentTypes = documentTypes;
    $scope.request = request;
    $scope.currentUser = currentUser;
    $scope.token = Auth.getToken();

    function alreadySelected(request, typeId) {
      return _.find(request.askedDocumentTypes, function(current) {
        return current === typeId;
      });
    }

    if (!request.askedDocumentTypes) {
      request.askedDocumentTypes = [];
    }

    $scope.showLabel = function(type) {
      return _.find($scope.documentTypes, {id: type}).label;
    };

    $scope.addSelectedType = function(type) {
      if (!alreadySelected($scope.request, type.id)) {
        $scope.request.askedDocumentTypes.push(type.id);
        $scope.request.$save();
      }
    };

    $scope.removeSelectedType = function(idx) {
      $scope.request.askedDocumentTypes.splice(idx, 1);
      $scope.request.$save();
    };

    $scope.openModal = function() {
      let request = $scope.request;
      let token = $scope.token;

      $modal.open({
        templateUrl: 'app/dashboard/workflow/detail/documents/modal.html',
        controllerAs: 'modalRdc',
        size: 'lg',
        controller($modalInstance, $state, RequestService) {
          this.src = `/api/requests/${request.shortId}/generate-reception-mail?access_token=${token}`;

          this.ok = function() {
            RequestService.postAction(request, {
              id: 'enregistrement'
            }).then(() => {
              $modalInstance.close();
              $state.go('.', {}, {reload: true});
            });
          };

          this.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
      });
    };
  });
