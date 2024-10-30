import Activity from '../models/Activity.js';

export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();

        if (!activities.length) {
            return res.status(404).json({message: 'Aucune activité trouvé'});
        }
        res.status(200).json(activities);
    } catch (error) {
        console.error('Server error while fetching activities');
        res.status(500).json({message: 'Server error while fetching activities'});
    }  
};

export const getOneActivity = async (req, res)=> {
    try {
        const activityId = req.params.id;
        const activity = await Activity.findByPk(activityId)
        if (!activity){
            return res.status(404).json({message: 'Activité non trouvée' });
        }
        res.status (200).json(activity);
    } catch (error) {
        console.error('Server error while fetching activity');
        res.status(500).json({message: 'Server error while fetching activity'});
        
    }
};

export const createActivity = async (req, res) => {
    try {
        const { title, description, category_id } = req.body;

        
        if (!title) {
            return res.status(400).json({ message: "An activity should have a title" });
        }
        if (!description) {
            return res.status(400).json({ message: "An activity should have a description" });
        }
        

        
        const newActivity = await Activity.create({ title, description, category_id });

        if (!newActivity) {
            return res.status(500).json({ message: "Something went wrong while creating the activity" });
        }

       
        res.status(201).json(newActivity);

    } catch (error) {
        console.error('Server error while creating activity:', error);
        res.status(500).json({ message: 'Server error while creating activity' });
    }
};

export const updateActivity = async (req, res)=>{
    try {
        const activityId = req.params.id;
        const {title, description, category_id} = req.body
        const activity = await Activity.findByPk(activityId)
        if (!activity){
            return res.status(404).json({message: 'Activité non trouvée' });
        }
        activity.title = title;
        activity.description = description
        activity.category_id= category_id;
        await activity.save();

        res.status(204).json(activity);
    } catch (error) {
        console.error('Server error while updating activity');
        res.status(500).json({message: 'Server error while updating activity'});
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const activityId = req.params.id;
        
        const activity = await Activity.findByPk(activityId);
        
        if (!activity) {
            return res.status(404).json({ message: 'Activité non trouvée' });
        }

        await activity.destroy();
        res.status(204).json({message:'Activity is destroy'});
        
    } catch (error) {
        console.error('Erreur serveur lors de la suppression de l\'activité:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'activité' });
    }
};