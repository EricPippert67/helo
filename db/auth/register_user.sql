insert into userz (
   password,
   username
) values (
   ${password},
   ${username}
)
returning user_id, username;