create table if not exists roles(
    id                  bigint primary key,
    name                varchar(255) not null,
    code                varchar(255) not null
);

create table if not exists ranks (
    id                  bigint primary key,
    name                varchar(255) not null,
    code                varchar(255) not null
);

create table if not exists users (
    id                  bigint primary key,
    username            varchar(255) not null,
    email               varchar(255) unique,
    password            varchar(255) null,
    role_id             bigint not null references roles(id),
    rank_id             bigint not null references ranks(id),
    is_anonymous        boolean,
    verified            boolean,
    record              bigint null,
    created_at          timestamp not null,
    updated_at          timestamp null,
    is_deleted          boolean default false
);

create table if not exists leaderboard (
    id                  bigint primary key,
    user_id             bigint unique not null references users(id),
    overall_place       bigint not null,
    created_at          timestamp not null,
    updated_at          timestamp
);

create sequence if not exists id_sequence;
create sequence if not exists role_id;
create sequence if not exists rank_id;

insert into roles (id, name, code) VALUES (nextval('role_id'), 'guest', 'GUEST'),
                                          (nextval('role_id'), 'player', 'PLAYER'),
                                          (nextval('role_id'), 'admin', 'ADMIN');


insert into ranks (id, name, code) VALUES (nextval('rank_id'), 'noob', 'NOOB'),
                                          (nextval('rank_id'), 'warrior', 'WARRIOR'),
                                          (nextval('rank_id'), 'master', 'MASTER'),
                                          (nextval('rank_id'), 'grandmaster', 'GRANDMASTER'),
                                          (nextval('rank_id'), 'legend', 'LEGEND'),
                                          (nextval('rank_id'), 'mythic', 'MYTHIC');

