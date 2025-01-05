<?php

namespace App\Menu;

use Illuminate\Support\Facades\Route;

class Menu
{
    public static function main()
    {
        if (! auth()->check()) {
            return [];
        }

        $auth = auth()?->user();
        $isAdmin = collect($auth?->roles)->contains('name', 'admin');
        $isUser = collect($auth?->roles)->contains('name', 'user');
        $currentRoute = Route::currentRouteName();

        // User menu routes
        $userRoutes = [
            [
                'active' => $currentRoute === 'overview',
                'path' => route('overview'),
                'label' => 'Overview',
                'icon' => 'PiSpeedometerBold',
            ],
            [
                'active' => in_array($currentRoute, [
                    'haccp', 'haccp.general-Info', 'work-group.index', 'haccp.process',
                    'haccp.food-product', 'production.volume', 'haccp.ingredients',
                    'haccp.analyses', 'flow-chart.index', 'flow-chart.create',
                    'location-plan.index', 'location-plan.create', 'floor-plan.index',
                    'floor.plan.create',
                ]),
                'path' => route('haccp'),
                'label' => 'HACCP Plan',
                'icon' => 'GoBook',
            ],
            [
                'active' => in_array($currentRoute, [
                    'monitor', 'monitor.task', 'rooms.index', 'equipment.index',
                    'setup.monitor.app.download', 'setup.monitor.task',
                    'setup.monitor.verification', 'pause-monitorings.index',
                    'setup.monitor.demo', 'monitoring.task.history', 'task-history-list',
                ]),
                'path' => route('monitor'),
                'label' => 'Monitoring',
                'icon' => 'GiNetworkBars',
            ],
            [
                'active' => in_array($currentRoute, ['traceability', 'recipes-ingredients', 'custom-units']),
                'path' => route('traceability'),
                'label' => 'Traceability',
                'icon' => 'BsCup',
            ],
            [
                'active' => in_array($currentRoute, ['audit', 'template.index']),
                'path' => route('audit'),
                'label' => 'Audit',
                'icon' => 'PiClipboardText',
            ],
            [
                'active' => in_array($currentRoute, ['team', 'team.roles', 'team.certificates.trainings']),
                'path' => route('team'),
                'label' => 'Team',
                'icon' => 'AiOutlineUser',
            ],
            [
                'active' => in_array($currentRoute, [
                    'document.fileStorage', 'manage.folders', 'document.folder',
                ]),
                'path' => route('document.fileStorage'),
                'label' => 'File Storage',
                'icon' => 'PiFilesThin',
            ],
            [
                'active' => in_array($currentRoute, [
                    'setup.user.index', 'setup.companies', 'setup.places', 'integrations.index',
                ]),
                'path' => route('setup.user.index'),
                'label' => 'Setup',
                'icon' => 'FiSettings',
            ],
        ];

        // Admin menu routes
        $adminRoutes = [
            [
                'active' => $currentRoute === 'admin.overview',
                'path' => route('admin.overview'),
                'label' => 'Dashboard',
                'icon' => 'CiViewBoard',
            ],
            [
                'active' => in_array($currentRoute, [
                    'admin.users.index', 'admin.company.detail', 'admin.rooms.index',
                    'admin.equipment.index', 'admin.company.workgroup', 'admin.company.processStep',
                    'admin.company.producedFood', 'admin.production.volume',
                    'admin.company.ingredients', 'admin.company.analyses', 'admin.company.flow.chart',
                    'admin.company.location.plan', 'admin.company.floor.plan', 'admin.audit',
                    'admin.template.index', 'admin.team', 'admin.team.roles',
                    'admin.team.certificates.trainings', 'admin.setup.companies',
                    'admin.pause.index', 'admin.integrations.index', 'document.fileStorage',
                    'admin.manage.folders', 'admin.document.folder', 'admin.monitor.task',
                    'admin.users.show', 'admin.companies',
                ]),
                'path' => route('admin.users.index'),
                'label' => 'User Management',
                'icon' => 'FaUsersCog',
            ],
            [
                'active' => $currentRoute === 'admin.membership.index',
                'path' => route('admin.membership.index'),
                'label' => 'Plan Management',
                'icon' => 'SlPaperPlane',
            ],
            [
                'active' => in_array($currentRoute, [
                    'admin.food.index', 'admin.business-activity.index', 'admin.business-unit.index',
                ]),
                'path' => route('admin.food.index'),
                'label' => 'Food Management',
                'icon' => 'RiRestaurant2Line',
            ],
            [
                'active' => $currentRoute === 'admin.all.companies',
                'path' => route('admin.all.companies'),
                'label' => 'Companies',
                'icon' => 'PiBuildingOfficeLight',
            ],
            [
                'active' => $currentRoute === 'admin.main-customer.index',
                'path' => route('admin.main-customer.index'),
                'label' => 'Customer Group',
                'icon' => 'BiGroup',
            ],
            [
                'active' => in_array($currentRoute, [
                    'admin.setting', 'admin.setting.logo',
                ]),
                'path' => route('admin.setting'),
                'label' => 'Setting',
                'icon' => 'CiSettings',
            ],
        ];


        $routes = collect([]);

        if ($isUser) {
            $routes = $routes->merge($userRoutes);
        }

        if ($isAdmin) {
            $routes = $routes->merge($adminRoutes);
        }

        return $routes->values();
    }
}
