create table userz (
    user_id serial primary key,
    username varchar(30),
    password varchar(300),
    profile_pic varchar(5000)
);

create table posts (
    post_id serial primary key,
    title varchar(50),
    img varchar(5000),
    content varchar(5000),
    author_id int references people(people_id)
);

insert into userz (
    username,
    password,
    profile_pic
) values 
(
    'pip', 'test', 'image.jpg'
),
(
    'tallons', 'test', 'image.jpg'
),
(
    'tpop', 'test', 'image.png'
);

insert into posts (
    title,
    img,
    content,
    author_id
) values 
(
    'pip', 'test image', 'testest', 1
),
(
    'pippy', 'test image', 'testest', 2
);