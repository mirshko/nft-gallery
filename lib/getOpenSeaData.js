import fetchCollections from "./fetchCollections";
import fetchAssets from "./fetchAssets";

export default async function getOpenSeaData(address) {
  const collections = await fetchCollections(address);

  const data = await Promise.all(
    collections.map(async (collection) => ({
      ...collection,
      assets: await fetchAssets(address, collection.slug),
    }))
  );

  return { data };
}
