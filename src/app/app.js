angular.module( 'lisa-frontend', [
  'templates-app',
  'templates-common',
  'lisa-frontend.dashboard',
  'lisa-frontend.plugins',
  'restangular',
  'SessionManager',
  'ui.router',
  'angular-loading-bar'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, RestangularProvider) {
  //$urlRouterProvider.otherwise( '/dashboard' );

  RestangularProvider.setBaseUrl('backend/api/v1');

  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginController',
        templateUrl: 'interface/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.run( function run () {

})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $Session, $log) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $Session.refreshUser();
    if ( toState.name != "login" ) {
        $log.info(toState);
    }
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | LISA' ;
    }
  });
})
;
