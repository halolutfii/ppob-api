PGDMP  6                
    |            ppob    16.1    16.1     '           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            (           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            )           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            *           1262    23999    ppob    DATABASE     f   CREATE DATABASE ppob WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE ppob;
                postgres    false            �            1259    24001    banners    TABLE     �  CREATE TABLE public.banners (
    id integer NOT NULL,
    banner_name character varying(50) NOT NULL,
    banner_image character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by character varying(50),
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    deleted_by character varying(50)
);
    DROP TABLE public.banners;
       public         heap    postgres    false            �            1259    24000    banners_id_seq    SEQUENCE     �   CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.banners_id_seq;
       public          postgres    false    216            +           0    0    banners_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;
          public          postgres    false    215            �            1259    24021    services    TABLE       CREATE TABLE public.services (
    service_code character varying(50) NOT NULL,
    service_name character varying(100) NOT NULL,
    service_icon character varying(255),
    service_tarif numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by character varying(50),
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    deleted_by character varying(50)
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    24044    transactions    TABLE     I  CREATE TABLE public.transactions (
    invoice_number character varying(50),
    email character varying(100),
    service_code character varying(50),
    transaction_type character varying(50) NOT NULL,
    description character varying(255),
    total_amount numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by character varying(50),
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    deleted_by character varying(50)
);
     DROP TABLE public.transactions;
       public         heap    postgres    false            �            1259    24011    users    TABLE     P  CREATE TABLE public.users (
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    profile_image character varying(255),
    balance numeric(10,2) DEFAULT 0.00,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by character varying(50),
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    deleted_by character varying(50)
);
    DROP TABLE public.users;
       public         heap    postgres    false                       2604    24004 
   banners id    DEFAULT     h   ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);
 9   ALTER TABLE public.banners ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            !          0    24001    banners 
   TABLE DATA           �   COPY public.banners (id, banner_name, banner_image, description, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    216          #          0    24021    services 
   TABLE DATA           �   COPY public.services (service_code, service_name, service_icon, service_tarif, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    218   �       $          0    24044    transactions 
   TABLE DATA           �   COPY public.transactions (invoice_number, email, service_code, transaction_type, description, total_amount, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    219   �       "          0    24011    users 
   TABLE DATA           �   COPY public.users (first_name, last_name, email, password, profile_image, balance, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by) FROM stdin;
    public          postgres    false    217   �        ,           0    0    banners_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.banners_id_seq', 8, true);
          public          postgres    false    215            �           2606    24010    banners banners_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.banners DROP CONSTRAINT banners_pkey;
       public            postgres    false    216            �           2606    24029    services services_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_code);
 @   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey;
       public            postgres    false    218            �           2606    24020    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            �           2606    24051 $   transactions transactions_email_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_email_fkey FOREIGN KEY (email) REFERENCES public.users(email) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_email_fkey;
       public          postgres    false    217    3468    219            �           2606    24056 +   transactions transactions_service_code_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_service_code_fkey FOREIGN KEY (service_code) REFERENCES public.services(service_code) ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_service_code_fkey;
       public          postgres    false    3470    218    219            !   �   x���=� ��N� �
U����]��#��3x{fW�w{�G����e"�Vk*��ت{l����l�g6%�l!|�+����J䲿�L���W@R!( �(e��֠Oh����0t��:g�#;G�Q����̝3�Y��sV�      #     x�œ�n�0���)x����l�A�S'�(R�&E`��}�]K*KXw^<|�~w���@م5:���G߲�I�Seԝ�����d}o����4/}	�-�iۀl��c �;+پ�`z�ʻ�C���Oi4I!�G1��\������/=�Õue�:�-C��0��:�%�Q
����N�仗�4���*YY���q��8���.�3��C�G�?=��c�I��t���G��7�X�2�8��a�-cR��ɷ�4�L��|�P`/��`/s�w
�SӴ/�>�      $   �   x�}��j�0��yK�?��zح�K�^lG�t�a{�e�a��3FH�1��,V�iĔ	8.%M$@�A����k:<}�a��tT�V��]=t�?���\�4��"
�z�1�1 ��ƹ6��!�~�����C���� \b���iA��,���7�nתn�����k�=̚��#��\���B,#:NM��BC��n�6�����h����y��x{�t�^L{]U�&k�      "   �   x�}���0  ����>(�N�ED��D�R<"��T�_/�^n��L��v��^���*��o��*+xnj��`�lg�K^�d�סr#�6z�y����NZ�i�'�e�dp�yT��h��U~��PƸD�q����� ��.�.�6����>i���RhY�zV9)     