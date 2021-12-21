<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AppartementController extends AbstractController
{
    #[
        Route(
            '/api/appartements',
            name: 'add_appartement',
            methods: ['POST'],
        ),

    ]
    public function addAppartement(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $manager,
    ) {
        $bien = json_decode($request->getContent(), true);
        $bien = $serializer->denormalize($bien, "App\Entity\Appartement", true);

        // dd($bien);
        $manager->persist($bien);
        $manager->flush();
        $manager->refresh($bien);

        return $this->json(array("id" => $bien->getId()), Response::HTTP_CREATED);
    }
    // #[Route('/appartement', name: 'appartement')]
    // public function index(): Response
    // {
    //     return $this->render('appartement/index.html.twig', [
    //         'controller_name' => 'AppartementController',
    //     ]);
    // }
}
