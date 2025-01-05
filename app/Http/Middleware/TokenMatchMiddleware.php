<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TokenMatchMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        $staticToken = getSettings()->api_token;

        if ($token !== $staticToken) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
