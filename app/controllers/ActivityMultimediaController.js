//J'importe les models requis
import {Activity} from '../models/Activity.js';
import {Multimedia} from '../models/Multimedia.js';
import {ActivityMultimedia} from '../models/ActivityMultimedia.js';


//Fonction pour ajouter une photo à une Activité
export async function addMultimediaToActivity (req, res){
    try{
        const ActivityId = req.params.ActivityId;
        const MultimediaId = req.params.MultimediaId;
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

export async function deleteActivityMultimedia (req, res){
    try{
        const ActivityId = req.params.ActivityId;
        const MultimediaId = req.params.MultimediaId;
        const ActivityMultimedia = await ActivityMultimedia.findOne(activityID);
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

export async function getAllActivityMultimedia (req, res){
    try{
        const activityMultimedia = req.params.id;
        const allActivityMultimedia = await ActivityMultimedia.findAll({
            include:[{
                model: Activity,
                where: {id: activityMultimedia},
                through:{attributes: []}
            }]
        });
        if (allActivityMultimedia.length===0){
        res.status(200).json(allActivityMultimedia);
        }
        res.status(200).json(allActivityMultimedia);
    }catch (error){
        console.error("Erreur lors de la suppression de l'image:", error);
        res.status(500).json({message: "Erreur serveur lors de la suppression de l'image"});
    }
}