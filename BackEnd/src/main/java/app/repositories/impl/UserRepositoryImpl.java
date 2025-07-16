package app.repositories.impl;

import app.models.entity.User;
import app.repositories.UserRepository;
import app.utils.JpaUtil;
import jakarta.persistence.EntityManager;

public class UserRepositoryImpl implements UserRepository {

    @Override
    public void save(User user) {
        EntityManager em = JpaUtil.getEntityManagerFactory().createEntityManager();
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        em.close();
    }

    @Override
    public User findById(Long id) {
        EntityManager em = JpaUtil.getEntityManagerFactory().createEntityManager();
        User user = em.find(User.class, id);
        em.close();
        return user;
    }
}
