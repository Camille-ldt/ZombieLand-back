import Activity from '../models/Activity.js';
import Multimedia from '../models/Multimedia.js';
import { uploadImage } from '../services/uploadImage.js';

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
        const activityId = Number(req.params.id);
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
        const { title, description, category_id, filePath } = req.body;
        const image_url = filePath ? await uploadImage(filePath, 'activities') : null;
        
        if (!title) {
            return res.status(400).json({ message: "An activity should have a title" });
        }
        if (!description) {
            return res.status(400).json({ message: "An activity should have a description" });
        }
        if (!category_id) {
            return res.status(400).json({ message: "Le champ category_id est requis." });
        }

        
        const newActivity = await Activity.create({ title, description, category_id, image_url });

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
        const activityId = Number(req.params.id);
        const {title, description, category_id, filePath} = req.body;

        const activity = await Activity.findByPk(activityId)
        if (!activity){
            return res.status(404).json({message: 'Activité not found' });
        }

        // Si un nouveau fichier est fourni, télécharge et mets à jour l'URL
        let image_url = activity.image_url;
        if (filePath) {
            // Supprimer l'ancienne image de Cloudinary si elle existe
            if (image_url) {
                const publicId = image_url.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`activities/${publicId}`);
            }

            // Télécharger la nouvelle image
            image_url = await uploadImage(filePath, 'activities');
        }

        activity.title = title;
        activity.description = description;
        activity.category_id = category_id;
        activity.image_url = image_url;

        await activity.save();

        res.status(204).json(activity);
    } catch (error) {
        console.error('Server error while updating activity');
        res.status(500).json({message: 'Server error while updating activity'});
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const activityId = Number(req.params.id);
        
        const activity = await Activity.findByPk(activityId);
        
        if (!activity) {
            return res.status(404).json({ message: 'Activité non trouvée' });
        }

        // Supprimer l'image de Cloudinary si elle existe
        if (activity.image_url) {
            const publicId = activity.image_url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`activities/${publicId}`);
        }
        
        await activity.destroy();
        res.status(204).json({message:'Activity is destroy'});
        
    } catch (error) {
        console.error('Erreur serveur lors de la suppression de l\'activité:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'activité' });
    }
};

// /activities/:activityId/multimedia
export const getActivityMultimedia = async (req, res) => {
    const activity = Activity.findByPk(req.params.activityId);

    const medias = await activity.getMultimedias();
    // [
    //     Multimedia,
    //     Multimedia,
    //     Multimedia
    // ]

    res.json(medias);
};

// PUT /activities/:activityId/multimedia => activity.addMultimedia(multimedia)

export const addMultimediaToActivity = async (req, res)=> {
    const activity = Activity.findByPk(req.params.activityId);
    
    const multimediaId = req.body.multimediaId;
    const multimedia = await Multimedia.findByPk(multimediaId);
    if (!multimedia) {
        return res.status(404).json({ message: 'Multimedia not found' });
    }

    await activity.addMultimedia(multimedia);

    res.json(activity);
};

// DELETE /activities/:activityId/multimedia/:multimediaId => activity.removeMultimedia(multimedia)

export const removeMultimediaFromActivity = async (req,res) => {
    const activity = Activity.findByPk(req.params.activityId);
    const multimediaId = req.body.multimediaId;

    const multimedia = await Multimedia.findByPk(multimediaId);
    if (!multimedia) {
        return res.status(404).json({ message: 'Multimedia not found' });
    }

    await activity.removeMultimedia(multimedia);

    res.json(activity);

};

// Documentation des fonctions ajoutées par le many-to-many de Sequelize :
// https://sequelize.org/docs/v6/core-concepts/assocs/#foohasmanybar