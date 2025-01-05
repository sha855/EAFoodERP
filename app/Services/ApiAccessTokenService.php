<?php

namespace App\Services;

use App\Models\ApiAccessToken;
use App\Models\CompanyDetail;
use Illuminate\Support\Str;

class ApiAccessTokenService
{
    public function create(array $data): ApiAccessToken
    {
        $data['api_access_token'] = Str::random(20);
        $companyDetail = CompanyDetail::where('id', $data['company_id'] ?? selectedCompany()->id)->first();
        $data['user_id'] = $companyDetail->user_id;
        $data['company_id'] = $companyDetail->id;

        return ApiAccessToken::create($data);
    }

    public function delete(int $id): bool
    {
        $apiAccessToken = ApiAccessToken::find($id);
        if ($apiAccessToken) {
            return $apiAccessToken->delete();
        }

        return false;
    }
}
