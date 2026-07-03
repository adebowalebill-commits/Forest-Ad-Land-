let app: any;
try {
  app = require('../backend/src/index').default;
} catch (error: any) {
  app = function(req: any, res: any) {
    res.status(500).json({ error: "Failed to boot backend", details: error.message, stack: error.stack });
  };
}

export default app;
