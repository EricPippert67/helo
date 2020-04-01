select *
from posts p
join userz uz on uz.user_id = p.author_id
where p.author_id = $1;