<?php

namespace App\Controller;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    #[
        Route(
            '/api/admin/users',
            name: 'add_user',
            methods: ['POST'],
        ),

    ]
    public function addUser(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $manager,
        UserPasswordHasherInterface $encoder,
        ValidatorInterface $validator
    ) {
        $user = json_decode($request->getContent(), true);
        switch ($user['type']) {
            case 'proprietaire':
                $entity = "App\Entity\Proprietaire";
                break;
            case 'client':
                $entity = "App\Entity\Client";
                break;

            default:
                $entity = "App\Entity\User";
                break;
        }

        $user = $serializer->denormalize($user, $entity, true);

        $errors = $validator->validate($user);
        if (count($errors)) {
            $errors = $serializer->serialize($errors, "json");
            return new JsonResponse($errors, Response::HTTP_BAD_REQUEST, [], true);
        }

        $password = $user->getPassword();
        $user->setPassword($encoder->hashPassword($user, $password));
        // dd($user);
        $manager->persist($user);
        $manager->flush();

        return $this->json("success", Response::HTTP_CREATED);
    }



    #[
        Route(
            '/api/admin/users',
            name: 'get_user',
            methods: ['GET'],
        ),

    ]
    public function getUsers(SerializerInterface $serializer)
    {

        $repository = $this->getDoctrine()->getRepository(User::class);
        $users = $repository->findAll();

        // dd($users);

        // $users= $serializer->decode("App\Entity\User",$users[1],true);
        // dd($users);
        // dd("GET OPTIONS");
        return $this->json($users, Response::HTTP_OK);
    }
    // #[Route('/user', name: 'user')]
    // public function index(): Response
    // {
    //     return $this->render('user/index.html.twig', [
    //         'controller_name' => 'UserController',
    //     ]);
    // }
}
