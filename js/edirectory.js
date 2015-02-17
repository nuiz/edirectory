/**
 * Created by NUIZ on 17/2/2558.
 */

app.controller('edirectoryEditorCTL',['$scope','$rootScope', '$compile', function($scope,$rootScope,$compile){
    $scope.insertText = "";
    $scope.items = [
        {top: 10, left: 50, text: "111111"},
        {top: 20, left: 70, text: "222222"}
    ];
    $scope.insert = function(){
        var item = { left: 0, top: 0 };
        var index = $scope.items.length;
        $scope.items.push(item);
        var element = angular.element(window.document.querySelector('.editor'));
        var newDirective = angular.element('<div class="text-item" index="'+index+'" draggable>'+$scope.insertText+'</div>');
        newDirective.model = item;

        element.append(newDirective);
        $compile(newDirective)($scope);
        $scope.insertText = "";

        //bindElement(newDirective, item);

        $scope.$watch(
            'items['+index+']',
            function(newVal, oldVal){
                element.css({
                    top:  item.left + 'px',
                    left: item.top + 'px'
                });

                console.log(newVal, oldVal);
            }
        );
    };

    function bindElement(element, model){

    }

    $scope.$watch();
}]);

app.directive('draggable', ['$document' , function($document) {
    return {
        restrict: 'A',
        link: function($scope, elm) {
            var startX, startY, initialMouseX, initialMouseY;
            elm.css({position: 'absolute'});

            elm.bind('mousedown', function($event) {
                $event.preventDefault();
                startX = elm.prop('offsetLeft');
                startY = elm.prop('offsetTop');
                initialMouseX = $event.clientX;
                initialMouseY = $event.clientY;
                $document.bind('mousemove', mousemove);
                $document.bind('mouseup', mouseup);
            });

            function mousemove($event) {
                $event.preventDefault();
                var dx = $event.clientX - initialMouseX;
                var dy = $event.clientY - initialMouseY;
                //elm.css({
                //    top:  startY + dy + 'px',
                //    left: startX + dx + 'px'
                //});

                var model = $scope.items[elm.attr("index")];
                model.left = startX + dx;
                model.top = startY + dy;

                //console.log(model);
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    };
}]);
