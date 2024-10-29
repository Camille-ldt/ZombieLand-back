import client from "./sequelize.js";

import User from "./models/User.js";
import Role from "./models/Role.js";
import Category from "./models/Category.js";
import Activity from "./models/Activity.js";
import Multimedia from "./models/Multimedia.js";
import Reservation from "./models/Reservation.js";
import Avis from "./models/Avis.js";
import Payment from "./models/Payment.js";
import Period from "./models/Period.js";
import UserRole from "./models/UserRole.js";
import ActivityAvis from "./models/ActivityAvis.js";
import ActivityMultimedia from "./models/ActivityMultimedia.js";



// Many-to-Many relationships
User.belongsToMany(Role, {
    through: 'user_role',
    foreignKey: 'user_id'
});

Role.belongsToMany(User, {
    through: 'user_role',
    foreignKey: 'role_id'
});

Activity.belongsToMany(Avis, {
    through: 'activity_avis',
    foreignKey: 'activity_id'
});

Avis.belongsToMany(Activity, {
    through: 'activity_avis',
    foreignKey: 'avis_id'
});

Activity.belongsToMany(Multimedia, {
    through: 'activity_multimedia',
    foreignKey: 'mutlimedia_id'
});

Multimedia.belongsToMany(Activity, {
    through: 'activity_multimedia',
    foreignKey: 'activity_id'
});

// One-to-Many relationships
Category.hasMany(Activity, {
    foreignKey: 'category_id'
});

Activity.belongsTo(Category, {
    foreignKey: 'category_id'
});

User.hasMany(Reservation, {
    foreignKey: 'user_id'
});

Reservation.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Avis, {
    foreignKey: 'user_id'
});

Avis.belongsTo(User, {
    foreignKey: 'user_id'
});

Reservation.hasMany(Payment, {
    foreignKey: 'reservation_id'
});

Payment.belongsTo(Reservation, {
    foreignKey: 'reservation_id'
});

export {
client,
Activity,
Avis,
Multimedia,
ActivityAvis,
ActivityMultimedia,
UserRole,
User,
Role,
Payment,
Reservation,
Category,
Period,
};