'use strict';

angular.module('impactApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      changeInfo: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      queryRequests: {
        method: 'GET',
        params: {
          id: 'me',
          controller: 'requests'
        },
        isArray: true
      },
      queryNotifications: {
        method: 'GET',
        params: {
          controller: 'notifications'
        },
        isArray: true
      },
      generatePassword: {
        method: 'POST',
        params: {
          id: 'generate_password'
        }
      }
	  });
  });
