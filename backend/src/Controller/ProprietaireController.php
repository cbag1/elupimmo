<?php

namespace App\Controller;

use ApiPlatform\Core\Filter\Validator\ValidatorInterface;
use App\Entity\Proprietaire;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProprietaireController extends AbstractController
{


    #[
        Route(
            '/api/proprietaires',
            name: 'add_proprietaire',
            methods: ['POST'],
        ),

    ]
    public function addProprietaire(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $manager,
        UserPasswordHasherInterface $encoder
    ) {
        $user = json_decode($request->getContent(), true);
        $user = $serializer->denormalize($user, "App\Entity\Proprietaire", true);

        $password = $user->getPassword();
        $user->setPassword($encoder->hashPassword($user, $password));
        // dd($user);
        $manager->persist($user);
        $manager->flush();

        return $this->json("success", Response::HTTP_CREATED);
    }

    // #[Route('/proprietaire', name: 'proprietaire')]
    // public function index(): Response
    // {
    //     return $this->render('proprietaire/index.html.twig', [
    //         'controller_name' => 'ProprietaireController',
    //     ]);
    // }
}
