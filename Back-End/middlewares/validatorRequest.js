export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); 
        next(); 
    } catch (errors) {
        const messages = errors.errors.map(v => `${v.path[0]}: ${v.message}`)
        return res.status(400).json({message: messages.join(" and ")}); 
    }
} 