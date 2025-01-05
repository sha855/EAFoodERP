<?php

use App\Http\Controllers\Admin\Audit\AuditController;
use App\Http\Controllers\Admin\Audit\AuditTemplateController;
use App\Http\Controllers\Admin\BusinessActivityController;
use App\Http\Controllers\Admin\BusinessUnitController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FeatureHeadingController;
use App\Http\Controllers\Admin\FoodController;
use App\Http\Controllers\Admin\Haccp\AnalysesController;
use App\Http\Controllers\Admin\Haccp\FloorPlanController;
use App\Http\Controllers\Admin\Haccp\FlowChartController;
use App\Http\Controllers\Admin\Haccp\IngredientController;
use App\Http\Controllers\Admin\Haccp\LocationPlanController;
use App\Http\Controllers\Admin\Haccp\ProcessController;
use App\Http\Controllers\Admin\Haccp\ProduceFoodController;
use App\Http\Controllers\Admin\Haccp\WorkGroupController;
use App\Http\Controllers\Admin\MainCustomerGroupController;
use App\Http\Controllers\Admin\PackageComparisonController;
use App\Http\Controllers\Admin\PackageFeatureController;
use App\Http\Controllers\Admin\PackageManageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\Team\TeamController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\FileStorage\FileStorageController;
use App\Http\Controllers\HaccpPlan\HaccpController;
use App\Http\Controllers\Monitor\MonitoringTaskController;
use App\Http\Controllers\Setup\ApiAccessTokenController;
use App\Http\Controllers\Setup\EquipmentController;
use App\Http\Controllers\Setup\PauseMonitoringController;
use App\Http\Controllers\Setup\RoomsController;
use App\Http\Controllers\Setup\SetupCompanyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'check_role:admin'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('/overview', [DashboardController::class, 'overview'])->name('overview');
    //users routes
    Route::resource('/users', UserController::class);
    Route::post('/user/impersonate/{company}', [AuthenticatedSessionController::class, 'impersonate'])->name('users.impersonate');

    //Plan Routes
    Route::resource('/membership', PackageManageController::class);
    //Plan features Routes
    Route::resource('/features', PackageFeatureController::class);
    //Plan features heading Routes
    Route::resource('/feature-heading', FeatureHeadingController::class);
    //Plan comparison routes
    Route::resource('/feature-comparison', PackageComparisonController::class);

    // main_customer route
    Route::resource('/main-customer', MainCustomerGroupController::class);

    Route::get('/company/detail/{company}', [UserController::class, 'companyEdit'])->name('company.edit');
    Route::resource('/food', FoodController::class);
    Route::resource('/business-activity', BusinessActivityController::class);
    Route::resource('/business-unit', BusinessUnitController::class);
    Route::get('all/companies', [UserController::class, 'getCompanies'])->name('all.companies');
    Route::get('users/companies/{user}', [UserController::class, 'companies'])->name('companies');
    Route::get('/company-detail/{company}', [UserController::class, 'companyDetail'])->name('company.detail');
    Route::post('/user-create', [UserController::class, 'newUserStore'])->name('new.user.create');

    //Work Group Route
    Route::get('/company-detail/work-group/{company}', [WorkGroupController::class, 'index'])->name('company.workgroup');
    Route::post('/company-detail/work-group/store', [WorkGroupController::class, 'store'])->name('workgroup.store');
    Route::delete('/company-detail/work-group/delete/{taskId}', [WorkGroupController::class, 'destroy'])->name('work-group.destroy');
    Route::post('/work-group/responsible', [WorkGroupController::class, 'syncResponsibleUsers'])->name('reponsible.user');

    //Business unit Food Product Controller
    Route::get('/company-detail/food-product/{company}', [ProduceFoodController::class, 'index'])->name('company.producedFood');
    Route::post('/company-detail/food-product/store', [ProduceFoodController::class, 'store'])->name('producedFood.store');
    Route::get('/company-detail/food-production-volumes/{company}', [ProduceFoodController::class, 'productionVolume'])->name('production.volume');
    Route::post('/company-detail/food-production-volumes', [ProduceFoodController::class, 'updateProductionVolume'])->name('production.volume.update');

    //process routes
    Route::get('/company-detail/process-step/{company}', [ProcessController::class, 'index'])->name('company.processStep');
    Route::post('/company-detail/custom-process', [ProcessController::class, 'store'])->name('custom.process.submit');
    Route::post('/company-detail/company-active-process', [ProcessController::class, 'storeActiveProcess'])->name('active.process.submit');

    //Ingredient Route
    Route::get('/company-detail/ingredient/{company}', [IngredientController::class, 'index'])->name('company.ingredients');
    Route::post('/company-detail/ingredient/store', [IngredientController::class, 'store'])->name('ingredients.store');

    //Analyses Route
    Route::get('/company-detail/analyses/{company}', [AnalysesController::class, 'index'])->name('company.analyses');
    Route::post('/company-detail/analyses/store', [AnalysesController::class, 'store'])->name('analyses.store');
    Route::get('/company-detail/analyses/delete/{analyses}', [AnalysesController::class, 'destroy'])->name('analyses.delete');

    //Flow Chart Routes
    Route::get('company-detail/flow-chart/{company}', [FlowChartController::class, 'index'])->name('company.flow.chart');
    Route::post('company-detail/flow-chart/upload', [FlowChartController::class, 'upload'])->name('flow.chart.upload');
    Route::get('flow-chart/download/{file}', [FlowChartController::class, 'download'])->name('flow.chart.download');
    Route::delete('flow-chart/delete/{flowChart}', [FlowChartController::class, 'destroy'])->name('flow.chart.delete');
    Route::get('flow-chart/create/{company}', [FlowChartController::class, 'createFlowChart'])->name('flow.chart.create');
    Route::post('flow-chart/process-step/create', [FlowChartController::class, 'storeFlowChartProcess'])->name('flow.chart.process.step');

    //location plan Routes
    Route::get('company-detail/location-plan/{company}', [LocationPlanController::class, 'index'])->name('company.location.plan');
    Route::get('company-detail/location-plan-create/{company}', [LocationPlanController::class, 'createLocationPlan'])->name('location.plan.create');
    Route::post('company-detail/location-plan/upload', [LocationPlanController::class, 'upload'])->name('location.plan.upload');
    Route::delete('location-plan/delete/{locationPlan}', [LocationPlanController::class, 'destroy'])->name('location.plan.delete');
    Route::get('location-plan/download/{file}', [LocationPlanController::class, 'download'])->name('location.plan.download');

    //floor plan routes
    Route::get('company-detail/floor-plan/{company}', [FloorPlanController::class, 'index'])->name('company.floor.plan');
    Route::get('company-detail/create/{floorPlan}/{company}', [FloorPlanController::class, 'create'])->name('company.floor.plan.create');
    Route::post('company-detail/floor-plan/upload', [FloorPlanController::class, 'upload'])->name('floor.plan.upload');
    Route::delete('floor-plan/delete/{floorPlan}', [FloorPlanController::class, 'destroy'])->name('floor.plan.delete');
    Route::get('floor-plan/download/{file}', [FloorPlanController::class, 'download'])->name('floor.plan.download');
    Route::post('floor-plan/status/update', [FloorPlanController::class, 'statusUpdate'])->name('floor.plan.status');

    //Audits Routes
    Route::get('audits/all/{company}', [AuditController::class, 'index'])
        ->name('audit');
    Route::post('audits/upload', [AuditController::class, 'upload'])
        ->name('audit.upload');
    Route::get('audits/show/{template}/{company}', [AuditController::class, 'show'])
        ->name('audit.show');
    Route::delete('audits/delete/{id}', [AuditController::class, 'delete'])
        ->name('audit.delete');
    Route::get('audits/download/{file}/{company}', [AuditController::class, 'download'])
        ->name('audit.download');
    Route::get('template/{company}', [AuditTemplateController::class, 'index'])->name('template.index');
    Route::get('template/create/{company}', [AuditTemplateController::class, 'create'])->name('template.create');
    Route::post('template', [AuditTemplateController::class, 'store'])->name('template.store');
    Route::get('template/{template}/{company}', [AuditTemplateController::class, 'show'])->name('template.show');
    Route::get('template/{template}/edit/{company}', [AuditTemplateController::class, 'edit'])->name('template.edit');
    Route::put('template/{template}', [AuditTemplateController::class, 'update'])->name('template.update');
    Route::delete('template/{template}', [AuditTemplateController::class, 'destroy'])->name('template.destroy');
    Route::post('audits/templates/details/{id}/update', [AuditTemplateController::class, 'auditTemplateDetail'])
        ->name('audit.template.detail.update');
    Route::get('audits/templates/{template}/audits/create/{company}', [AuditTemplateController::class, 'auditCreate'])
        ->name('audit.template.form.create');

    //Teams Routes
    Route::get('team/people/{company}', [TeamController::class, 'index'])
        ->name('team');
    Route::get('team/roles/{company}', [TeamController::class, 'roles'])
        ->name('team.roles');
    Route::get('team/certificates-and-trainings/{company}', [TeamController::class, 'certificatesAndTrainings'])
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

    //File Storage Routes
    Route::get('documents/share-accesses/{company}', [FileStorageController::class, 'show'])
        ->name('document.fileStorage');

    Route::delete('/documents/share-accesses-destroy/{sharedDocument}', [FileStorageController::class, 'shareAccessesDestroy'])
        ->name('document.shareAccesses.destroy');

    Route::get('documents/manage-folders/{company}', [FileStorageController::class, 'showManageFolders'])
        ->name('manage.folders');
    Route::get('documents/get/{company}', [FileStorageController::class, 'get'])
        ->name('manage.get');
    Route::get('documents/{company}/{folderName}', [FileStorageController::class, 'showFolder'])
        ->name('document.folder');
    Route::post('/documents/fileStore', [FileStorageController::class, 'fileStore'])
        ->name('folder.file.store');
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

    Route::post('/documents-update/{subManageFile}', [FileStorageController::class, 'fileUpdate'])
        ->name('folder.file.update');
    Route::delete('/document-destroy/{subManageFile}', [FileStorageController::class, 'destroyFile'])
        ->name('document.file.destroy');
    Route::get('/documents/download/{sub_menu_id}/{file}', [FileStorageController::class, 'download'])
        ->name('document.download');

    Route::get('rooms/{company}', [RoomsController::class, 'show'])->name('rooms.index');
    Route::put('rooms-update/{company}', [RoomsController::class, 'update'])->name('rooms.update');
    Route::post('rooms-store/{company}', [RoomsController::class, 'store'])->name('rooms.store');
    Route::delete('rooms-store/{room}', [RoomsController::class, 'destroy'])->name('rooms.destroy');
    Route::post('room-is-use/{room}', [RoomsController::class, 'updateIsUse'])
        ->name('room.isUse');

    // API access tokens routes
    Route::get('integrations/{company}', [ApiAccessTokenController::class, 'show'])->name('integrations.index');
    Route::post('integrations/{company}', [ApiAccessTokenController::class, 'adminStore'])->name('integrations.store');

    //Setup Pause Monitoring routes
    Route::get('pause-monitorings/{company}', [PauseMonitoringController::class, 'show'])->name('pause.index');
    Route::post('pause-monitorings/{company}', [PauseMonitoringController::class, 'store'])->name('pause.store');

    Route::get('equipment/{company}', [EquipmentController::class, 'show'])->name('equipment.index');
    Route::put('equipment-update/{company}', [EquipmentController::class, 'update'])->name('equipment.update');
    Route::post('equipment-store/{company}', [EquipmentController::class, 'store'])->name('equipment.store');
    Route::delete('equipment-store/{equipment}', [EquipmentController::class, 'destroy'])->name('equipment.destroy');
    Route::post('equipment-is-use/{equipment}', [EquipmentController::class, 'updateIsUse'])
        ->name('equipment.isUse');
    Route::get('companies/{company}', [SetupCompanyController::class, 'index'])
        ->name('setup.companies');
    Route::delete('delete/{company}', [SetupCompanyController::class, 'destroy'])
        ->name('setup.companies.delete');

    Route::get('setting', [SettingController::class, 'generalSetting'])
        ->name('setting');
    Route::get('setting/logo', [SettingController::class, 'index'])
        ->name('setting.logo');
    Route::post('setting', [SettingController::class, 'update'])
        ->name('setting.update');

    Route::post('clear-cache', [SettingController::class, 'clearCache'])->name('cache.clear');
    Route::post('storage-link', [SettingController::class, 'storageLink'])->name('setting.storageLink');

    Route::get('activity-log/intro/tasks/{company}', [MonitoringTaskController::class, 'show'])
        ->name('monitor.task');

    Route::post('monitor-task/-status/{monitoring}', [MonitoringTaskController::class, 'taskStatus'])
        ->name('monitor.task.status');
    Route::post('monitor-task/{company}', [MonitoringTaskController::class, 'createOrUpdateMonitoringTask'])
        ->name('monitor.task.store');
    Route::delete('monitor-task-destroy/{monitoringTask}', [MonitoringTaskController::class, 'destroy'])
        ->name('monitor.task.destroy');

});
