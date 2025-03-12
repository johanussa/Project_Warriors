package org.sena.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonId;

import java.io.Serializable;
import java.util.List;

@Data
public class Warrior implements Serializable {

    @BsonId
    private String idWarrior;
    private String name;
    private String image;
    private double health;
    private double energy;
    private Breed breed;
    private WarriorType warriorType;
    private List<String> powers;

    @Override
    public String toString() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "{}";
        }
    }
}
