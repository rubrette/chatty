-- Table: public.test

-- DROP TABLE public.test;

CREATE TABLE IF NOT EXISTS public.actions
(
    id smallint NOT NULL DEFAULT nextval('action_id_seq'::regclass),
    "order" smallint,
    "personId" text COLLATE "default".pg_catalog,
    "sendToRoom" text COLLATE "default".pg_catalog,
    "SendToEmail" text COLLATE "default".pg_catalog,
    "messageId" text COLLATE "default".pg_catalog,
    sleep bigint,
    CONSTRAINT test_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.test
    OWNER to peikqpptrzvxby;
