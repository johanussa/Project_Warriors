package org.sena.repository;

import io.quarkus.mongodb.panache.PanacheMongoRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import org.jboss.logging.Logger;
import org.sena.domain.Warrior;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class WarriorRepository implements PanacheMongoRepositoryBase<Warrior, String> {

    private static final Logger LOG = Logger.getLogger(WarriorRepository.class);

    public Optional<Warrior> getWarriorByName(String warriorName) {

        LOG.infof("@getWarriorByName REPO > Inicia consulta del guerrero con el nombre: %s", warriorName);

        return find("name = ?1", warriorName).firstResultOptional();
    }

    public List<Warrior> getWarriorList() {

        LOG.info("@getWarriorList REPO > Inicia obtencion del listado de guerreros registrados en base de datos");

        return findAll().list();
    }
}
