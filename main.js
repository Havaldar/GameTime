var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $sce) {
	$scope.trust = $sce.trustAsHtml;
	$scope.player = {
		repr : "<tspan x='0' dy='1.4em'>&nbsp&nbsp//&nbsp&nbsp\\\\</tspan><tspan x='0' dy='1.4em'>&nbsp_\\\\()//_</tspan><tspan x='0' dy='1.4em'>/&nbsp//&nbsp&nbsp\\\\&nbsp\\</tspan><tspan x='0' dy='1.4em'>&nbsp|&nbsp\\__/&nbsp|</tspan>",
		facing: {
			left : true,
			right : false,
			up : false,
			down : false
		},
		position : {
			x : 50,
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
		}
	};
	$scope.move = function($event) {
		console.log("HI");
		var keycode = $event.which || $event.keyCode;
		if (keycode === 37) $scope.player.position.x-=5;
		else if (keycode === 38) $scope.player.position.y-=8;
		else if (keycode === 39) $scope.player.position.x+=5;
		else $scope.player.position.y+=8;
	};
});