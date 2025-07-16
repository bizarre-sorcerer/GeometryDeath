package app.repositories.impl;

import app.models.entity.Rank;
import app.repositories.RankRepository;
import app.utils.JpaUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;

import java.util.Optional;

public class RankRepositoryImpl implements RankRepository {

    @Override
    public Optional<Rank> findByCode(String code) {
        EntityManager em = JpaUtil.getEntityManagerFactory().createEntityManager();
        try {
            Rank rank = em.createQuery("SELECT rank FROM Rank rank WHERE rank.code = :code", Rank.class)
                    .setParameter("code", code)
                    .getSingleResult();
            return Optional.of(rank);
        } catch (NoResultException e) {
            return Optional.empty();
        } finally {
            em.close();
        }
    }
}
