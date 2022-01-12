<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ReservationRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ReservationRepository::class)
 */

#[ApiResource(
    normalizationContext: ['groups' => ['reservations:read']],
    denormalizationContext: ['groups' => ['reservations:write']],
)]

class Reservation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(["reservations:read"])]

    private $id;

    /**
     * @ORM\Column(type="smallint", options={"default":0})
     */
    #[Groups(["reservations:read", "reservations:write"])]

    private $etat = 0;

    /**
     * @ORM\Column(type="datetime")
     * @var DateTime
     */
    #[Groups(["reservations:read"])]
    private $date;


    public function __construct()
    {
        $this->date = new DateTime();
    }

    /**
     * @ORM\ManyToOne(targetEntity=Bien::class, inversedBy="reservations")
     */
    #[Groups(["reservations:read", "reservations:write"])]
    private $bien;

    /**
     * @ORM\ManyToOne(targetEntity=Client::class, inversedBy="reservations")
     */
    #[Groups(["reservations:read", "reservations:write"])]
    private $client;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

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

    public function getBien(): ?Bien
    {
        return $this->bien;
    }

    public function setBien(?Bien $bien): self
    {
        $this->bien = $bien;

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
}
