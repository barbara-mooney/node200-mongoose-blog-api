import { Schema } from "mongoose"

- WHEN I PASS Request.BODY... IS IT THE BODY PARSER THAT GETS THE RIGHT INFO??

.post((req, res) => {
    const newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        social: {
            facebook: req.body.social.facebook,
            twitter: req.body.social.twitter, 
            linkedin: req.body.social.linkedin
        }
    })
    newUser
        .save()
        .then(SEND THE RESPONSE);
});

--VS--

.post((req, res) => {
    const newUser = new User (req.body)
    newUser.save()
        .then(SEND THE RESPONSE);
});

-- look at what the codes meean??

WHY DO WE PUT {NEW:TRUE}???
    .put((req, res) => {
        User
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updatedUser => res.status(204).json(updatedUser))
        })

BLOGS ROUTES
router.route('/')
    .get((req, res) => {
        Blog
            .find()
            .then(blogs => res.status(200).send(blogs));
    })
    .post((req, res) => {
        let dbUser = null;
        User
            .findById(req.body.authorId)
            .then(user => {
                dbUser = user;
                const newBlog = new Blog(req.body);
                newBlog.author = user._id;
                return newBlog.save();
            })
            .then(blog => {
                dbUser.blogs.push(blog);
                dbUser.save().then(() => res.status(201).json(blog));        
            });
    });