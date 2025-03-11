package org.sena.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class Breed implements Serializable {

    private int idBred;
    private String name;
    private String description;
    private double resistance;
}
