<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ChambreController extends AbstractController
{

    #[
        Route(
            '/api/chambres',
            name: 'add_chambre',
            methods: ['POST'],
        ),

    ]
    public function addChambre(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $manager,
    ) {
        $user = json_decode($request->getContent(), true);
        $user = $serializer->denormalize($user, "App\Entity\Chambre", true);

        // dd($user);
        $manager->persist($user);
        $manager->flush();

        return $this->json("success", Response::HTTP_CREATED);
    }

    // #[Route('/chambre', name: 'chambre')]
    // public function index(): Response
    // {
    //     return $this->render('chambre/index.html.twig', [
    //         'controller_name' => 'ChambreController',
    //     ]);
    // }
}
