app.controller("CPMSPatientSearch", [
    "$scope", "$rootScope", "dataFactory", "Pagination", function($scope, $rootScope, dataFactory, Pagination) {

		$scope.pageSize = 10;
		$scope.currentPage = 0;

        $scope.pagination = Pagination.getNew($scope.pageSize);
		
		$scope.firstName = null;
		$scope.lastName = null;
		$scope.MRN = null;
		$scope.phoneNumber = null;


		$scope.queryResults = [];
		$scope.allResults = [];

		$scope.pagination.numPages = 0;

		$scope.loadingSpinner = false;
		
		jQuery.extend({
		  sliceMe: function(obj, str) {
			  var returnJsonObj = null;
			$.each( obj, function(name, value){
				//alert("name: "+name+", value: "+value);
				if(name==str){
					returnJsonObj = value;
				}

			});
			  return returnJsonObj;
		  }
		});


		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		}


		$scope.updatePagination=function(n){
			$scope.pagination.toPageId(n);
			$scope.currentPage = n;
		}
		

		$scope.numberOfPages=function(){
			return Math.ceil($scope.queryResults.length/$scope.pageSize);            
		}


		dataFactory.getPatientResults()
			.success(function(dataResults) {
				$scope.allResults = dataResults;
			})
			.error(function(error) {
				$scope.status = "Unable to load data.json : " + error.message;
			})
			.finally(function() {
				// Hide loading spinner whether our call succeeded or failed.
				$scope.loadingSpinner = false;
			});


		

		$scope.getSearchResults = function() {
			
			$scope.loadingSpinner = true;

			$scope.queryResults = [];
			var results = $scope.allResults;

			if ($scope.firstName != null) {
				results = results.filter(function (patient) {
				  return patient.FirstName.toLowerCase().indexOf($scope.firstName.toLowerCase()) != -1;
				});
			}
			
			if ($scope.lastName != null) {
				results = results.filter(function (patient) {
				  return patient.LastName.toLowerCase().indexOf($scope.lastName.toLowerCase()) != -1;
				});
			}
			
			if ($scope.MRN != null) {
				results = results.filter(function (patient) {
				  return patient.MRN.toLowerCase().indexOf($scope.MRN.toLowerCase()) != -1;
				});
			}

			if ($scope.phoneNumber != null) {
				results = results.filter(function (patient) {
				  return patient.PhoneNumber.toLowerCase().indexOf($scope.phoneNumber.toLowerCase()) != -1;
				});
			}

			$scope.queryResults = results;
			$("#searchresults").show();
			$scope.updatePagination(0);

            $scope.pagination.numPages = Math.ceil($scope.queryResults.length/$scope.pagination.perPage);
			$scope.loadingSpinner = false;

        };


		$scope.clearSearchControls = function() {
            $scope.queryResults = [];
			$scope.firstName = null;
			$scope.lastName = null;
			$scope.MRN = null;
			$scope.phoneNumber = null;

			$scope.updatePagination(0);

			$("#searchresults").hide();
        };



		$scope.openPatientDetails = function(mrn){
			$("#div" + mrn).show();
        };

		$scope.closePatientDetails = function(mrn){
			$("#div" + mrn).hide();
        };

		$scope.openCatchmentLetter = function(patient){
			$scope.closePatientDetails(patient.MRN);
			if(patient.CatchmentArea !='')
				window.open('pdf/InCatchment.pdf', '_blank');
			else
				window.open('pdf/OutCatchment.pdf', '_blank');
			
        };



		$scope.openNewPatientDetails = function(mrn){
			$("#newPatientInfo").show();
        };

		$scope.closeNewPatientDetails = function(){
			$("#newPatientInfo").hide();
        };

		

    }
]);

