const authorizeRoles = (...allowedRoleIds) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoleIds.includes(req.user.role_id)) {
        return res.status(403).json({ message: "Accès refusé : rôle insuffisant", user: req.user });
      }
      next();
    };
  };
  
  export default authorizeRoles;
  