package org.sena.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonId;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.sena.helper.utils.ConvertToJson;

import java.io.Serializable;

@Data
public class Breed implements Serializable {

    @BsonId
    @Schema(examples = "2405741d-4940-77c9-a3b3-1ae36d3558e5")
    private String idBreed;

    @Schema(examples = "Saiyajin")
    @NotBlank(message = "El campo name no puede ser nulo o vacío")
    private String name;

    @NotBlank(message = "El campo description no puede ser nulo o vacío")
    @Schema(examples = "Guerreros con gran potencial de combate. Se vuelven más fuertes después de cada batalla")
    private String description;

    @Schema(examples = "1.6")
    @NotNull(message = "EL campo resistance no puede ser nulo o vacío")
    private double resistance;

    @Override
    public String toString() {
        return ConvertToJson.toJson(this);
    }
}
