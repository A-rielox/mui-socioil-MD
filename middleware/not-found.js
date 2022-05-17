const notFoundMiddleware = (req, res) => {
   console.log('La ruta no existe 🤦');
   res.status(404).send('<h1>La ruta no existe 🤦<h1>');
};

export default notFoundMiddleware;
