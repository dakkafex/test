'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')


Route.on('/login').render('login')

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route.get('api/index', 'AiController.apiIndex')


/*
|--------------------------------------------------------------------------
| CMS Routes
|--------------------------------------------------------------------------
*/
Route.get('_loginUser', 'AiController.login')

Route.group('Cms', function () {
    Route.on('/').render('dashboard')
    Route.get('/logout', 'AiController.logout')

    Route.get('nodes', 'AiController.nodeIndex')
    Route.get('links', 'AiController.linkIndex')

    Route.post('nodeNew', 'AiController.nodeNew')
    Route.post('linkNew', 'AiController.linkNew')

    Route.post('linkDestroy', 'AiController.linkDestroy')
    Route.post('nodeDestroy', 'AiController.nodeDestroy')

}).middleware('auth')

