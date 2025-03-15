package org.sena.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.sena.domain.Breed;
import org.sena.helper.Exception.WarriorException;
import org.sena.repository.BreedRepository;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class BreedService {

    private static final Logger LOG = Logger.getLogger(BreedService.class);

    @Inject
    BreedRepository breedRepository;

    public Breed getBreedById(String idBreed) {

        LOG.infof("@getBreedById SERV > Inicia consulta de la raza con el identificador: %s", idBreed);

        Breed breed = breedRepository.findById(idBreed);

        LOG.infof("@getBreedById SERV > Finaliza consultar de raza con id: %s. Raza obtenida: %s", idBreed, breed);

        return breed;
    }

    public List<Breed> getBreedList() {

        LOG.info("@getBreedList SERV > Inicia ejecucion de consulta para obtener el listado de razas en base de datos");

        List<Breed> breeds = breedRepository.listAll();

        LOG.infof("@getBreedList SERV > Consulta finalizada. Se obtuvo: %s elemento(s) en la lista", breeds.size());

        return breeds;
    }

    public void createBreed(Breed breed) {

        LOG.infof("@createBreed SERV > Inicia servicio de almacenamiento de raza: %s en base de datos.", breed);

        validateBreedRegistry(breed.getName());

        LOG.infof("@createBreed SERV > Se agrega identificador al registro", breed.getName());

        breed.setIdBreed(UUID.randomUUID().toString());
        breedRepository.persist(breed);

        LOG.infof("@createBreed SERV > Raza almacenada correctamente con ID: %s", breed.getIdBreed());
    }

    public void updateBreed(Breed breed) {

        LOG.infof("@updateBreed SERV > Inicia servicio para actualizar la raza con la data: %s. Inicia " +
                "consulta de la raza con el identificador: %s", breed, breed.getIdBreed());

        Breed breedMongo = getByIdOptional(breed.getIdBreed());

        LOG.infof("@updateBreed SERV > Raza encontrada: %s. Inicia actualizacion de la informacion", breedMongo);

        breedMongo.setName(breed.getName());
        breedMongo.setDescription(breed.getDescription());
        breedMongo.setResistance(breed.getResistance());

        breedRepository.update(breedMongo);

        LOG.infof("@updateBreed SERV > La raza con id: %s se actualizo correctamente", breed.getIdBreed());
    }

    public void deleteBreed(String idBreed) {

        LOG.infof("@deleteBreed SERV > Inicia eliminación de raza con identificador: %s", idBreed);

        if (!breedRepository.deleteById(idBreed)) {

            LOG.errorf("@deleteBreed SERV > No se encontró la raza con identificador: %s. No se eliminó el " +
                    "registro de la base de datos.", idBreed);

            throw new WarriorException(Response.Status.NOT_FOUND, "La raza con identificador: " + idBreed + ", No " +
                    "esta registrada en base de datos. No se realizó la eliminación");
        }

        LOG.infof("@deleteBreed SERV > Raza con identificador: %s eliminada correctamente.", idBreed);
    }

    private void validateBreedRegistry(String breedName) {

        LOG.infof("@validateBreedRegistry SERV > Inicia verificacion de existencia de raza con id: %s", breedName);

        breedRepository.getBreedByName(breedName).ifPresent(breed -> {

            LOG.errorf("@createBreed SERV > La raza con el nombre: %s ya se encuentra registrada", breedName);

            throw new WarriorException(Response.Status.CONFLICT, "La raza con el nombre: " + breedName + ", ya se " +
                    "encuentra registrada en base de datos");
        });

        LOG.infof("@validateBreedRegistry SERV > La raza con el nombre: %s No se encuentra registrada, se " +
                "continua proceso de almacenamiento", breedName);
    }

    private Breed getByIdOptional(String idBreed) {

        return breedRepository.findByIdOptional(idBreed).orElseThrow(() -> {

            LOG.errorf("@getByIdOptional SERV > La raza con identificador: %s No se encuentra registrada", idBreed);

            return new WarriorException(Response.Status.NOT_FOUND, "La raza con el identificador: " + idBreed +
                    ", No se encuentra registrada. No se puede actualizar");
        });
    }
}
