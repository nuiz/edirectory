/**
 * Created by NUIZ on 17/2/2558.
 */

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

app.controller('edirectoryEditorCTL',['$scope','$rootScope', '$compile', function($scope,$rootScope,$compile){
    $scope.insertText = "";
    $scope.items = [
//        {top: 10, left: 50, text: "111111"},
//        {top: 20, left: 70, text: "222222"}
    ];
    $scope.insert = function(){
        var index = $scope.items.length;
        var item = { left: 0, top: 0, bg: getRandomColor(), text: $scope.insertText, zIndex: index, id: index };
        $scope.items.push(item);
        var element = angular.element(window.document.querySelector('.editor'));
        var newDirective = angular.element('<div item-id="'+index+'" class="text-item" index="'+index+'" style="background: '+item.bg+';" draggable>'+$scope.insertText+'</div>');
        newDirective.model = item;

        element.append(newDirective);
        $compile(newDirective)($scope);
        $scope.insertText = "";

        //bindElement(newDirective, item);

        $scope.$watch(
            function(){ return item.left; },
            function(newVal, oldVal){
                newDirective.css({
//                    top:  item.top + 'px',
                    left: item.left + 'px'
                });
            }
        );

        $scope.$watch(
            function(){ return item.top; },
            function(newVal, oldVal){
                newDirective.css({
                    top:  item.top + 'px'
//                    left: item.left + 'px'
                });
            }
        );

        $scope.$watch(
            function(){ return item.zIndex; },
            function(newVal, oldVal){
                newDirective.css({
                    'z-index':  item.zIndex
//                    left: item.left + 'px'
                });
            }
        );
    };

    $scope.sortableOptions = {
        orderChanged: function(event) {
            var els = window.document.getElementsByClassName('layer');
            for(var i = 0; i < els.length; i++){
                (function(){
                    var el = angular.element(els[i]);
                    var itemId = el.attr("item-id");

                    for(var j in $scope.items){
                        if($scope.items[j].id == itemId){
                            $scope.items[j].zIndex = i;
                        }
                    }
                }());
            }
            $scope.$apply();
        }
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

                var model = (function(){
                    for(var i in $scope.items){
                        if($scope.items[i].id == elm.attr("index")) return $scope.items[i];
                    }
                })();
                model.left = startX + dx;
                model.top = startY + dy;

                $scope.$apply();
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    };
}]);
