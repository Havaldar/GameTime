var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval, $sce) {
	$scope.trust = $sce.trustAsHtml;
	$scope.player = {
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
		speed : 1,
		max_speed: 5
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
	$scope.reset_speed = function() {$scope.player.speed = 1};

    var init_map = function(map, height, width, prob) {
        for (var i = 0; i < height; i++) {
            map.push([]);
            for (var j = 0; j < width; j++) {
                map[i].push(Math.random() > prob || i == 0 || j == 0 || i == height - 1 || j == width - 1 ? '#' : ' ');
            }
        }
    };
    var smoothen = function(map, cycles) {
        for (var iter = 0; iter < cycles; iter++) {
            for (var i = 0; i < map.length; i++) {
                for (var j = 0; j < map[i].length; j++) {
                    var count = 0;
                    for (var k = i - 1; k <= i + 1; k++) {
                        for (var l = j - 1; l <= j + 1; l++) {
                            try {
                                if (map[k][l] === '#') {
                                    count++;
                                }
                            }
                            catch (err) {
                                count++;
                            }
                        }
                    }
                    if (count > 4) {
                        map[i][j] = '#';
                    }
                    else if (count < 2) {
                        map[i][j] = ' ';
                    }
                }
            }
        }
    };
    var render_map = function(map) {
        $scope.map_repr = "";
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                $scope.map_repr += map[i][j];
            }
            $scope.map_repr += "<br />";
        }
    };
    var init = function() {
        $scope.map = [];
        init_map($scope.map, 40, 100, 0.8);
        smoothen($scope.map, 100);
    };
    init();
});