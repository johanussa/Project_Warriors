package org.sena.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.sena.domain.Warrior;
import org.sena.helper.Exception.WarriorException;
import org.sena.repository.WarriorRepository;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class WarriorService {

    private static final Logger LOG = Logger.getLogger(WarriorService.class);

    @Inject
    WarriorRepository warriorRepository;

    public Warrior getWarriorById(String warriorId) {

        LOG.infof("@getWarriorById SERV > Inicia servicio para obtener registro de guerrero con ID: %s", warriorId);

        Warrior warrior = getWarriorOptional(warriorId);

        LOG.infof("@getWarriorById SERV > El guerrero se obtuvo correctamente. Guerrero: %s", warrior);

        return warrior;
    }

    public List<Warrior> getAllWarriors() {

        LOG.info("@getAllWarriors SERV > Inicia ejecucion del servicio para obtener el listado de guerreros");

        List<Warrior> warriorList = warriorRepository.getWarriorList();

        LOG.infof("@getAllWarriors SERV > Finaliza obtencion del listado de guerreros registrados. Cantidad " +
                "de guerreros: %s", warriorList.size());

        return warriorList;
    }

    public void createWarriorRegistry(Warrior warrior) {

        LOG.infof("@createWarriorRegistry SERV > Inicia servicio de almacenamiento del guerrero: %s.", warrior);

        validateWarriorRegistry(warrior.getName());

        LOG.infof("@createWarriorRegistry SERV > Se agrega el identificador al guerrero: %s", warrior.getName());

        warrior.setIdWarrior(UUID.randomUUID().toString());
        warriorRepository.persist(warrior);

        LOG.infof("@createWarriorRegistry SERV > Finaliza ejecucion del servicio para almacenar el guerrero en " +
                "base de datos. Se registro el siguiente guerrero: %s", warrior);
    }

    public void updateWarriorRegistry(Warrior warrior) {

        LOG.infof("@updateWarriorRegistry SERV > Inicia ejecucion del servicio para actualizar registro de " +
                "un guerrero con la información: %s", warrior);

        Warrior warriorMongo = getWarriorOptional(warrior.getIdWarrior());

        LOG.infof("@updateWarriorRegistry SERV > El guerrero obtenido es: %s. Inicia actualizacion", warriorMongo);

        updateWarriorFields(warriorMongo, warrior);
        warriorRepository.update(warriorMongo);

        LOG.infof("@updateWarriorRegistry SERV > El guerrero se actualizo correctamente con la data: %s", warriorMongo);
    }

    public void deleteWarriorRegistry(String warriorId) {

        LOG.infof("@deleteWarriorRegistry SERV > Inicia ejecucion de servicio para eliminar el guerrero con " +
                "identificador: %s en base de datos", warriorId);

        if (!warriorRepository.deleteById(warriorId)) {

            LOG.errorf("@deleteWarriorRegistry SERV > No se encontro el guerrero con el ID: %s. No se elimino " +
                    "el registro de la base de datos.", warriorId);

            throw new WarriorException(Response.Status.NOT_FOUND, "El poder con identificador: " + warriorId +
                    ", No esta registrado en base de datos. No se realizó la eliminación");
        }

        LOG.infof("@deleteWarriorRegistry SERV > Finaliza ejecucion del servicio de eliminar guerrero. El " +
                "guerrero con identificador: %s fue eliminado exitosamente", warriorId);
    }

    private Warrior getWarriorOptional(String warriorId) {

        return warriorRepository.findByIdOptional(warriorId).orElseThrow(() -> {

            LOG.errorf("@getWarriorOptional SERV > El guerrero con ID: %s No se encuentra registrado", warriorId);

            return new WarriorException(Response.Status.NOT_FOUND, "El guerrero con el identificador: " + warriorId +
                    ", No se encuentra registrado. No se permite continuar");
        });
    }

    private void validateWarriorRegistry(String warriorName) {

        LOG.infof("@validateWarriorRegistry SERV > Inicia validacion del guerrero con nombre: %s", warriorName);

        warriorRepository.getWarriorByName(warriorName).ifPresent(power -> {

            LOG.errorf("@validateWarriorRegistry SERV > El guerrero con el nombre: %s ya se encuentra " +
                    "registrado. Solicitud invalidada", power.getName());

            throw new WarriorException(Response.Status.CONFLICT, "El guerrero con el nombre: " + power.getName() +
                    ", ya se encuentra registrado en base de datos");
        });

        LOG.infof("@validateWarriorRegistry SERV > El guerrero con el nombre: %s No se encuentra registrado, " +
                "se continua proceso de almacenamiento", warriorName);
    }

    private void updateWarriorFields(Warrior target, Warrior request) {

        LOG.infof("@updateWarriorFields SERV > Inicia actualizacion de campos del guerrero: %s", target.getName());

        target.setName(request.getName());
        target.setImage(request.getImage());
        target.setHealth(request.getHealth());
        target.setEnergy(request.getEnergy());
        target.setBreedId(request.getBreedId());
        target.setWarriorTypeId(request.getWarriorTypeId());
        target.setPowersId(request.getPowersId());
    }
}
