import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

initializeApp();

export const deleteUser = onCall(async (request) => {
  const context = request.auth; // Access authentication info from the request

  // Ensure the function is called by an authenticated user
  if (!context) {
    throw new Error("Authentication required.");
  }

  const uid = context.uid; // Get the UID of the authenticated user

  try {
    await getAuth().deleteUser(uid); // Delete the user with the specified UID
    logger.info(`User ${uid} deleted successfully.`);
    return {message: `User ${uid} deleted successfully.`};
  } catch (error: any) {
    logger.error(`Error deleting user: ${error.message}`);
    throw new Error(`Error deleting user: ${error.message}`);
  }
});
