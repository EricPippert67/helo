    select p.title, p.img, p.content, uz.username, uz.profile_pic
    from posts p
    join userz uz on uz.user_id = p.author_id
    where p.post_id = $1; 