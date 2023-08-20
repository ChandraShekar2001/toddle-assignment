exports.handleDatabaseError = async (fn, res) => {
  try {
    // console.log(fn);
    const result = await fn();
    // console.log(result);
    return result;
  } catch (error) {
    // Log the specific error
    console.error("Database Error:", error.message);
    // Pass the error to the error handling middleware
    throw error.message;
  }
};
