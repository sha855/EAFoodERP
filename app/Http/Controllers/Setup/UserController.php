<?php

namespace App\Http\Controllers\Setup;

use App\Data\Setup\UserData;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\TeamRepository;
use App\Repositories\UserRepository;
use App\Services\UserService;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UserSentInvite;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        protected UserRepository $repository,
        protected TeamRepository $teamRepository,
        protected UserService $userService,
        protected UserRepository $userRepository,
        protected EmailService $mail
    ) {}

    public function index(Request $request)
    {
        $sharedRightsData = $this->userService->getSharedRights();

        return Inertia::render('Setup/User/Index', [
            'roles' => $this->teamRepository->geTeamRoles($this->userRepository->getCompany()),
            'sharedRights' => $sharedRightsData['sharedRights'],
            'sharedRightsLocation' => $sharedRightsData['sharedRightsLocation'],
            'users' => $this->userRepository->getUsersStatus($request->input('per_page', 10)),
        ]);
    }

    public function store(UserData $data)
    {
        $data = $this->userService->create($data);
        $dataArray = $data->toArray();
        $user = Auth::user();
        $data['fromName'] = $user->name;
        $data['token'] = $token->token ?? '';

        $companyDetail = CompanyDetail::where('user_id', $user->id)->first();
        $dataArray['companyName'] = $companyDetail?->company_name ?? '';

        Notification::route('mail', $data['email'])->notify(new UserSentInvite($dataArray));

        return back()->with([
            'message' => 'Sent invite successfully!',
            'type' => 'success',
        ]);
    }
}
