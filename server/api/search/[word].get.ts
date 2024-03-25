export default defineEventHandler((event) => {
  const word = getRouterParam(event, "word");
  return {
    definitions: [{ definition: `${word}, but in spanish`, example: `You must ${word} the patient` }],
  };
});
