create table if not exists users(
    id                          bigint primary key,
    username                    varchar(255),
    max_amount_of_points        bigint
)