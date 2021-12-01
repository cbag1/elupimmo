<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AppartementRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AppartementRepository::class)
 */
#[ApiResource]
class Appartement extends Bien
{
 

    /**
     * @ORM\Column(type="integer")
     */
    private $nbChambres;

    /**
     * @ORM\Column(type="integer")
     */
    private $nbCuisines;

  

    public function getNbChambres(): ?int
    {
        return $this->nbChambres;
    }

    public function setNbChambres(int $nbChambres): self
    {
        $this->nbChambres = $nbChambres;

        return $this;
    }

    public function getNbCuisines(): ?int
    {
        return $this->nbCuisines;
    }

    public function setNbCuisines(int $nbCuisines): self
    {
        $this->nbCuisines = $nbCuisines;

        return $this;
    }
}
