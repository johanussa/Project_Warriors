package org.sena.rest;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.logging.Logger;
import org.sena.domain.Warrior;
import org.sena.service.WarriorService;

import java.util.List;

@Path("/internal/warrior")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class WarriorApi {

    private static final Logger LOG = Logger.getLogger(WarriorApi.class);

    @Inject
    WarriorService warriorService;

    @GET
    @Tag(name = "Warriors")
    @Operation(
            summary = "Obtener un guerrero por ID",
            description = "Permite obtener el registro de un guerrero por su identificador"
    )
    public Response getWarriorById(
            @Parameter(
                    name = "idWarrior",
                    example = "21543",
                    required = true,
                    description = "Identificador del guerrero a consultar"
            )
            @PathParam("idWarrior") String idWarrior
    ) {

        LOG.infof("@getWarriorById API > Inicia ejecucion de API para obtener el registro de un usuario por " +
                "el identificador: %s", idWarrior);

        Warrior warrior = warriorService.getWarriorById(idWarrior);

        LOG.infof("@getWarriorById API > Finaliza ejecucion de API para obtener registro de guerrero en base " +
                "de datos. Guerrero consultado: %s", warrior);

        return Response.ok().build();
    }

    @GET
    @Path("/all")
    @Tag(name = "Warriors")
    @Operation(
        summary = "Obtener todos los usuarios",
        description = "Permite obtener el listado de todos los guerreros registrados"
    )
    public Response getAllWarriors() {

        LOG.info("@getAllWarriors API > Inicia ejecucion de API para obtener el listado de todos los guerreros registrados");

        List<Warrior> warriors = warriorService.getAllWarriors();

        LOG.infof("@getAllWarriors API > Finaliza ejecucion de API para obtener el listado de todos los " +
                "guerreros registrados. Se obtuvo: %s registros en base de datos", warriors.size());

        return Response.status(Response.Status.OK)
                .entity(warriors)
                .build();
    }
}
