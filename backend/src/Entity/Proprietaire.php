<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProprietaireRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProprietaireRepository::class)
 */
#[ApiResource(
    collectionOperations: [
        'add_proprietaire' => [
            'path' => 'proprietaires',
            'method' => 'POST'
        ],
        'GET' => [
            'path' => '/proprietaires',
            "method" => 'GET'
        ]
    ]
)]
class Proprietaire extends User
{
    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="proprietaire")
     */
    private $messages;

    /**
     * @ORM\OneToMany(targetEntity=Bien::class, mappedBy="proprietaire")
     */
    private $biens;

    public function __construct()
    {
        $this->biens = new ArrayCollection();
    }


    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setProprietaire($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getProprietaire() === $this) {
                $message->setProprietaire(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Bien[]
     */
    public function getBiens(): Collection
    {
        return $this->biens;
    }

    public function addBien(Bien $bien): self
    {
        if (!$this->biens->contains($bien)) {
            $this->biens[] = $bien;
            $bien->setProprietaire($this);
        }

        return $this;
    }

    public function removeBien(Bien $bien): self
    {
        if ($this->biens->removeElement($bien)) {
            // set the owning side to null (unless already changed)
            if ($bien->getProprietaire() === $this) {
                $bien->setProprietaire(null);
            }
        }

        return $this;
    }
}
