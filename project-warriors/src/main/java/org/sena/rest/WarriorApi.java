package org.sena.rest;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
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
            summary = "Obtener un guerrero por identificador",
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

    @POST
    @Path("/create")
    @Tag(name = "Warriors")
    @Operation(
            summary = "Crear un guerrero",
            description = "Permite crear el registro de un nuevo guerrero con los datos proporcionados"
    )
    public Response createWarrior(
            @RequestBody(
                    name = "warrior",
                    description = "Información del guerrero a registrar"
            )
            @Valid Warrior warrior
    ) {

        LOG.infof("@createWarrior API > Inicia ejecucion de API para registrar un guerrero con la data: %s", warrior);

        warriorService.createWarriorRegistry(warrior);

        LOG.infof("@createWarrior API > Finaliza ejecucion de API para registrar un guerrero con la data: %s. " +
                "El guerrero se registro exitosamente", warrior);

        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/update")
    @Tag(name = "Warriors")
    @Operation(
            summary = "Actualizar un guerrero",
            description = "Permite actualizar un guerrero con la información proporcionada"
    )
    public Response updateWarrior(Warrior warrior) {

        LOG.infof("@updateWarrior API > Inicia ejecucion de API para actualizar el registro del guerrero " +
                "con la informacion: %s", warrior);

        warriorService.updateWarriorRegistry(warrior);

        LOG.infof("@updateWarrior API > Finaliza ejecucion de API para actualizar el registro de un guerrero. " +
                "La informacion actualizada fue: %s", warrior);

        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @DELETE
    @Tag(name = "Warriors")
    @Path("/delete/{idWarrior}")
    @Operation(
            summary = "Eliminar un guerrero",
            description = "Permite eliminar un guerrero por su identificador"
    )
    public Response deleteWarrior(
            @Parameter(
                    name = "idWarrior",
                    description = "Identificador del guerrero a eliminar",
                    example = "12345",
                    required = true
            )
            @PathParam("idWarrior") String idWarrior
    ) {

        LOG.infof("@deleteWarrior API > Inicia ejecicion de API para eliminar el registro del guerrero con " +
                "identificador: %s en base de datos", idWarrior);

        warriorService.deleteWarriorRegistry(idWarrior);

        LOG.infof("@deleteWarrior API > Finaliza ejecicion de API para eliminar registro de un guerrero. El " +
                "guerrero con identificador: %s fue eliminado correctamente", idWarrior);

        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
