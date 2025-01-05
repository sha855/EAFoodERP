<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserSentInvite extends Notification
{
    use Queueable;

    public function __construct(protected array $data)
    {
        //
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
         ->subject('Invitation to join the team')
         ->view('emails.user-invite', $this->data);
    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
