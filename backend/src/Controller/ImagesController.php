<?php

namespace App\Controller;

use App\Entity\Images;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
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

    #[Route(path: '/api/images/{id}', name: 'getimage', methods: ['GET'])]
    public function getImages($id)
    {
        // dd($id);
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(Images::class);
        $image = $repository->find($id);
        $file = $image->getValue();
        // dd($file);

        $response = new \Symfony\Component\HttpFoundation\Response(
            stream_get_contents($file),
            200,
            array(
                'Content-Type' => 'application/octet-stream',
            )
        );

        return $response;
    }
}
