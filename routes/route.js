// api ka end point mtln /k bad bala part https://facebook.com/login
import { signupUser ,loginUser} from '../connector/user-controller.js';
import express from 'express';
import { uploadImage } from '../connector/image-controller.js';
import upload from '../utlis/upload.js'
import { createPost ,getAllPosts ,getPost,updatePost,deletePost} from '../connector/post-controller.js';
import { authenticateToken } from '../connector/jwt-controller.js';
import { newComment,getComments ,deleteComment} from '../connector/comment-controller.js';

const router=express.Router();
// signup api end point h and callback function konse user api ko call lrna h iske liye h
//this file is onlu for routes isliye ik alg file banai h connector callback functions k liye
// signupuser callback function h jo uper import kia h


router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/file/upload', upload.single('file') ,uploadImage);

router.post('/create',authenticateToken ,createPost);
router.get('/posts',authenticateToken, getAllPosts);

router.get('/post/:id',authenticateToken,getPost);

router.put('/update/:id',authenticateToken,updatePost)

router.delete('/delete/:id',authenticateToken,deletePost);

router.post('/comment/new',authenticateToken,newComment);

router.get('/comments/:id',authenticateToken,getComments);

router.delete('/comment/delete/:id',authenticateToken,deleteComment);

export default router;