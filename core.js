// public/core.js
var evergreenDoc = angular.module('evergreenDoc', []);


function mainController($scope, $http, $timeout) {
	$scope.formData = {};

	

	// when landing on the page, get all todos and show them

	

    (function tick() {
    	var initialList= [];

	var groupings={}; 
	$scope.selectedAlerts={};
	 	var emergencies = {};
		$http({method: 'GET', url: '/sessions'})
			.success(function(data){
					// $timeout(tick, 1000);
					console.log(data)
					for (var i = 0; i < data.length; i++) {
						var currentTime = new Date();
						var timeDiff = Math.abs(data[i].emergency- currentTime.getTime()/1000);
						if(timeDiff < 100000000){
							emergencies[data[i].patient] = true;
						}
					};
	
	       $http({method: 'GET', url: '/statuses'})
			.success(function(data){
				var nurse = [];
				var operating = [];
				var recovery = [];
				for (var i = 0; i < data.length; i++) {
					if (emergencies[data[i].patient_id] == true){
						data[i]['emergency'] = true;
					}
					if(data[i]['name']=="Procedure Room"){
						operating.push(data[i]);
					}
					if(data[i]['name']=="Initial Nurse Review"){
						nurse.push(data[i]);
					}
					if(data[i]['name']=="Post-Procedure Recovery"){
						recovery.push(data[i]);
					}
				};
				$scope.operating = operating;
				$scope.nurse = nurse;
				$scope.recovery = recovery;
				// $scope.statuses = data.slice().reverse();
				// var count = 0;
				// for (var i = 0; i < data.length; i++) {
				// 	if (groupings[data[i].patient_id] === undefined){
				// 		count++;
				// 		groupings[data[i].patient_id]=[];
				// 		groupings[data[i].patient_id]['beacon'] =[];
				// 		groupings[data[i].patient_id]['beacon'].push(data[i]);

				// 	} else {
				// 		groupings[data[i].patient_id]['beacon'].push(data[i]);
				// 	}
					
					

				// };

				$scope.count = data.length;
				

				// $scope.groupingList = groupings;
				console.log(groupings);
				$timeout(tick, 1000);
				// 
				// 
				
				
			});
		}); 

    })();

}

