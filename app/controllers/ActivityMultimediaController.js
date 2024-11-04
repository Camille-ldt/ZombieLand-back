//J'importe les models requis
import Activity from '../models/Activity.js';
import Multimedia from '../models/Multimedia.js';
import ActivityMultimedia from '../models/ActivityMultimedia.js';

// Fonction pour récupérer les associations entre une Activité et ses Multimédias
// Function to retrieve all associations between Activity and its Multimedias
export async function getAllActivityMultimedia (req, res){
    try{
        const activityMultimedia = Number(req.params.multimediaId);
        const allActivityMultimedia = await ActivityMultimedia.findAll({
            include:[{
                model: Activity,
                where: {id: activityId},
                through:{attributes: []}
            }]
        });
        if (allActivityMultimedia.length === 0){
            return res.status(404).json(allActivityMultimedia);
        }
        res.status(200).json(allActivityMultimedia);
    }catch (error){
        console.error("Erreur lors de la suppression de l'image:", error);
        res.status(500).json({message: "Erreur serveur lors de la suppression de l'image"});
    }
}

// Fonction pour ajouter un Multimédia à une Activité
// Funtion to add Multimedia to an Activity
export async function addMultimediaToActivity (req, res){
    try{
        const ActivityId = Number(req.params.activityId);
        const MultimediaId = Number(req.params.multimediaId);
        const [created] = await ActivityMultimedia.findOrCreate({
            where:{ Activity_id: ActivityId, Multimedia_id: MultimediaId}
        });
        if(created){
            console.log('Association créée avec succès');
        } else{
            console.log('Cette association existe déjà');
        }
        const updatedActivity = await Activity.findByPk(ActivityId,{
            include:[Multimedia]
        });
        res.status(200).json(updatedActivity);
    }catch (error){
        console.error("Erreur lors de l'ajout de l'image à l'Activité:", error);
        res.status(500).json({message: "Erreur serveur lors de l'ajout de l'image à l'Activité"})
    }
};

// Fonction pour supprimer une association entre une Activité et un Multimédia
// Function to delete an association between an Activity and Multimedia
export async function deleteActivityMultimedia (req, res){
    try{
        const ActivityId = Number(req.params.activityId);
        const MultimediaId = Number(req.params.multimediaId);
        const ActivityMultimedia = await ActivityMultimedia.findByPk(ActivityId);
        if(!ActivityMultimedia){
          return res.status(404).json({message: 'Image non trouvée'});
        };  
        const deleted = await ActivityMultimedia.destroy({
            where: {Activity_id: ActivityId, Multimedia_id: MultimediaId}
        });
        if(deleted === 0){
            return res.status(404).json({message: 'Image non trouvée'});
    };
    const updatedActivity = await Activity.findByPk(ActivityId, {
        include: [Multimedia]
    });
    res.status(200).json(updatedActivity);
    }catch (error){
        console.error("Erreur lors de la suppression de l'image:", error);
        res.status(500).json({message: "Erreur serveur lors de la suppression de l'image"});
    }
}

