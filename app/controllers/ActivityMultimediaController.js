// J'importe les modèles requis
import Activity from '../models/Activity.js';
import Multimedia from '../models/Multimedia.js';
import ActivityMultimedia from '../models/ActivityMultimedia.js';

// Fonction pour récupérer toutes les associations entre une activité et ses multimédias
export async function getAllActivityMultimedia(req, res) {
    try {
        const allActivityMultimedia = await ActivityMultimedia.findAll({
            include: [{
                model: Activity,
                include: [Multimedia]
            }]
        });
        if (allActivityMultimedia.length === 0) {
            return res.status(404).json({ message: 'Aucune association trouvée' });
        }
        res.status(200).json(allActivityMultimedia);
    } catch (error) {
        console.error("Erreur lors de la récupération des associations:", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des associations" });
    }
}

export async function addMultimediaToActivity(req, res) {
    try {
        const activityId = Number(req.params.activityId);
        const { Multimedia: multimediaArray } = req.body;

        if (!multimediaArray || !Array.isArray(multimediaArray)) {
            return res.status(400).json({ message: "Données multimédia invalides" });
        }

        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activité non trouvée" });
        }

        for (const multimediaData of multimediaArray) {
            // Créer ou trouver le multimédia
            const [multimedia, created] = await Multimedia.findOrCreate({
                where: { name: multimediaData.name },
                defaults: multimediaData
            });

            // Créer l'association si elle n'existe pas déjà
            await ActivityMultimedia.findOrCreate({
                where: {
                    activity_id: activityId,
                    multimedia_id: multimedia.id
                }
            });
        }

        // Récupérer l'activité mise à jour avec tous ses multimédias
        const updatedActivity = await Activity.findByPk(activityId, {
            include: [{
                model: Multimedia,
                through: ActivityMultimedia
            }]
        });

        res.status(200).json(updatedActivity);
    } catch (error) {
        console.error("Erreur lors de l'ajout du multimédia à l'activité:", error);
        res.status(500).json({ message: "Erreur serveur lors de l'ajout du multimédia à l'activité" });
    }
}



// Fonction pour supprimer une association entre une activité et un multimédia
export async function deleteActivityMultimedia(req, res) {
    try {
        const activityId = Number(req.params.activityId);
        const multimediaId = Number(req.params.multimediaId);

        const deleted = await ActivityMultimedia.destroy({
            where: { activity_id: activityId, multimedia_id: multimediaId }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Association non trouvée' });
        }

        // Retourne l'activité mise à jour après suppression
        const updatedActivity = await Activity.findByPk(activityId, {
            include: [Multimedia]
        });
        res.status(200).json(updatedActivity);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'association:", error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de l'association" });
    }
}