<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ImagesController extends AbstractController
{


    #[Route(path: '/api/images', name: 'images', methods: ['POST'])]
    public function addImages(Request $request, SerializerInterface $serializerInterface, EntityManagerInterface $manager)
    {
        $image = $request->request->all();
        $value = $request->files->get("value");
        $image = $serializerInterface->denormalize($image, "App\Entity\Images", true);
        $value = fopen($value->getRealPath(), "rb");
        $image->setValue($value);
        $manager->persist($image);
        $manager->flush();
        fclose($value);
        // dd("finie");
        return $this->json("success", Response::HTTP_CREATED);
    }


    // #[Route('/images', name: 'images')]
    // public function index(): Response
    // {
    //     return $this->render('images/index.html.twig', [
    //         'controller_name' => 'ImagesController',
    //     ]);
    // }
}
