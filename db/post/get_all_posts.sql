select *
from posts p
join userz uz on uz.user_id = p.author_id;