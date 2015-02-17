/**
 * Created by NUIZ on 16/2/2558.
 */
var app = angular.module('app',[]);
app.controller('bodyCTL',['$scope','$rootScope',function($scope,$rootScope){
    $scope.name = "E-Directory";
}]);

app.directive('edirectoryEditor', function () {
    return {
        restrict: 'A',
        templateUrl: 'edirectory.html',
        controller: function () {
        }, // สามารถกำหนด controller ที่ทำงานภายใน directive ได้
        link: function () {
        } // ใช้ในการกำหนด binding event ให้กับส่วนภายในของ directive ใช้ jquery ได้
    };
});