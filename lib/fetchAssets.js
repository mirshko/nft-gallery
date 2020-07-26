export default async function fetchAssets(address, slug, count = 300) {
  const res = await fetch(
    `https://api.opensea.io/api/v1/assets?owner=${address}&collection=${slug}&order_direction=desc&offset=0&limit=${count}`
  );

  const { assets } = await res.json();

  return assets.map(
    ({
      background_color,
      external_link,
      image_original_url,
      image_preview_url,
      image_thumbnail_url,
      image_url,
      name,
      permalink,
      token_id,
    }) => ({
      background_color,
      external_link,
      image_original_url,
      image_preview_url,
      image_thumbnail_url,
      image_url,
      name,
      permalink,
      token_id,
    })
  );
}
