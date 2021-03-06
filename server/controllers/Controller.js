const bcrypt = require('bcryptjs');

module.exports ={
    register: async (req, res) => {
        const {password, username} = req.body;
        const db =req.app.get('db');

        let user = await db.auth.check_user(username);
        if (user[0]){
            return res.status(400).send('User already exists, choose another one!')
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        let newUser = await db.auth.register_user({password: hash, username});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);

    },
    login: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        let user = await db.auth.check_user(username);
        if(!user[0]){
            return res.status(400).send('User does not exist!');
        }
        const authenticated =bcrypt.compareSync(password, user[0].password);
        if(!authenticated){
            return res.status(401).send('Password is WRONG!');
        }
        delete user[0].password;
        req.session.user = user[0];
        res.status(202).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getPosts: async(req, res) => {
       console.log(req.query)
       console.log(req.params)
        const {userPosts, searchInput} = req.query;
        const {id} = req.params
        const db = req.app.get('db');
        if (userPosts === 'true' && searchInput !== '') {
           let posts =  await db.post.get_posts(+id);
           console.log(posts)
           let filterPost = posts.filter((e, i) => e[i].title.includes(searchInput));
           console.log(filterPost)
           return res.status(200).send(filterPost)
        } 
        if (userPosts === 'false' && searchInput === '') {
           let allPosts = await db.post.get_all_posts();
           console.log()
           let filtered = allPosts.filter((e, i) => (e[i].author_id !== id)? e : null)
           return res.status(200).send(filtered)
        } 
        if (userPosts === 'false' && searchInput !== '') {
           let postAll = await db.post.get_all_posts();
           console.log(postAll)
           let postsFiltered = postAll.filter((e, i) => e[i].title.includes(searchInput));
           return res.status(200).send(postsFiltered); 
        }
        if (userPosts === 'true' && searchInput === '') {
           let getAllPosts = await db.post.get_all_posts();
           return res.status(200).send(getAllPosts);
        }
  
     },
     getSinglePost: async(req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        console.log(id)
  
        let post = await db.post.get_single_post(+id);
        res.status(200).send(post);
     },
     addPost: (req, res) => {
        const db = req.app.get('db');
        const {title, image, content} = req.body;
        const {id} = req.params;
  
        db.post.add_post({title, img: image, content, author_id: id})
        res.sendStatus(200);
     },
     deletePost: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        // console.log(id)
  
        db.post.delete_post(+id)
        res.sendStatus(200);
     },
     userInfo: async(req, res) => {
        const db = req.app.get('db');
        const {userid} = req.session;
        // console.log('before db calls for it', userid)
        let user = await db.auth.user_info(+userid);
        // console.log(user)
        delete user[0].password;
        // console.log(user)
        
        res.status(200).send(user[0])
  
     }
  }
  


