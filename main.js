var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval, $sce) {
	$scope.trust = $sce.trustAsHtml;
	$scope.player = {
		repr : "<tspan dx='0' dy='1.4em'>&nbsp&nbsp//&nbsp&nbsp\\\\</tspan><tspan dx='0' dy='1.4em'>&nbsp_\\\\()//_</tspan><tspan dx='0' dy='1.4em'>/&nbsp//&nbsp&nbsp\\\\&nbsp\\</tspan><tspan dx='0' dy='1.4em'>&nbsp|&nbsp\\__/&nbsp|</tspan>",
		facing: {
			left : false,
			right : false,
			up : true,
			down : false
		},
		position : {
			x : 500,
			y: 50
		},
		size : {
			widht : 20,
			height : 20
		},
		color : {
			red : 100,
			green : 100, 
			blue : 100
		},
		name : {
			first_name : 'Abhinav',
			last_name : 'Havaldar'
		},
		speed : 5,
		max_speed: 10
	};
	$scope.keyState = {};
	$scope.keyDown = function($event) {
		$scope.keyState[$event.keyCode || $event.which] = true;
		console.log($scope.keyState[$event.keyCode]);
	}
	$scope.keyUp = function($event) {
		$scope.keyState[$event.keyCode || $event.which] = false;
		console.log($scope.keyState[$event.keyCode]);
	}
	$scope.move = function() {
		$scope.player.speed = $scope.player.speed < $scope.player.max_speed ? $scope.player.speed + 1 : $scope.player.max_speed;
		//console.log($scope.player.speed);
		if ($scope.keyState[37]) $scope.player.position.x-=$scope.player.speed;
		if ($scope.keyState[38]) $scope.player.position.y-=$scope.player.speed;
		if ($scope.keyState[39]) $scope.player.position.x+=$scope.player.speed;
		if ($scope.keyState[40]) $scope.player.position.y+=$scope.player.speed;
	};
	$interval($scope.move,1);
	$scope.reset_speed = function() {$scope.player.speed = 5};
});