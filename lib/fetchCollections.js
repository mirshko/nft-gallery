export default async function fetchCollections(address) {
  const res = await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=300`
  );

  const json = await res.json();

  /**
   * Cleanup API Response
   */
  return json
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(
      ({
        description,
        external_url,
        image_url,
        large_image_url,
        name,
        slug,
      }) => ({
        description,
        external_url,
        image_url,
        large_image_url,
        slug,
        name,
      })
    );
}
