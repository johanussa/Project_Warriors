package org.sena.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class WarriorType implements Serializable {

    private int idWarriorType;
    private String name;
    private String description;
}
