/**
 * Created by jollzy on 22/03/2017.
 */

(function(){
    'use strict';

    angular.module('FlickrApp',['ngMaterial'])
        .service('dataService', dataService)
        .controller('PhotosController', ['$scope', 'dataService', '$mdDialog', function( $scope, dataService, $mdDialog){
            console.log('its working');

            $scope.results = [];
            $scope.isLoading = false;
            $scope.showDetail = function(ev, picture){
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'public/templates/detail.tmpl.html',
                    targetEvent: ev,
                    locals: {
                        picture: picture
                    },
                })
            };
            $scope.search = function () {
                console.log('its working search');
                $scope.isLoading = true;
                dataService
                    .getAllPhotos($scope.searchTerm)
                    .success(function(result){
                        $scope.results =  result;
                        $scope.isLoading = false;
                    })
                    .error(function(error){
                        console.log(error);
                        $scope.isLoading = false;
                    });

            };
        }]);
})();

function dataService($http){
    var service = {
        getAllPhotos: getAllPhotos
    }
    console.log('its dataService');
    return service;

    function getAllPhotos(searchTerm){
        console.log('its dataService.getAllPhotos');
        return $http({
            method: 'GET',
            url: 'https://api.flickr.com/services/rest',
            params: {
                method: 'flickr.photos.search',
                api_key: '8055c90cf09f8ba0b222a534f3e32343',
                secret: '9f81adc9ae2618dc',
                text: searchTerm,
                format: 'json',
                nojsoncallback: 1
            }
        });
    }
}

function DialogController($scope, $mdDialog, picture) {
    $scope.picture = picture;
    $scope.cancel = function() {
        $mdDialog.cancel();
        console.log('DialogController: '+picture.title);
    };
}
