<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
        }

            .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eaeaea;
        }

        .email-header h1 {
            color: #333333;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }

        .email-body p {
            margin: 0 0 20px;
        }

        .verify-button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #df5708;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin: 20px 0;
        }

        .verify-button:hover {
            background-color: #df5708;
        }

        .email-footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
        @media (max-width: 600px) {
            .email-container {
                padding: 10px;
            }
            .email-header h1 {
                font-size: 20px;
            }
            .verify-button {
                padding: 8px 16px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="email-header">
            <h1>Hello, {{ $user->name }}!</h1>
        </div>
        <div class="email-body">
            <p>Thank you for registering with {{ config('app.name') }}. Please verify your email address by clicking the button below:</p>

            <p style="text-align: center;">
                <a href="{{ route('verification.verify', ['hash' => sha1($user->email)]) }}" class="verify-button">
                    Verify Your Email
                </a>
            </p>

            <p>If you did not create an account, no further action is required.</p>

            <p>Regards,<br>{{ config('app.name') }} Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>

</body>
</html>
