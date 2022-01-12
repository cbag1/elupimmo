<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\MessagesController;
use App\Repository\MessageRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MessageRepository::class)
 */
#[ApiResource(
    collectionOperations: [
        'get' => ['method' => 'get'],
        'post' => ['method' => 'post']
    ],
    itemOperations: [
        'get' => ['method' => 'get'],
        'get_messages_user' => [
            'method' => 'get',
            'path' => '/api/messages/{id}',
        ]
    ],
    normalizationContext: ['groups' => ['message:read']],
    denormalizationContext: ['groups' => ['message:write']],
)]
class Message
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(["message:read"])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups(["message:read", "message:write"])]
    private $contenu;

    /**
     * @ORM\Column(type="datetime", type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     */
    #[Groups(["message:read", "message:write"])]
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="messages")
     */
    #[Groups(["message:read"])]
    private $client;

    /**
     * @ORM\ManyToOne(targetEntity=Proprietaire::class, inversedBy="messages")
     */
    #[Groups(["message:read"])]

    private $proprietaire;


    public function __construct()
    {
        $this->date = new DateTime();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContenu(): ?string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): self
    {
        $this->contenu = $contenu;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }

    public function getProprietaire(): ?Proprietaire
    {
        return $this->proprietaire;
    }

    public function setProprietaire(?Proprietaire $proprietaire): self
    {
        $this->proprietaire = $proprietaire;

        return $this;
    }
}
