package org.sena.domain;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Warrior implements Serializable {

    private String idWarrior;
    private String name;
    private String image;
    private double health;
    private double energy;
    private Breed breed;
    private WarriorType warriorType;
    private List<String> powers;
}
