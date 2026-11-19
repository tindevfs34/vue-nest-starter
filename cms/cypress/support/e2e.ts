import "./commands";

// Prevent uncaught exception from failing tests if third-party libraries emit unhandled warnings
Cypress.on("uncaught:exception", (_err, _runnable) => {
  return false;
});
