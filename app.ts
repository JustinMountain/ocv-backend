import express, { Request, Response } from 'express';

import { CONSOLE_HIGHLIGHT, CONSOLE_ERROR, CONSOLE_RESET } from './config/constants';
import { runAllUpdates } from './scripts/runAllUpdates';
import { runFederalUpdate } from './scripts/runFederalUpdate';
import { runOntarioUpdate } from './scripts/runOntarioUpdate';

const app = express();
const port = 3000;
const repRouter = require('./routes/representatives');
const officeRouter = require('./routes/offices');

// Mapping script names to their respective functions
const scriptActions = {
  'all': runAllUpdates,
  'federal': runFederalUpdate,
  'ontario': runOntarioUpdate,
};

/**
 * Handle get requests to the root of the API.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'The REST API is active!' });
});

/**
 * Handle get requests to the /representatives endpoint.
 */
app.use('/representatives', repRouter);

/**
 * Handle get requests to the /offices endpoint.
 */
app.use('/offices', officeRouter);

/**
 * Creates an endpoint to run different database update scripts.
 */
// app.get('/scripts/update/:scriptname', async (req: Request, res: Response) => {
//   const scriptName = req.params.scriptname.toLowerCase();
//   const scriptToRun = scriptActions[scriptName as keyof typeof scriptActions];

//   if (scriptToRun) {
//     try {
//       await scriptToRun();
//       console.log(`${CONSOLE_HIGHLIGHT}Script "${scriptName}" executed successfully${CONSOLE_RESET}`)
//       res.send("Script executed successfully");
//     } catch (error) {
//       console.error(`${CONSOLE_ERROR}Error executing ${scriptName}: ${CONSOLE_RESET}`, error);
//       res.status(500).send(`Error executing the script. Check the logs for more details.`);
//     }
//   } else {
//     res.status(404).send("Script not found.");
//   }
// });

/**
 * Determines the port Express application listens on internally.
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
