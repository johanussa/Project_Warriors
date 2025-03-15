package org.sena.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonId;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.sena.helper.utils.ConvertToJson;

import java.io.Serializable;
import java.util.List;

@Data
public class Warrior implements Serializable {

    @BsonId
    @Schema(examples = "5742401d-77c9-4940-a3b3-1ae38e5556d3")
    private String idWarrior;

    @Schema(examples = "Vegeta")
    @NotBlank(message = "El campo name no puede ser nulo o vacío")
    private String name;

    @Schema(examples = "https://dragonball-api.com/characters/vegeta_normal.webp")
    private String image;

    @Schema(examples = "100.0")
    @NotNull(message = "El campo health no puede ser nulo o vacío")
    private double health;

    @Schema(examples = "100.0")
    @NotNull(message = "El campo energy no puede ser nulo o vacío")
    private double energy;

    @NotNull(message = "El campo breed no puede ser nulo o vacío")
    private String breedId;

    @NotNull(message = "El campo warriorType no puede ser nulo o vacío")
    private String warriorTypeId;

    @Schema(examples = "[\"Ataque del Big Bang\", \"Ataque de Brillo Final\"]")
    @Size(min = 1, message = "El guerrero debe tener al menos un poder")
    private List<String> idPowers;

    @Override
    public String toString() { return ConvertToJson.toJson(this); }
}
