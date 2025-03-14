package org.sena.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;
import org.sena.domain.Warrior;
import org.sena.repository.WarriorRepository;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class WarriorService {

    private static final Logger LOG = Logger.getLogger(WarriorService.class);

    @Inject
    WarriorRepository warriorRepository;

    public Warrior getWarriorById(String idWarrior) {

        LOG.infof("@getWarriorById SERV > Inicia ejecucion del servicio para obtener registro del guerrero " +
                "con identificador: %s", idWarrior);

        Warrior warrior = warriorRepository.getWarriorById(idWarrior).orElseThrow(() -> {

           LOG.errorf("@getWarriorById SERV > El guerrero con identificador: %s No esta registrado", idWarrior);

           return new RuntimeException("El guerrero con identificador: " + idWarrior + " no se encuentra registrado");
        });

        LOG.infof("@getWarriorById SERV > El guerrero con identificador se obtuvo correctamente: %s", warrior);

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

        LOG.infof("@createWarriorRegistry SERV > Inicia ejecucion del servicio para almacenar el guerrero en " +
                "base de datos con la informacion: %s", warrior);

        warrior.setIdWarrior(UUID.randomUUID().toString());

        warriorRepository.persist(warrior);

        LOG.infof("@createWarriorRegistry SERV > Finaliza ejecucion del servicio para almacenar el guerrero en " +
                "base de datos. Se registro el siguiente guerrero: %s", warrior);
    }

    public void updateWarriorRegistry(Warrior warrior) {

        LOG.infof("@updateWarriorRegistry SERV > Inicia ejecucion del servicio para actualizar registro de " +
                "un guerrero con la información: %s", warrior);

        warriorRepository.update(warrior);

        LOG.infof("@updateWarriorRegistry SERV > Finaliza ejecucion del servicio para actualizar registro de " +
                "un guerrero con la información: %s", warrior);
    }

    public void deleteWarriorRegistry(String idWarrior) {

        LOG.infof("@deleteWarriorRegistry SERV > Inicia ejecucion de servicio para eliminar el guerrero con " +
                "identificador: %s en base de datos", idWarrior);

        warriorRepository.deleteById(idWarrior);

        LOG.infof("@deleteWarriorRegistry SERV > Finaliza ejecucion del servicio de eliminar guerrero. El " +
                "guerrero con identificador: %s fue eliminado exitosamente", idWarrior);
    }
}
