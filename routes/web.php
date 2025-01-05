<?php

use App\Http\Controllers\Audit\AuditController;
use App\Http\Controllers\Audit\AuditTemplateController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\FileStorage\FileStorageController;
use App\Http\Controllers\HaccpPlan\AnalysesController;
use App\Http\Controllers\HaccpPlan\FloorPlanController;
use App\Http\Controllers\HaccpPlan\FlowChartController;
use App\Http\Controllers\HaccpPlan\FoodProductController;
use App\Http\Controllers\HaccpPlan\GeneralInfoController;
use App\Http\Controllers\HaccpPlan\HaccpController;
use App\Http\Controllers\HaccpPlan\IngredientController;
use App\Http\Controllers\HaccpPlan\LocationPlanController;
use App\Http\Controllers\HaccpPlan\ProcessController;
use App\Http\Controllers\HaccpPlan\WorkGroupController;
use App\Http\Controllers\Monitor\MonitorController;
use App\Http\Controllers\Monitor\MonitoringTaskController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Setup\ApiAccessTokenController;
use App\Http\Controllers\Setup\EquipmentController;
use App\Http\Controllers\Setup\InviteUserController;
use App\Http\Controllers\Setup\MonitoringTaskHistoryController;
use App\Http\Controllers\Setup\PauseMonitoringController;
use App\Http\Controllers\Setup\RoomsController;
use App\Http\Controllers\Setup\SetupBusinessUnitController;
use App\Http\Controllers\Setup\SetupCompanyController;
use App\Http\Controllers\Setup\UserController;
use App\Http\Controllers\Team\TeamController;
use App\Http\Controllers\Traceability\CustomMeasureController;
use App\Http\Controllers\Traceability\PreparedProductController;
use App\Http\Controllers\Traceability\RecipeIngredController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LoginController::class, 'login'])->name('login');
Route::get('invite/user/set/pass', [InviteUserController::class, 'inviteUserSetPassword'])
    ->name('invite-user-set-pass');
Route::post('invite/user/set/pass', [InviteUserController::class, 'storeSetPassword'])
    ->name('set-invite-user-pass');

