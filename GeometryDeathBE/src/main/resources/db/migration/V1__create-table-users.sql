create table if not exists users(
    id                          bigint primary key,
    username                    varchar(255),
    email                       varchar(255),
    password                    varchar(255),
    verified                    boolean,
    record                      bigint
);

create table if not exists roles(
    id                          bigint primary key,
    role                        varchar(255)
);

create table if not exists user_roles (
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id),
    foreign key (user_id) references users(id),
    foreign key (role_id) references roles(id)
);