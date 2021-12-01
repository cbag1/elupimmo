<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MaisonRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MaisonRepository::class)
 */
#[ApiResource]
class Maison extends Bien
{

    /**
     * @ORM\Column(type="integer")
     */
    private $nbEtages;

    /**
     * @ORM\Column(type="integer")
     */
    private $nbChambres;


    public function getNbEtages(): ?int
    {
        return $this->nbEtages;
    }

    public function setNbEtages(int $nbEtages): self
    {
        $this->nbEtages = $nbEtages;

        return $this;
    }

    public function getNbChambres(): ?int
    {
        return $this->nbChambres;
    }

    public function setNbChambres(int $nbChambres): self
    {
        $this->nbChambres = $nbChambres;

        return $this;
    }
}
