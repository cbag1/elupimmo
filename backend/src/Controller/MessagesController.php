<?php

namespace App\Controller;

use App\Entity\Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessagesController extends AbstractController
{
    // #[Route(
    //     '/messages/{id}',
    //     name: 'messagesbyusers',
    //     methods: ['GET'],
    //     defaults: [
    //         '_api_resource_class' => Message::class,
    //         '_api_item_operation_name' => 'get_messages_user',
    //     ]
    // )]

    // public function getMessagesByUser($id)
    // {
    //     dd($id);
    // }

    // public function index(): Response
    // {
    //     return $this->render('messages/index.html.twig', [
    //         'controller_name' => 'MessagesController',
    //     ]);
    // }
}
