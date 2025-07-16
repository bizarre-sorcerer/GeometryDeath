package app.repositories;

import app.models.entity.Rank;

import java.util.Optional;

public interface RankRepository {

    Optional<Rank> findByCode(String code);
}
