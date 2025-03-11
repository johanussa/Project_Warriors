package org.sena.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class Power implements Serializable {

    private int idPower;
    private String name;
    private double damage;
    private String effect;
    private String description;
    private double powerEnergyConsumed;
}
