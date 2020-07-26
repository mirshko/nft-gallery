export default async function fetchCollections(address) {
  const res = await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=300`
  );

  const json = await res.json();

  /**
   * Cleanup API Response
   */
  return json.map(
    ({
      description,
      external_url,
      image_url,
      large_image_url,
      name,
      primary_asset_contracts,
    }) => ({
      description,
      external_url,
      image_url,
      large_image_url,
      name,
      asset_contract_address: primary_asset_contracts.map(
        ({ address }) => address
      ),
    })
  );
}
