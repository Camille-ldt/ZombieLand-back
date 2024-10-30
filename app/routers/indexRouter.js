import { Router } from 'express';
import { router as userRoute } from './UserRoute.js';
import { router as activityRoute } from './ActivityRoute.js';
import { router as roleRoute } from './RoleRoute.js';
import{ router as categoryRoute } from './CategoryRoute.js';
import { router as reviewRoute } from './ReviewRoute.js'; 


export const router = Router();

router.use('/users', userRoute);
router.use('/activities', activityRoute);
router.use('/roles', roleRoute);
router.use('/categories', categoryRoute);
router.use('/reviews', reviewRoute);

router.use((req, res, next)=>{
});