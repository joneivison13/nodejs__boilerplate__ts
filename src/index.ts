import { app } from "./app";
import logger from "./utils/logger";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}, ${process.env.NODE_ENV} mode, ${process.pid} process id`
  );
});
