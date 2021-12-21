<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MaisonController extends AbstractController
{

    #[
        Route(
            '/api/maisons',
            name: 'add_maison',
            methods: ['POST'],
        ),

    ]
    public function addMaison(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $manager,
    ) {
        $bien = json_decode($request->getContent(), true);
        $bien = $serializer->denormalize($bien, "App\Entity\Maison", true);

        // dd($bien);
        $manager->persist($bien);
        $manager->flush();
        $manager->refresh($bien);
        return $this->json(array("id" => $bien->getId()), Response::HTTP_CREATED);
    }
    // #[Route('/maison', name: 'maison')]
    // public function index(): Response
    // {
    //     return $this->render('maison/index.html.twig', [
    //         'controller_name' => 'MaisonController',
    //     ]);
    // }
}
