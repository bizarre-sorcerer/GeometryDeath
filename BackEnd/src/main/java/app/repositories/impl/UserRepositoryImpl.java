package app.repositories.impl;

import app.models.entity.User;
import app.repositories.UserRepository;
import app.utils.JpaUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.NoResultException;

import java.util.Optional;

public class UserRepositoryImpl implements UserRepository {

    @Override
    public void save(User user) {
        EntityManager em = JpaUtil.getEntityManagerFactory().createEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            em.merge(user);
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    @Override
    public Optional<User> findById(Long id) {
        EntityManager em = JpaUtil.getEntityManagerFactory().createEntityManager();
        User user = em.find(User.class, id);
        em.close();
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        try (EntityManager em = JpaUtil.getEntityManagerFactory().createEntityManager()) {
            User user = em.createQuery("SELECT user FROM User user WHERE user.username = :username", User.class)
                    .setParameter("username", username)
                    .getSingleResult();
            return Optional.of(user);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }
}
