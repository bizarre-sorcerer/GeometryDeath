package app.repositories.impl;

import app.models.entity.Role;
import app.repositories.RoleRepository;
import app.utils.JpaUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;

import java.util.Optional;

public class RoleRepositoryImpl implements RoleRepository {

    @Override
    public Optional<Role> findByCode(String code) {
        EntityManager em = JpaUtil.getEntityManagerFactory().createEntityManager();
        try {
            Role role = em.createQuery("SELECT role FROM Role role WHERE role.code = :code", Role.class)
                    .setParameter("code", code)
                    .getSingleResult();
            return Optional.of(role);
        } catch (NoResultException e) {
            return Optional.empty();
        } finally {
            em.close();
        }
    }
}
