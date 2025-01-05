<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body,
        html {
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
            <h1>Shared documents</h1>
        </div>
        <div class="email-body">
            <p>Dear {{ $name }}</p>
            <p>{{ $fromName }} from {{ $companyName }} has shared food safety documents with you.
                Please click on the document name to access it.</p>

                <p style="text-align: center;">
                    <a href="{{ route('haccp', ['shared_access_token' => $token]) }}" class="verify-button">
                        - HACCP Plan
                    </a>
                </p>

            <p>The HACCP plan will open on the new page.</p>
            <p>Your access is valid until {{ $access_valid_until }}</p>

            <p>Regards,<br>{{ config('app.name') }} Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
        </div>
    </div>

</body>

</html>
