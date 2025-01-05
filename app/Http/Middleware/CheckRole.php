<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  string  $role
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (! auth()->check() || ! auth()->user()->hasRole($role)) {
            return redirect('/'); // Redirect to home or unauthorized page
        }

        return $next($request);
    }
}
