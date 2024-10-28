import { User } from "./models/User.js";
import { Role } from "./models/Role.js";
import { Category } from "./models/Category.js";
import { Activity } from "./models/Activity.js";
import { Multimedia } from "./models/Multimedia.js";
import { Reservation } from "./models/Reservation.js";
import { Avis } from "./models/Avis.js";
import { Payment } from "./models/Payment.js";
import { Period } from "./models/Period.js";


// Many-to-Many relationships
User.belongsToMany(Role, {
    through: 'user_role'
});

Role.belongsToMany(User, {
    through: 'user_role'
});

Activity.belongsToMany(Avis, {
    through: 'activity_avis'
});

Avis.belongsToMany(Activity, {
    through: 'activity_avis'
});

Activity.belongsToMany(Multimedia, {
    through: 'activity_multimedia'
});

Multimedia.belongsToMany(Activity, {
    through: 'activity_multimedia'
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