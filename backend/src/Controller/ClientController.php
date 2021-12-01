<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ClientController extends AbstractController
{

    #[
        Route(
            '/api/clients',
            name: 'add_client',
            methods: ['POST'],
        ),

    ]
    public function addClient(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $manager,
        UserPasswordHasherInterface $encoder
    ) {
        $user = json_decode($request->getContent(), true);
        $user = $serializer->denormalize($user, "App\Entity\Client", true);

        $password = $user->getPassword();
        $user->setPassword($encoder->hashPassword($user, $password));
        // dd($user);
        $manager->persist($user);
        $manager->flush();

        return $this->json("success", Response::HTTP_CREATED);
    }
    // #[Route('/client', name: 'client')]
    // public function index(): Response
    // {
    //     return $this->render('client/index.html.twig', [
    //         'controller_name' => 'ClientController',
    //     ]);
    // }
}
