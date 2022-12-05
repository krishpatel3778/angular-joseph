(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get('https://patentcenter.uspto.gov/retrieval/public/v2/application/data?applicationNumberText=16/068570').then(function (response) {
      console.log("here")
      console.log(response.data)
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };
  service.getSingleItem = function (short_name) {
    return $http.get(ApiPath + `/menu_items/${short_name}.json`)
    .then(response=>{
      return response.data;
    })
    .catch(error=>{
      return "error";
    })
  };

}



})();
