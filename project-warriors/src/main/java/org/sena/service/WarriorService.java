package org.sena.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;
import org.sena.domain.Warrior;
import org.sena.repository.WarriorRepository;

import java.util.List;

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
}