Route::middleware('auth', 'verified')->group(function () {

    Route::post('/exit/impersonation', [AuthenticatedSessionController::class, 'exitImpersonate'])->name('users.impersonate.exit');
    Route::get('overview', function () {
        return Inertia::render('Dashboard/Overview');
    })->name('overview');

    //Monitor routes

    Route::get('activity-log/intro/progress', [MonitorController::class, 'Index'])
        ->name('monitor');
    Route::get('activity-log/intro/tasks', [MonitoringTaskController::class, 'Index'])
        ->name('monitor.task');
    Route::post('monitor-task/-status/{monitoring}', [MonitoringTaskController::class, 'taskStatus'])
        ->name('monitor.task.status');
    Route::post('monitor-task-create', [MonitoringTaskController::class, 'createOrUpdateMonitoringTask'])
        ->name('monitor.task.store');

    Route::delete('monitor-task-destroy/{monitoringTask}', [MonitoringTaskController::class, 'destroy'])
        ->name('monitor.task.destroy');

    Route::get('activity-log/tasks/{new?}', [MonitoringTaskController::class, 'setupMonitoringTask'])
        ->name('setup.monitor.task');

    Route::get('activity-log/intro/demo', [MonitoringTaskController::class, 'demo'])
        ->name('setup.monitor.demo');

    Route::get('activity-log/app/{hide?}/{menu?}', [MonitoringTaskController::class, 'appDownload'])
        ->name('setup.monitor.app.download');

    Route::get('activity-log/verification', [MonitoringTaskController::class, 'verification'])
        ->name('setup.monitor.verification');

    //Haccp Plans routes
    Route::get('plan/setup', [HaccpController::class, 'Index'])
        ->name('haccp');
    Route::get('plan/general-info', [GeneralInfoController::class, 'Index'])
        ->name('haccp.general-Info');

    Route::post('/haccp/general-info', [GeneralInfoController::class, 'store'])
        ->name('haccp.general-info.store');
    Route::get('/haccp/general-info/{id}/edit', [GeneralInfoController::class, 'edit'])
        ->name('haccp.general-info.edit');

    Route::put('/haccp/general-info/{id}', [GeneralInfoController::class, 'update'])
        ->name('haccp.general-info.update');

    Route::get('get/additional/unit/{businessType}', [GeneralInfoController::class, 'buisnessTypeDetail'])
        ->name('buisness.type.detail');

    Route::get('plan/haccp/completed/{company}', [HaccpController::class, 'haccpStatus'])->name('haccp.completed');

    // work group route
    Route::resource('work-group', WorkGroupController::class);

    //process routes
    Route::get('plan/production-processes', [ProcessController::class, 'index'])
        ->name('haccp.process');

    Route::post('plan/custom-process', [ProcessController::class, 'store'])->name('haccp.submit');
    Route::post('plan/company-active-process', [ProcessController::class, 'storeActiveProcess'])->name('haccp.activeprocess.submit');
    Route::get('plan/ready-to-eat-food', [FoodProductController::class, 'index'])->name('haccp.food-product');

    // Food Product Route
    Route::post('plan/food-product/store', [FoodProductController::class, 'store'])->name('producedFood.store');
    Route::get('plan/food-production-volumes', [FoodProductController::class, 'productionVolume'])->name('production.volume');
    Route::post('plan/food-production-volumes', [FoodProductController::class, 'updateProductionVolume'])->name('production.volume.update');
    Route::post('plan/sell-to-another-company/food-production-volumes', [FoodProductController::class, 'updateOtherCompanyProductionVolume'])->name('another.company.production.volume');
    // ingredients route
    Route::get('plan/raw-materials', [IngredientController::class, 'index'])
        ->name('haccp.ingredients');
    Route::post('plan/ingredient/store', [IngredientController::class, 'store'])->name('haccp.ingredients.store');

    // Analyses route
    Route::get('plan/analyses', [AnalysesController::class, 'index'])->name('haccp.analyses');
    Route::post('plan/analyses/store', [AnalysesController::class, 'store'])->name('analyses.store');
    Route::get('plan/analyses/delete/{analyses}', [AnalysesController::class, 'destroy'])->name('analyses.delete');

    //Flow Chart Routes
    Route::resource('flow-chart', FlowChartController::class);
    Route::post('flow-chart/upload', [FlowChartController::class, 'upload'])->name('flow-chart.upload');
    Route::get('flow-chart/download/{file}', [FlowChartController::class, 'download'])->name('flow-chart.download');

    //location plan Routes

    Route::resource('location-plan', LocationPlanController::class);
    Route::post('location-plan/upload', [LocationPlanController::class, 'upload'])->name('location-plan.upload');
    Route::get('location-plan/download/{file}', [LocationPlanController::class, 'download'])->name('location-plan.download');

    //floor plan routes
    Route::resource('floor-plan', FloorPlanController::class);
    Route::get('floor-plan/create/{floorPlan}', [FloorPlanController::class, 'createFloorPlan'])->name('floor.plan.create');
    Route::post('company-detail/floor-plan/upload', [FloorPlanController::class, 'upload'])->name('floor-plan.upload');
    Route::get('floor-plan/download/{file}', [FloorPlanController::class, 'download'])->name('floor-plan.download');
    Route::post('floor-plan/status/update', [FloorPlanController::class, 'statusUpdate'])->name('floor-plan.status');

    //Traceability Routes
    Route::get('traceability/preparation/records', [PreparedProductController::class, 'index'])
        ->name('traceability');
    Route::post('traceability/preparation/records', [PreparedProductController::class, 'store'])
        ->name('preparedata.store');

    Route::post('traceability/preparation/records/update/{id}',[PreparedProductController::class, 'update'])
    ->name('preparedata.update');

    Route::get('traceability/preparation/recipes-ingredients', [RecipeIngredController::class, 'recipesIngredients'])
        ->name('recipes-ingredients');
    Route::get('traceability/preparation/product-recipe', [RecipeIngredController::class, 'productRecipe'])
        ->name('product-recipe');
    Route::get('traceability/preparation/product-info/{product_recipe_id}', [RecipeIngredController::class, 'productInfo'])
        ->name('product-info');
    Route::post('traceability/preparation/product-info/store', [RecipeIngredController::class, 'storeProductInfo'])
        ->name('product-info.store');
    Route::get('traceability/preparation/consumer-info/{product_recipe_id}', [RecipeIngredController::class, 'consumerInfo'])
        ->name('consumer-info');
    Route::post('traceability/preparation/consumer-info/store/{product_recipe_id}', [RecipeIngredController::class, 'storeConsumerInfo'])
        ->name('consumer-info.store');
    Route::post('traceability/preparation/product/store', [RecipeIngredController::class, 'productRecipeStore'])
        ->name('product.store');
    Route::get('product-recipe/{id}', [RecipeIngredController::class, 'showProductRecipe'])
        ->name('product-recipe.show');
    Route::delete('recipes-images/delete/{recipe_image}', [RecipeIngredController::class, 'deleteRecipes'])->name('recipesImages.delete');
    Route::post('traceability/custom-ingredient/store', [RecipeIngredController::class, 'storeCustomIngred'])->name('custom.ingredient');


    //Custom Measuring Units
    Route::get('traceability/settings/units', [CustomMeasureController::class, 'customMeasuringUnits'])
        ->name('custom-units');
    Route::get('traceability/settings/units/edit', [CustomMeasureController::class, 'customMeasuringUnitsEdit'])
        ->name('custom-units-edit');
    Route::post('traceability/settings/units/store', [CustomMeasureController::class, 'storeCustomMeasuringUnitsEdit'])
        ->name('custom-units.store');

    //Teams Routes
    Route::get('team/people', [TeamController::class, 'index'])
        ->name('team');
    Route::get('team/roles', [TeamController::class, 'roles'])
        ->name('team.roles');

    Route::put('/team-role/{id}', [TeamController::class, 'updateRole'])->name('teamRole.update');
    Route::delete('team/roles/{id}', [TeamController::class, 'roleDestroy'])->name('team.roles.destroy');
    Route::delete('team/roles/{id}', [TeamController::class, 'roleDestroy'])->name('team.roles.destroy');

    Route::get('team/certificates-and-trainings', [TeamController::class, 'certificatesAndTrainings'])
        ->name('team.certificates.trainings');
    Route::post('/team/store', [TeamController::class, 'store'])
        ->name('team.store');
    Route::post('/team/edit/{id}', [TeamController::class, 'edit'])
        ->name('team.edit');
    Route::post('/team/training/edit/{id}', [TeamController::class, 'trainingEdit'])
        ->name('team.training.edit');
    Route::delete('/team/{id}', [TeamController::class, 'destroy'])->name('team.destroy');
    Route::post('/team/roleStore', [TeamController::class, 'roleStore'])
        ->name('team.role.store');
    Route::post('/team/certificateAndTrainingStore', [TeamController::class, 'storeTeamCertificateAndTraining'])
        ->name('team.certificate.store');
    Route::get('team/{teamID}', [TeamController::class, 'getTeam'])
        ->name('get.team');
    Route::get('team/certificates-and-trainings/{id}', [TeamController::class, 'getTeamCertificateAndTraining'])
        ->name('get.trainings');

    //Audits Routes
    Route::get('audits/all', [AuditController::class, 'index'])
        ->name('audit');
    Route::post('audits/upload', [AuditController::class, 'upload'])
        ->name('audit.upload');
    Route::get('audits/show/{template}', [AuditController::class, 'show'])
        ->name('audit.show');
    Route::delete('audits/delete/{id}', [AuditController::class, 'delete'])
        ->name('audit.delete');
    Route::get('audits/download/{file}', [AuditController::class, 'download'])
        ->name('audit.download');
    Route::resource('template', AuditTemplateController::class);
    Route::post('audits/templates/details/{id}/update', [AuditTemplateController::class, 'auditTemplateDetail'])
        ->name('audit.template.detail.update');
    Route::get('audits/templates/{template}/audits/create', [AuditTemplateController::class, 'auditCreate'])
        ->name('audit.template.form.create');

    //File Storage Routes
    Route::get('documents/share-accesses', [FileStorageController::class, 'index'])
        ->name('document.fileStorage');
    Route::get('documents/manage-folders', [FileStorageController::class, 'manageFolders'])
        ->name('manage.folders');
    Route::get('documents/get', [FileStorageController::class, 'get'])
        ->name('manage.get');
    Route::get('documents/{folderName}', [FileStorageController::class, 'folder'])
        ->name('document.folder');
    Route::post('/documents/fileStore', [FileStorageController::class, 'fileStore'])
        ->name('folder.file.store');
    Route::post('/documents-update/{subManageFile}', [FileStorageController::class, 'fileUpdate'])
        ->name('folder.file.update');
    Route::delete('/document-destroy/{subManageFile}', [FileStorageController::class, 'destroyFile'])
        ->name('document.file.destroy');

    Route::post('/documents/updateFolder', [FileStorageController::class, 'updateFolder'])
        ->name('update.folder');
    Route::delete('/documents/deleteFolder', [FileStorageController::class, 'deleteFolder'])
        ->name('delete.folder');
    Route::post('/documents/addFolder', [FileStorageController::class, 'addFolder'])
        ->name('add.folder');
    Route::post('/documents/share-accesses', [FileStorageController::class, 'shareAccesses'])
        ->name('documents.share.accesses');
    Route::get('plan/setup/{shared_access_token}', [HaccpController::class, 'Index'])
        ->name('documents.plan.setup');
    Route::get('/documents/download/{sub_menu_id}/{file}', [FileStorageController::class, 'download'])
        ->name('document.download');

    Route::delete('/documents/share-accesses-destroy/{sharedDocument}', [FileStorageController::class, 'shareAccessesDestroy'])
        ->name('document.shareAccesses.destroy');

    //profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/two-factor-authentication-enable', [ProfileController::class, 'enableTwoFactor'])->name('two.factor.authentication.enable');
    Route::post('/two-factor-authentication-confirm', [ProfileController::class, 'twoFactorAuthenticationConfirm'])->name('two.factor.authentication.confirm');
    Route::post('/two-factor-authentication-disable', [ProfileController::class, 'twoFactorAuthenticationDisable'])->name('two.factor.authentication.disable');
    Route::post('/confirmable-Password', [ProfileController::class, 'confirmablePassword'])->name('profile.confirmable.password');
    Route::post('/regenerate-recovery-code', [ProfileController::class, 'regenerateRecoveryCode'])->name('regenerate.recovery');

    //company routes
    Route::get('register-company', [CompanyController::class, 'companyRegister'])
        ->name('company.register');
    Route::get('country-state/{code}', [CompanyController::class, 'getState'])
        ->name('country.state');
    Route::post('register-company', [CompanyController::class, 'store'])
        ->name('company.store');
    Route::get('/register-phone', [CompanyController::class, 'phoneUpdate'])
        ->name('phone.register');
    Route::get('company/set/{company}', [CompanyController::class, 'setCompany'])->name('set.company');

    //Setup routes
    Route::get('companies', [SetupCompanyController::class, 'index'])
        ->name('setup.companies');
    Route::post('companies', [SetupCompanyController::class, 'store'])
        ->name('setup.companies.submit');
    Route::post('companies/{company}', [SetupCompanyController::class, 'update'])->name('setup.companies.update');
    Route::get('users', [UserController::class, 'index'])
        ->name('setup.user.index');
    Route::post('user-store', [UserController::class, 'store'])
        ->name('setup.user.store');

    Route::resource('setup/places', SetupBusinessUnitController::class)->names([
        'index' => 'setup.places',
        'store' => 'setup.places.store',
        'update' => 'setup.places.update',
        'destroy' => 'setup.places.delete',
    ]);

    // API access tokens routes
    Route::get('setup/integrations', [ApiAccessTokenController::class, 'index'])->name('integrations.index');
    Route::post('setup/integrations', [ApiAccessTokenController::class, 'store'])->name('integrations.store');
    Route::delete('setup/integrations/{id}', [ApiAccessTokenController::class, 'destroy'])->name('integrations.destroy');

    //Setup Pause Monitoring routes
    Route::resource('pause-monitorings', PauseMonitoringController::class);

    Route::resource('/rooms', RoomsController::class);
    Route::post('room-is-use/{room}', [RoomsController::class, 'updateIsUse'])
        ->name('room.isUse');

    Route::resource('/equipment', EquipmentController::class);
    Route::post('equipment-is-use/{equipment}', [EquipmentController::class, 'updateIsUse'])
        ->name('equipment.isUse');

    //Setup Monitoring Task history
    Route::get('activity-log/entries/', [MonitoringTaskHistoryController::class, 'index'])
        ->name('monitoring.task.history');
    Route::get('activity-log/entries/{id}', [MonitoringTaskHistoryController::class, 'formList'])
        ->name('task-history-list');
    Route::get('/tasks/export/{format}', [MonitoringTaskHistoryController::class, 'exportTaskHistoryList'])
        ->name('tasks.export');
    Route::post('/tasks/import', [MonitoringTaskHistoryController::class, 'importTaskHistoryList'])
        ->name('tasks.import');

});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/api.php';
